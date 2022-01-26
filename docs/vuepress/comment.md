# 评论

1. 在 github 官网(https://github.com/settings/applications/new)创建服务

![github 创建 Client ID](../images/github-app-new.jpg)

2. 复制 Client ID 和 Client secrets
3. 安装依赖包

```bash
yarn add -D @vssue/vuepress-plugin-vssue
yarn add -D @vssue/api-github-v4
```

4. 修改 `.vuepress/config.js` 启用评论功能

```js
{
  plugins: {
    '@vssue/vuepress-plugin-vssue': {
      platform: 'github-v4', // 平台设置
      locale: 'zh', // 语言设置
      owner: 'soonfy', // github 用户名
      repo: 'repo_name', // 需要评论的仓库
      clientId: 'clientId', // Client ID
      clientSecret: 'clientSecret', // Client secrets
      autoCreateIssue: true // 自动初始化仓库
    },
  },
}
```

5. 单个页面使用评论：在 md 文件底部加入下面这行代码

```md
<Vssue  />
```

6. 全局自动使用评论

> 暂未实现

## 参考内容

1. [vuepress 使用 vssue](https://vssue.js.org/zh/guide/vuepress.html#%E4%BD%BF%E7%94%A8%E6%96%B9%E6%B3%95)
2. [代码平台的区别](https://vssue.js.org/zh/guide/supported-platforms.html#github)
3. [vuepress 主题继承](https://vuepress.vuejs.org/zh/theme/inheritance.html#%E4%BD%BF%E7%94%A8)

<Vssue  />
