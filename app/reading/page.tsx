import { TreeNavigation } from '@/components/TreeNavigation';
import { siteMap } from '@/types/page';
import Link from 'next/link';

export default function ReadingPage() {
  const readingNode = siteMap.children?.find(node => node.id === 'reading');

  if (!readingNode) {
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
        <h1 className="text-3xl font-bold mb-8">{readingNode.title}</h1>
        <p className="text-gray-600 mb-8">{readingNode.description}</p>
        <div className="prose max-w-none">
          <h2>读书笔记</h2>
          <p>这里收集了各类读书笔记和心得体会，包括：</p>
          <ul>
            <li>文学作品</li>
            <li>技术书籍</li>
            <li>哲学思考</li>
            <li>历史研究</li>
          </ul>
        </div>
      </div>
    </main>
  );
}
 