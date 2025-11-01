// components/admin/badges/mission-status-badge.tsx
'use client'

import { motion } from 'framer-motion'

interface MissionStatusBadgeProps {
  status: string
}

const statusConfig = {
  draft: {
    label: 'Brouillon',
    color: 'bg-slate-100 text-slate-800 border-slate-200',
    icon: '📝'
  },
  published: {
    label: 'Publiée',
    color: 'bg-green-100 text-green-800 border-green-200',
    icon: '✅'
  },
  in_progress: {
    label: 'En cours',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: '🔄'
  },
  completed: {
    label: 'Terminée',
    color: 'bg-purple-100 text-purple-800 border-purple-200',
    icon: '🎯'
  },
  cancelled: {
    label: 'Annulée',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '❌'
  }
}

export function MissionStatusBadge({ status }: MissionStatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.draft

  return (
    <motion.span
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium border ${config.color}`}
    >
      <span>{config.icon}</span>
      {config.label}
    </motion.span>
  )
}
