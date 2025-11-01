// components/admin/filters/withdrawal-filters.tsx
'use client'

import { motion } from 'framer-motion'
import { Filter, X, Search } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface WithdrawalFiltersProps {
  filters: {
    status: string
    paymentMethod: string
    dateRange: string
    search: string
  }
  onFiltersChange: (filters: any) => void
}

export function WithdrawalFilters({ filters, onFiltersChange }: WithdrawalFiltersProps) {
  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'pending', label: 'En attente' },
    { value: 'processing', label: 'En traitement' },
    { value: 'completed', label: 'Complété' },
    { value: 'rejected', label: 'Rejeté' }
  ]

  const paymentMethodOptions = [
    { value: '', label: 'Toutes les méthodes' },
    { value: 'mobile_money', label: 'Mobile Money' },
    { value: 'bank_transfer', label: 'Virement Bancaire' },
    { value: 'crypto', label: 'Cryptomonnaie' }
  ]

  const dateRangeOptions = [
    { value: '', label: 'Toute période' },
    { value: 'today', label: "Aujourd'hui" },
    { value: 'week', label: 'Cette semaine' },
    { value: 'month', label: 'Ce mois' },
    { value: 'year', label: 'Cette année' }
  ]

  const hasActiveFilters = filters.status || filters.paymentMethod || filters.dateRange || filters.search

  const clearFilters = () => {
    onFiltersChange({
      status: '',
      paymentMethod: '',
      dateRange: '',
      search: ''
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
          <h3 className="text-lg font-semibold text-slate-900">Filtres des Retraits</h3>
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
              placeholder="Rechercher par nom, email..."
              value={filters.search}
              onChange={(e) => onFiltersChange({ ...filters, search: e.target.value })}
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
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

        {/* Méthode de paiement */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Méthode
          </label>
          <select
            value={filters.paymentMethod}
            onChange={(e) => onFiltersChange({ ...filters, paymentMethod: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {paymentMethodOptions.map(option => (
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
            {filters.status && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                Statut: {statusOptions.find(s => s.value === filters.status)?.label}
                <button
                  onClick={() => onFiltersChange({ ...filters, status: '' })}
                  className="hover:text-blue-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.paymentMethod && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-full">
                Méthode: {paymentMethodOptions.find(p => p.value === filters.paymentMethod)?.label}
                <button
                  onClick={() => onFiltersChange({ ...filters, paymentMethod: '' })}
                  className="hover:text-purple-900"
                >
                  <X size={12} />
                </button>
              </span>
            )}
            {filters.dateRange && (
              <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                Période: {dateRangeOptions.find(d => d.value === filters.dateRange)?.label}
                <button
                  onClick={() => onFiltersChange({ ...filters, dateRange: '' })}
                  className="hover:text-green-900"
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
