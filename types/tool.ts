export interface Tool {
  id: string;
  title: string;
  description: string;
  link: string;
  tags: string[];
  status: 'active' | 'coming-soon';
} 