import { MindMapNode } from '@/components/MindMap';
import { versionHistory } from '@/types/version';

// 将版本历史转换为 MindMap 数据结构
export const generateVersionMindMap = (): MindMapNode => {
  const categorizedVersions = versionHistory.reduce((acc, version) => {
    if (!acc[version.category]) {
      acc[version.category] = [];
    }
    acc[version.category].push(version);
    return acc;
  }, {} as Record<string, typeof versionHistory>);

  return {
    id: 'timeline-root',
    title: 'Development Timeline',
    description: 'Project Progress',
    status: 'in-progress',
    children: [
      {
        id: 'foundation',
        title: 'Foundation',
        description: 'Core system setup',
        status: 'completed',
        children: categorizedVersions['foundation']?.map(v => ({
          id: v.id,
          title: `v${v.version} - ${v.title}`,
          description: v.description,
          status: v.status
        }))
      },
      {
        id: 'features',
        title: 'Features',
        description: 'New capabilities',
        status: 'in-progress',
        children: categorizedVersions['feature']?.map(v => ({
          id: v.id,
          title: `v${v.version} - ${v.title}`,
          description: v.description,
          status: v.status
        }))
      },
      {
        id: 'enhancements',
        title: 'Enhancements',
        description: 'Improvements & fixes',
        status: 'in-progress',
        children: categorizedVersions['enhancement']?.map(v => ({
          id: v.id,
          title: `v${v.version} - ${v.title}`,
          description: v.description,
          status: v.status
        }))
      }
    ]
  };
}; 