// app/admin/missions/page.tsx
'use client'

import { useState } from 'react'
import { useAdminMissions } from '@/hooks/admin/use-admin-missions'
import { MissionsTable } from '@/components/admin/tables/missions-table'
import { MissionFilters } from '@/components/admin/filters/mission-filters'
import { MissionsGrid } from '@/components/admin/missions-grid' // Import externe
import { motion } from 'framer-motion'
import { Eye, Grid, Download, BarChart3 } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function AdminMissionsPage() {
  const [filters, setFilters] = useState({
    status: '',
    category: '',
    search: '',
    dateRange: ''
  })
  const [view, setView] = useState<'table' | 'grid'>('table')

  const { data: missions, isLoading, refetch, error } = useAdminMissions(filters)

  // Calcul des statistiques rapides
  const stats = {
    total: missions?.data?.length || 0,
    published: missions?.data?.filter((m: any) => m.status === 'published').length || 0,
    inProgress: missions?.data?.filter((m: any) => m.status === 'in_progress').length || 0,
    completed: missions?.data?.filter((m: any) => m.status === 'completed').length || 0,
  }

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
          {/* Sélecteur de vue */}
          <div className="flex bg-slate-100 rounded-lg p-1">
            <button
              onClick={() => setView('table')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                view === 'table' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Eye size={16} />
              Tableau
            </button>
            <button
              onClick={() => setView('grid')}
              className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors flex items-center gap-2 ${
                view === 'grid' 
                  ? 'bg-white text-slate-900 shadow-sm' 
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Grid size={16} />
              Grille
            </button>
          </div>
          
          {/* Actions */}
          <MagneticButton 
            variant="outline" 
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <Download size={16} />
            Exporter
          </MagneticButton>
        </div>
      </motion.div>

      {/* Statistiques rapides */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
              <BarChart3 className="text-blue-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Total</p>
              <p className="text-xl font-bold text-slate-900">{stats.total}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
              <Eye className="text-green-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Publiées</p>
              <p className="text-xl font-bold text-slate-900">{stats.published}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
              <Grid className="text-amber-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600">En cours</p>
              <p className="text-xl font-bold text-slate-900">{stats.inProgress}</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
              <Download className="text-purple-600" size={20} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Terminées</p>
              <p className="text-xl font-bold text-slate-900">{stats.completed}</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filtres */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <MissionFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Banner d'erreur */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
            <Download className="text-red-600" size={16} />
          </div>
          <div>
            <p className="text-red-800 font-medium">Erreur de chargement</p>
            <p className="text-red-600 text-sm">Impossible de charger les missions</p>
          </div>
        </motion.div>
      )}

      {/* Contenu */}
      <motion.div
        key={view} // Important pour l'animation entre les vues
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="space-y-6"
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
