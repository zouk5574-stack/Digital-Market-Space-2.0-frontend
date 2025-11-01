// components/admin/filters/analytics-filters.tsx
'use client'

import { motion } from 'framer-motion'

interface AnalyticsFiltersProps {
  filters: any
  onFiltersChange: (filters: any) => void
}

export function AnalyticsFilters({ filters, onFiltersChange }: AnalyticsFiltersProps) {
  const periods = [
    { value: '7d', label: '7 jours' },
    { value: '30d', label: '30 jours' },
    { value: '90d', label: '90 jours' },
    { value: '1y', label: '1 an' }
  ]

  const metrics = [
    { value: 'revenue', label: 'Revenu' },
    { value: 'users', label: 'Utilisateurs' },
    { value: 'projects', label: 'Missions' },
    { value: 'products', label: 'Produits' }
  ]

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4">
      <div className="flex flex-wrap gap-4 items-center">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Période
          </label>
          <select
            value={filters.period}
            onChange={(e) => onFiltersChange({ ...filters, period: e.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {periods.map(period => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Métrique
          </label>
          <select
            value={filters.metric}
            onChange={(e) => onFiltersChange({ ...filters, metric: e.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            {metrics.map(metric => (
              <option key={metric.value} value={metric.value}>
                {metric.label}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Catégorie
          </label>
          <select
            value={filters.category}
            onChange={(e) => onFiltersChange({ ...filters, category: e.target.value })}
            className="rounded-lg border border-slate-300 px-3 py-2 text-sm"
          >
            <option value="all">Toutes</option>
            <option value="development">Développement</option>
            <option value="design">Design</option>
            <option value="marketing">Marketing</option>
          </select>
        </div>
      </div>
    </div>
  )
}
