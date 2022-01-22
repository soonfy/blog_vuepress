# 安装项目

## 准备工作

1. 按照 yarn 管理工具 `npm i -g yarn`
2. 新建一个博客项目目录 `mkdir blog_vuepress`
3. 初始化 package `yarn init`
4. 在 package 添加启动脚本

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

5. 新建博客内容目录 `mkdir dcos`
6. 新建一个示例文件 `echo '# Hello VuePress' > docs/README.md`
7. 执行测试命令启动项目 `yarn docs:dev`
8. 在网站查看项目效果 `http://localhost:8080/`

## 参考内容

1. [快速上手](https://vuepress.vuejs.org/zh/guide/getting-started.html)
