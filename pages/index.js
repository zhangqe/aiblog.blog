import Head from 'next/head'
import { FaRobot, FaBook, FaGithub, FaClock } from 'react-icons/fa'
import { Analytics } from '@vercel/analytics/react'

export default function Home() {
  const aiTools = [
    {
      name: "ChatGPT",
      description: "AI conversational model by OpenAI for text creation and programming assistance",
      link: "https://chat.openai.com",
      category: "AI Chat",
      tutorial: "/blog/chatgpt-guide"
    },
    {
      name: "Midjourney",
      description: "AI image generation tool for creating high-quality artwork",
      link: "https://www.midjourney.com",
      category: "AI Art",
      tutorial: "/blog/midjourney-guide"
    },
    {
      name: "Claude",
      description: "AI assistant by Anthropic, specialized in academic writing and analysis",
      link: "https://claude.ai",
      category: "AI Chat",
      tutorial: "/blog/claude-guide"
    },
    {
      name: "Stable Diffusion",
      description: "Open-source AI image generation model with local deployment option",
      link: "https://stability.ai",
      category: "AI Art",
      tutorial: "/blog/stable-diffusion-guide"
    },
    {
      name: "Copilot",
      description: "GitHub's AI programming assistant for code completion and suggestions",
      link: "https://github.com/features/copilot",
      category: "AI Coding",
      tutorial: "/blog/copilot-guide"
    },
    {
      name: "Codeium",
      description: "Free AI code assistant supporting multiple IDEs",
      link: "https://codeium.com",
      category: "AI Coding",
      tutorial: "/blog/codeium-guide"
    }
  ]

  const blogPosts = [
    {
      title: "Getting Started with ChatGPT",
      description: "Learn how to make the most of ChatGPT for your daily tasks",
      date: "2025-02-22",
      link: "/blog/getting-started-chatgpt"
    },
    {
      title: "AI Art Creation Guide",
      description: "A comprehensive guide to creating amazing artwork with AI tools",
      date: "2025-02-20",
      link: "/blog/ai-art-creation-guide"
    },
    {
      title: "The Future of AI Programming",
      description: "Exploring how AI is transforming software development",
      date: "2025-02-18",
      link: "/blog/future-of-ai-programming"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Head>
        <title>Hello AI Blog - AI Tools Navigation & Tutorials</title>
        <meta name="description" content="Discover and learn the latest AI tools" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
            Hello AI Blog
          </h1>
          <p className="text-xl text-gray-300">
            Discover, Learn, and Master the Latest AI Tools
          </p>
        </div>

        <h2 className="text-3xl font-bold text-white mb-8">Featured AI Tools</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {aiTools.map((tool, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold text-white">{tool.name}</h3>
                <span className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
                  {tool.category}
                </span>
              </div>
              <p className="text-gray-300 mb-4">{tool.description}</p>
              <div className="flex justify-between items-center">
                <a
                  href={tool.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  <FaRobot className="mr-2" />
                  Visit Tool
                </a>
                <a
                  href={tool.tutorial}
                  className="flex items-center text-purple-400 hover:text-purple-300"
                >
                  <FaBook className="mr-2" />
                  View Tutorial
                </a>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-white mb-8">Latest Blog Posts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {blogPosts.map((post, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-lg rounded-xl p-6 hover:transform hover:scale-105 transition-all duration-300">
              <h3 className="text-xl font-semibold text-white mb-3">{post.title}</h3>
              <p className="text-gray-300 mb-4">{post.description}</p>
              <div className="flex justify-between items-center">
                <span className="flex items-center text-gray-400">
                  <FaClock className="mr-2" />
                  {post.date}
                </span>
                <a
                  href={post.link}
                  className="flex items-center text-blue-400 hover:text-blue-300"
                >
                  <FaBook className="mr-2" />
                  Read More
                </a>
              </div>
            </div>
          ))}
        </div>

        <footer className="text-center mt-16 text-gray-400">
          <a
            href="https://github.com/zhangqe/aiblog.blog"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center hover:text-white"
          >
            <FaGithub className="mr-2" />
            Follow Us on GitHub
          </a>
        </footer>
      </main>
      <Analytics />
    </div>
  )
}
