import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  if (!id) {
    return NextResponse.json(
      { error: 'Post ID is required' },
      { status: 400 }
    );
  }

  try {
    // 读取所有文章
    const data = fs.readFileSync(BLOG_DATA_FILE, 'utf8');
    const posts = JSON.parse(data);

    // 查找指定文章
    const post = posts.find((p: any) => p.id === id);

    if (!post) {
      return NextResponse.json(
        { error: 'Post not found' },
        { status: 404 }
      );
    }

    console.log('Returning post:', post);
    return NextResponse.json(post);
  } catch (error) {
    console.error('Failed to get post:', error);
    return NextResponse.json(
      { error: 'Failed to get post' },
      { status: 500 }
    );
  }
} 