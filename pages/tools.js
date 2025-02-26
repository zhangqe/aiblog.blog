import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaRobot, FaArrowLeft, FaClock, FaBook } from 'react-icons/fa';
import Link from 'next/link';

export default function Tools() {
  const [tools, setTools] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [windowHeight, setWindowHeight] = useState(0);
  const [contentHeight, setContentHeight] = useState(0);

  // 添加时间格式化函数
  const formatDate = (dateString) => {
    if (!dateString) return '未编辑';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '未编辑';
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '未编辑';
    }
  };

  useEffect(() => {
    // 获取窗口高度
    const updateWindowHeight = () => {
      setWindowHeight(window.innerHeight);
    };
    
    // 初始化和监听窗口大小变化
    updateWindowHeight();
    window.addEventListener('resize', updateWindowHeight);

    // 加载工具数据
    const savedTools = localStorage.getItem('tools');
    if (savedTools) {
      const parsedTools = JSON.parse(savedTools);
      parsedTools.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      setTools(parsedTools);
      
      const uniqueCategories = ['All', ...new Set(parsedTools.map(tool => tool.category))];
      setCategories(uniqueCategories);
    }

    return () => window.removeEventListener('resize', updateWindowHeight);
  }, []);

  // 计算内容缩放比例
  const calculateScale = () => {
    if (contentHeight && windowHeight) {
      return Math.min(1, windowHeight / contentHeight);
    }
    return 1;
  };

  // 根据分类筛选工具
  const filteredTools = selectedCategory === 'All' 
    ? tools 
    : tools.filter(tool => tool.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
      <Head>
        <title>AI Tools - Hello AI Blog</title>
        <meta name="description" content="Browse our collection of AI tools" />
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
          <div className="flex items-center mb-6">
            <Link 
              href="/"
              className="text-white hover:text-blue-400 transition-colors duration-300 mr-4"
            >
              <FaArrowLeft className="text-2xl" />
            </Link>
            <h1 className="text-3xl font-bold text-white">AI Tools</h1>
          </div>

          {/* 分类筛选 */}
          <div className="flex flex-wrap gap-3 mb-6">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-3 py-1.5 rounded-full text-sm transition-colors duration-300 ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white/10 text-white hover:bg-white/20'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 工具网格 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredTools.map((tool, index) => (
              <div 
                key={index}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-3 transform hover:scale-105 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-base font-semibold text-white truncate flex-1 mr-2">{tool.name}</h3>
                  <span className="px-2 py-0.5 bg-blue-500/80 text-white text-xs rounded-full whitespace-nowrap">
                    {tool.category}
                  </span>
                </div>
                <div className="mb-2 relative h-28 overflow-hidden rounded-lg">
                  {tool.image ? (
                    <img 
                      src={tool.image} 
                      alt={tool.name} 
                      className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <FaRobot className="text-2xl text-white/50" />
                    </div>
                  )}
                </div>
                <p className="text-gray-300 text-sm mb-2 line-clamp-2 min-h-[2.5rem]">{tool.description}</p>
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-gray-400 flex items-center">
                      <FaClock className="mr-1" />
                      {formatDate(tool.lastEdited)}
                    </span>
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-2 py-1 bg-blue-600/80 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      <FaRobot className="mr-1" />
                      Visit
                    </a>
                  </div>
                  {tool.tutorial && (
                    <Link
                      href={`/tutorial/${tool.title.toLowerCase().replace(/ /g, '-')}`}
                      className="flex items-center justify-center px-2 py-1 bg-purple-600/80 text-white text-xs rounded-lg hover:bg-purple-700 transition-colors duration-300"
                    >
                      <FaBook className="mr-1" />
                      View Tutorial
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
} 