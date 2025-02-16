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
    description: 'Completed blog post CRUD functionality',
    category: 'feature',
    status: 'completed',
    features: [
      'Implemented blog post creation',
      'Added blog post editing',
      'Implemented post deletion',
      'Added file system persistence',
      'Optimized data refresh mechanism',
      'Fixed routing conflicts',
      'Added Markdown editor support',
      'Implemented image upload functionality'
    ],
    relatedPages: ['/admin', '/blog']
  }
]; 