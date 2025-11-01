// components/admin/badges/log-severity-badge.tsx
import { motion } from 'framer-motion'

interface LogSeverityBadgeProps {
  severity: 'info' | 'warning' | 'error' | 'critical' // Corrigé pour matcher le hook
}

const severityConfig = {
  info: {
    label: 'Info',
    color: 'bg-blue-100 text-blue-800 border-blue-200',
    icon: '🔵'
  },
  warning: {
    label: 'Alerte',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    icon: '🟡'
  },
  error: {
    label: 'Erreur',
    color: 'bg-orange-100 text-orange-800 border-orange-200',
    icon: '🟠'
  },
  critical: {
    label: 'Critique',
    color: 'bg-red-100 text-red-800 border-red-200',
    icon: '🔴'
  }
}

export function LogSeverityBadge({ severity }: LogSeverityBadgeProps) {
  const config = severityConfig[severity]

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
