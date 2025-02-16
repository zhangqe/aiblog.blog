import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

export async function DELETE(
  request: Request
) {
  // 从 URL 中获取文章 ID
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  if (!id) {
    return NextResponse.json(
      { error: '文章 ID 是必需的' },
      { status: 400 }
    );
  }

  try {
    // 读取所有文章
    const data = fs.readFileSync(BLOG_DATA_FILE, 'utf8');
    const posts = JSON.parse(data);

    // 查找并删除文章
    const updatedPosts = posts.filter((post: any) => post.id !== id);

    // 如果文章数量没有变化，说明没有找到要删除的文章
    if (posts.length === updatedPosts.length) {
      return NextResponse.json(
        { error: '未找到文章' },
        { status: 404 }
      );
    }

    // 保存更新后的文章列表
    fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(updatedPosts, null, 2));

    console.log('文章删除成功:', id);
    return NextResponse.json({ 
      message: '文章删除成功',
      success: true
    });
  } catch (error) {
    console.error('删除文章失败:', error);
    return NextResponse.json(
      { error: '删除文章失败' },
      { status: 500 }
    );
  }
} 