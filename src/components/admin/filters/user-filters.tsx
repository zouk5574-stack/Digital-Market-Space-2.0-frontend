// components/admin/filters/user-filters.tsx
'use client'

import { motion } from 'framer-motion'
import { Search, Filter, X } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface UserFiltersProps {
  filters: {
    role: string
    status: string
    search: string
    dateRange: string
  }
  onFiltersChange: (filters: any) => void
}

export function UserFilters({ filters, onFiltersChange }: UserFiltersProps) {
  const roleOptions = [
    { value: '', label: 'Tous les rôles' },
    { value: 'client', label: 'Clients' },
    { value: 'freelancer', label: 'Freelances' },
    { value: 'admin', label: 'Administrateurs' }
  ]

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'active', label: 'Actif' },
    { value: 'inactive', label: 'Inactif' },
    { value: 'suspended', label: 'Suspendu' },
    { value: 'pending', label: 'En attente' }
  ]

  const dateRangeOptions = [
    { value: '', label: 'Toute période' },
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' }
  ]

  const hasActiveFilters = filters.role || filters.status || filters.search || filters.dateRange

  const clearFilters = () => {
    onFiltersChange({
      role: '',
      status: '',
      search: '',
      dateRange: ''
    })
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Filter size={20} className="text-slate-600" />
          <h3 className="text-lg font-semibold text-slate-900">Filtres</h3>
        </div>
        
        {hasActiveFilters && (
          <MagneticButton
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-slate-600 hover:text-slate-900"
          >
            <X size={16} />
            Effacer les filtres
          </MagneticButton>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {/* Recherche */}
        <div className="lg:col-span-2">
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Recherche
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
            <input
              type="text"
              placeholder="Rechercher un utilisateur..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        {/* Rôle */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Rôle
          </label>
          <select
            value={filters.role}
            onChange={(e) => onFiltersChange({ ...filters, role: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {roleOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Statut */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Statut
          </label>
          <select
            value={filters.status}
            onChange={(e) => onFiltersChange({ ...filters, status: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {statusOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Période */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Période
          </label>
          <select
            value={filters.dateRange}
            onChange={(e) => onFiltersChange({ ...filters, dateRange: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {dateRangeOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Filtres actifs */}
      {hasActiveFilters && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-4 pt-4 border-t border-slate-200"
        >
          <div className="flex flex-wrap gap-2">
            {filters.role && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Rôle: {roleOptions.find(r => r.value === filters.role)?.label}
                <button
                  onClick={() => onFiltersChange({ ...filters, role: '' })}
                  className="hover:text-blue-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.status && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Statut: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => onFiltersChange({ ...filters, status: '' })}
                  className="hover:text-green-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.dateRange && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Période: {dateRangeOptions.find(d => d.value === filters.dateRange)?.label}
                <button
                  onClick={() => onFiltersChange({ ...filters, dateRange: '' })}
                  className="hover:text-purple-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
          </div>
        </motion.div>
      )}
    </motion.div>
  )
}
