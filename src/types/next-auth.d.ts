declare module "next-auth" {
  interface Session {
    user: {
      id: string
      name: string | null
      email: string
      role: string
    }
  }

  interface User {
    id: string
    name: string | null
    email: string
    role: string
  }
}
