// app/admin/reports/page.tsx
'use client'

import { useState } from 'react'
import { useAdminReports } from '@/hooks/admin/use-admin-reports'
import { ReportsFilters } from '@/components/admin/filters/reports-filters'
import { ReportsSummary } from '@/components/admin/reports-summary'
import { ReportsCharts } from '@/components/admin/reports-charts'
import { ExportModal } from '@/components/admin/export-modal'
import { motion } from 'framer-motion'
import { Download, FileText, BarChart3, Users, CreditCard } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function AdminReportsPage() {
  const [filters, setFilters] = useState({
    type: 'financial',
    period: '30d',
    category: 'all'
  })
  const [showExportModal, setShowExportModal] = useState(false)

  const { data: reports, isLoading } = useAdminReports(filters)

  const reportTypes = [
    {
      id: 'financial',
      name: 'Financier',
      icon: CreditCard,
      description: 'Revenus, transactions et performances financières'
    },
    {
      id: 'user',
      name: 'Utilisateurs', 
      icon: Users,
      description: 'Croissance et activité des utilisateurs'
    },
    {
      id: 'mission',
      name: 'Missions',
      icon: FileText,
      description: 'Performance et statistiques des missions'
    },
    {
      id: 'product', 
      name: 'Produits',
      icon: BarChart3,
      description: 'Ventes et performance des produits'
    }
  ]

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
            Rapports & Analytics
          </h1>
          <p className="text-slate-600 mt-2">
            Rapports détaillés et analyses de la plateforme
          </p>
        </div>
        
        <MagneticButton onClick={() => setShowExportModal(true)}>
          <Download size={16} />
          Exporter le rapport
        </MagneticButton>
      </motion.div>

      {/* Report Type Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {reportTypes.map((type) => (
          <button
            key={type.id}
            onClick={() => setFilters(prev => ({ ...prev, type: type.id }))}
            className={`
              p-4 rounded-xl border-2 text-left transition-all duration-200
              ${filters.type === type.id 
                ? 'border-blue-500 bg-blue-50 shadow-lg' 
                : 'border-slate-200 bg-white hover:border-slate-300 hover:shadow-md'
              }
            `}
          >
            <type.icon className={`
              mb-3
              ${filters.type === type.id ? 'text-blue-600' : 'text-slate-400'}
            `} size={24} />
            <h3 className={`
              font-semibold mb-1
              ${filters.type === type.id ? 'text-blue-900' : 'text-slate-900'}
            `}>
              {type.name}
            </h3>
            <p className="text-sm text-slate-600 leading-tight">
              {type.description}
            </p>
          </button>
        ))}
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ReportsFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ReportsSummary data={reports} isLoading={isLoading} type={filters.type} />
      </motion.div>

      {/* Charts */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <ReportsCharts data={reports} isLoading={isLoading} type={filters.type} />
      </motion.div>

      {/* Export Modal */}
      <ExportModal 
        isOpen={showExportModal}
        onClose={() => setShowExportModal(false)}
        filters={filters}
        data={reports}
      />
    </div>
  )
}
