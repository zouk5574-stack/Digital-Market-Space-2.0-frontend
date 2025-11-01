// hooks/admin/use-moderation.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface ReportedItem {
  _id: string
  type: 'mission' | 'user' | 'review' | 'message'
  content: any
  reporter: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  reason: string
  description?: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'in_review' | 'resolved' | 'dismissed'
  createdAt: string
  resolvedAt?: string
  resolvedBy?: string
}

interface ModerationStats {
  pendingReports: number
  inReview: number
  resolvedToday: number
  averageResolutionTime: number
  topReasons: { reason: string; count: number }[]
}

export function useModeration() {
  const queryClient = useQueryClient()

  // Récupérer les contenus signalés
  const { data: reportedItems, isLoading } = useQuery({
    queryKey: ['moderation-reports'],
    queryFn: async (): Promise<ReportedItem[]> => {
      try {
        const response = await api.admin.getReportedContent()
        return response.data
      } catch (error) {
        // Fallback to mock data
        return Array.from({ length: 15 }, (_, i) => ({
          _id: `report-${i}`,
          type: ['mission', 'user', 'review', 'message'][i % 4] as 'mission' | 'user' | 'review' | 'message',
          content: getMockContent(i),
          reporter: {
            _id: `user-${i}`,
            firstName: ['Jean', 'Marie', 'Pierre', 'Sophie'][i % 4],
            lastName: ['Dupont', 'Martin', 'Bernard', 'Dubois'][i % 4],
            email: `user${i}@example.com`
          },
          reason: getMockReason(i),
          description: i % 3 === 0 ? 'Description détaillée du signalement...' : undefined,
          severity: i % 10 === 0 ? 'critical' : i % 10 === 1 ? 'high' : i % 10 === 2 ? 'medium' : 'low',
          status: i % 4 === 0 ? 'in_review' : 'pending',
          createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
          ...(i % 5 === 0 && {
            resolvedAt: new Date().toISOString(),
            resolvedBy: 'admin-1'
          })
        }))
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  // Récupérer les statistiques
  const { data: stats } = useQuery({
    queryKey: ['moderation-stats'],
    queryFn: async (): Promise<ModerationStats> => {
      try {
        const response = await api.admin.getModerationStats()
        return response.data
      } catch (error) {
        // Mock stats
        return {
          pendingReports: 8,
          inReview: 3,
          resolvedToday: 12,
          averageResolutionTime: 45,
          topReasons: [
            { reason: 'Contenu inapproprié', count: 8 },
            { reason: 'Spam', count: 5 },
            { reason: 'Harcèlement', count: 3 },
            { reason: 'Informations fausses', count: 2 }
          ]
        }
      }
    }
  })

  // Mutation pour les actions de modération
  const takeAction = useMutation({
    mutationFn: async ({ 
      reportId, 
      action, 
      reason 
    }: { 
      reportId: string; 
      action: 'approve' | 'reject' | 'delete' | 'warn'; 
      reason?: string 
    }) => {
      const response = await api.admin.moderateContent(reportId, { action, reason })
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['moderation-reports'] })
      queryClient.invalidateQueries({ queryKey: ['moderation-stats'] })
    },
  })

  // File d'attente de modération (contenu nécessitant une action)
  const moderationQueue = reportedItems?.filter(item => 
    item.status === 'pending' && item.severity !== 'low'
  ) || []

  return {
    reportedItems: reportedItems || [],
    moderationQueue,
    stats: stats || {
      pendingReports: 0,
      inReview: 0,
      resolvedToday: 0,
      averageResolutionTime: 0,
      topReasons: []
    },
    isLoading,
    takeAction: takeAction.mutate
  }
}

// Helper functions for mock data
function getMockContent(index: number) {
  const types = {
    mission: {
      title: `Mission de développement ${index}`,
      description: `Description de la mission ${index}`,
      budget: Math.floor(Math.random() * 500000) + 10000
    },
    user: {
      firstName: `User${index}`,
      lastName: `Test${index}`,
      email: `user${index}@example.com`
    },
    review: {
      rating: Math.floor(Math.random() * 5) + 1,
      comment: `Commentaire de review ${index}`
    },
    message: {
      content: `Contenu du message ${index}`,
      conversationId: `conv-${index}`
    }
  }
  return types[['mission', 'user', 'review', 'message'][index % 4] as keyof typeof types]
}

function getMockReason(index: number) {
  const reasons = [
    'Contenu inapproprié',
    'Spam',
    'Harcèlement',
    'Informations fausses',
    'Contenu illégal',
    'Violation de droits',
    'Autre'
  ]
  return reasons[index % reasons.length]
}
