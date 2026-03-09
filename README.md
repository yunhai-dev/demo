# 航空工业 智能办公平台

本项目是基于 Next.js 和 Genkit 构建的航空工业企业级智能办公系统，遵循集团 UI 设计规范，集成了 AI 知识库与对话交互功能。

## 技术栈

- **框架**: Next.js 15 (App Router)
- **AI 引擎**: Genkit + Gemini 2.5
- **UI 组件**: ShadCN UI + Lucide React
- **样式**: Tailwind CSS (遵循航空工业 UI 规范)

## 快速开始

1. **安装依赖**:
   ```bash
   npm install
   ```

2. **配置环境变量**:
   在 `.env` 文件中配置您的 `GEMINI_API_KEY`。

3. **启动开发服务器**:
   ```bash
   npm run dev
   ```

## 代码提交指南

若要将项目推送至指定的 GitHub 仓库，请在终端执行以下命令：

1. **初始化本地仓库**:
   ```bash
   git init
   ```

2. **添加所有文件到暂存区**:
   ```bash
   git add .
   ```

3. **提交更改**:
   ```bash
   git commit -m "Initial commit: 航空工业智能办公平台重构完成"
   ```

4. **关联远程仓库**:
   ```bash
   git remote add origin https://github.com/yunhai-dev/demo.git
   ```

5. **切换至主分支并推送**:
   ```bash
   git branch -M main
   git push -u origin main
   ```

## 设计规范

本项目严格执行《航空工业 UI 设计手册》：
- **主色**: #1E89FF (航空蓝)
- **字号**: 14px / 行高 22px
- **布局**: 24 栅格系统
- **圆角**: 4px (rounded-sm)
- **密级**: 必须明确展示（如：内部、公开）

© 航空工业 版权所有
