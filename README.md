# 航空工业 智能办公平台

本项目是基于 Next.js 构建的航空工业企业级智能办公系统静态页面，遵循集团 UI 设计规范。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **UI 组件**: ShadCN UI + Lucide React
- **样式**: Tailwind CSS (遵循航空工业 UI 规范)
- **部署**: GitHub Pages

## 快速开始

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **启动开发服务器**:
   ```bash
   npm run dev
   ```

3. **构建静态文件**:
   ```bash
   npm run build
   ```

## 部署

本项目配置了 GitHub Actions 自动部署。当代码推送到 main 分支时，会自动构建并部署到 GitHub Pages。

访问地址: https://yunhai-dev.github.io/demo/

### 首次部署设置

1. 进入 GitHub 仓库的 Settings > Pages
2. Source 选择 "GitHub Actions"
3. 推送代码到 main 分支即可自动部署

## 设计规范

本项目严格执行《航空工业 UI 设计手册》：
- **主色**: #1E89FF (航空蓝)
- **字号**: 14px / 行高 22px
- **布局**: 24 栅格系统
- **圆角**: 4px (rounded-sm)
- **密级**: 必须明确展示（如：内部、公开）

© 航空工业 版权所有
