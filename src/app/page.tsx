'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { FaBlog, FaTools, FaHistory } from 'react-icons/fa'
import { BsFillLightningFill } from 'react-icons/bs'

export default function Home() {
  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 overflow-hidden">
      <div className="h-full flex flex-col">
        {/* Hero Section - 使用较少的垂直空间 */}
        <section className="relative pt-8 pb-4 flex-shrink-0">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 z-0"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 animate-gradient" />
            <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          </motion.div>

          <div className="relative z-10 text-center">
            <motion.h1
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"
            >
              AI博客
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-2"
            >
              探索AI的无限可能
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <BsFillLightningFill className="inline-block w-8 h-8 text-yellow-400 animate-pulse" />
            </motion.div>
          </div>
        </section>

        {/* Features Section - 自适应剩余空间 */}
        <section className="flex-grow flex items-center justify-center px-4 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-6xl mx-auto"
          >
            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/blog" 
                    className="group relative block p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-blue-600 rounded-t-xl" />
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <FaBlog className="w-12 h-12 text-blue-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-1 bg-blue-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">博客文章</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    探索最新的AI技术和见解
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/ai-tools"
                    className="group relative block p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-600 rounded-t-xl" />
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <FaTools className="w-12 h-12 text-teal-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-1 bg-teal-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">AI工具</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    体验强大的AI工具集
                  </p>
                </div>
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ y: -4 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/versions"
                    className="group relative block p-4 md:p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 h-full"
              >
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-purple-600 rounded-t-xl" />
                <div className="flex flex-col items-center space-y-3">
                  <div className="relative">
                    <FaHistory className="w-12 h-12 text-purple-500 group-hover:scale-110 transition-transform duration-300" />
                    <div className="absolute -inset-1 bg-purple-500/20 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark:text-white">版本历史</h2>
                  <p className="text-sm text-gray-600 dark:text-gray-300 text-center">
                    了解我们的发展历程
                  </p>
                </div>
              </Link>
            </motion.div>
          </motion.div>
        </section>
      </div>
    </div>
  )
}
