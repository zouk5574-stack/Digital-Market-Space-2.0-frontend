// components/admin/badges/user-status-badge.tsx
'use client'

import { User } from '@/types'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Clock, Ban } from 'lucide-react'

interface UserStatusBadgeProps {
  user: User
}

export function UserStatusBadge({ user }: UserStatusBadgeProps) {
  const statusConfig = {
    active: {
      label: 'Actif',
      icon: CheckCircle,
      color: 'bg-green-100 text-green-800 border-green-200',
      iconColor: 'text-green-500'
    },
    inactive: {
      label: 'Inactif',
      icon: XCircle,
      color: 'bg-slate-100 text-slate-800 border-slate-200',
      iconColor: 'text-slate-500'
    },
    suspended: {
      label: 'Suspendu',
      icon: Ban,
      color: 'bg-red-100 text-red-800 border-red-200',
      iconColor: 'text-red-500'
    },
    pending: {
      label: 'En attente',
      icon: Clock,
      color: 'bg-amber-100 text-amber-800 border-amber-200',
      iconColor: 'text-amber-500'
    }
  }

  const config = statusConfig[user.status] || statusConfig.inactive

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
