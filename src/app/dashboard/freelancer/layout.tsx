// app/dashboard/freelancer/layout.tsx
'use client'

import { useAuth } from '@/hooks/use-auth'
import { FreelancerSidebar } from '@/components/dashboard/freelancer/freelancer-sidebar'
import { DashboardHeader } from '@/components/dashboard/freelancer/dashboard-header'
import { LoadingSpinner } from '@/components/atomic/loading-spinner'
import { redirect } from 'next/navigation'

interface FreelancerLayoutProps {
  children: React.ReactNode
}

export default function FreelancerLayout({ children }: FreelancerLayoutProps) {
  const { user, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="xl" />
      </div>
    )
  }

  if (!user || (user.role !== 'freelancer' && user.role !== 'admin')) {
    redirect('/auth/login')
  }

  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 to-purple-50/30">
      {/* Sidebar Vendeur */}
      <FreelancerSidebar />
      
      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader />
        
        {/* Page content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
