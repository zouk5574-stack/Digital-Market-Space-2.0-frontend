// components/admin/backup/backup-stats.tsx
'use client'

import { HolographicCard } from '@/components/atomic/holographic-card'
import { motion } from 'framer-motion'
import { Database, HardDrive, Calendar, TrendingUp } from 'lucide-react'

interface BackupStatsProps {
  stats: {
    totalBackups: number
    totalSize: number
    lastBackup: string
    successRate: number
    storageUsed: number
  }
}

export function BackupStats({ stats }: BackupStatsProps) {
  const formatSize = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024)
    return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const formatDate = (dateString: string) => {
    if (!dateString) return 'Aucune'
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    })
  }

  const statsConfig = [
    {
      key: 'totalBackups',
      label: 'Sauvegardes Total',
      value: stats.totalBackups,
      icon: Database,
      color: 'from-blue-500 to-cyan-500',
      format: (val: number) => val.toString()
    },
    {
      key: 'totalSize',
      label: 'Espace Utilisé',
      value: stats.totalSize,
      icon: HardDrive,
      color: 'from-purple-500 to-pink-500',
      format: formatSize
    },
    {
      key: 'lastBackup',
      label: 'Dernière Sauvegarde',
      value: stats.lastBackup,
      icon: Calendar,
      color: 'from-green-500 to-emerald-500',
      format: formatDate
    },
    {
      key: 'successRate',
      label: 'Taux de Réussite',
      value: stats.successRate,
      icon: TrendingUp,
      color: 'from-amber-500 to-orange-500',
      format: (val: number) => `${val.toFixed(1)}%`
    }
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {statsConfig.map((stat, index) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <HolographicCard className="p-4 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-600 truncate">
                  {stat.label}
                </p>
                <motion.p
                  key={stat.value}
                  className="text-xl font-bold text-slate-900 mt-1"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  {stat.format(stat.value)}
                </motion.p>
              </div>

              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center flex-shrink-0 ml-3`}>
                <stat.icon className="text-white" size={16} />
              </div>
            </div>
          </HolographicCard>
        </motion.div>
      ))}
    </div>
  )
}
