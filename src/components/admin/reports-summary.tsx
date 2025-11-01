// components/admin/reports-summary.tsx
'use client'

import { HolographicCard } from '@/components/atomic/holographic-card'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Users, CreditCard, Briefcase, ShoppingCart } from 'lucide-react'

interface ReportsSummaryProps {
  data: any
  isLoading: boolean
  type: string
}

export function ReportsSummary({ data, isLoading, type }: ReportsSummaryProps) {
  const getSummaryConfig = () => {
    const baseConfig = {
      financial: [
        {
          key: 'totalRevenue',
          label: 'Revenu Total',
          value: data?.totalRevenue || 0,
          format: (val: number) => `${(val / 1000000).toFixed(1)}M FCFA`,
          icon: CreditCard,
          color: 'from-green-500 to-emerald-500',
          trend: data?.revenueGrowth || 0
        },
        {
          key: 'transactionCount',
          label: 'Transactions',
          value: data?.transactionCount || 0,
          format: (val: number) => val.toLocaleString(),
          icon: TrendingUp,
          color: 'from-blue-500 to-cyan-500',
          trend: 8.2
        },
        {
          key: 'averageTransaction',
          label: 'Moyenne/Transaction',
          value: data?.averageTransaction || 0,
          format: (val: number) => `${(val / 1000).toFixed(0)}K FCFA`,
          icon: CreditCard,
          color: 'from-purple-500 to-pink-500',
          trend: 5.1
        },
        {
          key: 'commissionEarned',
          label: 'Commissions',
          value: data?.commissionEarned || 0,
          format: (val: number) => `${(val / 1000000).toFixed(1)}M FCFA`,
          icon: TrendingUp,
          color: 'from-amber-500 to-orange-500',
          trend: data?.revenueGrowth || 0
        }
      ],
      user: [
        {
          key: 'totalUsers',
          label: 'Utilisateurs Total',
          value: data?.totalUsers || 0,
          format: (val: number) => val.toLocaleString(),
          icon: Users,
          color: 'from-blue-500 to-cyan-500',
          trend: data?.userGrowth || 0
        },
        {
          key: 'newUsers',
          label: 'Nouveaux Utilisateurs',
          value: data?.newUsers || 0,
          format: (val: number) => val.toLocaleString(),
          icon: TrendingUp,
          color: 'from-green-500 to-emerald-500',
          trend: 12.4
        },
        {
          key: 'activeUsers',
          label: 'Utilisateurs Actifs',
          value: data?.activeUsers || 0,
          format: (val: number) => val.toLocaleString(),
          icon: Users,
          color: 'from-purple-500 to-pink-500',
          trend: 6.8
        },
        {
          key: 'userGrowth',
          label: 'Croissance',
          value: data?.userGrowth || 0,
          format: (val: number) => `${val.toFixed(1)}%`,
          icon: TrendingUp,
          color: 'from-amber-500 to-orange-500',
          trend: data?.userGrowth || 0
        }
      ],
      mission: [
        {
          key: 'totalMissions',
          label: 'Missions Total',
          value: data?.totalMissions || 0,
          format: (val: number) => val.toLocaleString(),
          icon: Briefcase,
          color: 'from-blue-500 to-cyan-500',
          trend: data?.missionGrowth || 0
        },
        {
          key: 'completedMissions',
          label: 'Missions Terminées',
          value: data?.completedMissions || 0,
          format: (val: number) => val.toLocaleString(),
          icon: TrendingUp,
          color: 'from-green-500 to-emerald-500',
          trend: 18.3
        },
        {
          key: 'averageBudget',
          label: 'Budget Moyen',
          value: data?.averageBudget || 0,
          format: (val: number) => `${(val / 1000).toFixed(0)}K FCFA`,
          icon: CreditCard,
          color: 'from-purple-500 to-pink-500',
          trend: 7.2
        },
        {
          key: 'missionGrowth',
          label: 'Croissance',
          value: data?.missionGrowth || 0,
          format: (val: number) => `${val.toFixed(1)}%`,
          icon: TrendingUp,
          color: 'from-amber-500 to-orange-500',
          trend: data?.missionGrowth || 0
        }
      ],
      product: [
        {
          key: 'totalProducts',
          label: 'Produits Total',
          value: data?.totalProducts || 0,
          format: (val: number) => val.toLocaleString(),
          icon: ShoppingCart,
          color: 'from-blue-500 to-cyan-500',
          trend: 15.2
        },
        {
          key: 'productsSold',
          label: 'Produits Vendus',
          value: data?.productsSold || 0,
          format: (val: number) => val.toLocaleString(),
          icon: TrendingUp,
          color: 'from-green-500 to-emerald-500',
          trend: data?.salesGrowth || 0
        },
        {
          key: 'totalSales',
          label: 'Chiffre d\'Affaires',
          value: data?.totalSales || 0,
          format: (val: number) => `${(val / 1000000).toFixed(1)}M FCFA`,
          icon: CreditCard,
          color: 'from-purple-500 to-pink-500',
          trend: data?.salesGrowth || 0
        },
        {
          key: 'averageRating',
          label: 'Note Moyenne',
          value: data?.averageRating || 0,
          format: (val: number) => val.toFixed(1) + '/5',
          icon: TrendingUp,
          color: 'from-amber-500 to-orange-500',
          trend: 2.1
        }
      ]
    }

    return baseConfig[type as keyof typeof baseConfig] || baseConfig.financial
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-1/2 mb-4"></div>
            <div className="h-8 bg-slate-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-slate-200 rounded w-1/3"></div>
          </div>
        ))}
      </div>
    )
  }

  const summaryConfig = getSummaryConfig()

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {summaryConfig.map((stat, index) => (
        <motion.div
          key={stat.key}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <HolographicCard className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <stat.icon className="text-white" size={20} />
              </div>
              <div className={`flex items-center gap-1 text-sm font-medium ${
                stat.trend >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.trend >= 0 ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                {Math.abs(stat.trend).toFixed(1)}%
              </div>
            </div>

            <div>
              <p className="text-sm font-medium text-slate-600 mb-1">
                {stat.label}
              </p>
              <motion.p
                key={stat.value}
                className="text-2xl font-bold text-slate-900"
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
              >
                {stat.format(stat.value)}
              </motion.p>
            </div>
          </HolographicCard>
        </motion.div>
      ))}
    </div>
  )
}
