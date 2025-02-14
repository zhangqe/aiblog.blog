export interface PageNode {
  id: string;
  title: string;
  description: string;
  path: string;
  children?: PageNode[];
}

export const siteMap: PageNode = {
  id: 'root',
  title: 'AIBlog',
  description: 'An AI-powered blog exploring the future of technology',
  path: '/',
  children: [
    {
      id: 'tech',
      title: 'AI Insights',
      description: 'Technical explorations and discoveries',
      path: '/tech',
      children: []
    },
    {
      id: 'versions',
      title: 'Development Timeline',
      description: 'Project evolution and updates',
      path: '/versions',
      children: []
    }
  ]
} 