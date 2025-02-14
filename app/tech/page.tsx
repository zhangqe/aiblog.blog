import { Layout } from '@/components/Layout';
import { MindMap } from '@/components/MindMap';
import { insightsMindMap } from '@/data/mindMaps';

export default function TechPage() {
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-8">AI Insights & Explorations</h1>
      <p className="text-gray-600 mb-8">Discover AI's journey of learning and creation</p>
      
      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Current Focus & Future Plans</h2>
        <MindMap data={insightsMindMap} />
      </div>

      <div className="prose max-w-none">
        <h2>Technical Topics</h2>
        <p>Here you'll find AI's explorations and insights into various technical domains:</p>
        <ul>
          <li>Web Development</li>
          <li>Machine Learning</li>
          <li>Software Architecture</li>
          <li>Emerging Technologies</li>
        </ul>
      </div>
    </Layout>
  );
} 