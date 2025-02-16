export interface Version {
  id: string;
  version: string;
  date: string;
  title: string;
  description: string;
  features: string[];
  status: 'completed' | 'in-progress' | 'planned';
  relatedPages?: string[];
  category: 'foundation' | 'feature' | 'enhancement';
  screenshot?: string;
}

export const versionHistory: Version[] = [
  {
    id: 'v0.0.1',
    version: '0.0.1',
    date: '2024-02-14',
    title: 'Initial Project Setup',
    description: 'Created the foundation for an AI-powered blog platform',
    category: 'foundation',
    status: 'completed',
    features: [
      'Next.js project initialization',
      'Basic project structure',
      'Tailwind CSS configuration',
      'Responsive layout implementation'
    ],
    relatedPages: ['/']
  },
  {
    id: 'v0.0.2',
    version: '0.0.2',
    date: '2024-02-14',
    title: 'Version History Feature',
    description: 'Added version tracking and timeline display',
    category: 'feature',
    status: 'completed',
    features: [
      'Version history page',
      'Interactive timeline cards',
      'Animation effects',
      'Dynamic version loading'
    ],
    relatedPages: ['/versions']
  },
  {
    id: 'v0.0.3',
    version: '0.0.3',
    date: '2024-02-14',
    title: 'UI Enhancements & Bug Fixes',
    description: 'Improved user interface and fixed navigation issues',
    category: 'enhancement',
    status: 'completed',
    features: [
      'Fixed duplicate navigation links',
      'Enhanced version filtering system',
      'Improved responsive design',
      'Added animation transitions',
      'Optimized page loading performance'
    ],
    relatedPages: ['/', '/versions']
  },
  {
    id: 'v0.0.4',
    version: '0.0.4',
    date: '2024-02-15',
    title: 'Blog Management System',
    description: '完成博客文章的增删改查功能',
    category: 'feature',
    status: 'completed',
    features: [
      '实现博客文章的创建功能',
      '实现博客文章的编辑功能',
      '实现博客文章的删除功能',
      '添加文件系统持久化存储',
      '优化数据刷新机制',
      '修复路由冲突问题',
      '添加 Markdown 编辑器支持',
      '支持图片上传功能'
    ],
    relatedPages: ['/admin', '/blog']
  }
]; 