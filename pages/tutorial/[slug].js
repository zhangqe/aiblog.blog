import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft, FaRobot } from 'react-icons/fa';

export default function Tutorial() {
  const router = useRouter();
  const { slug } = router.query;
  const [tool, setTool] = useState(null);
  const [windowHeight, setWindowHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  useEffect(() => {
    // 获取窗口高度
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    // 初始化和监听窗口大小变化
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);

    if (!slug) return;

    // 加载工具数据
    const savedTools = localStorage.getItem('tools');
    if (savedTools) {
      const tools = JSON.parse(savedTools);
      const currentTool = tools.find(
        tool => tool.name.toLowerCase().replace(/ /g, '-') === slug
      );

      if (currentTool) {
        setTool(currentTool);
      }
    }

    return () => window.removeEventListener('resize', updateWindowHeight);
  }, [slug]);

  // 计算内容缩放比例
  const calculateScale = () => {
    if (contentHeight && windowHeight) {
      return Math.min(1, windowHeight / contentHeight);
    }
    return 1;
  };

  if (!tool) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
      <Head>
        <title>{tool.name} Tutorial - Hello AI Blog</title>
        <meta name="description" content={`Learn how to use ${tool.name}`} />
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LF0FS7HRZD"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LF0FS7HRZD');
          `
        }} />
      </Head>

      <main 
        className="min-h-screen"
        ref={el => {
          if (el) {
            setContentHeight(el.getBoundingClientRect().height);
          }
        }}
        style={{
          transform: `scale(${calculateScale()})`,
          transformOrigin: 'top center'
        }}
      >
        <div className="container mx-auto px-4 py-6">
          {/* 导航栏 */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link 
                href="/tools"
                className="text-white hover:text-blue-400 transition-colors duration-300 mr-4"
              >
                <FaArrowLeft className="text-2xl" />
              </Link>
              <h1 className="text-4xl font-bold text-white">{tool.name} Tutorial</h1>
            </div>
            <a
              href={tool.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <FaRobot className="mr-2" />
              Visit Tool
            </a>
          </div>

          {/* 教程内容 */}
          <article className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
            {tool.tutorial.image && (
              <div className="mb-8">
                <img 
                  src={tool.tutorial.image} 
                  alt={`${tool.name} Tutorial`}
                  className="w-full max-h-96 object-cover rounded-xl"
                />
              </div>
            )}

            <div 
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: tool.tutorial.content }}
            />
          </article>
        </div>
      </main>
    </div>
  );
} 