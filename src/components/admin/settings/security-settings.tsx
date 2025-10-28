// components/admin/settings/security-settings.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Shield, Lock, Key, Eye, EyeOff } from 'lucide-react'
import { AdvancedInput } from '@/components/atomic/advanced-input'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface SecuritySettingsProps {
  settings: any
  onChange: () => void
}

export function SecuritySettings({ settings, onChange }: SecuritySettingsProps) {
  const [formData, setFormData] = useState({
    // Authentication
    requireEmailVerification: settings?.requireEmailVerification || true,
    allowSocialLogin: settings?.allowSocialLogin || false,
    sessionTimeout: settings?.sessionTimeout || 24,
    
    // Password Policy
    minPasswordLength: settings?.minPasswordLength || 8,
    requireStrongPassword: settings?.requireStrongPassword || true,
    passwordExpiry: settings?.passwordExpiry || 90,
    
    // Rate Limiting
    loginAttempts: settings?.loginAttempts || 5,
    loginLockoutTime: settings?.loginLockoutTime || 30,
    
    // API Security
    enableAPIRateLimit: settings?.enableAPIRateLimit || true,
    apiRateLimit: settings?.apiRateLimit || 1000,
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onChange()
  }

  const securityGroups = [
    {
      title: 'Authentification',
      icon: Lock,
      fields: [
        {
          name: 'requireEmailVerification',
          label: 'Vérification email requise',
          type: 'checkbox',
          value: formData.requireEmailVerification,
          description: 'Les utilisateurs doivent vérifier leur email pour utiliser la plateforme'
        },
        {
          name: 'allowSocialLogin',
          label: 'Connexion sociale',
          type: 'checkbox', 
          value: formData.allowSocialLogin,
          description: 'Autoriser la connexion via Google, Facebook, etc.'
        },
        {
          name: 'sessionTimeout',
          label: 'Timeout de session (heures)',
          type: 'number',
          value: formData.sessionTimeout,
          min: 1,
          max: 720
        }
      ]
    },
    {
      title: 'Politique des Mots de Passe',
      icon: Key,
      fields: [
        {
          name: 'minPasswordLength',
          label: 'Longueur minimale',
          type: 'number',
          value: formData.minPasswordLength,
          min: 6,
          max: 32
        },
        {
          name: 'requireStrongPassword',
          label: 'Mot de passe fort requis',
          type: 'checkbox',
          value: formData.requireStrongPassword,
          description: 'Exiger des caractères spéciaux, chiffres et majuscules'
        },
        {
          name: 'passwordExpiry',
          label: 'Expiration (jours)',
          type: 'number',
          value: formData.passwordExpiry,
          min: 0,
          max: 365,
          description: '0 pour désactiver l\'expiration'
        }
      ]
    },
    {
      title: 'Limitation des Tentatives',
      icon: Shield,
      fields: [
        {
          name: 'loginAttempts',
          label: 'Tentatives de connexion',
          type: 'number',
          value: formData.loginAttempts,
          min: 1,
          max: 10
        },
        {
          name: 'loginLockoutTime',
          label: 'Temps de blocage (minutes)',
          type: 'number',
          value: formData.loginLockoutTime,
          min: 1,
          max: 1440
        }
      ]
    }
  ]

  const advancedSettings = [
    {
      name: 'enableAPIRateLimit',
      label: 'Limitation de débit API',
      type: 'checkbox',
      value: formData.enableAPIRateLimit,
      description: 'Protéger les APIs contre les attaques par force brute'
    },
    {
      name: 'apiRateLimit',
      label: 'Limite API (requêtes/heure)',
      type: 'number',
      value: formData.apiRateLimit,
      min: 100,
      max: 10000
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {securityGroups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="border border-slate-200 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <group.icon className="text-green-600" size={20} />
            <h3 className="text-lg font-semibold text-slate-900">{group.title}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {group.fields.map((field) => (
              <div key={field.name} className={field.type === 'checkbox' ? 'md:col-span-2' : ''}>
                {field.type === 'checkbox' ? (
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="mt-1 rounded border-slate-300 text-green-600 focus:ring-green-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 group-hover:text-green-600 transition-colors">
                        {field.label}
                      </p>
                      {field.description && (
                        <p className="text-sm text-slate-600 mt-1">{field.description}</p>
                      )}
                    </div>
                  </label>
                ) : (
                  <AdvancedInput
                    label={field.label}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    min={field.min}
                    max={field.max}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Advanced Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-slate-200 rounded-xl p-6"
      >
        <button
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center gap-3 text-lg font-semibold text-slate-900 mb-6 hover:text-blue-600 transition-colors"
        >
          {showAdvanced ? <EyeOff size={20} /> : <Eye size={20} />}
          Paramètres Avancés
        </button>

        {showAdvanced && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {advancedSettings.map((field) => (
              <div key={field.name} className={field.type === 'checkbox' ? 'md:col-span-2' : ''}>
                {field.type === 'checkbox' ? (
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={field.value}
                      onChange={(e) => handleChange(field.name, e.target.checked)}
                      className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 group-hover:text-blue-600 transition-colors">
                        {field.label}
                      </p>
                      {field.description && (
                        <p className="text-sm text-slate-600 mt-1">{field.description}</p>
                      )}
                    </div>
                  </label>
                ) : (
                  <AdvancedInput
                    label={field.label}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    min={field.min}
                    max={field.max}
                  />
                )}
              </div>
            ))}
          </motion.div>
        )}
      </motion.div>

      {/* Security Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-red-50 border border-red-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-red-900 mb-4">Actions de Sécurité</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MagneticButton variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            Forcer la déconnexion globale
          </MagneticButton>
          <MagneticButton variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            Vider les caches sensibles
          </MagneticButton>
          <MagneticButton variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            Régénérer les tokens API
          </MagneticButton>
          <MagneticButton variant="outline" className="border-red-300 text-red-700 hover:bg-red-100">
            Audit de sécurité
          </MagneticButton>
        </div>
      </motion.div>
    </div>
  )
}
