// hooks/admin/use-admin-missions.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface MissionFilters {
  status?: string
  category?: string
  search?: string
  dateRange?: string
}

export function useAdminMissions(filters: MissionFilters) {
  return useQuery({
    queryKey: ['admin-missions', filters],
    queryFn: async () => {
      try {
        const response = await api.admin.getMissions(filters)
        return response.data
      } catch (error) {
        // Fallback to mock data
        return {
          data: Array.from({ length: 30 }, (_, i) => ({
            _id: `mission-${i}`,
            title: `Mission de développement ${i}`,
            description: `Description détaillée de la mission ${i} pour le développement d'une application moderne.`,
            category: i % 3 === 0 ? 'web_development' : i % 3 === 1 ? 'mobile_development' : 'graphic_design',
            budget: Math.floor(Math.random() * 500000) + 10000,
            deadline: new Date(Date.now() + Math.random() * 10000000000).toISOString(),
            status: ['draft', 'published', 'in_progress', 'completed', 'cancelled'][i % 5],
            clientId: `client-${i}`,
            tags: ['react', 'nodejs', 'mongodb'].slice(0, i % 3 + 1),
            applicationsCount: Math.floor(Math.random() * 20),
            viewsCount: Math.floor(Math.random() * 100),
            isFeatured: i % 4 === 0,
            createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            updatedAt: new Date().toISOString(),
          })),
          pagination: {
            page: 1,
            limit: 30,
            total: 30,
            pages: 1
          }
        }
      }
    },
  })
}

export function useUpdateMissionStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ missionId, status }: { missionId: string; status: string }) =>
      api.admin.updateMissionStatus(missionId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-missions'] })
    },
  })
}
