// components/admin/settings/email-settings.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Mail, Send, Server, TestTube, Eye, EyeOff } from 'lucide-react'
import { AdvancedInput } from '@/components/atomic/advanced-input'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface EmailSettingsProps {
  settings: any
  onChange: () => void
}

export function EmailSettings({ settings, onChange }: EmailSettingsProps) {
  const [formData, setFormData] = useState({
    // SMTP Configuration
    smtpHost: settings?.smtpHost || 'smtp.example.com',
    smtpPort: settings?.smtpPort || 587,
    smtpUsername: settings?.smtpUsername || 'noreply@example.com',
    smtpPassword: settings?.smtpPassword || '',
    smtpEncryption: settings?.smtpEncryption || 'tls',
    
    // Email Settings
    fromEmail: settings?.fromEmail || 'noreply@example.com',
    fromName: settings?.fromName || 'Digital Market Space',
    
    // Features
    emailVerificationEnabled: settings?.emailVerificationEnabled || true,
    newsletterEnabled: settings?.newsletterEnabled || true,
    
    // Templates
    enableWelcomeEmail: settings?.enableWelcomeEmail || true,
    enablePasswordReset: settings?.enablePasswordReset || true,
    enableNotifications: settings?.enableNotifications || true,
  })

  const [showPassword, setShowPassword] = useState(false)
  const [testEmail, setTestEmail] = useState('')

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onChange()
  }

  const testEmailConnection = async () => {
    // Implémenter le test de connexion email
    alert('Test de connexion email en cours...')
  }

  const sendTestEmail = async () => {
    if (!testEmail) {
      alert('Veuillez entrer une adresse email de test')
      return
    }
    // Implémenter l'envoi d'email de test
    alert(`Email de test envoyé à ${testEmail}`)
  }

  const emailGroups = [
    {
      title: 'Configuration SMTP',
      icon: Server,
      fields: [
        {
          name: 'smtpHost',
          label: 'Serveur SMTP',
          type: 'text',
          value: formData.smtpHost,
          placeholder: 'smtp.example.com'
        },
        {
          name: 'smtpPort',
          label: 'Port SMTP',
          type: 'number',
          value: formData.smtpPort,
          min: 1,
          max: 65535
        },
        {
          name: 'smtpUsername',
          label: 'Nom d\'utilisateur',
          type: 'text',
          value: formData.smtpUsername,
          placeholder: 'noreply@example.com'
        },
        {
          name: 'smtpPassword',
          label: 'Mot de passe',
          type: showPassword ? 'text' : 'password',
          value: formData.smtpPassword,
          placeholder: 'Votre mot de passe SMTP',
          action: (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          )
        },
        {
          name: 'smtpEncryption',
          label: 'Chiffrement',
          type: 'select',
          value: formData.smtpEncryption,
          options: [
            { value: 'tls', label: 'TLS' },
            { value: 'ssl', label: 'SSL' },
            { value: 'none', label: 'Aucun' }
          ]
        }
      ]
    },
    {
      title: 'Expéditeur',
      icon: Send,
      fields: [
        {
          name: 'fromEmail',
          label: 'Email expéditeur',
          type: 'email',
          value: formData.fromEmail,
          placeholder: 'noreply@example.com'
        },
        {
          name: 'fromName',
          label: 'Nom expéditeur',
          type: 'text',
          value: formData.fromName,
          placeholder: 'Digital Market Space'
        }
      ]
    },
    {
      title: 'Fonctionnalités Email',
      icon: Mail,
      fields: [
        {
          name: 'emailVerificationEnabled',
          label: 'Vérification email',
          type: 'checkbox',
          value: formData.emailVerificationEnabled,
          description: 'Envoyer des emails de vérification pour les nouveaux comptes'
        },
        {
          name: 'newsletterEnabled',
          label: 'Newsletter',
          type: 'checkbox',
          value: formData.newsletterEnabled,
          description: 'Activer l\'envoi de newsletters aux utilisateurs'
        },
        {
          name: 'enableWelcomeEmail',
          label: 'Email de bienvenue',
          type: 'checkbox',
          value: formData.enableWelcomeEmail,
          description: 'Envoyer un email de bienvenue aux nouveaux utilisateurs'
        },
        {
          name: 'enablePasswordReset',
          label: 'Réinitialisation mot de passe',
          type: 'checkbox',
          value: formData.enablePasswordReset,
          description: 'Permettre la réinitialisation du mot de passe par email'
        },
        {
          name: 'enableNotifications',
          label: 'Notifications',
          type: 'checkbox',
          value: formData.enableNotifications,
          description: 'Envoyer des notifications par email'
        }
      ]
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {emailGroups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="border border-slate-200 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <group.icon className="text-blue-600" size={20} />
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
                ) : field.type === 'select' ? (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      {field.label}
                    </label>
                    <select
                      value={field.value}
                      onChange={(e) => handleChange(field.name, e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      {field.options?.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                ) : (
                  <AdvancedInput
                    label={field.label}
                    type={field.type}
                    value={field.value}
                    onChange={(e) => handleChange(field.name, e.target.value)}
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    action={field.action}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* Test Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-xl p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-blue-900">Test de Configuration</h3>
            <p className="text-blue-700 text-sm">
              Vérifier la configuration SMTP et envoyer un email de test
            </p>
          </div>
          <MagneticButton
            onClick={testEmailConnection}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <TestTube size={16} />
            Tester SMTP
          </MagneticButton>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-blue-900 mb-2">
              Email de test
            </label>
            <div className="flex gap-2">
              <input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="test@example.com"
                className="flex-1 px-3 py-2 border border-blue-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
              <MagneticButton
                onClick={sendTestEmail}
                disabled={!testEmail}
                className="bg-green-600 hover:bg-green-700"
              >
                <Send size={16} />
                Tester
              </MagneticButton>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-blue-900 font-medium">Statut SMTP</p>
              <p className="text-green-600">● Connecté</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-blue-900 font-medium">Dernier test</p>
              <p className="text-slate-600">Il y a 5 minutes</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Email Statistics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-slate-200 rounded-xl p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-6">Statistiques Email</h3>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-slate-900">1,245</p>
            <p className="text-sm text-slate-600">Emails envoyés</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-green-600">89%</p>
            <p className="text-sm text-slate-600">Taux de livraison</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-blue-600">34%</p>
            <p className="text-sm text-slate-600">Taux d'ouverture</p>
          </div>
          <div className="bg-slate-50 rounded-lg p-4">
            <p className="text-2xl font-bold text-purple-600">12%</p>
            <p className="text-sm text-slate-600">Taux de clics</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
