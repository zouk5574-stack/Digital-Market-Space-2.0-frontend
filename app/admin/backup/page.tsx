// app/admin/backup/page.tsx
'use client'

import { useState } from 'react'
import { useBackupSystem } from '@/hooks/admin/use-backup-system'
import { BackupList } from '@/components/admin/backup/backup-list'
import { BackupActions } from '@/components/admin/backup/backup-actions'
import { BackupStats } from '@/components/admin/backup/backup-stats'
import { motion } from 'framer-motion'
import { Database, Download, Upload, Settings, AlertTriangle } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function BackupPage() {
  const [activeTab, setActiveTab] = useState('backups')
  const { 
    backups, 
    isLoading, 
    createBackup, 
    restoreBackup, 
    deleteBackup,
    stats 
  } = useBackupSystem()

  const tabs = [
    { id: 'backups', name: 'Sauvegardes', icon: Database },
    { id: 'restore', name: 'Restauration', icon: Download },
    { id: 'settings', name: 'Paramètres', icon: Settings },
  ]

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
            Sauvegarde & Restauration
          </h1>
          <p className="text-slate-600 mt-2">
            Gestion des sauvegardes et récupération de données
          </p>
        </div>
        
        <BackupActions 
          onCreateBackup={createBackup}
          onRestoreBackup={restoreBackup}
          isLoading={isLoading}
        />
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <BackupStats stats={stats} />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-slate-200"
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              <tab.icon size={16} />
              {tab.name}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="space-y-6"
      >
        {activeTab === 'backups' && (
          <BackupList 
            backups={backups}
            onDeleteBackup={deleteBackup}
            isLoading={isLoading}
          />
        )}

        {activeTab === 'restore' && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="text-yellow-600" size={24} />
              <div>
                <h3 className="text-lg font-semibold text-yellow-900">
                  Restauration de Données
                </h3>
                <p className="text-yellow-700 text-sm">
                  Opération critique - Sauvegardez vos données actuelles avant toute restauration
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-4 border border-yellow-100">
                <h4 className="font-medium text-slate-900 mb-2">Restauration Complète</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Restaurer l'ensemble de la base de données depuis une sauvegarde
                </p>
                <MagneticButton variant="outline" className="w-full border-yellow-300 text-yellow-700">
                  <Upload size={16} />
                  Sélectionner une sauvegarde
                </MagneticButton>
              </div>

              <div className="bg-white rounded-lg p-4 border border-yellow-100">
                <h4 className="font-medium text-slate-900 mb-2">Restauration Partielle</h4>
                <p className="text-slate-600 text-sm mb-4">
                  Restaurer seulement certaines tables ou données spécifiques
                </p>
                <MagneticButton variant="outline" className="w-full border-slate-300 text-slate-700">
                  <Settings size={16} />
                  Configuration avancée
                </MagneticButton>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'settings' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Planification Automatique
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Fréquence des sauvegardes
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="daily">Quotidienne</option>
                    <option value="weekly">Hebdomadaire</option>
                    <option value="monthly">Mensuelle</option>
                    <option value="disabled">Désactivée</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Heure de sauvegarde
                  </label>
                  <input
                    type="time"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    defaultValue="02:00"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm text-slate-700">Sauvegarder seulement les données essentielles</span>
                  </label>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 p-6">
              <h3 className="text-lg font-semibold text-slate-900 mb-4">
                Stockage des Sauvegardes
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Emplacement de stockage
                  </label>
                  <select className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option value="local">Serveur local</option>
                    <option value="aws">Amazon S3</option>
                    <option value="google">Google Cloud Storage</option>
                    <option value="azure">Microsoft Azure</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Rétention des sauvegardes (jours)
                  </label>
                  <input
                    type="number"
                    min="1"
                    max="365"
                    defaultValue="30"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                    <span className="text-sm text-slate-700">Compresser les sauvegardes</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  )
}
