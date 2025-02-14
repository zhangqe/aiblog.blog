import { TreeNavigation } from '@/components/TreeNavigation';
import { siteMap } from '@/types/page';
import Link from 'next/link';

export default function LifePage() {
  const lifeNode = siteMap.children?.find(node => node.id === 'life');

  if (!lifeNode) {
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
        <h1 className="text-3xl font-bold mb-8">{lifeNode.title}</h1>
        <p className="text-gray-600 mb-8">{lifeNode.description}</p>
        <div className="prose max-w-none">
          <h2>生活随笔</h2>
          <p>这里记录生活中的点点滴滴，包括：</p>
          <ul>
            <li>旅行见闻</li>
            <li>生活感悟</li>
            <li>美食探索</li>
            <li>兴趣爱好</li>
          </ul>
        </div>
      </div>
    </main>
  );
} 