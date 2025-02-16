'use client';

import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism';

interface MarkdownContentProps {
  content: string;
}

const MarkdownContent: React.FC<MarkdownContentProps> = ({ content }) => {
  return (
    <div className="prose prose-lg max-w-none dark:prose-invert">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={{
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || '');
            const isInline = !match;
            return !isInline ? (
              <SyntaxHighlighter
                style={tomorrow}
                language={match ? match[1] : ''}
                PreTag="div"
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // 自定义标题样式
          h1: ({ children }) => (
            <h1 className="text-4xl font-bold mb-8 text-gray-900 dark:text-white">
              {children}
            </h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-3xl font-semibold mt-12 mb-6 text-gray-800 dark:text-gray-100">
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-2xl font-medium mt-8 mb-4 text-gray-700 dark:text-gray-200">
              {children}
            </h3>
          ),
          // 自定义段落样式
          p: ({ children }) => (
            <p className="text-lg leading-relaxed mb-6 text-gray-600 dark:text-gray-300">
              {children}
            </p>
          ),
          // 自定义列表样式
          ul: ({ children }) => (
            <ul className="list-disc list-inside mb-6 space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside mb-6 space-y-2">
              {children}
            </ol>
          ),
          // 自定义引用样式
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700 dark:text-gray-300">
              {children}
            </blockquote>
          ),
          // 自定义表格样式
          table: ({ children }) => (
            <div className="overflow-x-auto my-8">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                {children}
              </table>
            </div>
          ),
          th: ({ children }) => (
            <th className="px-6 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">
              {children}
            </td>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};

export default MarkdownContent; 