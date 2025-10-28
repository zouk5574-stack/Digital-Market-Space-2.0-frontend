// app/dashboard/settings/privacy/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Download, Trash2, Shield, Bell } from 'lucide-react'

export default function PrivacySettingsPage() {
  const [settings, setSettings] = useState({
    profileVisibility: 'public',
    emailNotifications: true,
    pushNotifications: true,
    dataSharing: false,
    searchEngineIndexing: true
  })

  const handleExportData = async () => {
    // Générer et télécharger les données utilisateur
    const data = {
      user: { /* données utilisateur */ },
      missions: { /* missions */ },
      products: { /* produits */ }
    }
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `mes-donnees-${new Date().toISOString().split('T')[0]}.json`
    a.click()
  }

  const handleDeleteAccount = async () => {
    if (confirm('Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.')) {
      // Supprimer le compte
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 mb-2">
          Confidentialité et Données
        </h1>
        <p className="text-slate-600">
          Gérez vos paramètres de confidentialité et vos données personnelles
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6">
        {/* Visibilité du Profil */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Eye className="text-blue-600" size={20} />
            <h2 className="text-lg font-semibold text-slate-900">Visibilité du profil</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="visibility"
                value="public"
                checked={settings.profileVisibility === 'public'}
                onChange={(e) => setSettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="font-medium text-slate-900">Profil public</p>
                <p className="text-sm text-slate-600">Tout le monde peut voir votre profil et vos réalisations</p>
              </div>
            </label>
            
            <label className="flex items-center gap-3">
              <input
                type="radio"
                name="visibility"
                value="private"
                checked={settings.profileVisibility === 'private'}
                onChange={(e) => setSettings(prev => ({ ...prev, profileVisibility: e.target.value }))}
                className="text-blue-600 focus:ring-blue-500"
              />
              <div>
                <p className="font-medium text-slate-900">Profil privé</p>
                <p className="text-sm text-slate-600">Seuls les utilisateurs connectés peuvent voir votre profil</p>
              </div>
            </label>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Bell className="text-purple-600" size={20} />
            <h2 className="text-lg font-semibold text-slate-900">Préférences de notifications</h2>
          </div>
          
          <div className="space-y-4">
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Notifications email</p>
                <p className="text-sm text-slate-600">Recevoir des emails pour les nouvelles missions et messages</p>
              </div>
              <input
                type="checkbox"
                checked={settings.emailNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
            </label>
            
            <label className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Notifications push</p>
                <p className="text-sm text-slate-600">Notifications en temps réel dans le navigateur</p>
              </div>
              <input
                type="checkbox"
                checked={settings.pushNotifications}
                onChange={(e) => setSettings(prev => ({ ...prev, pushNotifications: e.target.checked }))}
                className="rounded border-slate-300 text-purple-600 focus:ring-purple-500"
              />
            </label>
          </div>
        </motion.div>

        {/* Données personnelles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <div className="flex items-center gap-3 mb-4">
            <Shield className="text-green-600" size={20} />
            <h2 className="text-lg font-semibold text-slate-900">Données personnelles</h2>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3">
              <div>
                <p className="font-medium text-slate-900">Exporter mes données</p>
                <p className="text-sm text-slate-600">Téléchargez une copie de toutes vos données personnelles</p>
              </div>
              <button
                onClick={handleExportData}
                className="px-4 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-2"
              >
                <Download size={16} />
                Exporter
              </button>
            </div>
            
            <div className="flex items-center justify-between py-3 border-t border-slate-200">
              <div>
                <p className="font-medium text-slate-900">Supprimer mon compte</p>
                <p className="text-sm text-slate-600">Supprime définitivement votre compte et toutes vos données</p>
              </div>
              <button
                onClick={handleDeleteAccount}
                className="px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 transition-colors flex items-center gap-2"
              >
                <Trash2 size={16} />
                Supprimer
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
