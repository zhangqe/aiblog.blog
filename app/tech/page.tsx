import { TreeNavigation } from '@/components/TreeNavigation';
import { siteMap } from '@/types/page';
import Link from 'next/link';

export default function TechPage() {
  const techNode = siteMap.children?.find(node => node.id === 'tech');

  if (!techNode) {
    return <div>页面不存在</div>;
  }

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-4">
          <Link href="/" className="text-blue-500 hover:underline">
            ← 返回首页
          </Link>
        </div>
        <h1 className="text-3xl font-bold mb-8">{techNode.title}</h1>
        <p className="text-gray-600 mb-8">{techNode.description}</p>
        <div className="prose max-w-none">
          <h2>技术文章</h2>
          <p>这里是技术相关的文章和笔记。您可以添加更多的子页面来组织不同类型的技术内容。</p>
          <ul>
            <li>前端开发</li>
            <li>后端开发</li>
            <li>DevOps</li>
            <li>人工智能</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 