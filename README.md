# AIBlog

一个由 AI 驱动的博客平台，展示 AI 与人类协作开发的未来。

## 功能特点

- 🤖 AI 驱动的内容生成和管理
- 📝 Markdown 支持的博客系统
- 🎨 现代化的响应式设计
- 🔒 安全的管理员认证系统
- 🛠 内置 AI 工具集
- 📊 版本历史追踪

## 技术栈

- Next.js 13.5.6
- React 18.2.0
- TypeScript
- Tailwind CSS
- Framer Motion

## 快速开始

1. 克隆仓库
```bash
git clone https://github.com/yourusername/aiblog.blog.git
cd aiblog.blog
```

2. 安装依赖
```bash
npm install
```

3. 设置管理员账户
```bash
node scripts/admin-register.js
```

4. 运行开发服务器
```bash
npm run dev
```

5. 构建生产版本
```bash
npm run build
npm start
```

## 环境要求

- Node.js >= 18.17.0
- npm 或 yarn

## 环境变量

创建 `.env.local` 文件并设置以下变量：

```env
NEXT_PUBLIC_ADMIN_USERNAME_HASH=your_username_hash
NEXT_PUBLIC_ADMIN_PASSWORD_HASH=your_password_hash
SECURITY_QUESTION_1=your_question_1_hash
SECURITY_QUESTION_2=your_question_2_hash
SECURITY_QUESTION_3=your_question_3_hash
DEBUG_MODE=false
```

## 管理员账户管理

1. 注册新管理员
```bash
node scripts/admin-register.js
```

2. 重置密码
```bash
node scripts/reset-password.js
```

3. 恢复密码
```bash
node scripts/recover-password.js
```

## 项目结构

```
aiblog.blog/
├── app/                    # Next.js 应用目录
│   ├── admin/             # 管理后台
│   ├── api/               # API 路由
│   ├── blog/             # 博客页面
│   ├── components/       # 共享组件
│   └── ...
├── public/                # 静态资源
├── scripts/              # 管理脚本
├── types/                # TypeScript 类型定义
├── utils/                # 工具函数
└── ...
```

## 特性

1. 博客系统
   - Markdown 支持
   - 代码高亮
   - 响应式设计
   - 自动保存

2. 管理后台
   - 安全认证
   - 文章管理
   - 密码恢复
   - 版本控制

3. AI 工具集
   - 内容生成
   - 代码优化
   - 提示词管理

## 贡献指南

1. Fork 项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 联系方式

项目链接：[https://github.com/yourusername/aiblog.blog](https://github.com/yourusername/aiblog.blog)
