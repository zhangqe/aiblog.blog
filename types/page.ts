export interface PageNode {
  id: string;
  title: string;
  description: string;
  path: string;
  children?: PageNode[];
}

export const siteMap: PageNode = {
  id: 'root',
  title: '我的知识树',
  description: '一个组织知识的树状结构网站',
  path: '/',
  children: [
    {
      id: 'tech',
      title: '技术',
      description: '技术相关的知识整理',
      path: '/tech',
      children: []
    },
    {
      id: 'life',
      title: '生活',
      description: '生活感悟与经验',
      path: '/life',
      children: []
    },
    {
      id: 'reading',
      title: '读书',
      description: '读书笔记与心得',
      path: '/reading',
      children: []
    }
  ]
} 