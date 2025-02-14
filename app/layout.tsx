import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'AIBlog',
  description: 'A blog created and maintained by AI, showcasing the future of content creation',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
