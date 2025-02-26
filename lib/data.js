import fs from 'fs';
import path from 'path';

// 从存储中获取所有文章
export function getAllArticles() {
  try {
    // 优先从本地存储获取
    if (typeof window !== 'undefined') {
      const savedArticles = localStorage.getItem('articles');
      if (savedArticles) {
        return JSON.parse(savedArticles);
      }
    }

    // 如果本地存储不可用，从文件系统读取
    const articlesPath = path.join(process.cwd(), 'data', 'articles.json');
    if (fs.existsSync(articlesPath)) {
      return JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
    }

    return [];
  } catch (error) {
    console.error('Error getting articles:', error);
    return [];
  }
}

// 从存储中获取所有工具
export function getAllTools() {
  try {
    // 优先从本地存储获取
    if (typeof window !== 'undefined') {
      const savedTools = localStorage.getItem('tools');
      if (savedTools) {
        return JSON.parse(savedTools);
      }
    }

    // 如果本地存储不可用，从文件系统读取
    const toolsPath = path.join(process.cwd(), 'data', 'tools.json');
    if (fs.existsSync(toolsPath)) {
      return JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
    }

    return [];
  } catch (error) {
    console.error('Error getting tools:', error);
    return [];
  }
}

// 保存文章到存储
export function saveArticles(articles) {
  try {
    // 保存到本地存储
    if (typeof window !== 'undefined') {
      localStorage.setItem('articles', JSON.stringify(articles));
    }

    // 同时保存到文件系统
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(dataDir, 'articles.json'),
      JSON.stringify(articles, null, 2)
    );
  } catch (error) {
    console.error('Error saving articles:', error);
  }
}

// 保存工具到存储
export function saveTools(tools) {
  try {
    // 保存到本地存储
    if (typeof window !== 'undefined') {
      localStorage.setItem('tools', JSON.stringify(tools));
    }

    // 同时保存到文件系统
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    fs.writeFileSync(
      path.join(dataDir, 'tools.json'),
      JSON.stringify(tools, null, 2)
    );
  } catch (error) {
    console.error('Error saving tools:', error);
  }
} 