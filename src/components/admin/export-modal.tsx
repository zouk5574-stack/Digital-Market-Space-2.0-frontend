// components/admin/export-modal.tsx
'use client'

import { Modal } from '@/components/atomic/modal'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { motion } from 'framer-motion'
import { FileText, Download, X, Mail } from 'lucide-react'
import { useState } from 'react'

interface ExportModalProps {
  isOpen: boolean
  onClose: () => void
  filters: any
  data: any
}

export function ExportModal({ isOpen, onClose, filters, data }: ExportModalProps) {
  const [exportFormat, setExportFormat] = useState('pdf')
  const [includeCharts, setIncludeCharts] = useState(true)
  const [emailReport, setEmailReport] = useState('')

  const exportOptions = [
    { value: 'pdf', label: 'PDF', description: 'Document formaté avec graphiques' },
    { value: 'excel', label: 'Excel', description: 'Données brutes pour analyse' },
    { value: 'csv', label: 'CSV', description: 'Format simple pour import' },
    { value: 'json', label: 'JSON', description: 'Données structurées pour développeurs' }
  ]

  const handleExport = () => {
    // Simulation d'export
    console.log('Exporting:', {
      format: exportFormat,
      filters,
      includeCharts,
      email: emailReport
    })
    
    // Ici, vous intégreriez votre logique d'export réelle
    alert(`Rapport exporté en format ${exportFormat.toUpperCase()} !`)
    onClose()
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-bold text-slate-900">Exporter le Rapport</h2>
            <p className="text-slate-600 text-sm mt-1">
              Générer un rapport {filters.type} pour la période {filters.period}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-6">
          {/* Format d'export */}
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-3">
              Format d'export
            </label>
            <div className="grid grid-cols-2 gap-3">
              {exportOptions.map((option) => (
                <button
                  key={option.value}
                  onClick={() => setExportFormat(option.value)}
                  className={`
                    p-3 rounded-lg border-2 text-left transition-all
                    ${exportFormat === option.value
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                    }
                  `}
                >
                  <FileText className={`
                    mb-2
                    ${exportFormat === option.value ? 'text-blue-600' : 'text-slate-400'}
                  `} size={20} />
                  <div className={`
                    font-medium mb-1
                    ${exportFormat === option.value ? 'text-blue-900' : 'text-slate-900'}
                  `}>
                    {option.label}
                  </div>
                  <div className="text-xs text-slate-600">
                    {option.description}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Options */}
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={includeCharts}
                onChange={(e) => setIncludeCharts(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <div>
                <span className="text-sm font-medium text-slate-700">Inclure les graphiques</span>
                <p className="text-xs text-slate-500">Ajouter les visualisations au rapport</p>
              </div>
            </label>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Envoyer par email (optionnel)
              </label>
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="email"
                    value={emailReport}
                    onChange={(e) => setEmailReport(e.target.value)}
                    placeholder="email@exemple.com"
                    className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4 border-t border-slate-200">
            <MagneticButton
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Annuler
            </MagneticButton>
            <MagneticButton
              onClick={handleExport}
              className="flex-1"
            >
              <Download size={16} />
              Exporter le rapport
            </MagneticButton>
          </div>
        </div>
      </div>
    </Modal>
  )
}
