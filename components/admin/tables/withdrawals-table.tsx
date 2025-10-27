// components/admin/tables/withdrawals-table.tsx
'use client'

import { useState } from 'react'
import { Withdrawal } from '@/types'
import { AdvancedTable } from '@/components/atomic/advanced-table'
import { WithdrawalStatusBadge } from '@/components/admin/badges/withdrawal-status-badge'
import { WithdrawalActions } from '@/components/admin/actions/withdrawal-actions'
import { LoadingSpinner } from '@/components/atomic/loading-spinner'
import { motion } from 'framer-motion'
import { useProcessWithdrawal } from '@/hooks/admin/use-admin-withdrawals'

interface WithdrawalsTableProps {
  withdrawals: Withdrawal[]
  isLoading: boolean
  onWithdrawalUpdate: () => void
}

export function WithdrawalsTable({ 
  withdrawals, 
  isLoading, 
  onWithdrawalUpdate 
}: WithdrawalsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const processWithdrawal = useProcessWithdrawal()

  const handleProcessWithdrawal = async (
    withdrawalId: string, 
    action: 'approve' | 'reject', 
    reason?: string
  ) => {
    try {
      await processWithdrawal.mutateAsync({ withdrawalId, action, reason })
      onWithdrawalUpdate()
    } catch (error) {
      console.error('Error processing withdrawal:', error)
    }
  }

  const columns = [
    {
      key: 'user',
      header: 'Utilisateur',
      cell: (withdrawal: Withdrawal) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {withdrawal.user?.firstName?.[0]}{withdrawal.user?.lastName?.[0]}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-900 truncate">
              {withdrawal.user?.firstName} {withdrawal.user?.lastName}
            </p>
            <p className="text-sm text-slate-500 truncate">{withdrawal.user?.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'amount',
      header: 'Montant',
      cell: (withdrawal: Withdrawal) => (
        <div className="text-right">
          <p className="font-bold text-slate-900 text-lg">
            {withdrawal.amount.toLocaleString()} FCFA
          </p>
        </div>
      ),
    },
    {
      key: 'method',
      header: 'Méthode',
      cell: (withdrawal: Withdrawal) => (
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${withdrawal.paymentMethod === 'mobile_money' ? 'bg-purple-100 text-purple-800' : ''}
          ${withdrawal.paymentMethod === 'bank_transfer' ? 'bg-blue-100 text-blue-800' : ''}
          ${withdrawal.paymentMethod === 'crypto' ? 'bg-orange-100 text-orange-800' : ''}
        `}>
          {withdrawal.paymentMethod === 'mobile_money' && '📱 Mobile Money'}
          {withdrawal.paymentMethod === 'bank_transfer' && '🏦 Virement Bancaire'}
          {withdrawal.paymentMethod === 'crypto' && '₿ Crypto'}
        </span>
      ),
    },
    {
      key: 'details',
      header: 'Détails',
      cell: (withdrawal: Withdrawal) => (
        <div className="text-sm text-slate-600">
          {withdrawal.paymentMethod === 'mobile_money' && (
            <>
              <p>{withdrawal.paymentDetails?.phoneNumber}</p>
              <p className="text-xs text-slate-500">{withdrawal.paymentDetails?.provider}</p>
            </>
          )}
          {withdrawal.paymentMethod === 'bank_transfer' && (
            <>
              <p>****{withdrawal.paymentDetails?.accountNumber?.slice(-4)}</p>
              <p className="text-xs text-slate-500">{withdrawal.paymentDetails?.bankName}</p>
            </>
          )}
        </div>
      ),
    },
    {
      key: 'status',
      header: 'Statut',
      cell: (withdrawal: Withdrawal) => (
        <WithdrawalStatusBadge withdrawal={withdrawal} />
      ),
    },
    {
      key: 'requested',
      header: 'Demandé le',
      cell: (withdrawal: Withdrawal) => (
        <div className="text-slate-500 text-sm">
          {new Date(withdrawal.createdAt).toLocaleDateString('fr-FR')}
          <br />
          <span className="text-xs">
            {new Date(withdrawal.createdAt).toLocaleTimeString('fr-FR', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (withdrawal: Withdrawal) => (
        <WithdrawalActions 
          withdrawal={withdrawal} 
          onProcess={handleProcessWithdrawal}
          isProcessing={processWithdrawal.isPending}
        />
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
    >
      <AdvancedTable
        columns={columns}
        data={withdrawals}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        emptyMessage="Aucun retrait trouvé"
      />
    </motion.div>
  )
}
