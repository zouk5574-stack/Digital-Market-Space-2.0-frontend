// app/admin/reports/page.tsx
'use client'

import { useState } from 'react'
import { useAdminReports } from '@/hooks/admin/use-admin-reports'
import { ReportsFilters } from '@/components/admin/filters/reports-filters'
import { ReportsSummary } from '@/components/admin/reports-summary'
import { ReportsCharts } from '@/components/admin/reports-charts'
import { ExportModal } from '@/components/admin/export-modal'
import { QuickStats } from '@/components/admin/quick-stats'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  FileText, 
  BarChart3, 
  Users, 
  CreditCard, 
  RefreshCw,
  TrendingUp,
  AlertTriangle
} from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function AdminReportsPage() {
  const [filters, setFilters] = useState({
    type: 'financial',
    period: '30d',
    category: 'all'
  })
  const [showExportModal, setShowExportModal] = useState(false)

  const { data: reports, isLoading, error, refetch } = useAdminReports(filters)

  const reportTypes = [
    {
      id: 'financial',
      name: 'Financier',
      icon: CreditCard,
      description: 'Revenus, transactions et performances financières',
      color: 'from-green-500 to-emerald-500',
      stats: reports?.totalRevenue ? `${(reports.totalRevenue / 1000000).toFixed(1)}M FCFA` : '--'
    },
    {
      id: 'user',
      name: 'Utilisateurs', 
      icon: Users,
      description: 'Croissance et activité des utilisateurs',
      color: 'from-blue-500 to-cyan-500',
      stats: reports?.totalUsers ? `${reports.totalUsers.toLocaleString()} users` : '--'
    },
    {
      id: 'mission',
      name: 'Missions',
      icon: FileText,
      description: 'Performance et statistiques des missions',
      color: 'from-purple-500 to-pink-500',
      stats: reports?.totalMissions ? `${reports.totalMissions.toLocaleString()} missions` : '--'
    },
    {
      id: 'product', 
      name: 'Produits',
      icon: BarChart3,
      description: 'Ventes et performance des produits',
      color: 'from-amber-500 to-orange-500',
      stats: reports?.totalSales ? `${(reports.totalSales / 1000000).toFixed(1)}M FCFA` : '--'
    }
  ]

  // Calcul des indicateurs de performance
  const performanceIndicators = {
    financial: reports?.revenueGrowth || 0,
    user: reports?.userGrowth || 0,
    mission: reports?.missionGrowth || 0,
    product: reports?.salesGrowth || 0
  }

  const getPerformanceColor = (value: number) => {
    if (value > 15) return 'text-green-600 bg-green-100'
    if (value > 5) return 'text-amber-600 bg-amber-100'
    return 'text-red-600 bg-red-100'
  }

  return (
    <div className="space-y-6">
      {/* Header avec indicateurs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Rapports & Analytics
          </h1>
          <p className="text-slate-600 mt-2">
            Analyse détaillée des performances de la plateforme
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <MagneticButton
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Actualiser
          </MagneticButton>
          <MagneticButton 
            onClick={() => setShowExportModal(true)}
            disabled={isLoading}
          >
            <Download size={16} />
            Exporter
          </MagneticButton>
        </div>
      </motion.div>

      {/* Indicateur de performance global */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-4"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="font-medium text-blue-900">Performance du {reportTypes.find(t => t.id === filters.type)?.name?.toLowerCase()}</p>
              <p className="text-blue-700 text-sm">
                Croissance: <span className={getPerformanceColor(performanceIndicators[filters.type as keyof typeof performanceIndicators]) + " px-2 py-1 rounded-full text-xs font-medium"}>
                  {performanceIndicators[filtersType as keyof typeof performanceIndicators].toFixed(1)}%
                </span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-blue-900">
              {reportTypes.find(t => t.id === filters.type)?.stats}
            </p>
            <p className="text-blue-700 text-sm">Total</p>
          </div>
        </div>
      </motion.div>

      {/* Banner d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertTriangle className="text-red-500" size={20} />
          <div className="flex-1">
            <p className="text-red-800 font-medium">Erreur de chargement</p>
            <p className="text-red-600 text-sm">Impossible de charger les données du rapport</p>
          </div>
          <MagneticButton
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            className="border-red-300 text-red-700"
          >
            Réessayer
          </MagneticButton>
        </motion.div>
      )}

      {/* Type de rapport avec indicateurs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-900">Type de Rapport</h2>
          <span className="text-sm text-slate-500">
            {reportTypes.find(t => t.id === filters.type)?.description}
          </span>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <AnimatePresence mode="wait">
            {reportTypes.map((type) => (
              <motion.button
                key={type.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                onClick={() => setFilters(prev => ({ ...prev, type: type.id }))}
                className={`
                  relative p-4 rounded-xl border-2 text-left transition-all duration-200 overflow-hidden
                  ${filters.type === type.id 
                    ? 'border-blue-500 bg-blue-50 shadow-lg' 
                    : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
                  }
                `}
              >
                {/* Background gradient pour l'état actif */}
                {filters.type === type.id && (
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-5 ${type.color}`} />
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <type.icon className={`
                    ${filters.type === type.id ? 'text-blue-600' : 'text-slate-400'}
                  `} size={24} />
                  
                  {/* Indicateur de performance */}
                  <span className={`
                    text-xs font-medium px-2 py-1 rounded-full
                    ${filters.type === type.id 
                      ? 'bg-blue-100 text-blue-700' 
                      : 'bg-slate-100 text-slate-600'
                    }
                  `}>
                    {type.stats}
                  </span>
                </div>

                <h3 className={`
                  font-semibold mb-2
                  ${filters.type === type.id ? 'text-blue-900' : 'text-slate-900'}
                `}>
                  {type.name}
                </h3>
                <p className="text-sm text-slate-600 leading-tight">
                  {type.description}
                </p>

                {/* Indicateur de sélection */}
                {filters.type === type.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-2 h-2 bg-blue-500 rounded-full"
                  />
                )}
              </motion.button>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Statistiques rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <QuickStats data={reports} type={filters.type} isLoading={isLoading} />
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ReportsFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Résumé principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <ReportsSummary data={reports} isLoading={isLoading} type={filters.type} />
      </motion.div>

      {/* Graphiques */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <ReportsCharts data={reports} isLoading={isLoading} type={filters.type} />
      </motion.div>

      {/* Modal d'export */}
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        filters={filters}
        data={reports}
      />
    </div>
  )
                  }
