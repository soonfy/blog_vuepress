# 百度统计

1. 在百度统计官网(https://tongji.baidu.com/sc-web)添加网站
2. 在 `.vuepress/config.js` 配置百度统计的代码

```js
{
  head: [
    ['script', {},
    `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `],
  ],
}
```

3. 在 `.vuepress/enhanceApp.js` 添加监听路由

```js
export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    if (typeof _hmt !== 'undefined') {
      if (to.path) {
        _hmt.push(['_trackPageview', to.fullPath])
      }
    }
    next()
  })
}
```
