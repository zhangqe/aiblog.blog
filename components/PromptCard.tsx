'use client';

import { Prompt } from '@/types/prompt';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface PromptCardProps {
  prompt: Prompt;
  index: number;
}

export function PromptCard({ prompt, index }: PromptCardProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(prompt.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-all"
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900">{prompt.title}</h3>
          <div className="flex flex-wrap gap-2 mt-2">
            {prompt.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 text-xs bg-blue-50 text-blue-600 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
        <span className="px-3 py-1 text-sm bg-purple-50 text-purple-600 rounded-full">
          {prompt.category}
        </span>
      </div>

      <div className="relative">
        <p className="text-gray-600 mb-4 whitespace-pre-wrap">{prompt.content}</p>
        <button
          onClick={copyToClipboard}
          className="absolute top-0 right-0 p-2 text-gray-400 hover:text-gray-600"
          title="复制提示词"
        >
          {copied ? (
            <svg
              className="w-5 h-5 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
          ) : (
            <svg
              className="w-5 h-5"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
            </svg>
          )}
        </button>
      </div>

      <div className="mt-4 text-sm text-gray-500">
        最后更新：{prompt.updatedAt}
      </div>
    </motion.div>
  );
} 