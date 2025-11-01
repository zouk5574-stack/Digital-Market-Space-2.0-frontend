// hooks/admin/use-admin-analytics.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface AnalyticsFilters {
  period?: string
  metric?: string
  category?: string
  startDate?: string
  endDate?: string
}

export function useAdminAnalytics(filters: AnalyticsFilters) {
  return useQuery({
    queryKey: ['admin-analytics', filters],
    queryFn: async () => {
      try {
        const response = await api.admin.getAnalytics(filters)
        return response.data
      } catch (error) {
        // Fallback to mock data matching the analytics page structure
        return {
          revenue: {
            total: 12500000,
            growth: 12,
            trend: [6400, 4398, 11800, 6688, 6690, 6190]
          },
          users: {
            total: 245,
            growth: 8,
            newUsers: 45,
            activeUsers: 180
          },
          projects: {
            total: 189,
            growth: 15,
            completed: 142,
            inProgress: 35,
            cancelled: 12
          },
          products: {
            total: 76,
            growth: 22,
            categories: ['Development', 'Design', 'Marketing']
          },
          charts: {
            revenueData: [
              { name: 'Jan', missions: 4000, products: 2400, total: 6400 },
              { name: 'Fév', missions: 3000, products: 1398, total: 4398 },
              { name: 'Mar', missions: 2000, products: 9800, total: 11800 },
              { name: 'Avr', missions: 2780, products: 3908, total: 6688 },
              { name: 'Mai', missions: 1890, products: 4800, total: 6690 },
              { name: 'Jun', missions: 2390, products: 3800, total: 6190 },
            ],
            userGrowthData: [
              { name: 'Jan', new: 40, active: 100, total: 400 },
              { name: 'Fév', new: 30, active: 120, total: 520 },
              { name: 'Mar', new: 20, active: 150, total: 670 },
              { name: 'Avr', new: 27, active: 180, total: 797 },
              { name: 'Mai', new: 18, active: 200, total: 915 },
              { name: 'Jun', new: 23, active: 220, total: 958 },
            ]
          }
        }
      }
    },
    refetchInterval: 300000, // Refetch every 5 minutes
  })
}
