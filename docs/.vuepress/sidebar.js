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
        title: 'mongodb 更新数组元素',
        path: '/experience-tricks/mongodb-array',
      },
      {
        title: 'nodejs 事件流',
        path: '/experience-tricks/nodejs-eventloop',
      },
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
      {
        title: '评论',
        path: '/vuepress/comment'
      },
      {
        title: '展示图片',
        path: '/vuepress/medium-zoom'
      },
      {
        title: '激活侧边栏',
        path: '/vuepress/active-header-links'
      },
      {
        title: '回到顶部',
        path: '/vuepress/back-to-top'
      },
      {
        title: '鼠标特效',
        path: '/vuepress/click-mouse-effect'
      },
      {
        title: '问题汇总',
        path: '/vuepress/problems'
      },
    ]
  },
]
