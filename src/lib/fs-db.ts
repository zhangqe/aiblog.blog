import fs from 'fs'
import path from 'path'

const POSTS_FILE = path.join(process.cwd(), 'src/data/posts/posts.json')
const USERS_FILE = path.join(process.cwd(), 'src/data/users.json')

export interface Post {
  id: string
  title: string
  content: string
  excerpt: string
  published: boolean
  authorId: string
  createdAt: string
  updatedAt: string
}

export interface User {
  id: string
  name: string
  email: string
  password: string
  role: 'ADMIN' | 'USER'
}

// 确保数据文件存在
function ensureFile(filePath: string, defaultContent: string = '{}') {
  if (!fs.existsSync(path.dirname(filePath))) {
    fs.mkdirSync(path.dirname(filePath), { recursive: true })
  }
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, defaultContent)
  }
}

// 读取数据
function readData<T>(filePath: string): T {
  ensureFile(filePath)
  const data = fs.readFileSync(filePath, 'utf-8')
  return JSON.parse(data)
}

// 写入数据
function writeData<T>(filePath: string, data: T): void {
  ensureFile(filePath)
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2))
}

// Posts 操作
export const postsDb = {
  getAll: () => {
    const data = readData<{ posts: Post[] }>(POSTS_FILE)
    return data.posts || []
  },

  getById: (id: string) => {
    const posts = postsDb.getAll()
    return posts.find(post => post.id === id)
  },

  create: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const posts = postsDb.getAll()
    const newPost: Post = {
      ...post,
      id: Math.random().toString(36).substr(2, 9),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    writeData(POSTS_FILE, { posts: [...posts, newPost] })
    return newPost
  },

  update: (id: string, data: Partial<Post>) => {
    const posts = postsDb.getAll()
    const index = posts.findIndex(post => post.id === id)
    if (index === -1) return null

    const updatedPost = {
      ...posts[index],
      ...data,
      updatedAt: new Date().toISOString(),
    }
    posts[index] = updatedPost
    writeData(POSTS_FILE, { posts })
    return updatedPost
  },

  delete: (id: string) => {
    const posts = postsDb.getAll()
    const filteredPosts = posts.filter(post => post.id !== id)
    writeData(POSTS_FILE, { posts: filteredPosts })
  },
}

// Users 操作
export const usersDb = {
  getByEmail: (email: string) => {
    const data = readData<{ users: User[] }>(USERS_FILE)
    return (data.users || []).find(user => user.email === email)
  },

  create: (user: Omit<User, 'id'>) => {
    const data = readData<{ users: User[] }>(USERS_FILE)
    const users = data.users || []
    const newUser: User = {
      ...user,
      id: Math.random().toString(36).substr(2, 9),
    }
    writeData(USERS_FILE, { users: [...users, newUser] })
    return newUser
  },
}
