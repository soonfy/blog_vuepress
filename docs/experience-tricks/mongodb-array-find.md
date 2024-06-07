# mongodb 查询数组元素

假设集合 userlists 中有这样 4 条记录

{ id: '1', userList: [{ uid: '123', status: 1 }, { uid: '456', status: 0 }] }  
{ id: '2', userList: [{ uid: '123', status: 0 }, { uid: '456', status: 1 }] }  
{ id: '3', userList: [{ uid: '123', status: 0 }, { uid: '456', status: 0 }] }  
{ id: '4', userList: [{ uid: '456', status: 1 }, { uid: '789', status: 1 }] }  

## 查询单个条件

```js
db.userlists.find({ 'userList.uid': '123' })
```

> 1. 能匹配到 id 是 1, 2, 3 的 3 条记录  

```js
db.userlists.find({ 'userList.status': 1 })
```

> 2. 能匹配到 id 是 1, 2, 4 的 3 条记录  

```js
db.userlists.find({ userList: { $elemMatch: { uid: '123' } } })
```

> 3. 能匹配到 id 是 1, 2, 3 的 3 条记录  

```js
db.userlists.find({ userList: { $elemMatch: { status: 1 } } })
```

> 4. 能匹配到 id 是 1, 2, 4 的 3 条记录  

## 查询多个条件

```js
db.userlists.find({ 'userList.uid': '123', 'userList.status': 1 })
```

> 5. 能匹配到 id 是 1, 2 的 2 条记录  
> 相当于匹配数组中有子元素包含 uid='123', 有子元素包含 status=1, 这两个子元素可以不是同一个元素  
> 是查询 1 和查询 2 结果的交集  

```js
db.userlists.find({ userList: { $elemMatch: { uid: '123', status: 1 } } })
```

> 6. 能匹配到 id 是 1 的 1 条记录  
> 相当于匹配数组中有一个子元素 uid='123' 同时包含 status=1  

## 总结

1. 查询数组中单个条件时，`{ 'userList.uid': '123' }` 和 `{ userList: { $elemMatch: { uid: '123' } } }` 是等价的
2. 查询数组中多个条件时，`{ userList: { $elemMatch: { uid: '123', status: 1 } } }` 是查询 uid='123' 并且 status=1 的元素
3. 查询数组中多个条件时，`{ 'userList.uid': '123', 'userList.status': 1 }` 是查询 uid='123' 和 status=1 的交集
