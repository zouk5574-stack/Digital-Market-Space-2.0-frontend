// components/admin/filters/reports-filters.tsx
'use client'

import { motion } from 'framer-motion'

interface ReportsFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function ReportsFilters({ filters, onFiltersChange }: ReportsFiltersProps) {
  const periodOptions = [
    { value: '7d', label: '7 derniers jours' },
    { value: '30d', label: '30 derniers jours' },
    { value: '90d', label: '90 derniers jours' },
    { value: '1y', label: '1 an' },
    { value: 'all', label: 'Toute période' }
  ]

  const categoryOptions = {
    financial: [
      { value: 'all', label: 'Toutes catégories' },
      { value: 'revenue', label: 'Revenus' },
      { value: 'transactions', label: 'Transactions' },
      { value: 'withdrawals', label: 'Retraits' }
    ],
    user: [
      { value: 'all', label: 'Tous les utilisateurs' },
      { value: 'clients', label: 'Clients seulement' },
      { value: 'freelancers', label: 'Freelances seulement' },
      { value: 'new', label: 'Nouveaux utilisateurs' }
    ],
    mission: [
      { value: 'all', label: 'Toutes missions' },
      { value: 'published', label: 'Publiées seulement' },
      { value: 'completed', label: 'Terminées seulement' },
      { value: 'high_budget', label: 'Budget élevé' }
    ],
    product: [
      { value: 'all', label: 'Tous produits' },
      { value: 'templates', label: 'Templates' },
      { value: 'formations', label: 'Formations' },
      { value: 'digital', label: 'Produits digitaux' }
    ]
  }

  const currentCategories = categoryOptions[filters.type as keyof typeof categoryOptions] || categoryOptions.financial

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-xl border border-slate-200 p-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Période */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Période
          </label>
          <select
            value={filters.period}
            onChange={(e) => onFiltersChange({ ...filters, period: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {periodOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Catégorie */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Catégorie
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            {currentCategories.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Date Range (avancé) */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Plage personnalisée
          </label>
          <div className="flex gap-2">
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="De"
            />
            <input
              type="date"
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="À"
            />
          </div>
        </div>
      </div>

      {/* Filtres avancés */}
      <div className="mt-4 pt-4 border-t border-slate-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Filtres avancés</span>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            + Ajouter un filtre
          </button>
        </div>
      </div>
    </motion.div>
  )
}
