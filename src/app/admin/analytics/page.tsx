// app/admin/analytics/page.tsx
'use client'

import { useAdminAnalytics } from '@/hooks/admin/use-admin-analytics'
import { AnalyticsCharts } from '@/components/admin/analytics-charts'
import { AnalyticsFilters } from '@/components/admin/filters/analytics-filters'
import { motion } from 'framer-motion'
import { Calendar, Download, BarChart3 } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function AdminAnalyticsPage() {
  const [filters, setFilters] = useState({
    period: '30d',
    metric: 'revenue',
    category: 'all'
  })

  const { data: analytics, isLoading } = useAdminAnalytics(filters)

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Analytics Plateforme
          </h1>
          <p className="text-slate-600 mt-2">
            Mesures détaillées et insights de performance
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <MagneticButton variant="outline" size="sm">
            <Calendar size={16} />
            Période
          </MagneticButton>
          <MagneticButton variant="outline" size="sm">
            <Download size={16} />
            Exporter
          </MagneticButton>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <AnalyticsFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Key Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-6"
      >
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Revenu Total</p>
              <p className="text-2xl font-bold text-slate-900">12.5M FCFA</p>
              <p className="text-xs text-green-600">+12% ce mois</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Users className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Nouveaux Utilisateurs</p>
              <p className="text-2xl font-bold text-slate-900">245</p>
              <p className="text-xs text-green-600">+8% ce mois</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Briefcase className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Missions Créées</p>
              <p className="text-2xl font-bold text-slate-900">189</p>
              <p className="text-xs text-green-600">+15% ce mois</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center">
              <ShoppingCart className="text-amber-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Produits Vendus</p>
              <p className="text-2xl font-bold text-slate-900">76</p>
              <p className="text-xs text-green-600">+22% ce mois</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnalyticsCharts 
          data={analytics}
          isLoading={isLoading}
          filters={filters}
        />
      </motion.div>
    </div>
  )
}
