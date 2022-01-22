# 问题汇总

1. yarn docs:dev 编译成功，网站打开报错

```text
Html Webpack Plugin:
  TypeError: Cannot read property '0' of undefined
  
  - index.js:14 exports.normalizeHeadTag
    [blog_vuepress]/[@vuepress]/core/lib/node/util/index.js:14:22
  
  - HeadPlugin.js:23 tags.forEach.tag
    [blog_vuepress]/[@vuepress]/core/lib/node/webpack/HeadPlugin.js:23:28
  
  - Array.forEach
  
  - HeadPlugin.js:22 compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync
    [blog_vuepress]/[@vuepress]/core/lib/node/webpack/HeadPlugin.js:22:21
  
  
  - new Promise
  
  
  - Hook.js:154 AsyncSeriesWaterfallHook.lazyCompileHook
    [blog_vuepress]/[tapable]/lib/Hook.js:154:20
  
  - index.js:673 
    [blog_vuepress]/[vuepress-html-webpack-plugin]/index.js:673:47
  
  - index.js:187 Promise.resolve.then.then.then.then.then.then.then.result
    [blog_vuepress]/[vuepress-html-webpack-plugin]/index.js:187:18
  
  - next_tick.js:68 process._tickCallback
    internal/process/next_tick.js:68:7
```

> config.js 中 head 配置代码错误
