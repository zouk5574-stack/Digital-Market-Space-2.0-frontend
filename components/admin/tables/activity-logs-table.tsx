// components/admin/tables/activity-logs-table.tsx
'use client'

import { useState } from 'react'
import { ActivityLog } from '@/types'
import { AdvancedTable } from '@/components/atomic/advanced-table'
import { LogSeverityBadge } from '@/components/admin/badges/log-severity-badge'
import { LogDetailsModal } from '@/components/admin/log-details-modal'
import { LoadingSpinner } from '@/components/atomic/loading-spinner'
import { motion } from 'framer-motion'
import { Eye, Search } from 'lucide-react'

interface ActivityLogsTableProps {
  logs: ActivityLog[]
  isLoading: boolean
}

export function ActivityLogsTable({ logs, isLoading }: ActivityLogsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedLog, setSelectedLog] = useState<ActivityLog | null>(null)
  const itemsPerPage = 20

  const columns = [
    {
      key: 'severity',
      header: 'Niveau',
      cell: (log: ActivityLog) => <LogSeverityBadge severity={log.severity} />,
      width: '100px'
    },
    {
      key: 'action',
      header: 'Action',
      cell: (log: ActivityLog) => (
        <div className="min-w-0">
          <p className="font-medium text-slate-900 text-sm capitalize">
            {log.action.replace('.', ' ')}
          </p>
          <p className="text-slate-500 text-xs truncate">
            {log.description}
          </p>
        </div>
      )
    },
    {
      key: 'user',
      header: 'Utilisateur',
      cell: (log: ActivityLog) => (
        log.user ? (
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-slate-400 rounded-full flex items-center justify-center text-white text-xs font-medium">
              {log.user.firstName[0]}{log.user.lastName[0]}
            </div>
            <div className="min-w-0">
              <p className="text-sm text-slate-900 truncate">
                {log.user.firstName} {log.user.lastName}
              </p>
              <p className="text-xs text-slate-500 truncate">{log.user.email}</p>
            </div>
          </div>
        ) : (
          <span className="text-slate-400 text-sm">Système</span>
        )
      )
    },
    {
      key: 'ip',
      header: 'IP',
      cell: (log: ActivityLog) => (
        <code className="text-xs bg-slate-100 px-2 py-1 rounded text-slate-700">
          {log.ipAddress}
        </code>
      ),
      width: '120px'
    },
    {
      key: 'timestamp',
      header: 'Date/Heure',
      cell: (log: ActivityLog) => (
        <div className="text-slate-500 text-sm">
          {new Date(log.createdAt).toLocaleDateString('fr-FR')}
          <br />
          <span className="text-xs">
            {new Date(log.createdAt).toLocaleTimeString('fr-FR')}
          </span>
        </div>
      ),
      width: '120px'
    },
    {
      key: 'actions',
      header: '',
      cell: (log: ActivityLog) => (
        <button
          onClick={() => setSelectedLog(log)}
          className="p-1 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <Eye size={16} />
        </button>
      ),
      width: '60px'
    }
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl border border-slate-200 overflow-hidden"
      >
        <AdvancedTable
          columns={columns}
          data={logs}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          emptyMessage="Aucun log d'activité trouvé"
        />
      </motion.div>

      {/* Log Details Modal */}
      <LogDetailsModal
        log={selectedLog}
        isOpen={!!selectedLog}
        onClose={() => setSelectedLog(null)}
      />
    </>
  )
}
