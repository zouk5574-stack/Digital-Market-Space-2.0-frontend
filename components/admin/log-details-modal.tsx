// components/admin/log-details-modal.tsx
'use client'

import { ActivityLog } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { X, User, Globe, Calendar, FileText } from 'lucide-react'
import { LogSeverityBadge } from '@/components/admin/badges/log-severity-badge'

interface LogDetailsModalProps {
  log: ActivityLog | null
  isOpen: boolean
  onClose: () => void
}

export function LogDetailsModal({ log, isOpen, onClose }: LogDetailsModalProps) {
  if (!log) return null

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-slate-200">
              <div className="flex items-center gap-3">
                <FileText className="text-slate-600" size={24} />
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">
                    Détails du Log
                  </h2>
                  <p className="text-slate-600 text-sm">
                    Informations complètes sur l'activité
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              {/* Basic Info */}
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-sm font-medium text-slate-600">Action</label>
                  <p className="text-slate-900 font-medium capitalize mt-1">
                    {log.action.replace('.', ' ')}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600">Sévérité</label>
                  <div className="mt-1">
                    <LogSeverityBadge severity={log.severity} />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="text-sm font-medium text-slate-600">Description</label>
                <p className="text-slate-900 mt-1">{log.description}</p>
              </div>

              {/* User Info */}
              {log.user && (
                <div className="bg-slate-50 rounded-lg p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <User className="text-slate-600" size={20} />
                    <h3 className="font-medium text-slate-900">Utilisateur</h3>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-slate-600">Nom:</span>
                      <p className="text-slate-900 font-medium">
                        {log.user.firstName} {log.user.lastName}
                      </p>
                    </div>
                    <div>
                      <span className="text-slate-600">Email:</span>
                      <p className="text-slate-900">{log.user.email}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Technical Info */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Globe className="text-slate-600" size={20} />
                  <h3 className="font-medium text-slate-900">Informations Techniques</h3>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-slate-600">Adresse IP:</span>
                    <code className="block bg-white px-2 py-1 rounded border text-slate-900 font-mono mt-1">
                      {log.ipAddress}
                    </code>
                  </div>
                  <div>
                    <span className="text-slate-600">User Agent:</span>
                    <p className="text-slate-900 text-xs mt-1 line-clamp-2">
                      {log.userAgent}
                    </p>
                  </div>
                </div>
              </div>

              {/* Timestamp */}
              <div className="bg-slate-50 rounded-lg p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Calendar className="text-slate-600" size={20} />
                  <h3 className="font-medium text-slate-900">Horodatage</h3>
                </div>
                <div className="text-sm">
                  <span className="text-slate-600">Date et heure:</span>
                  <p className="text-slate-900 mt-1">
                    {new Date(log.createdAt).toLocaleString('fr-FR', {
                      dateStyle: 'full',
                      timeStyle: 'medium'
                    })}
                  </p>
                </div>
              </div>

              {/* Metadata */}
              {log.metadata && Object.keys(log.metadata).length > 0 && (
                <div>
                  <label className="text-sm font-medium text-slate-600">Métadonnées</label>
                  <pre className="bg-slate-900 text-slate-100 p-4 rounded-lg mt-2 text-sm overflow-x-auto">
                    {JSON.stringify(log.metadata, null, 2)}
                  </pre>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex justify-end p-6 border-t border-slate-200">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-colors"
              >
                Fermer
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
