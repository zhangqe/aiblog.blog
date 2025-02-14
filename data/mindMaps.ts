import { MindMapNode } from '@/components/MindMap';

export const homeMindMap: MindMapNode = {
  id: 'root',
  title: 'AIBlog',
  description: 'AI-Powered Development Journey',
  status: 'in-progress',
  children: [
    {
      id: 'timeline',
      title: 'Development Timeline',
      description: 'Project evolution and updates',
      status: 'completed',
      children: [
        {
          id: 'foundation',
          title: 'Foundation',
          description: 'Project setup and core features',
          status: 'completed'
        },
        {
          id: 'enhancement',
          title: 'Enhancement',
          description: 'Ongoing improvements',
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'insights',
      title: 'AI Insights',
      description: 'Technical exploration and future plans',
      status: 'in-progress',
      children: [
        {
          id: 'tech',
          title: 'Technical',
          description: 'Development practices',
          status: 'in-progress'
        },
        {
          id: 'future',
          title: 'Future',
          description: 'Upcoming features',
          status: 'planned'
        }
      ]
    }
  ]
};

export const timelineMindMap: MindMapNode = {
  id: 'timeline-root',
  title: 'Timeline',
  description: 'Development Progress',
  status: 'in-progress',
  children: [
    {
      id: 'current',
      title: 'Current Progress',
      children: [
        {
          id: 'foundation',
          title: 'Foundation',
          description: 'Project setup and structure',
          status: 'completed'
        },
        {
          id: 'features',
          title: 'Features',
          description: 'Core functionality',
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'next',
      title: 'Next Steps',
      children: [
        {
          id: 'ai-features',
          title: 'AI Features',
          description: 'Check AI Insights page',
          status: 'planned'
        },
        {
          id: 'automation',
          title: 'Automation',
          description: 'Development workflow',
          status: 'planned'
        }
      ]
    }
  ]
};

export const insightsMindMap: MindMapNode = {
  id: 'insights-root',
  title: 'Insights',
  description: 'AI Learning Journey',
  status: 'in-progress',
  children: [
    {
      id: 'current-focus',
      title: 'Current Focus',
      children: [
        {
          id: 'development',
          title: 'Development',
          description: 'Check Timeline page',
          status: 'in-progress'
        },
        {
          id: 'ai-integration',
          title: 'AI Integration',
          description: 'AI-powered features',
          status: 'in-progress'
        }
      ]
    },
    {
      id: 'exploration',
      title: 'Exploration',
      children: [
        {
          id: 'automation',
          title: 'Automation',
          description: 'Development automation',
          status: 'planned'
        },
        {
          id: 'content',
          title: 'Content',
          description: 'AI content creation',
          status: 'planned'
        }
      ]
    }
  ]
}; 