# CommonJS 模块

> Modules: CommonJS modules

## 每一个文件是一个模块

> 文件扩展名: .js, .json, .node  
> 新增扩展名: .cjs, .mjs  

1. filename-a.js  
2. filename-b.json  
3. filename-c.node  
4. filename-d.cjs: CommonJS 模块，只能 require()  
5. filename-e.mjs: 默认是 ECMAScript 模块，只能 import()  

## CommonJS 模块 和 ECMAScript 模块

> Enabling

1. 默认是 CommonJS 模块的情况  

    * 扩展名是 .cjs 的文件  
    * 如果上级目录的 package.json 文件中 `type="commonjs"`，扩展名是 .js 的文件  
    * 如果上级目录的 package.json 文件中没有指定 type 字段值，扩展名是 .js 的文件  
    * 扩展名不是 .js, .json, .node, .cjs, .mjs 的文件  

2. require() 是加载 CommonJS 模块，import() 是加载 ECMAScript 模块  

## 文件模块

> File modules

1. `require('module-name')` 根据模块名称加载  
2. `require('../dirname/filename-a')` 根据相对路径加载  
3. `require('/source/dirname/filename-a')` 根据绝对路径加载  
4. 查找顺序: 同名文件，同名的 .js 文件，同名的 .json 文件，同名的 .node 文件  
5. 非 .js, .json, .node 文件，需要写完整的文件扩展名 require('./filename-a.cjs')  

## 主模块

> Accessing the main module

1. 判断一个文件是不是启动的主模块  

    * 旧版本: `module.parent` 如果是 null 则该文件是主模块，否则不是  
    * 新版本: `require.main === module` 如果是 true 则该文件是主模块，否则不是  

2. 如果启动文件不是 CommonJS 模块，则所有文件的 require.main 都是 undefined，无法判断哪个文件是主模块  

## 缓存

> Caching

1. 模块加载之后都会被缓存，每次 require() 代码不会再次执行，返回的都是同一个对象  

2. 模块可以暴露一个函数，这样就可以多次执行模块文件的代码  

3. 缓存内容被保存在 require.cache 上，是一个键值对对象，属性是模块文件的绝对路径，所以是大小写敏感的，require('./test') 和 require('./Test') 是两个不同的缓存  

4. ❗️文档中核心模块会被缓存，本地测试发现核心模块 fs 并没有被缓存  

```js
cache:
  [Object: null prototype] {
    '/test/index.cjs':
    Module {
      id: '.',
      exports: {},
      parent: null,
      filename: '/test/index.cjs',
      loaded: false,
      children: [Array],
      paths: [Array] },
    '/node_modules/lodash/lodash.js':
    Module {
      id:
        '/node_modules/lodash/lodash.js',
      exports: [Function],
      parent: [Module],
      filename:
        '/node_modules/lodash/lodash.js',
      loaded: true,
      children: [],
      paths: [Array] } }
```

## 核心模块

> Core modules

1. 核心模块在 Node.js 源码中定义，位于 /lib 文件夹内，被编译成二进制文件  
2. 加载同名模块，优先加载核心模块。require('http') 优先加载核心模块 http  
3. 绕过模块缓存，直接加载核心模块，可以使用 require('node:http')  

## 模块的循环加载

> Cycles

1. 

## 文件夹加载模块

> Folders as modules

1. 如果在文件夹的根目录下有 package.json 文件，并且指定 main 属性  

    ```js
    {
      "name" : "some-library",
      "main" : "./lib/library-index.js"
    }
    ```

    require('./some-library') 会加载 ./some-library/lib/library-index.js 文件

2. 如果在文件夹的根目录下没有 package.json 或者没有指定 main 属性  

    * require('./some-library') 会加载 ./some-library/index.js 或者 ./some-library/index.node  

3. 如果找不到对应的文件，会跑出错误 Error: Cannot find module 'some-library'

## 从 node_modules 目录加载模块

> Loading from node_modules folders

1. 如果 require() 使用的模块标识符不是核心模块，并且不是以相对路径或者绝对路径，就从当前目录开始，添加 /node_modules/ 查找模块文件  

2. 如果当前目录添加 /node_modules/ 找不到模块文件，移动到父目录依次查找，直到根目录  

3. 如果在 /home/demo/index.js 文件调用 require('test.js')，依次按照以下顺序查找  

    * /home/demo/node_modules/test.js  
    * /home/node_modules/test.js  
    * /node_modules/test.js  

4. 可以是 require('test.js') 加载文件，也可以是 require('demo/lib/test.js') 路径  

## 从全局目录加载模块

> Loading from the global folders

1. 
