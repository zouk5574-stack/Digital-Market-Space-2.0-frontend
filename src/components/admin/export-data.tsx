// components/admin/export-data.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Download, FileText, BarChart3, Users } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface ExportDataProps {
  onExport: (format: 'csv' | 'pdf' | 'excel', dataType: string) => Promise<void>
}

export function ExportData({ onExport }: ExportDataProps) {
  const [isExporting, setIsExporting] = useState(false)

  const exportOptions = [
    {
      type: 'users',
      name: 'Utilisateurs',
      icon: Users,
      description: 'Liste complète des utilisateurs'
    },
    {
      type: 'missions',
      name: 'Missions',
      icon: FileText,
      description: 'Toutes les missions et statistiques'
    },
    {
      type: 'transactions',
      name: 'Transactions',
      icon: BarChart3,
      description: 'Historique des transactions financières'
    }
  ]

  const handleExport = async (dataType: string, format: 'csv' | 'pdf' | 'excel') => {
    setIsExporting(true)
    try {
      await onExport(format, dataType)
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-slate-900">Exporter les données</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {exportOptions.map((option) => (
          <motion.div
            key={option.type}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl border border-slate-200 p-4"
          >
            <div className="flex items-center gap-3 mb-3">
              <option.icon className="text-blue-600" size={20} />
              <h4 className="font-semibold text-slate-900">{option.name}</h4>
            </div>
            
            <p className="text-sm text-slate-600 mb-4">{option.description}</p>
            
            <div className="flex gap-2">
              {(['csv', 'excel', 'pdf'] as const).map((format) => (
                <MagneticButton
                  key={format}
                  variant="outline"
                  size="sm"
                  onClick={() => handleExport(option.type, format)}
                  disabled={isExporting}
                  className="text-xs"
                >
                  <Download size={12} />
                  {format.toUpperCase()}
                </MagneticButton>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Export Progress */}
      {isExporting && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-center gap-3">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
            <p className="text-blue-800 text-sm">Génération du rapport en cours...</p>
          </div>
        </motion.div>
      )}
    </div>
  )
}
