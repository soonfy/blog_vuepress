# 激活侧边栏

> 页面滚动自动激活侧边栏链接

1. 安装依赖包

```bash
yarn add -D @vuepress/plugin-active-header-links
```

2. 修改 `.vuepress/config.js` 启用功能

```js
{
  plugins: {
    '@vuepress/plugin-active-header-links': {
      sidebarLinkSelector: '.sidebar-link',
      headerAnchorSelector: '.header-anchor',
    },
  },
}
```

## 参考内容

1. [vuepress plugin-active-header-links](https://vuepress.vuejs.org/zh/plugin/official/plugin-active-header-links.html)
