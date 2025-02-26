import { useState, useEffect } from 'react';
import Head from 'next/head';
import { FaBook, FaClock, FaArrowLeft, FaSearch, FaArrowRight } from 'react-icons/fa';
import Link from 'next/link';

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
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

    // 加载文章数据
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      const parsedArticles = JSON.parse(savedArticles);
      parsedArticles.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      setPosts(parsedArticles);
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

  // 搜索文章
  const filteredPosts = posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
      <Head>
        <title>Blog Posts - Hello AI Blog</title>
        <meta name="description" content="Read our latest articles about AI" />
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Link 
                href="/"
                className="text-white hover:text-blue-400 transition-colors duration-300 mr-4"
              >
                <FaArrowLeft className="text-2xl" />
              </Link>
              <h1 className="text-4xl font-bold text-white">Blog Posts</h1>
            </div>
            
            {/* 搜索框 */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search posts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-64 px-4 py-2 pl-10 bg-white/10 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <FaSearch className="absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* 文章网格 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post, index) => (
              <Link
                key={index}
                href={`/blog/${post.title.toLowerCase().replace(/ /g, '-')}`}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 transition-all duration-300 group"
              >
                <div className="mb-4 relative h-48 overflow-hidden rounded-lg">
                  {post.image ? (
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                      <FaBook className="text-6xl text-white/50" />
                    </div>
                  )}
                </div>
                <h2 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-400 transition-colors duration-300">{post.title}</h2>
                <p className="text-gray-300 mb-4 line-clamp-3">
                  {post.content.replace(/<[^>]*>/g, '').substring(0, 150)}...
                </p>
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span className="flex items-center">
                    <FaClock className="mr-2" />
                    {formatDate(post.lastEdited)}
                  </span>
                  <span className="flex items-center text-blue-400 group-hover:text-blue-300">
                    Read More
                    <FaArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* 无结果提示 */}
          {filteredPosts.length === 0 && (
            <div className="text-center text-gray-400 mt-8 p-8 bg-white/5 rounded-xl backdrop-blur-lg">
              <FaSearch className="mx-auto text-4xl mb-4 text-gray-500" />
              <p className="text-xl">No posts found matching your search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
} 