# 配置项目

## 基础配置

1. 新建一个文件夹 `mkdir .vuepress`
2. 新建一个配置文件 `touch config.js`
3. 配置标题，描述等基础配置

```js
module.exports = {
  title: '博客', // 网站标题
  description: '通过 vuepress 搭建个人学习博客', // 网站描述
  host: '0.0.0.0', // ip
  port: 8080, // 端口
  base: '/', // 基础路径
}
```

## 配置 head

1. 在 .vuepress 目录下新建 public 文件夹 `mkdir public`
2. 把常用的 icon, logo 等图片放到 public 目录
3. 配置 head

```js
module.exports = {
  title: '博客', // 网站标题
  description: '通过 vuepress 搭建个人学习博客', // 网站描述
  host: '0.0.0.0', // ip
  port: 8080, // 端口
  base: '/', // 基础路径
  head: [
    ['link', { rel: 'icon', href: '/logo.ico'}] // 网站 icon, 图片路径指向 public 目录
  ]
}
```

## 配置网站 logo

1. 配置 themeConfig.logo

```js
module.exports = {
  title: '博客', // 网站标题
  description: '通过 vuepress 搭建个人学习博客', // 网站描述
  host: '0.0.0.0', // ip
  port: 8080, // 端口
  base: '/', // 基础路径
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }] // 网站 icon, 图片路径指向 public 目录
  ],
  themeConfig: {
    logo: '/logo.png', // 网站 logo
  }
}
```

## 配置顶部导航

1. 配置 themeConfig.nav

```js
module.exports = {
  title: '博客', // 网站标题
  description: '通过 vuepress 搭建个人学习博客', // 网站描述
  host: '0.0.0.0', // ip
  port: 8080, // 端口
  base: '/', // 基础路径
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }] // 网站 icon, 图片路径指向 public 目录
  ],
  themeConfig: {
    logo: '/logo.png', // 网站 logo
    nav: [ // 顶部导航
      {
        text: 'VuePress',
        link: '/vuepress/',
      },
      {
        text: 'GitHub',
        items: [ // 下拉菜单
          { text: 'GitHub', link: 'https://github.com/soonfy', },
          { text: 'GitHub', link: 'https://github.com/soonfy', },
        ]
      }
    ],
  }
}
```

## 配置侧边栏

1. 配置 themeConfig.sidebar

```js
module.exports = {
  title: '博客', // 网站标题
  description: '通过 vuepress 搭建个人学习博客', // 网站描述
  host: '0.0.0.0',
  port: 8080,
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }] // 网站 icon
  ],
  themeConfig: {
    logo: '/logo.png', // 网站 logo
    nav: [ // 顶部导航
      {
        text: 'VuePress',
        link: '/vuepress/',
      },
      {
        text: 'GitHub',
        items: [ // 下拉菜单
          { text: 'GitHub', link: 'https://github.com/soonfy', },
          { text: 'GitHub', link: 'https://github.com/soonfy', },
        ]
      }
    ],
    sidebar: [ // 侧边导航
      {
        title: '实践技巧',
        // collapsable: false,
        path: '/experience-tricks/',
        // sidebarDepth: 1,
        children: [
          {
            title: 'mongodb 查询数组',
            path: '/experience-tricks/mongodb-find-array',
          },
          {
            title: 'nodejs eventloop',
            path: '/experience-tricks/nodejs-eventloop',
          }
        ]
      },
      {
        title: 'vuepress',
        // collapsable: false,
        path: '/vuepress/',
        // sidebarDepth: 1,
        children: [
          {
            title: '初始化项目',
            path: '/vuepress/setup'
          },
          {
            title: '常用配置',
            path: '/vuepress/config'
          }
        ]
      },
    ]
  }
}
```

## 配置 markdown

1. 配置 markdown.lineNumbers 可以在代码块的左侧显示行号

```js
module.exports = {
  title: '博客', // 网站标题
  description: '通过 vuepress 搭建个人学习博客', // 网站描述
  host: '0.0.0.0',
  port: 8080,
  base: '/',
  head: [
    ['link', { rel: 'icon', href: '/logo.ico' }] // 网站 icon
  ],
  themeConfig: {
    logo: '/logo.png', // 网站 logo
    nav: [ // 顶部导航
      {
        text: 'VuePress',
        link: '/vuepress/',
      },
      {
        text: 'GitHub',
        items: [ // 下拉菜单
          { text: 'GitHub', link: 'https://github.com/soonfy', },
          { text: 'GitHub', link: 'https://github.com/soonfy', },
        ]
      }
    ],
    sidebar: [ // 侧边导航
      {
        title: '实践技巧',
        // collapsable: false,
        path: '/experience-tricks/',
        // sidebarDepth: 1,
        children: [
          {
            title: 'mongodb 查询数组',
            path: '/experience-tricks/mongodb-find-array',
          },
          {
            title: 'nodejs eventloop',
            path: '/experience-tricks/nodejs-eventloop',
          }
        ]
      },
      {
        title: 'vuepress',
        // collapsable: false,
        path: '/vuepress/',
        // sidebarDepth: 1,
        children: [
          {
            title: '初始化项目',
            path: '/vuepress/setup'
          },
          {
            title: '常用配置',
            path: '/vuepress/config'
          }
        ]
      },
    ]
  },
  markdown: {
    lineNumbers: true,
  }
}
```

## 页面路由和项目文件映射

| 页面路由 | 项目文件 |
| -- | -- |
| / | /README.md |
| /vuepress/ | /vuepress/README.md |
| /vuepress | /vuepress.md |
| /vuepress.md | /vuepress.md |
| /vuepress.html | /vuepress.md |

## 参考内容

1. [基本配置](https://vuepress.vuejs.org/zh/config/)
2. [配置主题](https://vuepress.vuejs.org/zh/theme/default-theme-config.html)
3. [目录结构](https://vuepress.vuejs.org/zh/guide/directory-structure.html)
