# mongodb 更新普通元素

假设集合 userlists 中有这样 1 条记录

{ id: '1', age: 18, likes: 6, lastModified: ISODate("2020-01-01T21:21:21.052Z"), cancellation: { date: Timestamp(1579728101, 1) }, dogs: ['tom', 'dav'] }  

## $set

> 修改字段

```js
db.userlists.update({ id: '1' }, {
  $set: {
    age: 20,
  },
})

// { id: '1', age: 20 }  
```

> 修改内嵌字段

```js
db.userlists.update({ id: '1' }, {
  $set: {
    'cancellation.date': new Date('2021-01-01'),
  },
})

// { id: '1', cancellation: { date: ISODate("2021-01-01T00:00:00.00Z") } }  
```

> 修改数组字段

```js
db.userlists.update({ id: '1' }, {
  $set: {
    'dogs.1': 'apple',
  },
})

// { id: '1', dogs: ['tom', 'apple'] }  
```

## $setOnInsert

> 新建字段  
> 如果匹配不到数据执行 `$set` 和 `$setOnInsert`  

```js
db.userlists.update({ id: '2' }, {
  $setOnInsert: {
    likes: 3,
  },
  $set: {
    age: 20,
  },
})

// { id: '2', age: 20, likes: 3 }  
```

> 新建字段  
> 如果匹配到数据就只执行 `$set`，不执行 `$setOnInsert`  

```js
db.userlists.update({ id: '1' }, {
  $setOnInsert: {
    likes: 3,
  },
  $set: {
    age: 20,
  },
})

// { id: '1', age: 20, likes: 6 }  
```

## $unset

> 删除字段名称  
> 如果字段不存在，就不执行  

```js
db.userlists.update({ id: '1' }, {
  $unset: {
    likes: '',
    cancellation: '',
  }
})

// { id: '1', age: 18, lastModified: ISODate("2020-01-01T21:21:21.052Z") }  
```

## $rename

> 修改字段名称  
> 可以修改内嵌字段  
> 如果字段不存在，就不执行  

```js
db.userlists.update({ id: '1' }, {
  $rename: {
    likes: 'num',
    'cancellation.date': 'cancellation.lastModified',
  }
})

// { id: '1', age: 18, num: 6, lastModified: ISODate("2020-01-01T21:21:21.052Z"), cancellation: { lastModified: Timestamp(1579728101, 1) } }  
```

## $max

> 取原先值和新值的最大值修改数值字段  
> 新值比原先值小，不执行修改  
> 如果字段不存在，就不执行  

```js
db.userlists.update({ id: '1' }, {
  $max: {
    age: 16,
  }
})

// { id: '1', age: 18 }  
```

> 取原先值和新值的最大值修改数值字段  
> 新值比原先值大，执行修改  

```js
db.userlists.update({ id: '1' }, {
  $max: {
    age: 20,
  }
})

// { id: '1', age: 20 }  
```

> 取原先值和新值的最大值修改日期字段  
> 新值比原先值大，执行修改  

```js
db.userlists.update({ id: '1' }, {
  $max: {
    lastModified: new Date('2021-01-01'),
  }
})

// { id: '1', lastModified: ISODate("2021-01-01T00:00:00Z") }  
```

## $min

> 取原先值和新值的最小值修改数值字段  
> 新值比原先值大，不执行修改  
> 如果字段不存在，就不执行  

```js
db.userlists.update({ id: '1' }, {
  $min: {
    age: 20,
  }
})

// { id: '1', age: 18 }  
```

> 取原先值和新值的最小值修改数值字段  
> 新值比原先值小，执行修改  

```js
db.userlists.update({ id: '1' }, {
  $min: {
    age: 16,
  }
})

// { id: '1', age: 16 }  
```

> 取原先值和新值的最小值修改日期字段  
> 新值比原先值小，执行修改  

```js
db.userlists.update({ id: '1' }, {
  $min: {
    lastModified: new Date('2018-01-01'),
  }
})

// { id: '1', lastModified: ISODate("2018-01-01T00:00:00Z"), }  
```

## $mul

> 计算原先值和新值的乘积修改数值字段  

```js
db.userlists.update({ id: '1' }, {
  $mul: {
    age: 2,
    likes: 1.5,
  }
})

// { id: '1', age: 36, likes: 9 }  
```

> 计算原先值和新值的乘积修改数值字段  
> 如果字段不存在，新建数值字段值为 0  

```js
db.userlists.update({ id: '1' }, {
  $mul: {
    num: 120,
  }
})

// { id: '1', num: 0 }  
```

## $inc

> 增量修改数值字段  
> 如果字段不存在，就不执行  

```js
db.userlists.update({ id: '1' }, {
  $inc: {
    age: 2,
    likes: -1,
  }
})

// { id: '1', age: 20, likes: 5 }  
```

## $currentDate

> 更新日期字段到当前日期  
> 如果字段不存在，就添加字段  

```js
db.userlists.update({ id: '1' }, {
  $currentDate: {
    lastModified: true,
  }
})

// { id: '1', lastModified: [ISODate("2022-02-21T21:21:21.052Z"), cancellation: { date: Timestamp(1579728101, 1) } }  
```

> 更新日期字段到当前时间戳 `{ $type: 'timestamp' }`  
> 如果字段不存在，就添加字段  

```js
db.userlists.update({ id: '1' }, {
  $currentDate: {
    'cancellation.date': { $type: 'timestamp' },
  }
})

// { id: '1', lastModified: ISODate("2022-02-21T21:21:21.052Z"), cancellation: { date: Timestamp(1579726934, 2) } }  
```

> 更新日期字段到当前日期 `{ $type: 'date' }`  
> 如果字段不存在，就添加字段  

```js
db.userlists.update({ id: '1' }, {
  $currentDate: {
    lastModified: { $type: 'date' },
  }
})

// { id: '1', lastModified: ISODate("2022-02-21T21:21:21.052Z"), cancellation: { date: Timestamp(1579726934, 2) } }  
```

> 使用 `$set` 实现 `$currentDate` 效果
> 更新日期字段到当前日期 `NOW`, `{ $type: 'date' }`  
> 更新日期字段到当前时间戳 `CLUSTER_TIME`, `{ $type: 'timestamp' }`  
> 如果字段不存在，就添加字段  

```js
db.userlists.update({ id: '1' }, [{
  $set: {
    lastModified: '$$NOW',
    'cancellation.date': '$$CLUSTER_TIME',
  }
}])

// { id: '1', lastModified: ISODate("2022-02-21T21:21:21.052Z"), cancellation: { date: Timestamp(1579726934, 2) } }  
```

## 联系与区别

1. `$unset` 和 `$rename`  

> 都是修改字段名称  
> `$unset` 是删除字段， `$rename` 是重命名字段  

2. `$set` 和 `$setOnInsert`  

> 都是修改字段数据  
> `$set` 是匹配到数据就修改数据， `$setOnInsert` 是匹配不到数据才添加数据  

3. `$set`, `$max`, `$min`, `$mul` 和 `$inc`  

> 都是修改字段数据  
> `$set` 是全量修改数据， `$max` 是取原先值和新值的最大值， `$min` 是取原先值和新值的最小值， `$mul` 是取原先值和新值的乘积， `$inc` 是取原先值和新值的加和  

## 参考内容

1. [mongodb update field](https://docs.mongodb.com/manual/reference/operator/update-field/)
