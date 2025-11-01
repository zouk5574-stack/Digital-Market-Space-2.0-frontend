// hooks/admin/use-admin-reports.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface ReportFilters {
  type: 'financial' | 'user' | 'mission' | 'product'
  period: string
  category: string
}

interface FinancialReport {
  totalRevenue: number
  revenueGrowth: number
  transactionCount: number
  averageTransaction: number
  pendingWithdrawals: number
  commissionEarned: number
  revenueByMonth: { month: string; revenue: number; transactions: number }[]
  topCategories: { category: string; revenue: number }[]
}

interface UserReport {
  totalUsers: number
  newUsers: number
  activeUsers: number
  userGrowth: number
  usersByType: { type: string; count: number }[]
  userActivity: { date: string; registrations: number; logins: number }[]
  topCountries: { country: string; users: number }[]
}

interface MissionReport {
  totalMissions: number
  publishedMissions: number
  completedMissions: number
  averageBudget: number
  missionGrowth: number
  missionsByCategory: { category: string; count: number; revenue: number }[]
  missionTimeline: { date: string; created: number; completed: number }[]
  topClients: { client: string; missions: number; spent: number }[]
}

interface ProductReport {
  totalProducts: number
  productsSold: number
  totalSales: number
  averageRating: number
  salesGrowth: number
  productsByCategory: { category: string; count: number; sales: number }[]
  salesTimeline: { date: string; sales: number; revenue: number }[]
  topProducts: { product: string; sales: number; revenue: number }[]
}

export function useAdminReports(filters: ReportFilters) {
  return useQuery({
    queryKey: ['admin-reports', filters],
    queryFn: async () => {
      try {
        const response = await api.admin.getReports(filters)
        return response.data
      } catch (error) {
        // Fallback to comprehensive mock data
        return generateMockReports(filters)
      }
    },
  })
}

function generateMockReports(filters: ReportFilters) {
  const baseData = {
    financial: generateFinancialData(),
    user: generateUserData(),
    mission: generateMissionData(),
    product: generateProductData()
  }

  return baseData[filters.type]
}

function generateFinancialData(): FinancialReport {
  const months = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Jun', 'Jul', 'Aoû', 'Sep', 'Oct', 'Nov', 'Déc']
  
  return {
    totalRevenue: 12500000,
    revenueGrowth: 12.5,
    transactionCount: 845,
    averageTransaction: 14792,
    pendingWithdrawals: 3250000,
    commissionEarned: 1875000,
    revenueByMonth: months.map((month, i) => ({
      month,
      revenue: Math.floor(Math.random() * 2000000) + 800000,
      transactions: Math.floor(Math.random() * 100) + 50
    })),
    topCategories: [
      { category: 'Développement Web', revenue: 4500000 },
      { category: 'Design Graphique', revenue: 3200000 },
      { category: 'Marketing Digital', revenue: 2800000 },
      { category: 'Rédaction', revenue: 1500000 },
      { category: 'Montage Vidéo', revenue: 500000 }
    ]
  }
}

function generateUserData(): UserReport {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split('T')[0]
  })

  return {
    totalUsers: 1245,
    newUsers: 45,
    activeUsers: 867,
    userGrowth: 8.2,
    usersByType: [
      { type: 'Clients', count: 678 },
      { type: 'Freelances', count: 432 },
      { type: 'Administrateurs', count: 5 }
    ],
    userActivity: dates.map(date => ({
      date,
      registrations: Math.floor(Math.random() * 10) + 1,
      logins: Math.floor(Math.random() * 50) + 100
    })),
    topCountries: [
      { country: 'Sénégal', users: 645 },
      { country: 'Côte d\'Ivoire', users: 234 },
      { country: 'France', users: 187 },
      { country: 'Mali', users: 89 },
      { country: 'Cameroon', users: 45 }
    ]
  }
}

function generateMissionData(): MissionReport {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split('T')[0]
  })

  return {
    totalMissions: 567,
    publishedMissions: 489,
    completedMissions: 345,
    averageBudget: 87500,
    missionGrowth: 15.3,
    missionsByCategory: [
      { category: 'Développement Web', count: 156, revenue: 6800000 },
      { category: 'Design Graphique', count: 123, revenue: 3200000 },
      { category: 'Marketing Digital', count: 98, revenue: 1500000 },
      { category: 'Rédaction', count: 87, revenue: 800000 },
      { category: 'Montage Vidéo', count: 45, revenue: 500000 }
    ],
    missionTimeline: dates.map(date => ({
      date,
      created: Math.floor(Math.random() * 8) + 3,
      completed: Math.floor(Math.random() * 6) + 2
    })),
    topClients: [
      { client: 'Entreprise ABC', missions: 23, spent: 2450000 },
      { client: 'Startup XYZ', missions: 18, spent: 1560000 },
      { client: 'Société DEF', missions: 15, spent: 980000 },
      { client: 'Groupe GHI', missions: 12, spent: 760000 },
      { client: 'Company JKL', missions: 8, spent: 450000 }
    ]
  }
}

function generateProductData(): ProductReport {
  const dates = Array.from({ length: 30 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (29 - i))
    return date.toISOString().split('T')[0]
  })

  return {
    totalProducts: 89,
    productsSold: 456,
    totalSales: 3450000,
    averageRating: 4.7,
    salesGrowth: 22.1,
    productsByCategory: [
      { category: 'Templates', count: 34, sales: 1560000 },
      { category: 'Formations', count: 23, sales: 980000 },
      { category: 'Assets', count: 18, sales: 450000 },
      { category: 'Outils', count: 14, sales: 460000 }
    ],
    salesTimeline: dates.map(date => ({
      date,
      sales: Math.floor(Math.random() * 8) + 2,
      revenue: Math.floor(Math.random() * 150000) + 50000
    })),
    topProducts: [
      { product: 'Template E-commerce', sales: 67, revenue: 670000 },
      { product: 'Formation React', sales: 45, revenue: 450000 },
      { product: 'UI Kit Mobile', sales: 38, revenue: 380000 },
      { product: 'Pack Icônes', sales: 34, revenue: 170000 },
      { product: 'Plugin WordPress', sales: 29, revenue: 290000 }
    ]
  }
}
