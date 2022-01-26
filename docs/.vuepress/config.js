const navConfig = require('./nav')
const sidebarConfig = require('./sidebar')

const config = require('../production')

module.exports = {
  title: '博客', // 网站标题
  description: '个人学习博客', // 网站描述
  host: '0.0.0.0',
  port: 8080,
  base: '/',
  dest: 'dist/', // build 打包位置
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }],
    ['meta', { name: 'keywords', content: 'soonfy,VuePress,blog' }],
    ['meta', { name: 'description', content: '个人博客' }],
    ['script', {
      src: 'https://cdn.bootcdn.net/ajax/libs/jquery/3.5.1/jquery.min.js',
    }], // 引入 jQuery
    ['script', {},
    `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${config.baidu.tongji}";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `], // 引入百度统计
    ['script', {
      src: '/scripts/click-mouse-effect.js',
    }], // 引入 click-mouse-effect
  ],
  themeConfig: {
    logo: '/logo.png', // 网站 logo
    nav: navConfig, // 顶部导航
    sidebar: sidebarConfig, // 侧边导航
  },
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github-v4', // 平台设置
      locale: 'zh', // 语言设置
      owner: config.github.owner, // github 用户名
      repo: config.github.repo, // 需要评论的仓库名称
      clientId: config.github.clientId, // Client secrets
      clientSecret: config.github.clientSecret, // 自动初始化仓库
      autoCreateIssue: true // 自动初始化仓库
    },
    '@vuepress/medium-zoom': {
      selector: '.theme-default-content :not(a) > img',
      options: {
        margin: 16,
        background: '#fff',
        scrollOffset: 40,
      },
    },
    '@vuepress/back-to-top': {},
  },
}
