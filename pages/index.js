import Head from 'next/head'
import { FaRobot, FaBook, FaGithub, FaClock, FaArrowRight } from 'react-icons/fa'
import { Analytics } from '@vercel/analytics/react'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function Home() {
  const [aiTools, setAiTools] = useState([]);
  const [blogPosts, setBlogPosts] = useState([]);
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

    // 加载数据
    const savedTools = localStorage.getItem('tools');
    const savedArticles = localStorage.getItem('articles');
    
    if (savedTools) {
      setAiTools(JSON.parse(savedTools));
    }
    
    if (savedArticles) {
      setBlogPosts(JSON.parse(savedArticles).map(article => ({
        title: article.title,
        description: article.content.substring(0, 150) + '...',
        date: article.date,
        link: `/blog/${article.title.toLowerCase().replace(/ /g, '-')}`
      })));
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

  // 获取最新的5个工具
  const displayedTools = aiTools.slice(0, 5);
  const hasMoreTools = aiTools.length > 5;

  // 获取最新的5篇文章
  const displayedPosts = blogPosts.slice(0, 5);
  const hasMorePosts = blogPosts.length > 5;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
      <Head>
        <title>Hello AI Blog - AI Tools Navigation & Tutorials</title>
        <meta name="description" content="Discover and Learn the Latest AI Tools" />
        <link rel="icon" href="/favicon.ico" />
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

      <main>
        <div 
          className="min-h-screen max-w-[1920px] mx-auto px-8 py-8 flex flex-col"
          ref={el => {
            if (el) {
              setContentHeight(el.getBoundingClientRect().height);
            }
          }}
          style={{
            transform: windowHeight < contentHeight ? `scale(${calculateScale()})` : 'none',
            transformOrigin: 'top center'
          }}
        >
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4 animate-slide-up">
              Hello AI Blog
            </h1>
            <p className="text-2xl text-gray-300 animate-slide-up-delay">
              Stay Ahead of the Curve with the Hottest AI Trends and Redefine Modern Living in the Digital Age
            </p>
          </div>

          <div className="flex-1 max-w-[1600px] mx-auto">
            <h2 className="text-5xl font-bold text-white mb-12 animate-fade-in-delay">Featured AI Tools</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mb-16">
              {displayedTools.map((tool, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 animate-fade-in-up flex flex-col w-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-semibold text-white truncate flex-1 mr-4">{tool.name}</h3>
                    <span className="px-4 py-1.5 bg-blue-500/80 text-white text-sm rounded-full whitespace-nowrap">
                      {tool.category}
                    </span>
                  </div>
                  <div className="mb-4 relative w-full pt-[56.25%] overflow-hidden rounded-lg">
                    {tool.image ? (
                      <img
                        src={tool.image}
                        alt={tool.name}
                        className="absolute top-0 left-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <FaRobot className="text-6xl text-white/50" />
                      </div>
                    )}
                  </div>
                  <p className="text-gray-300 text-base mb-4 line-clamp-2">{tool.description}</p>
                  <div className="flex justify-between items-center gap-3 mt-auto">
                    <a
                      href={tool.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-300 flex-1 justify-center"
                    >
                      <FaRobot className="mr-2" />
                      Visit Tool
                    </a>
                    {tool.tutorial && (
                      <Link
                        href={`/tutorial/${tool.name.toLowerCase().replace(/ /g, '-')}`}
                        className="flex items-center px-4 py-2 bg-purple-600 text-white text-sm rounded-lg hover:bg-purple-700 transition-colors duration-300 flex-1 justify-center"
                      >
                        <FaBook className="mr-2" />
                        View Tutorial
                      </Link>
                    )}
                  </div>
                </div>
              ))}
              {hasMoreTools && (
                <Link href="/tools" className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">更多工具</h3>
                    <FaArrowRight className="text-blue-400 group-hover:text-blue-300 mx-auto text-3xl transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
              )}
            </div>

            <h2 className="text-5xl font-bold text-white mb-12 animate-fade-in-delay">Latest Blog Posts</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {displayedPosts.map((post, index) => (
                <div 
                  key={index} 
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 hover:bg-white/20 transition-all duration-300 animate-fade-in-up flex flex-col w-full"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="mb-4 relative w-full pt-[56.25%] overflow-hidden rounded-lg">
                    {post.image ? (
                      <img
                        src={post.image}
                        alt={post.title}
                        className="absolute top-0 left-0 w-full h-full object-cover transform hover:scale-110 transition-transform duration-300"
                      />
                    ) : (
                      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center">
                        <FaBook className="text-6xl text-white/50" />
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-2 truncate">{post.title}</h3>
                  <p className="text-gray-300 text-base mb-4 line-clamp-2">{post.description}</p>
                  <div className="flex justify-between items-center mt-auto">
                    <span className="flex items-center text-gray-400 text-sm">
                      <FaClock className="mr-2" />
                      {post.date}
                    </span>
                    <Link
                      href={post.link}
                      className="flex items-center px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors duration-300"
                    >
                      <FaBook className="mr-2" />
                      Read More
                    </Link>
                  </div>
                </div>
              ))}
              {hasMorePosts && (
                <Link href="/blog" className="bg-white/5 backdrop-blur-lg rounded-xl p-6 flex items-center justify-center transform hover:scale-105 hover:bg-white/10 transition-all duration-300 group">
                  <div className="text-center">
                    <h3 className="text-2xl font-semibold text-white mb-4">更多文章</h3>
                    <FaArrowRight className="text-blue-400 group-hover:text-blue-300 mx-auto text-3xl transition-transform group-hover:translate-x-2" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        </div>

        <footer className="h-screen bg-gradient-to-br from-gray-900 to-blue-900">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col items-center space-y-4 pt-8">
              <a
                href="https://github.com/zhangqe/aiblog.blog"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-2xl text-gray-400 hover:text-white transition-colors duration-300 hover:scale-105 transform"
              >
                <FaGithub className="mr-3 text-3xl" />
                Follow Us on GitHub
              </a>
              <div className="text-lg opacity-50 hover:opacity-100 transition-opacity">
                <a
                  href="/admin/login"
                  className="text-gray-500 hover:text-gray-300 transition-colors duration-300"
                  title="Admin Login"
                >
                  ·
                </a>
              </div>
            </div>
          </div>
        </footer>
      </main>
      <Analytics />
    </div>
  )
}
