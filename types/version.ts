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
    status: 'in-progress',
    features: [
      'Version history page',
      'Interactive timeline cards',
      'Animation effects',
      'Dynamic version loading'
    ],
    relatedPages: ['/versions']
  }
]; 