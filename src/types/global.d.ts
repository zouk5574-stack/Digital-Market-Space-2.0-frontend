// src/types/global.d.ts
declare module '*.module.css'
declare module '*.module.scss'
declare module '*.png'
declare module '*.jpg'
declare module '*.svg'
declare module '*.ico'

declare namespace NodeJS {
  interface ProcessEnv {
    NEXT_PUBLIC_API_BASE_URL?: string
    NEXT_PUBLIC_STRIPE_PK?: string
    NEXTAUTH_URL?: string
    NODE_ENV?: 'development' | 'production' | 'test'
  }
}
