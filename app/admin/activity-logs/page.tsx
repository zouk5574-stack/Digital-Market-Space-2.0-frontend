// app/admin/activity-logs/page.tsx
'use client'

import { useState } from 'react'
import { useActivityLogs } from '@/hooks/admin/use-activity-logs'
import { ActivityLogsTable } from '@/components/admin/tables/activity-logs-table'
import { ActivityFilters } from '@/components/admin/filters/activity-filters'
import { ActivityStats } from '@/components/admin/activity-stats'
import { motion } from 'framer-motion'
import { Download, Filter, RefreshCw, AlertTriangle } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function ActivityLogsPage() {
  const [filters, setFilters] = useState({
    type: '',
    severity: '',
    user: '',
    dateRange: '24h',
    search: ''
  })

  const { data: logs, isLoading, refetch, error } = useActivityLogs(filters)

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
            Logs d'Activité
          </h1>
          <p className="text-slate-600 mt-2">
            Surveillance et traçabilité de toutes les activités système
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
          <MagneticButton variant="outline" size="sm">
            <Download size={16} />
            Exporter
          </MagneticButton>
        </div>
      </motion.div>

      {/* Error Banner */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
        >
          <AlertTriangle className="text-red-500" size={20} />
          <div>
            <p className="text-red-800 font-medium">Erreur de chargement</p>
            <p className="text-red-600 text-sm">Impossible de charger les logs d'activité</p>
          </div>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ActivityStats logs={logs?.data} />
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <ActivityFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Logs Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <ActivityLogsTable 
          logs={logs?.data || []}
          isLoading={isLoading}
        />
      </motion.div>
    </div>
  )
}
