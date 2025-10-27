// hooks/admin/use-admin-users.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface UserFilters {
  role?: string
  status?: string
  search?: string
  dateRange?: string
}

export function useAdminUsers(filters: UserFilters) {
  return useQuery({
    queryKey: ['admin-users', filters],
    queryFn: async () => {
      try {
        const response = await api.admin.getUsers(filters)
        return response.data
      } catch (error) {
        // Fallback to mock data
        return {
          data: Array.from({ length: 50 }, (_, i) => ({
            _id: `user-${i}`,
            firstName: `User${i}`,
            lastName: `Test${i}`,
            email: `user${i}@example.com`,
            role: i % 3 === 0 ? 'client' : i % 3 === 1 ? 'freelancer' : 'admin',
            walletBalance: Math.floor(Math.random() * 100000),
            isEmailVerified: Math.random() > 0.2,
            phoneNumber: `+123456789${i}`,
            skills: i % 3 === 1 ? ['Design', 'Development'] : [],
            companyName: i % 3 === 0 ? `Company ${i}` : undefined,
            createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            updatedAt: new Date().toISOString(),
          })),
          pagination: {
            page: 1,
            limit: 50,
            total: 50,
            pages: 1
          }
        }
      }
    },
  })
}

export function useUpdateUserStatus() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userId, status }: { userId: string; status: string }) =>
      api.admin.updateUserStatus(userId, { status }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}

export function useBulkUserActions() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ userIds, action }: { userIds: string[]; action: string }) =>
      Promise.all(userIds.map(userId => 
        api.admin.updateUserStatus(userId, { status: action })
      )),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-users'] })
    },
  })
}
