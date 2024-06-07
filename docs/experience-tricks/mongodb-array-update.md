# mongodb 数组操作运算符

假设集合 userlists 中有这样 1 条记录

{ id: '1', likes: ['apple', 'book', 'cat'] }  

## $push

> 直接把数据添加到记录  

```js
db.userlists.update({ id: '1' }, {
  $push: {
    likes: 'dog',
  }
})

// { id: '1', likes: ['apple', 'book', 'cat', 'dog'] }  
```

> 依次把数组中每个元素添加到记录 `$each`  

```js
db.userlists.update({ id: '1' }, {
  $push: {
    likes: {
      $each: ['dog', 'apple'],
    }
  }
})

// { id: '1', likes: ['apple', 'book', 'cat', 'dog', 'apple'] }  
```

> 依次把数组中每个元素添加到记录，排序并截取 `$each`, `$sort`, `$slice`  

{ id: '1', likes: [{ name: 'apple', price: 3 }, { name: 'book', price: 1 }, { name: 'cat', price: 4 }] }  

```js
db.userlists.update({ id: '1' }, {
  $push: {
    likes: {
      $each: [{ name: 'apple', price: 3 }, { name: 'dog', price: 6 }],
      $sort: { price: -1 },
      $slice: 3,
    }
  }
})

// { id: '1', likes: [{ name: 'dog', price: 6 }, { name: 'cat', price: 4 }, { name: 'apple', price: 3 }] }  
```

## $addToSet

> 直接把数据添加到记录  
> 如果记录中已有该数据，就不添加  

```js
db.userlists.update({ id: '1' }, {
  $addToSet: {
    likes: 'dog',
  }
})

// { id: '1', likes: ['apple', 'book', 'cat', 'dog'] }  
```

> 依次把数组中每个元素添加到记录 `$each`  
> 如果记录中已有该数据，就不添加  

```js
db.userlists.update({ id: '1' }, {
  $addToSet: {
    likes: {
      $each: ['dog', 'apple'],
    }
  }
})

// { id: '1', likes: ['apple', 'book', 'cat', 'dog'] }  
```

## $pop

> 直接移除记录中数组最后一个数据 `{ field: 1 }`  

```js
db.userlists.update({ id: '1' }, {
  $pop: {
    likes: 1,
  }
})

// { id: '1', likes: ['apple', 'book'] }  
```

> 直接移除记录中数组第一个数据 `{ field: -1 }`  

```js
db.userlists.update({ id: '1' }, {
  $pop: {
    likes: -1,
  }
})

// { id: '1', likes: ['apple', 'book'] }  
```

## $pull

> 根据匹配条件移除记录中匹配到的数据  

```js
db.userlists.update({ id: '1' }, {
  $pull: {
    likes: {
      $in: ['apple', 'book'],
    },
  }
})

// { id: '1', likes: ['cat'] }  
```

> 根据对象条件移除记录中匹配到的数据  
> `$pull` 默认就是完全匹配，不能搭配 `$elemMatch` 使用

{ id: '1', likes: [{ name: 'apple', price: 3 }, { name: 'book', price: 1 }] }  
{ id: '1', likes: [{ name: 'apple', price: 1 }, { name: 'book', price: 3 }] }  

```js
db.userlists.update({ id: '1' }, {
  $pull: {
    likes: {
      name: 'apple',
      price: 3,
    }
  }
})

// { id: '1', likes: [{ name: 'book', price: 1 }] }  
// { id: '1', likes: [{ name: 'apple', price: 1 }, { name: 'book', price: 3 }] }  
```

## $pullAll

> 根据匹配条件移除记录中匹配到的数据  
> `{ $pullAll: { field: [value1, value2] } }` 等价于 `{ $pull: { field: { $in: [value1, value2] } } }`

```js
db.userlists.update({ id: '1' }, {
  $pullAll: {
    likes: ['apple', 'book'],
  }
})

// { id: '1', likes: ['cat'] }  
```

## $

> 根据条件更新数组中匹配到的第一个数据  
> `'field.$'` 中 field 字段必须在查询查询条件中存在  
> 只会更新匹配到的记录中数组字段的第一条元素  

{ id: '1', likes: ['apple', 'book', 'book'] }  
{ id: '1', likes: ['apple', 'cat', 'dog'] }  

```js
db.userlists.update({
  id: '1',
  likes: 'book',
}, {
  $set: {
    'likes.$': 'egg',
  }
})

// { id: '1', likes: ['apple', 'egg', 'book'] }  
// { id: '2', likes: ['apple', 'cat', 'dog'] }  
```

> 根据条件更新数组中匹配到的第一个数据的某个字段  
> `'field.$.key'` 中 field 字段必须在查询查询条件中存在  
> 只会更新匹配到的记录中数组字段的第一条元素  

{ id: '1', likes: [{ name: 'apple', price: 3 }, { name: 'book', price: 1 }] }  
{ id: '1', likes: [{ name: 'apple', price: 1 }, { name: 'cat', price: 3 }] }  

```js
db.userlists.update({
  id: '1',
  'likes.name': 'book',
}, {
  $set: {
    'likes.$.price': 5,
  }
})

// { id: '1', likes: [{ name: 'apple', price: 3 }, { name: 'book', price: 5 }] }  
// { id: '1', likes: [{ name: 'apple', price: 1 }, { name: 'cat', price: 3 }] }  
```

## $[]

> 根据条件更新数组中匹配到的所有数据  
> `'field.$[]'` 中 field 字段不是必须在查询查询条件中存在  
> 只会更新匹配到的记录中数组字段的所有元素  

{ id: '1', scores: [78, 83, 92] }  
{ id: '2', scores: [78, 83, 100] }  

```js
db.userlists.update({}, {
  $inc: {
    'scores.$[]': 2,
  }
})

// { id: '1', scores: [80, 85, 94] }  
// { id: '2', scores: [80, 85, 102] }  
```

> 根据条件更新数组中匹配到的所有数据的某个字段  
> `'field.$[].key'` 中 field 字段不是必须在查询查询条件中存在  
> 只会更新匹配到的记录中数组字段的所有元素  

{ id: '1', likes: [{ name: 'apple', price: 3 }, { name: 'book', price: 1 }] }  
{ id: '2', likes: [{ name: 'apple', price: 1 }, { name: 'cat', price: 3 }] }  

```js
db.userlists.update({}, {
  $inc: {
    'likes.$.price': 2,
  }
})

// { id: '1', likes: [{ name: 'apple', price: 5 }, { name: 'book', price: 3 }] }  
// { id: '2', likes: [{ name: 'apple', price: 3 }, { name: 'cat', price: 5 }] }  
```

> 根据条件更新数组中匹配到的所有数据  
> `'field.$[]'` 中 field 字段不是必须在查询查询条件中存在  
> 只会更新匹配到的记录中数组字段的匹配到的元素  

{ id: '1', scores: [78, 83, 92] }  
{ id: '2', scores: [78, 83, 100] }  

```js
db.userlists.update({
  scores: { $ne: 100 },
}, {
  $inc: {
    'scores.$[]': 10,
  }
})

// { id: '1', scores: [88, 93, 102] }  
// { id: '2', scores: [88, 93, 100] }  
```

## $[item]

> 根据条件更新数组中匹配到的所有数据  
> `'field.$[item]'` 中 field 字段不是必须在查询查询条件中存在  
> 需要搭配 `arrayFilters` 使用，只会更新匹配到的记录中数组字段 arrayFilters 匹配到的元素  

{ id: '1', scores: [78, 83, 92] }  
{ id: '2', scores: [78, 83, 100] }  

```js
db.userlists.update({}, {
  $set: {
    'scores.$[item]': 90,
  }
}, {
  arrayFilters: [{ item: { $gt: 90 } }]
})

// { id: '1', scores: [78, 83, 90] }  
// { id: '2', scores: [78, 83, 90] }  
```

> 根据条件更新数组中匹配到的所有数据的某个字段  
> `'field.$[item].key'` 中 field 字段不是必须在查询查询条件中存在  
> 需要搭配 `arrayFilters` 使用，只会更新匹配到的记录中数组字段 arrayFilters 匹配到的元素  

{ id: '1', likes: [{ name: 'apple', price: 3 }, { name: 'book', price: 1 }] }  
{ id: '2', likes: [{ name: 'apple', price: 1 }, { name: 'cat', price: 3 }] }  

```js
db.userlists.update({}, {
  $inc: {
    'likes.$[item].price': 2,
  }
}, {
  arrayFilters: [{ 'item.name': 'apple' }, { 'item.price': { $lte: 3} }]
})

// { id: '1', likes: [{ name: 'apple', price: 5 }, { name: 'book', price: 1 }] }  
// { id: '2', likes: [{ name: 'apple', price: 3 }, { name: 'cat', price: 3 }] }  
```

## 联系与区别

1. `$push` 和 `$addToSet`

> 都是向数组字段添加元素  
> 如果数组中没有该元素，`$push` 和 `$addToSet` 是等价的  
> 如果数组中已经有该元素，`$push` 还是会添加元素，而 `$addToSet` 不会执行任何操作  

2. `$pop`, `$pull` 和 `$pullAll`

> 都是从数组字段移除元素  
> `$pop` 是根据位置移除元素，`1` 移除最后一个元素， `-1` 移除第一个元素  
> `$pull` 和 `$pullAll` 是根据条件移除元素，`$pullAll` 是 `$pull` 的特例  
> `$pullAll: { values: [0, 2, 3] }` 等价于 `$pull: { values: { $in: [0, 2, 3] } }`  

3. `$`, `$[]` 和 `$[item]`

> 都是更新匹配到的数组元素  
> `$` 只更新数组匹配到的第一个元素，`$[]` 和 `$[item]` 会更新数组匹配到的所有元素  
> `field.$` 中 field 字段必须在查询条件中存在，`field.$[]` 和 `field.$[item]` 没有这个限制  
> `field.$[]` 会更新数组匹配到的所有元素，`field.$[item]` 经常搭配 `arrayFilters` 更新数组的部分元素

## 参考内容

1. [mongodb update array](https://docs.mongodb.com/manual/reference/operator/update-array/)
