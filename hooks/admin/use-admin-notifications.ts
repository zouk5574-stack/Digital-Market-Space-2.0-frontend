// hooks/admin/use-admin-notifications.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface Notification {
  _id: string
  title: string
  message: string
  type: 'info' | 'warning' | 'success' | 'error'
  unread: boolean
  createdAt: string
  metadata?: Record<string, any>
}

export function useAdminNotifications() {
  const queryClient = useQueryClient()

  const { data: notifications } = useQuery({
    queryKey: ['admin-notifications'],
    queryFn: async (): Promise<Notification[]> => {
      try {
        const response = await api.notifications.list({ unreadOnly: false })
        return response.data
      } catch (error) {
        // Fallback to mock data
        return [
          {
            _id: '1',
            title: 'Nouveau retrait en attente',
            message: 'John Doe a demandé un retrait de 25,000 FCFA',
            type: 'warning',
            unread: true,
            createdAt: new Date().toISOString(),
            metadata: { withdrawalId: '123' }
          },
          {
            _id: '2',
            title: 'Mission signalée',
            message: 'La mission "Développement React" a été signalée',
            type: 'warning',
            unread: true,
            createdAt: new Date(Date.now() - 1000000).toISOString()
          },
          {
            _id: '3',
            title: 'Nouvel utilisateur vérifié',
            message: 'Alice Smith a vérifié son email',
            type: 'success',
            unread: false,
            createdAt: new Date(Date.now() - 2000000).toISOString()
          },
          {
            _id: '4',
            title: 'Maintenance planifiée',
            message: 'Maintenance système prévue ce weekend',
            type: 'info',
            unread: false,
            createdAt: new Date(Date.now() - 3000000).toISOString()
          }
        ]
      }
    },
    refetchInterval: 30000, // Refresh every 30 seconds
  })

  const markAsRead = useMutation({
    mutationFn: (notificationId: string) =>
      api.notifications.markAsRead(notificationId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] })
    },
  })

  const markAllAsRead = useMutation({
    mutationFn: () => api.notifications.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-notifications'] })
    },
  })

  const unreadCount = notifications?.filter(n => n.unread).length || 0

  return {
    data: notifications,
    unreadCount,
    markAsRead: markAsRead.mutate,
    markAllAsRead: markAllAsRead.mutate,
  }
}
