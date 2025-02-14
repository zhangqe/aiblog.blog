import { TreeNavigation } from '@/components/TreeNavigation';
import { siteMap } from '@/types/page';

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">{siteMap.title}</h1>
        <p className="text-gray-600 mb-8">{siteMap.description}</p>
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <TreeNavigation node={siteMap} />
        </div>
      </div>
    </main>
  );
}
