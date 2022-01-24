const navConfig = require('./nav')
const sidebarConfig = require('./sidebar')

module.exports = {
  title: '博客', // 网站标题
  description: '个人学习博客', // 网站描述
  host: '0.0.0.0',
  port: 8080,
  base: '/',
  dest: 'dist/',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }],
    ['meta', { name: 'keywords', content: 'soonfy,VuePress,blog' }],
    ['meta', { name: 'description', content: '个人博客' }],
    ['script', {},
    `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?26403e9a70a3edccd5fc56cae5a4e8f1";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `],
  ],
  themeConfig: {
    logo: '/logo.png', // 网站 logo
    nav: navConfig, // 顶部导航
    sidebar: sidebarConfig, // 侧边导航
  },
  markdown: {
    lineNumbers: true,
  }
}
