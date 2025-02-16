# AIBlog 代码说明手册

## 目录

1. [项目结构](#项目结构)
2. [代码规范](#代码规范)
3. [开发指南](#开发指南)
4. [API 文档](#api-文档)
5. [组件库](#组件库)
6. [工具函数](#工具函数)
7. [类型定义](#类型定义)
8. [安全指南](#安全指南)

## 项目结构

```
aiblog.blog/
├── app/                    # Next.js 应用目录
│   ├── admin/             # 管理后台
│   │   ├── login/        # 登录页面
│   │   └── page.tsx      # 管理面板
│   ├── api/              # API 路由
│   │   ├── blog/        # 博客相关 API
│   │   └── upload/      # 文件上传 API
│   ├── blog/            # 博客页面
│   ├── components/      # 页面组件
│   └── layout.tsx       # 全局布局
├── components/           # 共享组件
│   ├── AdminAuth.tsx    # 管理员认证
│   ├── BlogEditor.tsx   # 博客编辑器
│   ├── Layout.tsx       # 通用布局
│   └── ...
├── public/              # 静态资源
│   └── uploads/        # 上传文件目录
├── scripts/            # 管理脚本
│   ├── admin-register.js   # 管理员注册
│   ├── reset-password.js   # 密码重置
│   └── recover-password.js # 密码恢复
├── types/              # TypeScript 类型定义
├── utils/             # 工具函数
└── lib/              # 核心库函数
```

## 代码规范

### 1. 文件命名规范

- 组件文件：使用 PascalCase，如 `BlogPost.tsx`
- 工具函数文件：使用 camelCase，如 `crypto.ts`
- 类型定义文件：使用 camelCase，如 `blog.ts`
- 样式文件：与组件同名，如 `BlogPost.module.css`

### 2. 代码风格

```typescript
// 组件定义
interface ComponentProps {
  prop1: string;
  prop2?: number;
}

export function Component({ prop1, prop2 }: ComponentProps) {
  // ...
}

// 工具函数
export const utilFunction = (param: Type): ReturnType => {
  // ...
};
```

### 3. 注释规范

```typescript
/**
 * 组件描述
 * @param {string} prop1 - 参数描述
 * @param {number} [prop2] - 可选参数描述
 * @returns {JSX.Element} 返回值描述
 */
```

## 开发指南

### 1. 环境配置

```bash
# 安装依赖
npm install

# 开发环境运行
npm run dev

# 生产环境构建
npm run build
npm start
```

### 2. 新功能开发流程

1. 创建功能分支
2. 实现功能代码
3. 编写/更新测试
4. 提交代码审查
5. 合并到主分支

## API 文档

### 博客 API

#### 获取博客列表
```typescript
GET /api/blog
Response: BlogPost[]
```

#### 获取单篇博客
```typescript
GET /api/blog/[id]
Response: BlogPost
```

#### 更新博客
```typescript
POST /api/blog/update
Body: BlogPost
Response: { message: string, post: BlogPost }
```

#### 删除博客
```typescript
DELETE /api/blog/delete?id=[id]
Response: { message: string, success: boolean }
```

## 组件库

### 1. 布局组件

#### Layout
```typescript
interface LayoutProps {
  children: React.ReactNode;
}
```

### 2. 博客组件

#### BlogPost
```typescript
interface BlogPostProps {
  post: BlogPost;
  index: number;
}
```

### 3. 管理组件

#### AdminAuth
```typescript
interface AdminAuthProps {
  children: React.ReactNode;
}
```

## 工具函数

### 1. 加密工具 (utils/crypto.ts)

```typescript
// 密码哈希
export const hashPassword = (text: string): string

// 加密
export const encrypt = (text: string): string

// 解密
export const decrypt = (ciphertext: string): string
```

### 2. 日志工具 (utils/logger.ts)

```typescript
export const logger = {
  debug: (...args: any[]) => void,
  info: (...args: any[]) => void,
  error: (...args: any[]) => void
}
```

## 类型定义

### 1. 博客类型 (types/blog.ts)

```typescript
export interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  author: string;
  date: string;
  tags: string[];
  category: string;
  readingTime: string;
  coverImage?: string;
}
```

### 2. 工具类型 (types/tool.ts)

```typescript
export interface Tool {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  status: 'active' | 'coming-soon';
}
```

## 安全指南

### 1. 密码处理

- 使用 SHA-256 进行密码哈希
- 不在代码中存储明文密码
- 使用环境变量存储敏感信息

### 2. 文件上传

- 验证文件类型
- 限制文件大小
- 生成唯一文件名
- 使用安全的存储路径

### 3. 管理员认证

- 实现登录超时机制
- 限制登录尝试次数
- 提供密码重置功能
- 使用安全问题进行身份验证

## 最佳实践

1. 代码组织
   - 保持组件的单一职责
   - 抽取可复用的逻辑到 hooks
   - 使用类型定义确保类型安全

2. 性能优化
   - 使用适当的缓存策略
   - 实现懒加载
   - 优化图片加载
   - 减少不必要的重渲染

3. 错误处理
   - 实现全局错误边界
   - 统一的错误日志记录
   - 友好的错误提示

4. 测试策略
   - 编写单元测试
   - 实现集成测试
   - 进行性能测试

## 部署指南

1. 准备工作
   - 确保环境变量配置完整
   - 运行构建命令
   - 检查依赖更新

2. 部署步骤
   - 配置 Vercel 部署
   - 设置环境变量
   - 配置域名
   - 启用 HTTPS 