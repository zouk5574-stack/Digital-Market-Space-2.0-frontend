// hooks/admin/use-admin-stats.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface AdminStats {
  totalUsers: number
  activeMissions: number
  totalProducts: number
  totalRevenue: number
  pendingWithdrawals: number
  reportedIssues: number
  newUsersToday: number
  completedMissions: number
  platformEarnings: number
}

export function useAdminStats() {
  return useQuery({
    queryKey: ['admin-stats'],
    queryFn: async (): Promise<AdminStats> => {
      try {
        // Appel réel au backend
        const response = await api.admin.getDashboard()
        return response.data
      } catch (error) {
        // Fallback vers des données mockées si l'API n'est pas encore disponible
        console.warn('Admin stats API not available, using mock data')
        return {
          totalUsers: 3250,
          activeMissions: 1247,
          totalProducts: 892,
          totalRevenue: 12500000,
          pendingWithdrawals: 23,
          reportedIssues: 8,
          newUsersToday: 45,
          completedMissions: 5843,
          platformEarnings: 1250000
        }
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
    staleTime: 10000, // Consider data stale after 10 seconds
  })
}
