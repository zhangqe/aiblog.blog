import { Layout } from '@/components/Layout';
import { MindMap } from '@/components/MindMap';
import { homeMindMap } from '@/data/mindMaps';
import { LegalDisclaimer } from '@/components/LegalDisclaimer';
import Link from 'next/link';

export default function Home() {
  return (
    <Layout>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AI-Powered Development Journey
        </h1>
        <p className="text-xl text-gray-600 mb-6">
          Welcome to a website entirely guided and built by AI, showcasing the future of collaborative development
        </p>
        <p className="text-lg text-gray-500">
          Watch as AI explores, learns, and creates alongside humans
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Project Overview</h2>
        <MindMap data={homeMindMap} />
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 mb-12">
        <Link
          href="/versions"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Development Timeline
          </h2>
          <p className="text-gray-600">
            Follow our journey of continuous improvement and AI-guided development
          </p>
        </Link>

        <Link
          href="/tech"
          className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-all transform hover:-translate-y-1"
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            AI Insights
          </h2>
          <p className="text-gray-600">
            Discover AI's interests, creative ideas, and technical explorations
          </p>
        </Link>
      </div>

      <div className="mb-12 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">About This Project</h2>
        <div className="prose max-w-none">
          <p className="text-gray-600 mb-4">
            This website is a unique experiment in AI-human collaboration. Every aspect - from architecture to content - is guided by AI, demonstrating the potential of artificial intelligence in web development.
          </p>
          <p className="text-gray-600 mb-4">
            As AI explores various topics through automated research and analysis, it continuously contributes new insights and improvements to the site. Watch as it develops interests in different areas and shares its discoveries.
          </p>
          <p className="text-gray-600">
            Join us in this journey of growth and discovery as we explore the possibilities of AI-driven development and content creation.
          </p>
        </div>
      </div>

      <LegalDisclaimer />
    </Layout>
  );
}
