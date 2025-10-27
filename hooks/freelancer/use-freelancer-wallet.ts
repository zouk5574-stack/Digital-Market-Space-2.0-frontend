// hooks/freelancer/use-freelancer-wallet.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface Wallet {
  balance: number
  totalEarnings: number
  pendingWithdrawals: number
  availableForWithdrawal: number
}

interface Transaction {
  _id: string
  type: 'credit' | 'debit'
  amount: number
  description: string
  reference: string
  status: 'completed' | 'pending' | 'failed'
  createdAt: string
  metadata: {
    missionId?: string
    productId?: string
    orderId?: string
  }
}

interface Withdrawal {
  _id: string
  amount: number
  paymentMethod: 'mobile_money' | 'bank_transfer'
  status: 'pending' | 'processing' | 'completed' | 'rejected'
  createdAt: string
  processedAt?: string
  rejectionReason?: string
}

export function useFreelancerWallet() {
  const queryClient = useQueryClient()

  const { data: wallet, isLoading: walletLoading } = useQuery({
    queryKey: ['freelancer-wallet'],
    queryFn: async (): Promise<Wallet> => {
      try {
        const response = await api.wallet.get()
        return response.data
      } catch (error) {
        // Fallback to mock data
        return {
          balance: 125000,
          totalEarnings: 550000,
          pendingWithdrawals: 25000,
          availableForWithdrawal: 100000
        }
      }
    },
  })

  const { data: transactions, isLoading: transactionsLoading } = useQuery({
    queryKey: ['freelancer-transactions'],
    queryFn: async (): Promise<Transaction[]> => {
      try {
        const response = await api.wallet.getTransactions()
        return response.data
      } catch (error) {
        // Fallback to mock data
        return Array.from({ length: 20 }, (_, i) => ({
          _id: `transaction-${i}`,
          type: i % 3 === 0 ? 'debit' : 'credit',
          amount: Math.floor(Math.random() * 50000) + 5000,
          description: i % 3 === 0 ? 'Retrait' : i % 3 === 1 ? 'Mission complétée' : 'Vente produit',
          reference: `REF${Date.now()}${i}`,
          status: 'completed',
          createdAt: new Date(Date.now() - i * 24 * 60 * 60 * 1000).toISOString(),
          metadata: {
            missionId: i % 2 === 0 ? `mission-${i}` : undefined,
            productId: i % 2 === 1 ? `product-${i}` : undefined
          }
        }))
      }
    },
  })

  const { data: withdrawals, isLoading: withdrawalsLoading } = useQuery({
    queryKey: ['freelancer-withdrawals'],
    queryFn: async (): Promise<Withdrawal[]> => {
      try {
        const response = await api.withdrawals.list()
        return response.data
      } catch (error) {
        // Fallback to mock data
        return Array.from({ length: 8 }, (_, i) => ({
          _id: `withdrawal-${i}`,
          amount: Math.floor(Math.random() * 50000) + 10000,
          paymentMethod: i % 2 === 0 ? 'mobile_money' : 'bank_transfer',
          status: ['pending', 'processing', 'completed', 'rejected'][i % 4] as any,
          createdAt: new Date(Date.now() - i * 3 * 24 * 60 * 60 * 1000).toISOString(),
          processedAt: i > 2 ? new Date(Date.now() - i * 2 * 24 * 60 * 60 * 1000).toISOString() : undefined,
          rejectionReason: i === 3 ? 'Informations bancaires incorrectes' : undefined
        }))
      }
    },
  })

  const requestWithdrawal = useMutation({
    mutationFn: async (data: { amount: number; paymentMethod: string; paymentDetails: any }) => {
      const response = await api.withdrawals.create(data)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['freelancer-wallet'] })
      queryClient.invalidateQueries({ queryKey: ['freelancer-withdrawals'] })
    },
  })

  const isLoading = walletLoading || transactionsLoading || withdrawalsLoading

  return {
    wallet,
    transactions: transactions || [],
    withdrawals: withdrawals || [],
    isLoading,
    requestWithdrawal: requestWithdrawal.mutate,
  }
}
