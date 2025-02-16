import { NextResponse } from 'next/server';
import { getBlogPosts } from '@/lib/blog';
import { logger } from '@/utils/logger';

export async function GET() {
  try {
    logger.debug('正在获取博客文章列表');
    const posts = await getBlogPosts();
    logger.debug('返回博客文章列表:', posts);
    return NextResponse.json(posts);
  } catch (error) {
    logger.error('获取博客文章失败:', error);
    return NextResponse.json(
      { error: '获取博客文章失败' },
      { status: 500 }
    );
  }
} 