# layabox-project-template

LayaBox 游戏项目模板

TODO:

-   微信小游戏打包
-   整理 scripts/webpack-res-version.js

## 介绍

1. 技术栈

tsc 编译(无 ts-loader)，webpack 打包，HtmlWebpackPlugin 插件生成 html。

预览: https://layabox-project-template.pawgame.com/

2. 手机版本支持

Android5.1 & IOS9.0 及以上。

## 使用说明

1. UI 编辑器：

使用 fairyGUI：https://www.fairygui.com/

内置插件说明：https://github.com/daichangxin/gen-package-defines-plugin

2. 开发：

```
npm run dev
```

3. 打包：

```
npm run build
```

4. 打包 manifest 版本

```
npm run build-manifest
```
