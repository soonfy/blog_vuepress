/**
 * 配置 sidebar
 */
module.exports = [
  {
    title: '实践技巧',
    // collapsable: false,
    path: '/experience-tricks/',
    // sidebarDepth: 1,
    children: [
      {
        title: 'mongodb 查询数组元素',
        path: '/experience-tricks/mongodb-find-array',
      },
      {
        title: 'nodejs 事件流',
        path: '/experience-tricks/nodejs-eventloop',
      }
    ]
  },
  {
    title: 'VuePress',
    // collapsable: false,
    path: '/vuepress/',
    // sidebarDepth: 1,
    children: [
      {
        title: '初始化项目',
        path: '/vuepress/setup'
      },
      {
        title: '基础配置',
        path: '/vuepress/config'
      },
      {
        title: '百度统计',
        path: '/vuepress/baidu-tongji'
      },
    ]
  },
]
