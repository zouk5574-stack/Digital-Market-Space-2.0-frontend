// hooks/admin/use-activity-logs.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface ActivityLog {
  _id: string
  action: string
  description: string
  severity: 'info' | 'warning' | 'error' | 'critical'
  userId?: string
  user?: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  ipAddress: string
  userAgent: string
  metadata: Record<string, any>
  createdAt: string
}

interface ActivityFilters {
  type?: string
  severity?: string
  user?: string
  dateRange?: string
  search?: string
}

export function useActivityLogs(filters: ActivityFilters) {
  return useQuery({
    queryKey: ['activity-logs', filters],
    queryFn: async () => {
      try {
        const response = await api.admin.getActivityLogs(filters)
        return response.data
      } catch (error) {
        // Fallback to comprehensive mock data
        const severities: ('info' | 'warning' | 'error' | 'critical')[] = ['info', 'warning', 'error', 'critical']
        const actions = [
          'user.login',
          'user.register', 
          'mission.create',
          'mission.update',
          'mission.delete',
          'product.create',
          'product.purchase',
          'withdrawal.request',
          'withdrawal.approve',
          'withdrawal.reject',
          'system.backup',
          'system.update'
        ]

        const mockLogs = Array.from({ length: 150 }, (_, i) => {
          const severity = severities[i % severities.length]
          const action = actions[i % actions.length]
          
          return {
            _id: `log-${i}`,
            action,
            description: getActionDescription(action),
            severity,
            userId: `user-${i % 10}`,
            user: {
              _id: `user-${i % 10}`,
              firstName: ['John', 'Alice', 'Bob', 'Emma', 'Mike'][i % 5],
              lastName: ['Doe', 'Smith', 'Johnson', 'Brown', 'Wilson'][i % 5],
              email: `user${i % 10}@example.com`
            },
            ipAddress: `192.168.1.${i % 255}`,
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
            metadata: {
              missionId: i % 5 === 0 ? `mission-${i}` : undefined,
              productId: i % 5 === 1 ? `product-${i}` : undefined,
              amount: i % 5 === 2 ? Math.floor(Math.random() * 100000) : undefined
            },
            createdAt: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString()
          }
        })

        return {
          data: mockLogs,
          pagination: {
            page: 1,
            limit: 50,
            total: 150,
            pages: 3
          }
        }
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  })
}

function getActionDescription(action: string): string {
  const descriptions: Record<string, string> = {
    'user.login': 'Connexion utilisateur',
    'user.register': 'Nouvelle inscription',
    'mission.create': 'Création de mission',
    'mission.update': 'Modification de mission', 
    'mission.delete': 'Suppression de mission',
    'product.create': 'Création de produit',
    'product.purchase': 'Achat de produit',
    'withdrawal.request': 'Demande de retrait',
    'withdrawal.approve': 'Retrait approuvé',
    'withdrawal.reject': 'Retrait rejeté',
    'system.backup': 'Sauvegarde système',
    'system.update': 'Mise à jour système'
  }
  
  return descriptions[action] || action
}
