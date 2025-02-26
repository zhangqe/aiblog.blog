import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { FaArrowLeft, FaClock, FaShare } from 'react-icons/fa';

export default function BlogPost() {
  const router = useRouter();
  const { slug } = router.query;
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
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

    // 加载文章数据
    const savedArticles = localStorage.getItem('articles');
    if (savedArticles) {
      const articles = JSON.parse(savedArticles);
      const currentPost = articles.find(
        article => article.title.toLowerCase().replace(/ /g, '-') === slug
      );

      if (currentPost) {
        setPost(currentPost);
        
        // 获取相关文章（除了当前文章的其他最新文章）
        const related = articles
          .filter(article => article.title !== currentPost.title)
          .slice(0, 3);
        setRelatedPosts(related);
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

  // 分享功能
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: post.title,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // 如果不支持原生分享，复制链接到剪贴板
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 overflow-hidden">
      <Head>
        <title>{post.title} - Hello AI Blog</title>
        <meta name="description" content={post.content.substring(0, 150)} />
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
                href="/blog"
                className="text-white hover:text-blue-400 transition-colors duration-300 mr-4"
              >
                <FaArrowLeft className="text-2xl" />
              </Link>
              <h1 className="text-4xl font-bold text-white">Blog Post</h1>
            </div>
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-300"
            >
              <FaShare className="mr-2" />
              Share
            </button>
          </div>

          {/* 文章内容 */}
          <article className="bg-white/10 backdrop-blur-lg rounded-xl p-8 mb-8">
            <header className="mb-8">
              <h1 className="text-3xl font-bold text-white mb-4">{post.title}</h1>
              <div className="flex items-center text-gray-400">
                <FaClock className="mr-2" />
                <time>{post.date}</time>
              </div>
            </header>

            {post.image && (
              <div className="mb-8">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full max-h-96 object-cover rounded-xl"
                />
              </div>
            )}

            <div 
              className="prose prose-invert max-w-none text-gray-300"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </article>

          {/* 相关文章 */}
          {relatedPosts.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-white mb-6">Related Posts</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost, index) => (
                  <Link
                    key={index}
                    href={`/blog/${relatedPost.title.toLowerCase().replace(/ /g, '-')}`}
                    className="bg-white/10 backdrop-blur-lg rounded-xl p-6 transform hover:scale-105 hover:bg-white/20 transition-all duration-300"
                  >
                    {relatedPost.image && (
                      <div className="mb-4">
                        <img 
                          src={relatedPost.image} 
                          alt={relatedPost.title}
                          className="w-full h-40 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <h3 className="text-xl font-semibold text-white mb-2">{relatedPost.title}</h3>
                    <p className="text-gray-400 text-sm">
                      {relatedPost.content.substring(0, 100)}...
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>
    </div>
  );
} 