// components/admin/badges/withdrawal-status-badge.tsx
'use client'

import { Withdrawal } from '@/types'
import { motion } from 'framer-motion'
import { Clock, RefreshCw, CheckCircle, XCircle, AlertCircle } from 'lucide-react'

interface WithdrawalStatusBadgeProps {
  withdrawal: Withdrawal
}

export function WithdrawalStatusBadge({ withdrawal }: WithdrawalStatusBadgeProps) {
  const statusConfig = {
    pending: {
      label: 'En Attente',
      icon: Clock,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      iconColor: 'text-amber-500'
    },
    processing: {
      label: 'En Traitement',
      icon: RefreshCw,
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      iconColor: 'text-blue-500'
    },
    completed: {
      label: 'Complété',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200',
      iconColor: 'text-green-500'
    },
    rejected: {
      label: 'Rejeté',
      icon: XCircle,
      color: 'bg-red-100 text-red-800 border-red-200',
      iconColor: 'text-red-500'
    }
  }

  const config = statusConfig[withdrawal.status] || statusConfig.pending

  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <config.icon size={12} className={config.iconColor} />
      {config.label}
    </motion.span>
  )
}
