# Xargin Blog Archive Extension

Xargin Blog Archive Extension 是一个轻量级的浏览器插件，用于查看 Xargin 博客的文章归档。它提供了一种简便的方式来查看过去的博客文章列表，并支持暗黑模式。

# 截图

<img width="1468" alt="image" src="https://user-images.githubusercontent.com/7698088/235591311-a84765a9-ec13-42e0-8284-546c6fe5cb1e.png">
<img width="1468" alt="image" src="https://user-images.githubusercontent.com/7698088/235591324-3334af2b-607e-4056-9d80-5e6ca72f02c8.png">


## 功能

- 在 Xargin 博客页面上添加文章归档链接
- 支持暗黑模式
- 点击文章标题以访问相应文章

## 安装

1. 克隆或下载此 GitHub 仓库到本地。
2. 打开浏览器的扩展程序管理页面。
3. 启用“开发者模式”。
4. 点击“加载已解压的扩展程序”，选择本地仓库的文件夹。

## 使用方法

1. 在安装插件后，访问 https://xargin.com。
2. 在博客页面的上方导航栏中，点击 "Archive"。
3. 在弹出的页面中，浏览文章归档。
4. 点击文章标题以访问相应文章。

## 原理

先通过[qcrao/xargin-blog-crawler](https://github.com/qcrao/xargin-blog-crawler)爬虫从 Xargin 博客中抓取文章。爬虫每隔1小时运行一次，将抓取到的文章写入一个 Markdown 文件。此文件托管在 Netlify 上部署的站点上。

当用户点击 "Archive" 时，插件会请求 Netlify 上的站点以获取 Markdown 文件。接着，插件使用 Showdown 库将 Markdown 文档转换为 HTML，并将其插入到 archive 页面中以展示历史文章列表。
