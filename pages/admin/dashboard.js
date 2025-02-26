import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { FaPlus, FaTrash, FaEdit, FaSync, FaImage } from 'react-icons/fa';
import dynamic from 'next/dynamic';
import 'react-markdown-editor-lite/lib/index.css';

// 动态导入 Markdown 编辑器，避免服务端渲染问题
const MdEditor = dynamic(() => import('react-markdown-editor-lite'), {
  ssr: false
});

// 导入 markdown-it
import MarkdownIt from 'markdown-it';
const mdParser = new MarkdownIt();

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('articles');
  const [showResetModal, setShowResetModal] = useState(false);
  const [articles, setArticles] = useState([]);
  const [tools, setTools] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  
  const [newArticle, setNewArticle] = useState({ 
    title: '', 
    content: '', 
    date: '',
    image: '',
    markdown: '',
    lastEdited: '' 
  });
  
  const [newTool, setNewTool] = useState({ 
    name: '', 
    description: '', 
    link: '', 
    category: '',
    image: '',
    lastEdited: '',
    tutorial: {
      content: '',
      markdown: '',
      image: ''
    }
  });

  // 检查管理员登录状态并加载数据
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isLoggedIn) {
      router.push('/admin/login');
    } else {
      // 从本地存储加载数据
      const savedArticles = localStorage.getItem('articles');
      const savedTools = localStorage.getItem('tools');
      const savedCredentials = localStorage.getItem('adminCredentials');
      
      if (!savedCredentials) {
        const defaultCredentials = {
          username: 'admin',
          password: 'admin123'
        };
        localStorage.setItem('adminCredentials', JSON.stringify(defaultCredentials));
      }
      
      if (savedArticles) {
        try {
          const parsedArticles = JSON.parse(savedArticles);
          // 确保所有文章都有最后编辑时间
          const articlesWithTime = parsedArticles.map(article => ({
            ...article,
            lastEdited: article.lastEdited || article.date || new Date().toISOString()
          }));
          setArticles(articlesWithTime);
          saveToLocalStorage('articles', articlesWithTime);
        } catch (error) {
          console.error('Error parsing saved articles:', error);
          setArticles([]);
        }
      }
      
      if (savedTools) {
        try {
          const parsedTools = JSON.parse(savedTools);
          // 确保所有工具都有最后编辑时间
          const toolsWithTime = parsedTools.map(tool => ({
            ...tool,
            lastEdited: tool.lastEdited || new Date().toISOString()
          }));
          setTools(toolsWithTime);
          saveToLocalStorage('tools', toolsWithTime);
        } catch (error) {
          console.error('Error parsing saved tools:', error);
          setTools([]);
        }
      }
    }
  }, []);

  // 保存数据到本地存储的函数增加错误处理
  const saveToLocalStorage = (key, data) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error saving ${key} to localStorage:`, error);
    }
  };

  // 重置确认对话框
  const ResetModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md">
        <h3 className="text-xl font-bold mb-4">Confirm Reset</h3>
        <p className="text-gray-600 mb-6">
          This action will reset all content but keep your admin credentials. Continue?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setShowResetModal(false)}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Confirm Reset
          </button>
        </div>
      </div>
    </div>
  );

  // 修改重置功能，只重置指定的数据
  const handleReset = () => {
    const confirmReset = window.confirm(
      'This will reset all content but keep your admin credentials. Continue?'
    );
    
    if (confirmReset) {
      // 保留管理员凭据
      const savedCredentials = localStorage.getItem('adminCredentials');
      
      // 清除其他数据
      localStorage.removeItem('articles');
      localStorage.removeItem('tools');
      
      // 重新设置管理员凭据
      if (savedCredentials) {
        localStorage.setItem('adminCredentials', savedCredentials);
      }
      
      // 重置状态
      setArticles([]);
      setTools([]);
      setShowResetModal(false);
    }
  };

  // 图片上传处理函数
  const handleImageUpload = async (file, type) => {
    try {
      // 这里应该调用您的图片上传API
      // 现在我们使用本地Base64存储作为示例
      const reader = new FileReader();
      reader.onloadend = () => {
        if (type === 'article') {
          setNewArticle(prev => ({ ...prev, image: reader.result }));
        } else {
          setNewTool(prev => ({ ...prev, image: reader.result }));
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  // Markdown编辑器处理函数
  const handleEditorChange = ({ html, text }) => {
    setNewArticle(prev => ({
      ...prev,
      content: html,
      markdown: text
    }));
  };

  // 编辑功能
  const handleEdit = (index, type) => {
    setEditMode(true);
    setEditIndex(index);
    if (type === 'article') {
      const article = articles[index];
      setNewArticle(article);
      setActiveTab('articles');
    } else {
      const tool = tools[index];
      setNewTool(tool);
      setActiveTab('tools');
    }
  };

  // 更新功能
  const handleUpdate = (type) => {
    const now = new Date().toISOString();
    if (type === 'article') {
      const updatedArticles = [...articles];
      updatedArticles[editIndex] = { ...newArticle, lastEdited: now };
      updatedArticles.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      setArticles(updatedArticles);
      saveToLocalStorage('articles', updatedArticles);
    } else {
      const updatedTools = [...tools];
      updatedTools[editIndex] = { ...newTool, lastEdited: now };
      updatedTools.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      setTools(updatedTools);
      saveToLocalStorage('tools', updatedTools);
    }
    setEditMode(false);
    setEditIndex(null);
    resetForm(type);
  };

  // 重置表单
  const resetForm = (type) => {
    if (type === 'article') {
      setNewArticle({ title: '', content: '', date: '', image: '', markdown: '', lastEdited: '' });
    } else {
      setNewTool({ name: '', description: '', link: '', category: '', image: '', lastEdited: '', tutorial: { content: '', markdown: '', image: '' } });
    }
  };

  // 修改添加文章函数
  const handleAddArticle = () => {
    if (!newArticle.title || !newArticle.content) return;
    const now = new Date().toISOString();
    const articleWithDate = {
      ...newArticle,
      date: new Date().toISOString().split('T')[0],
      lastEdited: now
    };
    
    if (editMode && editIndex !== null) {
      handleUpdate('article');
    } else {
      const updatedArticles = [...articles, articleWithDate];
      updatedArticles.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      setArticles(updatedArticles);
      saveToLocalStorage('articles', updatedArticles);
      resetForm('article');
    }
  };

  // 修改添加工具函数
  const handleAddTool = () => {
    if (!newTool.name || !newTool.description || !newTool.link || !newTool.category) return;
    
    const now = new Date().toISOString();
    const toolWithDate = {
      ...newTool,
      lastEdited: now
    };
    
    if (editMode && editIndex !== null) {
      handleUpdate('tool');
    } else {
      const updatedTools = [...tools, toolWithDate];
      updatedTools.sort((a, b) => new Date(b.lastEdited) - new Date(a.lastEdited));
      setTools(updatedTools);
      saveToLocalStorage('tools', updatedTools);
      resetForm('tool');
    }
  };

  // 删除文章
  const handleDeleteArticle = (index) => {
    const updatedArticles = articles.filter((_, i) => i !== index);
    setArticles(updatedArticles);
    saveToLocalStorage('articles', updatedArticles);
  };

  // 删除工具
  const handleDeleteTool = (index) => {
    const updatedTools = tools.filter((_, i) => i !== index);
    setTools(updatedTools);
    saveToLocalStorage('tools', updatedTools);
  };

  // 添加时间格式化函数
  const formatDate = (dateString) => {
    if (!dateString) return '未编辑';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return '未编辑';
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return '未编辑';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900">
      <Head>
        <title>Admin Dashboard - Hello AI Blog</title>
        {/* Google Analytics */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-LF0FS7HRZD"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-LF0FS7HRZD');
          `
        }} />
      </Head>

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={() => setShowResetModal(true)}
            className="flex items-center px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <FaSync className="mr-2" />
            Reset System
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6">
          <div className="flex mb-6 space-x-4">
            <button
              onClick={() => setActiveTab('articles')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'articles'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Articles
            </button>
            <button
              onClick={() => setActiveTab('tools')}
              className={`px-4 py-2 rounded-lg ${
                activeTab === 'tools'
                  ? 'bg-blue-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Tools
            </button>
          </div>

          {activeTab === 'articles' && (
            <div>
              <h2 className="text-xl text-white mb-4">
                {editMode ? 'Edit Article' : 'Add New Article'}
              </h2>
              
              {/* 文章标题输入 */}
              <input
                type="text"
                placeholder="Article Title"
                value={newArticle.title}
                onChange={(e) => setNewArticle({ ...newArticle, title: e.target.value })}
                className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white mb-2"
              />

              {/* 图片上传 */}
              <div className="mb-2">
                <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 w-fit">
                  <FaImage className="mr-2" />
                  Upload Image
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => handleImageUpload(e.target.files[0], 'article')}
                  />
                </label>
                {newArticle.image && (
                  <div className="mt-2">
                    <img src={newArticle.image} alt="Preview" className="max-w-xs rounded" />
                  </div>
                )}
              </div>

              {/* Markdown编辑器 */}
              <div className="mb-2 bg-white rounded-lg overflow-hidden">
                <MdEditor
                  value={newArticle.markdown}
                  style={{ height: '400px' }}
                  renderHTML={text => mdParser.render(text)}
                  onChange={handleEditorChange}
                />
              </div>

              {/* 提交按钮 */}
              <button
                onClick={handleAddArticle}
                className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              >
                <FaPlus className="mr-2" />
                {editMode ? 'Update Article' : 'Add Article'}
              </button>

              {/* 文章列表 */}
              <div className="mt-4">
                <h3 className="text-lg text-white">Existing Articles</h3>
                {articles.map((article, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-semibold">{article.title}</h4>
                        {article.image && (
                          <img src={article.image} alt={article.title} className="w-20 h-20 object-cover rounded mt-2" />
                        )}
                        <div className="text-gray-400 mt-2" dangerouslySetInnerHTML={{ __html: article.content }} />
                        <div className="text-sm text-gray-500 mt-2 flex items-center">
                          <span className="mr-4">创建: {article.date || '未知'}</span>
                          <span>最后编辑: {formatDate(article.lastEdited)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(index, 'article')}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteArticle(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tools' && (
            <div>
              <h2 className="text-xl text-white mb-4">
                {editMode ? 'Edit Tool' : 'Add New Tool'}
              </h2>
              
              {/* 工具表单 */}
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tool Name"
                  value={newTool.name}
                  onChange={(e) => setNewTool({ ...newTool, name: e.target.value })}
                  className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white mb-2"
                />
                
                {/* 工具图片上传 */}
                <div className="mb-2">
                  <label className="block text-gray-300 mb-2">Tool Image</label>
                  <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 w-fit">
                    <FaImage className="mr-2" />
                    Upload Image
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => handleImageUpload(e.target.files[0], 'tool')}
                    />
                  </label>
                  {newTool.image && (
                    <div className="mt-2">
                      <img src={newTool.image} alt="Preview" className="max-w-xs rounded" />
                    </div>
                  )}
                </div>

                <input
                  type="text"
                  placeholder="Tool Description"
                  value={newTool.description}
                  onChange={(e) => setNewTool({ ...newTool, description: e.target.value })}
                  className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white mb-2"
                />
                <input
                  type="text"
                  placeholder="Tool Link"
                  value={newTool.link}
                  onChange={(e) => setNewTool({ ...newTool, link: e.target.value })}
                  className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white mb-2"
                />
                <select
                  value={newTool.category}
                  onChange={(e) => setNewTool({ ...newTool, category: e.target.value })}
                  className="w-full bg-white/5 border border-gray-600 rounded-lg px-4 py-2 text-white mb-2"
                >
                  <option value="">Select Category</option>
                  <option value="AI Chat">AI Chat</option>
                  <option value="AI Art">AI Art</option>
                  <option value="AI Coding">AI Coding</option>
                </select>

                {/* 教程编辑部分 */}
                <div className="border-t border-gray-600 pt-4 mt-4">
                  <h3 className="text-xl text-white mb-4">Tool Tutorial</h3>
                  
                  {/* 教程图片上传 */}
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Tutorial Image</label>
                    <label className="flex items-center px-4 py-2 bg-blue-600 text-white rounded cursor-pointer hover:bg-blue-700 w-fit">
                      <FaImage className="mr-2" />
                      Upload Tutorial Image
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files[0];
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setNewTool({
                              ...newTool,
                              tutorial: {
                                ...newTool.tutorial,
                                image: reader.result
                              }
                            });
                          };
                          reader.readAsDataURL(file);
                        }}
                      />
                    </label>
                    {newTool.tutorial.image && (
                      <div className="mt-2">
                        <img src={newTool.tutorial.image} alt="Tutorial Preview" className="max-w-xs rounded" />
                      </div>
                    )}
                  </div>

                  {/* Markdown编辑器 */}
                  <div className="mb-4">
                    <label className="block text-gray-300 mb-2">Tutorial Content</label>
                    <div className="bg-white rounded-lg overflow-hidden">
                      <MdEditor
                        value={newTool.tutorial.markdown}
                        style={{ height: '400px' }}
                        renderHTML={text => mdParser.render(text)}
                        onChange={({html, text}) => {
                          setNewTool({
                            ...newTool,
                            tutorial: {
                              ...newTool.tutorial,
                              content: html,
                              markdown: text
                            }
                          });
                        }}
                      />
                    </div>
                  </div>
                </div>

                {/* 提交按钮 */}
                <button
                  onClick={handleAddTool}
                  className="flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  <FaPlus className="mr-2" />
                  {editMode ? 'Update Tool' : 'Add Tool'}
                </button>
              </div>

              {/* 工具列表 */}
              <div className="mt-4">
                <h3 className="text-lg text-white">Existing Tools</h3>
                {tools.map((tool, index) => (
                  <div key={index} className="bg-white/5 p-4 rounded-lg mb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-white font-semibold">{tool.name}</h4>
                        {tool.image && (
                          <img src={tool.image} alt={tool.name} className="w-20 h-20 object-cover rounded mt-2" />
                        )}
                        <p className="text-gray-400">{tool.description}</p>
                        <p className="text-sm text-blue-400 mt-1">{tool.category}</p>
                        <div className="flex items-center mt-1">
                          <a href={tool.link} className="text-blue-400 hover:underline text-sm mr-4">Visit Tool</a>
                          <span className="text-sm text-gray-500">最后编辑: {formatDate(tool.lastEdited)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(index, 'tool')}
                          className="text-blue-400 hover:text-blue-300"
                        >
                          <FaEdit />
                        </button>
                        <button
                          onClick={() => handleDeleteTool(index)}
                          className="text-red-400 hover:text-red-300"
                        >
                          <FaTrash />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {showResetModal && <ResetModal />}
    </div>
  );
} 