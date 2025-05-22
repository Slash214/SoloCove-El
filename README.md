<div align="center">
<h1> vue3-SoloCove-El（element-ui） </h1>
</div>

## 语言

[中文](./README.md) | [English](./README_en.md)

## 演示地址

-   [🎉 vue3.x + Vite4 + TypeScript + Tdesign-Vue-Next（免费商用，支持 PC）](https://github.com/Slash214/SoloCove-TD.git)
-   [🎉 vue3.x + Vite4 + TypeScript + Element-Plus（免费商用，支持 PC）](https://github.com/Slash214/SoloCove-El.git)

## 🌱 vue3.x 下载

```bash
# 备注
项目使用的pnpm包管理
如你未安装pnpm 可以使用npm i -g pnpm 安装


# 克隆项目
git clone -b https://github.com/Slash214/SoloCove-El.git
# 进入项目目录
cd vue3-SoloCove-El
# 安装依赖
pnpm i
# 本地开发 启动项目
pnpm run dev
```

## 鸣谢

| Project                                                      |
| ------------------------------------------------------------ |
| [vue](https://github.com/vuejs/vue)                          |
| [element-plus](https://github.com/element-plus/element-plus) |
| [vite](https://cn.vitejs.dev/guide/)                         |
| [mock](https://github.com/nuysoft/Mock)                      |
| [axios](https://github.com/axios/axios)                      |

## 优势及注意事项

vue3-SoloCove 对比其他开源 admin 框架有如下优势:

1. 简单易上手 集成基础模板可以快速开发
1. 支持前端控制路由权限 intelligence、后端控制路由权限 all 模式
1. 提供 功能模块 如 xlsx，word，等表格导出集成功能（未开发）
1. 支持 scss 自动排序，eslint 自动修复
1. axios 精细化封装，支持多数据源、多成功 code 数组，支持 application/json;charset=UTF-8、application/x-www-form-urlencoded;charset=UTF-8 多种传参方式
1. 支持登录 RSA 加密
1. 个人后台项目

# ✅ 升级内容
Vite：升级至 ^6.3.5，以获得更快的构建速度和更好的开发体验。
TypeScript：升级至 ^5.8.3，以支持最新的语言特性和更好的类型检查。
Vue：升级至 ^3.5.14，确保与其他依赖项的兼容性。
Element Plus：升级至 ^2.9.10，获取最新的组件和修复。
Tailwind CSS：引入 ^4.1.7，以实现更高效的样式管理。
模块解析：tsconfig.json 中的 moduleResolution 设置为 node16，以支持现代模块解析。

# ⚙️ 配置调整
Vite 配置：更新 vite.config.ts，以适应 Vite 6 的新特性和最佳实践。
Tailwind CSS 集成：在主样式文件中使用 @import "tailwindcss"; 引入 Tailwind 样式。

路径别名：确保在 tsconfig.json 和 vite.config.ts 中一致配置路径别名，以避免模块解析问题。

# 📝 注意事项
Node.js 版本：确保使用 Node.js 18 或更高版本，以兼容 Vite 6 的要求。
插件兼容性：升级后，某些插件可能需要更新以兼容 Vite 6。请检查并更新相关插件。
模块导入：在使用 ES 模块时，可能需要显式添加文件扩展名（如 .js）以确保正确解析。
vue3-SoloCove-Element-UI 使用注意事项:
1. 项目默认使用 lf 换行符而非 crlf 换行符，新建文件时请注意选择文件换行符
2. 项目使用的是要求最宽泛的 MIT 开源协议，保留 MIT 开源协议即可免费商用
3. 个人开发项目还在维护开发，欢迎反馈问题
4. 没有封装过多的组件或其他，就是基础的框架，非常方便二次修改，同时色彩也是我随便配置的，改动也是很方便的。
5. 图标使用的就是 Element-plus 的图标

```


## 适合人群
- 正在以及想使用 element-ui/element-plus 开发，前端开发经验 1 年+。
- 熟悉 Vue.js 技术栈，使用它开发过几个实际项目。
- 也同时适合想找一个方便的后台快速开发的


## last
个人开发模板项目，后续持续维护！
```
