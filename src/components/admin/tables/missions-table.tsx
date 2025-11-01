// components/admin/tables/missions-table.tsx
'use client'

import { useState } from 'react'
import { AdvancedTable } from '@/components/atomic/advanced-table'
import { MissionStatusBadge } from '@/components/admin/badges/mission-status-badge'
import { MissionActions } from '@/components/admin/mission-actions'
import { LoadingSpinner } from '@/components/atomic/loading-spinner'
import { motion } from 'framer-motion'
import { Eye, DollarSign, Calendar, Users } from 'lucide-react'

interface MissionsTableProps {
  missions: any[]
  isLoading: boolean
  onMissionUpdate: () => void
}

export function MissionsTable({ missions, isLoading, onMissionUpdate }: MissionsTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedMission, setSelectedMission] = useState<any>(null)
  const itemsPerPage = 15

  const formatBudget = (budget: number) => {
    return `${budget.toLocaleString()} FCFA`
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR')
  }

  const getCategoryLabel = (category: string) => {
    const categories: Record<string, string> = {
      'web_development': 'Développement Web',
      'mobile_development': 'Développement Mobile',
      'graphic_design': 'Design Graphique'
    }
    return categories[category] || category
  }

  const columns = [
    {
      key: 'title',
      header: 'Mission',
      cell: (mission: any) => (
        <div className="min-w-0">
          <p className="font-medium text-slate-900 text-sm truncate">
            {mission.title}
          </p>
          <p className="text-slate-500 text-xs truncate">
            {getCategoryLabel(mission.category)}
          </p>
        </div>
      )
    },
    {
      key: 'budget',
      header: 'Budget',
      cell: (mission: any) => (
        <div className="flex items-center gap-1 text-slate-700">
          <DollarSign size={14} />
          <span className="font-medium">{formatBudget(mission.budget)}</span>
        </div>
      ),
      width: '120px'
    },
    {
      key: 'status',
      header: 'Statut',
      cell: (mission: any) => <MissionStatusBadge status={mission.status} />,
      width: '120px'
    },
    {
      key: 'applications',
      header: 'Candidatures',
      cell: (mission: any) => (
        <div className="flex items-center gap-1 text-slate-600">
          <Users size={14} />
          <span className="text-sm">{mission.applicationsCount}</span>
        </div>
      ),
      width: '100px'
    },
    {
      key: 'dates',
      header: 'Dates',
      cell: (mission: any) => (
        <div className="text-slate-500 text-sm">
          <div className="flex items-center gap-1">
            <Calendar size={12} />
            {formatDate(mission.createdAt)}
          </div>
          <div className="text-xs mt-1">
            Échéance: {formatDate(mission.deadline)}
          </div>
        </div>
      ),
      width: '140px'
    },
    {
      key: 'actions',
      header: '',
      cell: (mission: any) => (
        <MissionActions 
          mission={mission}
          onUpdate={onMissionUpdate}
        />
      ),
      width: '80px'
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
          data={missions}
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          onPageChange={setCurrentPage}
          emptyMessage="Aucune mission trouvée"
        />
      </motion.div>
    </>
  )
}
