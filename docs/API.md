# AIBlog API 文档

## 目录

1. [博客 API](#博客-api)
2. [文件上传 API](#文件上传-api)
3. [认证 API](#认证-api)
4. [错误处理](#错误处理)

## 博客 API

### 获取博客列表

获取所有博客文章的列表。

```typescript
GET /api/blog

// 响应
interface Response {
  posts: BlogPost[];
}

// 示例
const response = await fetch('/api/blog', {
  cache: 'no-store',
  headers: {
    'Cache-Control': 'no-cache'
  }
});
const posts = await response.json();
```

### 获取单篇博客

获取指定 ID 的博客文章。

```typescript
GET /api/blog/[id]

// 参数
id: string // 文章 ID

// 响应
interface Response {
  post: BlogPost;
}

// 示例
const response = await fetch(`/api/blog/${postId}`);
const post = await response.json();
```

### 更新博客

创建或更新博客文章。

```typescript
POST /api/blog/update

// 请求体
interface RequestBody {
  id: string;
  title: string;
  description: string;
  content: string;
  author?: string;
  date?: string;
  tags: string[];
  category: string;
  readingTime?: string;
  coverImage?: string;
}

// 响应
interface Response {
  message: string;
  post: BlogPost;
}

// 示例
const response = await fetch('/api/blog/update', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(postData)
});
const result = await response.json();
```

### 删除博客

删除指定 ID 的博客文章。

```typescript
DELETE /api/blog/delete?id=[id]

// 参数
id: string // 文章 ID

// 响应
interface Response {
  message: string;
  success: boolean;
}

// 示例
const response = await fetch(`/api/blog/delete?id=${postId}`, {
  method: 'DELETE'
});
const result = await response.json();
```

## 文件上传 API

### 上传文件

上传图片或其他文件。

```typescript
POST /api/upload

// 请求
FormData with 'file' field

// 响应
interface Response {
  url: string;
  success: boolean;
}

// 示例
const formData = new FormData();
formData.append('file', file);

const response = await fetch('/api/upload', {
  method: 'POST',
  body: formData
});
const result = await response.json();
```

#### 支持的文件类型
- image/jpeg
- image/png
- image/gif
- image/webp

#### 限制
- 最大文件大小：5MB
- 文件名长度：最大 100 字符
- 文件类型：仅支持图片

## 错误处理

所有 API 端点在发生错误时都会返回标准的错误响应：

```typescript
interface ErrorResponse {
  error: string;
  status: number;
}
```

### 常见错误代码

- 400 Bad Request: 请求参数无效
- 401 Unauthorized: 未经授权的访问
- 404 Not Found: 资源不存在
- 500 Internal Server Error: 服务器错误

### 错误处理示例

```typescript
try {
  const response = await fetch('/api/blog');
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }
  const data = await response.json();
} catch (error) {
  console.error('API Error:', error);
}
```

## 最佳实践

### 1. 请求处理

```typescript
// 推荐的请求方式
const fetchData = async () => {
  try {
    setLoading(true);
    const response = await fetch('/api/blog', {
      cache: 'no-store',
      headers: {
        'Cache-Control': 'no-cache'
      }
    });
    if (!response.ok) {
      throw new Error('请求失败');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
    throw error;
  } finally {
    setLoading(false);
  }
};
```

### 2. 错误处理

```typescript
// 统一的错误处理
const handleError = (error: Error) => {
  console.error('API Error:', error);
  // 显示错误提示
  showErrorMessage(error.message);
  // 记录错误日志
  logger.error(error);
};
```

### 3. 数据验证

```typescript
// 请求数据验证
const validateBlogPost = (post: Partial<BlogPost>): boolean => {
  if (!post.title || post.title.length < 3) {
    throw new Error('标题长度不能小于3个字符');
  }
  if (!post.content || post.content.length < 10) {
    throw new Error('内容长度不能小于10个字符');
  }
  return true;
};
```

### 4. 缓存策略

```typescript
// 缓存控制
const fetchWithCache = async (url: string) => {
  const response = await fetch(url, {
    next: {
      revalidate: 60 // 60秒后重新验证
    }
  });
  return response.json();
};
```

## 安全考虑

1. 身份验证
   - 所有管理操作都需要验证
   - 使用会话超时机制
   - 实现请求频率限制

2. 数据验证
   - 验证所有输入数据
   - 过滤特殊字符
   - 限制上传文件大小和类型

3. 错误处理
   - 不暴露敏感信息
   - 记录错误日志
   - 提供友好的错误消息 