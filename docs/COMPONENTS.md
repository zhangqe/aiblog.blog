# AIBlog 组件文档

## 目录

1. [布局组件](#布局组件)
2. [博客组件](#博客组件)
3. [管理组件](#管理组件)
4. [通用组件](#通用组件)

## 布局组件

### Layout

全局布局组件，提供统一的页面结构和导航。

```typescript
import { Layout } from '@/components/Layout';

interface LayoutProps {
  children: React.ReactNode;
}

// 使用示例
<Layout>
  <YourContent />
</Layout>
```

#### 特性
- 响应式导航栏
- 自动处理返回首页
- 页面切换动画
- 统一的页脚显示

## 博客组件

### BlogPost

博客文章展示组件，支持列表和详情两种模式。

```typescript
import { BlogPost, BlogPostContent } from '@/components/BlogPost';

// 列表模式
interface BlogPostCardProps {
  post: BlogPost;
  index: number;
}

// 详情模式
interface BlogPostContentProps {
  post: BlogPost;
}

// 使用示例
<BlogPostCard post={post} index={0} />
<BlogPostContent post={post} />
```

#### 特性
- Markdown 渲染
- 代码高亮
- 响应式图片
- 阅读时间计算

### BlogEditor

博客编辑器组件，支持 Markdown 编辑和预览。

```typescript
import { BlogEditor } from '@/components/BlogEditor';

interface BlogEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
  onSave?: () => void;
}

// 使用示例
<BlogEditor
  post={currentPost}
  onClose={() => setIsEditing(false)}
  onSave={handleSave}
/>
```

#### 特性
- 实时预览
- 图片上传
- 自动保存
- 标签管理

## 管理组件

### AdminAuth

管理员认证组件，处理登录状态和会话管理。

```typescript
import { AdminAuth } from '@/components/AdminAuth';

interface AdminAuthProps {
  children: React.ReactNode;
}

// 使用示例
<AdminAuth>
  <AdminPanel />
</AdminAuth>
```

#### 特性
- 会话超时检测
- 自动重定向
- 登录状态维护

### AdminBlogList

管理员博客列表组件，提供文章管理功能。

```typescript
import { AdminBlogList } from '@/components/AdminBlogList';

interface AdminBlogListProps {
  onEditPost: (post: BlogPost) => void;
}

// 使用示例
<AdminBlogList onEditPost={handleEdit} />
```

#### 特性
- 文章编辑
- 删除确认
- 状态更新
- 自动刷新

## 通用组件

### TreeNavigation

树形导航组件，用于展示层级结构。

```typescript
import { TreeNavigation } from '@/components/TreeNavigation';

interface TreeNavigationProps {
  node: PageNode;
  level?: number;
}

// 使用示例
<TreeNavigation node={siteMap} level={0} />
```

#### 特性
- 可折叠节点
- 层级显示
- 动态加载

### MindMap

思维导图组件，用于可视化项目结构。

```typescript
import { MindMap } from '@/components/MindMap';

interface MindMapProps {
  data: MindMapNode;
  level?: number;
  defaultExpanded?: boolean;
}

// 使用示例
<MindMap data={versionMindMap} defaultExpanded={true} />
```

#### 特性
- 节点展开/折叠
- 动画效果
- 状态标识

### MarkdownContent

Markdown 内容渲染组件。

```typescript
import MarkdownContent from '@/app/components/MarkdownContent';

interface MarkdownContentProps {
  content: string;
}

// 使用示例
<MarkdownContent content={markdownText} />
```

#### 特性
- 语法高亮
- 自定义样式
- 响应式图片
- 表格支持

### LegalDisclaimer

法律声明组件。

```typescript
import { LegalDisclaimer } from '@/components/LegalDisclaimer';

// 使用示例
<LegalDisclaimer />
```

#### 特性
- 可折叠显示
- 自动更新时间
- 响应式布局

## 最佳实践

1. 组件复用
   - 提取共用逻辑到独立组件
   - 使用 Props 控制组件行为
   - 保持组件的单一职责

2. 性能优化
   - 使用 memo 避免不必要的重渲染
   - 实现懒加载
   - 优化状态管理

3. 错误处理
   - 实现错误边界
   - 提供加载状态
   - 友好的错误提示

4. 可访问性
   - 添加适当的 ARIA 标签
   - 确保键盘导航
   - 提供合适的颜色对比度 