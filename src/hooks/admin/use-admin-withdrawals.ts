// hooks/admin/use-admin-withdrawals.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface WithdrawalFilters {
  status?: string
  paymentMethod?: string
  dateRange?: string
}

export function useAdminWithdrawals(filters: WithdrawalFilters) {
  return useQuery({
    queryKey: ['admin-withdrawals', filters],
    queryFn: async () => {
      try {
        const response = await api.admin.getWithdrawals(filters)
        return response.data
      } catch (error) {
        // Fallback to mock data
        return {
          data: Array.from({ length: 15 }, (_, i) => ({
            _id: `withdrawal-${i}`,
            userId: `user-${i}`,
            user: {
              _id: `user-${i}`,
              firstName: `User${i}`,
              lastName: `Test${i}`,
              email: `user${i}@example.com`,
            },
            amount: Math.floor(Math.random() * 50000) + 5000,
            paymentMethod: ['mobile_money', 'bank_transfer', 'crypto'][i % 3],
            paymentDetails: {
              phoneNumber: `+123456789${i}`,
              provider: i % 3 === 0 ? 'Orange Money' : i % 3 === 1 ? 'MTN Mobile Money' : 'Wave'
            },
            status: ['pending', 'processing', 'completed', 'rejected'][i % 4],
            rejectionReason: i % 4 === 3 ? 'Informations bancaires incorrectes' : undefined,
            createdAt: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
            updatedAt: new Date().toISOString(),
            processedAt: i % 4 === 2 ? new Date().toISOString() : undefined,
          })),
          pagination: {
            page: 1,
            limit: 15,
            total: 15,
            pages: 1
          }
        }
      }
    },
  })
}

export function useProcessWithdrawal() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ withdrawalId, action, reason }: { 
      withdrawalId: string; 
      action: 'approve' | 'reject';
      reason?: string;
    }) =>
      api.admin.processWithdrawal(withdrawalId, { 
        action, 
        ...(reason && { rejectionReason: reason }) 
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-withdrawals'] })
    },
  })
}
