// app/admin/missions/page.tsx
'use client'

import { useState } from 'react'
import { useAdminMissions } from '@/hooks/admin/use-admin-missions'
import { MissionsTable } from '@/components/admin/tables/missions-table'
import { MissionFilters } from '@/components/admin/filters/mission-filters'
import { motion } from 'framer-motion'
import { Eye, Filter, Download } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function AdminMissionsPage() {
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: '',
    dateRange: ''
  })
  const [view, setView] = useState<'table' | 'grid'>('table')

  const { data: missions, isLoading, refetch } = useAdminMissions(filters)

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
            Modération des Missions
          </h1>
          <p className="text-slate-600 mt-2">
            Superviser et modérer les missions publiées
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'table' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye size={16} className="inline mr-2" />
              Tableau
            </button>
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                view === 'grid' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Filter size={16} className="inline mr-2" />
              Grille
            </button>
          </div>
          
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
        <MissionFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {view === 'table' ? (
          <MissionsTable 
            missions={missions?.data || []}
            isLoading={isLoading}
            onMissionUpdate={refetch}
          />
        ) : (
          <MissionsGrid 
            missions={missions?.data || []}
            isLoading={isLoading}
            onMissionUpdate={refetch}
          />
        )}
      </motion.div>
    </div>
  )
}

// Composant MissionsGrid pour la vue grille
function MissionsGrid({ missions, isLoading, onMissionUpdate }: any) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-4 bg-slate-200 rounded w-3/4 mb-4"></div>
            <div className="h-3 bg-slate-200 rounded w-full mb-2"></div>
            <div className="h-3 bg-slate-200 rounded w-2/3 mb-4"></div>
            <div className="h-6 bg-slate-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {missions.map((mission: any) => (
        <motion.div
          key={mission._id}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
        >
          <div className="flex items-start justify-between mb-4">
            <h3 className="font-semibold text-slate-900 line-clamp-2 flex-1">
              {mission.title}
            </h3>
            <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full ml-2">
              {mission.budget.toLocaleString()} FCFA
            </span>
          </div>
          
          <p className="text-slate-600 text-sm mb-4 line-clamp-3">
            {mission.description}
          </p>
          
          <div className="flex items-center justify-between text-sm text-slate-500">
            <span>{mission.category}</span>
            <span>{new Date(mission.createdAt).toLocaleDateString()}</span>
          </div>
        </motion.div>
      ))}
    </div>
  )
}
