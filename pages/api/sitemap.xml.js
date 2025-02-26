import fs from 'fs';
import path from 'path';

const BASE_URL = 'https://www.aiblog.blog';

function generateSiteMap(articles, tools) {
  return `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <!-- 静态页面 -->
      <url>
        <loc>${BASE_URL}</loc>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      <url>
        <loc>${BASE_URL}/tools</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>
      <url>
        <loc>${BASE_URL}/blog</loc>
        <changefreq>daily</changefreq>
        <priority>0.9</priority>
      </url>

      <!-- 博客文章页面 -->
      ${articles
        .map(article => {
          const slug = article.title.toLowerCase().replace(/ /g, '-');
          return `
            <url>
              <loc>${BASE_URL}/blog/${slug}</loc>
              <lastmod>${article.lastEdited || article.date}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}

      <!-- 工具教程页面 -->
      ${tools
        .filter(tool => tool.tutorial)
        .map(tool => {
          const slug = tool.name.toLowerCase().replace(/ /g, '-');
          return `
            <url>
              <loc>${BASE_URL}/tutorial/${slug}</loc>
              <lastmod>${tool.lastEdited}</lastmod>
              <changefreq>weekly</changefreq>
              <priority>0.7</priority>
            </url>
          `;
        })
        .join('')}
    </urlset>`;
}

export default async function handler(req, res) {
  try {
    // 从数据文件读取数据
    const dataDir = path.join(process.cwd(), 'data');
    let articles = [];
    let tools = [];

    try {
      const articlesPath = path.join(dataDir, 'articles.json');
      const toolsPath = path.join(dataDir, 'tools.json');

      if (fs.existsSync(articlesPath)) {
        articles = JSON.parse(fs.readFileSync(articlesPath, 'utf8'));
      }

      if (fs.existsSync(toolsPath)) {
        tools = JSON.parse(fs.readFileSync(toolsPath, 'utf8'));
      }
    } catch (error) {
      console.error('Error reading data files:', error);
    }

    // 生成站点地图 XML
    const sitemap = generateSiteMap(articles, tools);

    // 设置正确的 header
    res.setHeader('Content-Type', 'application/xml');
    res.setHeader('Cache-Control', 'public, s-maxage=1200, stale-while-revalidate=600');

    // 发送生成的站点地图
    res.write(sitemap);
    res.end();
  } catch (error) {
    console.error('Error generating sitemap:', error);
    res.status(500).json({ error: 'Error generating sitemap' });
  }
} 