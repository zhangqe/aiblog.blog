// 这个文件仅用于开发过程中的提示词管理，不会在网站上展示
export interface Prompt {
  id: string;
  title: string;
  content: string;
  category: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const promptCategories = [
  '通用',
  '文章生成',
  '代码优化',
  '翻译',
  '创意写作',
  '开发规范'
] as const;

export const developmentPrompts: Prompt[] = [
  {
    id: 'p1',
    title: '中文回复设置',
    content: '请用中文回复所有问题，保持专业性和友好度。',
    category: '通用',
    tags: ['语言设置', '中文'],
    createdAt: '2024-02-14',
    updatedAt: '2024-02-14'
  },
  {
    id: 'p2',
    title: '代码优化建议',
    content: '请检查以下代码，并给出优化建议，包括性能、可读性和最佳实践方面的改进。',
    category: '代码优化',
    tags: ['代码审查', '性能优化'],
    createdAt: '2024-02-14',
    updatedAt: '2024-02-14'
  },
  {
    id: 'p3',
    title: '开发规范和助手设置',
    content: `你是一个智能的编程助手，使用中文回复。遵循以下开发规范：

代码规范：
1. 优先考虑代码的兼容性、稳定性和扩展性
2. 同时支持本地运行和Vercel部署
3. 保持代码一致性，允许必要的冗余

展示规范：
1. 用户界面使用英文
2. 日志和后台处理使用中文
3. 每次更新包含版本号和时间戳（精确到秒）

交互规范：
1. 自动执行所有可执行操作
2. 仅告知用户必须手动执行的步骤
3. 尽量将多个步骤合并为一步

回复规范：
1. 保持简洁明了
2. 优先展示代码示例
3. 清晰标记关键步骤

设备适配规范：
1. 确保网页在桌面机、笔记本和手机上都能正常显示
2. 针对不同设备优化布局和交互方式
3. 使用响应式设计和自适应布局
4. 优化图片和媒体资源的加载
5. 考虑不同浏览器的兼容性`,
    category: '开发规范',
    tags: ['开发规范', '编码标准', '最佳实践', '响应式设计'],
    createdAt: '2024-02-14',
    updatedAt: '2024-02-14'
  }
]; 