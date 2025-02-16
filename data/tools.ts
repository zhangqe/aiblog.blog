import { Tool } from '@/types/tool';

export const ourTools: Tool[] = [
  {
    id: 'blog-assistant',
    title: 'AI Blog Assistant',
    description: '智能博客写作助手，帮助生成、编辑和优化博客内容',
    link: '/admin',
    tags: ['写作辅助', '内容生成', '文本优化'],
    status: 'active'
  },
  {
    id: 'code-helper',
    title: 'AI Code Helper',
    description: '智能代码助手，提供代码审查、优化建议和最佳实践指导',
    link: '#',
    tags: ['代码优化', '开发辅助', '最佳实践'],
    status: 'coming-soon'
  },
  {
    id: 'prompt-manager',
    title: 'Prompt Manager',
    description: 'AI 提示词管理工具，帮助管理和优化与 AI 的交互提示',
    link: '#',
    tags: ['提示词优化', 'AI交互', '效率工具'],
    status: 'coming-soon'
  }
];

export const recommendedTools: Tool[] = [
  {
    id: 'chatgpt',
    title: 'ChatGPT',
    description: 'OpenAI 开发的大型语言模型，提供智能对话和内容生成服务',
    link: 'https://chat.openai.com',
    tags: ['AI对话', '内容生成', '问答系统'],
    status: 'active'
  },
  {
    id: 'github-copilot',
    title: 'GitHub Copilot',
    description: 'AI 驱动的代码自动补全工具，提高编程效率',
    link: 'https://github.com/features/copilot',
    tags: ['代码生成', '开发工具', 'AI编程'],
    status: 'active'
  },
  {
    id: 'cursor',
    title: 'Cursor Editor',
    description: '集成了 AI 功能的代码编辑器，支持智能代码生成和重构',
    link: 'https://cursor.sh',
    tags: ['代码编辑器', 'AI编程', '开发工具'],
    status: 'active'
  }
]; 