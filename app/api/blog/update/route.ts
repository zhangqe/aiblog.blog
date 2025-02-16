import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/types/blog';

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// 读取所有博客文章
const readBlogPosts = (): BlogPost[] => {
  if (!fs.existsSync(BLOG_DATA_FILE)) {
    return [];
  }
  const data = fs.readFileSync(BLOG_DATA_FILE, 'utf8');
  return JSON.parse(data);
};

// 保存所有博客文章
const saveBlogPosts = (posts: BlogPost[]) => {
  fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(posts, null, 2));
};

export async function POST(request: Request) {
  const body = await request.json();
  console.log('Received request:', body);

  const { id, title, description, content, author, date, tags, category, readingTime, coverImage } = body;

  if (!id) {
    console.error('Post ID is missing');
    return NextResponse.json(
      { error: 'Post ID is required' },
      { status: 400 }
    );
  }

  try {
    // 读取现有文章
    const posts = readBlogPosts();
    const existingPostIndex = posts.findIndex(post => post.id === id);
    
    // 构建文章对象
    const postData = {
      id,
      title: title || '',
      description: description || '',
      content: content || '',
      author: author || 'AI Assistant',
      date: date || new Date().toISOString().split('T')[0],
      tags: tags || [],
      category: category || 'Tutorial',
      readingTime: readingTime || '5 min',
      coverImage: coverImage || undefined
    };

    if (existingPostIndex >= 0) {
      // 更新现有文章
      console.log('Updating existing post:', id);
      posts[existingPostIndex] = postData;
    } else {
      // 创建新文章
      console.log('Creating new post:', id);
      posts.push(postData);
    }

    // 保存更新后的文章列表
    saveBlogPosts(posts);

    console.log('Post saved successfully:', postData);
    return NextResponse.json({ 
      message: `Post ${existingPostIndex >= 0 ? 'updated' : 'created'} successfully`, 
      post: postData 
    });
  } catch (error) {
    console.error('Failed to save the post:', error);
    return NextResponse.json(
      { error: 'Failed to save the post' },
      { status: 500 }
    );
  }
} 