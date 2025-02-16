import fs from 'fs';
import path from 'path';
import { BlogPost } from '@/types/blog';
import { logger } from '@/utils/logger';

const BLOG_DATA_FILE = path.join(process.cwd(), 'data', 'blog-posts.json');

// 读取所有博客文章
export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    // 如果文件不存在，返回空数组
    if (!fs.existsSync(BLOG_DATA_FILE)) {
      logger.debug('博客数据文件不存在，返回空数组');
      return [];
    }

    // 读取文件内容
    const data = fs.readFileSync(BLOG_DATA_FILE, 'utf8');
    const posts = JSON.parse(data);

    // 按日期降序排序
    return posts.sort((a: BlogPost, b: BlogPost) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  } catch (error) {
    logger.error('读取博客文章失败:', error);
    return [];
  }
};

// 保存博客文章
export const saveBlogPosts = async (posts: BlogPost[]): Promise<void> => {
  try {
    // 确保目录存在
    const dir = path.dirname(BLOG_DATA_FILE);
    if (!fs.existsSync(dir)) {
      logger.debug('创建博客数据目录:', dir);
      fs.mkdirSync(dir, { recursive: true });
    }

    // 写入文件
    fs.writeFileSync(BLOG_DATA_FILE, JSON.stringify(posts, null, 2));
    logger.debug('博客文章保存成功');
  } catch (error) {
    logger.error('保存博客文章失败:', error);
    throw error;
  }
}; 