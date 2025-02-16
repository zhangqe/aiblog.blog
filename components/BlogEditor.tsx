'use client';

import { BlogPost } from '@/types/blog';
import { useState } from 'react';

interface BlogEditorProps {
  post?: BlogPost | null;
  onClose: () => void;
  onSave?: () => void;
}

// 生成 URL 友好的 slug
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // 移除特殊字符
    .replace(/\s+/g, '-') // 将空格替换为连字符
    .replace(/-+/g, '-') // 移除重复的连字符
    .trim();
}

export function BlogEditor({ post, onClose, onSave }: BlogEditorProps) {
  const [formData, setFormData] = useState<Partial<BlogPost>>(
    post || {
      title: '',
      description: '',
      content: '',
      author: 'AI Assistant',
      date: new Date().toISOString().split('T')[0],
      tags: [],
      category: 'Tutorial',
      readingTime: '5 min',
    }
  );
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError('');

    // 如果是新文章，生成 ID
    if (!post) {
      const id = generateSlug(formData.title || '');
      formData.id = id;
    }

    console.log('Submitting form data:', formData);

    try {
      const response = await fetch('/api/blog/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to update the blog post');
      }

      console.log('Post saved successfully:', formData);
      
      // 调用保存成功的回调
      if (onSave) {
        onSave();
      }
      
      onClose();
    } catch (error) {
      console.error('Update error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to update the blog post');
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setUploadError('');

    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      // 在内容中插入图片链接
      const imageUrl = data.url;
      const imageMarkdown = `![${file.name}](${imageUrl})`;
      
      setFormData(prev => ({
        ...prev,
        content: prev.content + '\n' + imageMarkdown
      }));
    } catch (error) {
      console.error('Upload error:', error);
      setUploadError(error instanceof Error ? error.message : 'Failed to upload image');
    } finally {
      setUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title</label>
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Description</label>
        <input
          type="text"
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cover Image URL</label>
        <input
          type="url"
          value={formData.coverImage || ''}
          onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Content (Markdown)</label>
        <div className="mt-1 relative">
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="block w-full rounded-md border border-gray-300 px-3 py-2 h-96 font-mono"
            required
          />
          <div className="absolute top-2 right-2">
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
              id="image-upload"
              disabled={uploading}
            />
            <label
              htmlFor="image-upload"
              className={`inline-flex items-center px-3 py-1 rounded-md text-sm ${
                uploading
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-blue-50 text-blue-600 hover:bg-blue-100 cursor-pointer'
              }`}
            >
              {uploading ? 'Uploading...' : 'Upload Image'}
            </label>
          </div>
        </div>
        {uploadError && (
          <p className="mt-1 text-sm text-red-600">{uploadError}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tags (comma-separated)</label>
        <input
          type="text"
          value={formData.tags?.join(', ')}
          onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(t => t.trim()) })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Category</label>
        <select
          value={formData.category}
          onChange={(e) => setFormData({ ...formData, category: e.target.value })}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
          required
        >
          <option value="Tutorial">Tutorial</option>
          <option value="Technology">Technology</option>
          <option value="Development">Development</option>
          <option value="AI">AI</option>
        </select>
      </div>

      <div className="flex justify-end gap-4">
        <button
          type="button"
          onClick={onClose}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          {post ? 'Update' : 'Create'} Post
        </button>
      </div>
    </form>
  );
} 