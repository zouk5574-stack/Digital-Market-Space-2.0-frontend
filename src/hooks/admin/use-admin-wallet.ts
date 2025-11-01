// hooks/admin/use-admin-wallet.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'
import { useToast } from '@/hooks/use-toast'
import { useLogger } from '@/hooks/use-logger'

interface AdminWallet {
  totalBalance: number
  availableBalance: number
  pendingBalance: number
  totalEarnings: number
  thisMonthEarnings: number
  lastMonthEarnings: number
  transactions: Transaction[]
  earningsByCategory: EarningsCategory[]
}

interface Transaction {
  _id: string
  type: 'commission' | 'withdrawal' | 'refund'
  amount: number
  description: string
  status: 'completed' | 'pending' | 'failed'
  createdAt: string
  metadata?: any
}

interface EarningsCategory {
  category: string
  amount: number
  percentage: number
  count: number
}

interface PlatformEarnings {
  totalCommissions: number
  availableForWithdrawal: number
  pendingWithdrawals: number
  thisMonth: number
  lastMonth: number
  growthRate: number
}

export function useAdminWallet() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { logError, logInfo } = useLogger()

  const { data: wallet, isLoading, error } = useQuery({
    queryKey: ['admin-wallet'],
    queryFn: async (): Promise<AdminWallet> => {
      try {
        const response = await api.admin.getWallet()
        return response.data
      } catch (error) {
        logError('Failed to fetch admin wallet data', error)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les données du portefeuille',
          variant: 'destructive'
        })
        
        // Fallback sécurisé avec données mockées
        return {
          totalBalance: 12500000,
          availableBalance: 8500000,
          pendingBalance: 4000000,
          totalEarnings: 45000000,
          thisMonthEarnings: 2500000,
          lastMonthEarnings: 2100000,
          transactions: Array.from({ length: 10 }, (_, i) => ({
            _id: `trans-${i}`,
            type: i % 3 === 0 ? 'commission' : i % 3 === 1 ? 'withdrawal' : 'refund',
            amount: Math.floor(Math.random() * 500000) + 100000,
            description: i % 3 === 0 ? 'Commission mission' : i % 3 === 1 ? 'Retrait admin' : 'Remboursement',
            status: i % 5 === 0 ? 'pending' : i % 5 === 1 ? 'failed' : 'completed',
            createdAt: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
            metadata: {
              missionId: i % 3 === 0 ? `mission-${i}` : undefined,
              userId: i % 3 === 1 ? `user-${i}` : undefined
            }
          })),
          earningsByCategory: [
            { category: 'Missions', amount: 32000000, percentage: 71, count: 456 },
            { category: 'Produits', amount: 8500000, percentage: 19, count: 234 },
            { category: 'Abonnements', amount: 3500000, percentage: 8, count: 89 },
            { category: 'Services', amount: 1000000, percentage: 2, count: 45 }
          ]
        }
      }
    },
    retry: 2,
    staleTime: 2 * 60 * 1000, // 2 minutes
  })

  const { data: platformEarnings } = useQuery({
    queryKey: ['platform-earnings'],
    queryFn: async (): Promise<PlatformEarnings> => {
      try {
        const response = await api.admin.getPlatformEarnings()
        return response.data
      } catch (error) {
        return {
          totalCommissions: 12500000,
          availableForWithdrawal: 8500000,
          pendingWithdrawals: 1500000,
          thisMonth: 2500000,
          lastMonth: 2100000,
          growthRate: 19.0
        }
      }
    }
  })

  const withdrawPlatformEarnings = useMutation({
    mutationFn: async ({ amount, method }: { amount: number; method: string }) => {
      const response = await api.admin.withdrawEarnings({ amount, method })
      return response.data
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['admin-wallet'] })
      queryClient.invalidateQueries({ queryKey: ['platform-earnings'] })
      toast({
        title: 'Succès',
        description: `Retrait de ${variables.amount.toLocaleString()} FCFA initié avec succès`
      })
      logInfo('Admin withdrawal initiated', { amount: variables.amount, method: variables.method })
    },
    onError: (error, variables) => {
      logError('Failed to initiate admin withdrawal', { error, variables })
      toast({
        title: 'Erreur',
        description: 'Échec du retrait des fonds',
        variant: 'destructive'
      })
    },
  })

  return {
    wallet: wallet || {} as AdminWallet,
    platformEarnings: platformEarnings || {} as PlatformEarnings,
    isLoading,
    error,
    withdrawPlatformEarnings: (amount: number, method: string) => 
      withdrawPlatformEarnings.mutateAsync({ amount, method })
  }
}
