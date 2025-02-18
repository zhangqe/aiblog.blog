import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { postsDb } from '@/lib/fs-db'
import { authOptions } from '@/lib/auth'

export async function GET() {
  try {
    const posts = postsDb.getAll().filter(post => post.published)
    return NextResponse.json(posts)
  } catch {
    return NextResponse.json(
      { error: 'Failed to fetch posts' },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const json = await request.json()
    const post = postsDb.create({
      title: json.title,
      content: json.content,
      excerpt: json.excerpt,
      published: json.published,
      authorId: session.user.id,
    })

    return NextResponse.json(post)
  } catch {
    return NextResponse.json(
      { error: 'Failed to create post' },
      { status: 500 }
    )
  }
}
