// src/app/layout.tsx
import './globals.css'
import React from 'react'
import { ThemeProvider } from '@/components/theme/theme-provider'
import MainHeader from '@/components/layout/MainHeader'
import Footer from '@/components/layout/Footer'

export const metadata = {
  title: 'Digital Market Space',
  description: 'Market place for digital products and freelance missions'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider>
          <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
            <MainHeader />
            <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              {children}
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}
