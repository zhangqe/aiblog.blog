import { Metadata } from 'next'
import { LoginForm } from '@/components/auth/login-form'

export const metadata: Metadata = {
  title: '管理员登录 | AI博客',
  description: '管理员登录页面',
}

export default function LoginPage() {
  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            管理员登录
          </h1>
          <p className="text-sm text-muted-foreground">
            请输入您的管理员账号密码
          </p>
        </div>
        <LoginForm />
      </div>
    </div>
  )
}
