// components/admin/quick-stats.tsx
'use client'

import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Clock, Target } from 'lucide-react'

interface QuickStatsProps {
  data: any
  type: string
  isLoading: boolean
}

export function QuickStats({ data, type, isLoading }: QuickStatsProps) {
  const getQuickStats = () => {
    if (!data) return []

    const baseStats = {
      financial: [
        {
          label: 'Tx. de croissance',
          value: data.revenueGrowth || 0,
          format: (val: number) => `${val.toFixed(1)}%`,
          trend: data.revenueGrowth >= 0 ? 'up' : 'down',
          description: 'vs période précédente'
        },
        {
          label: 'Tx. moyen',
          value: data.averageTransaction || 0,
          format: (val: number) => `${(val / 1000).toFixed(0)}K FCFA`,
          trend: 'neutral',
          description: 'Par transaction'
        },
        {
          label: 'Retraits en attente',
          value: data.pendingWithdrawals || 0,
          format: (val: number) => `${(val / 1000000).toFixed(1)}M FCFA`,
          trend: 'warning',
          description: 'À traiter'
        }
      ],
      user: [
        {
          label: 'Nouveaux utilisateurs',
          value: data.newUsers || 0,
          format: (val: number) => val.toLocaleString(),
          trend: 'up',
          description: 'Cette période'
        },
        {
          label: 'Taux d\'activation',
          value: data.activeUsers && data.totalUsers ? (data.activeUsers / data.totalUsers) * 100 : 0,
          format: (val: number) => `${val.toFixed(1)}%`,
          trend: 'neutral',
          description: 'Utilisateurs actifs'
        },
        {
          label: 'Temps moyen',
          value: 12.5, // Mock data
          format: (val: number) => `${val}min`,
          trend: 'down',
          description: 'Session moyenne'
        }
      ],
      mission: [
        {
          label: 'Taux d\'achèvement',
          value: data.completedMissions && data.totalMissions ? (data.completedMissions / data.totalMissions) * 100 : 0,
          format: (val: number) => `${val.toFixed(1)}%`,
          trend: 'up',
          description: 'Missions terminées'
        },
        {
          label: 'Budget moyen',
          value: data.averageBudget || 0,
          format: (val: number) => `${(val / 1000).toFixed(0)}K FCFA`,
          trend: 'neutral',
          description: 'Par mission'
        },
        {
          label: 'Temps moyen',
          value: 4.2, // Mock data
          format: (val: number) => `${val} jours`,
          trend: 'down',
          description: 'Durée de mission'
        }
      ],
      product: [
        {
          label: 'Taux de vente',
          value: data.productsSold && data.totalProducts ? (data.productsSold / data.totalProducts) * 100 : 0,
          format: (val: number) => `${val.toFixed(1)}%`,
          trend: 'up',
          description: 'Produits vendus'
        },
        {
          label: 'Note moyenne',
          value: data.averageRating || 0,
          format: (val: number) => `${val.toFixed(1)}/5`,
          trend: 'neutral',
          description: 'Satisfaction'
        },
        {
          label: 'Panier moyen',
          value: data.totalSales && data.productsSold ? data.totalSales / data.productsSold : 0,
          format: (val: number) => `${(val / 1000).toFixed(0)}K FCFA`,
          trend: 'up',
          description: 'Par vente'
        }
      ]
    }

    return baseStats[type as keyof typeof baseStats] || []
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp size={14} className="text-green-500" />
      case 'down': return <TrendingDown size={14} className="text-red-500" />
      case 'warning': return <Target size={14} className="text-amber-500" />
      default: return <Clock size={14} className="text-blue-500" />
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-3 gap-4">
        {[1, 2, 3].map(i => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-4 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-2"></div>
            <div className="h-6 bg-slate-200 rounded w-3/4 mb-1"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3"></div>
          </div>
        ))}
      </div>
    )
  }

  const quickStats = getQuickStats()

  if (quickStats.length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-3 gap-4">
      {quickStats.map((stat, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-4 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-2 mb-2">
            {getTrendIcon(stat.trend)}
            <span className="text-sm font-medium text-slate-600">{stat.label}</span>
          </div>
          
          <div className="flex items-baseline gap-2 mb-1">
            <span className="text-xl font-bold text-slate-900">
              {stat.format(stat.value)}
            </span>
          </div>
          
          <p className="text-xs text-slate-500">
            {stat.description}
          </p>
        </motion.div>
      ))}
    </div>
  )
}
