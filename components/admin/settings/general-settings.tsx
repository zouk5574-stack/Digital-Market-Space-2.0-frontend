// components/admin/settings/general-settings.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Globe, Users, Bell, Shield } from 'lucide-react'
import { AdvancedInput } from '@/components/atomic/advanced-input'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface GeneralSettingsProps {
  settings: any
  onChange: () => void
}

export function GeneralSettings({ settings, onChange }: GeneralSettingsProps) {
  const [formData, setFormData] = useState({
    siteName: settings?.siteName || 'Digital Market Space',
    siteDescription: settings?.siteDescription || 'Marketplace freelance et produits digitaux',
    siteUrl: settings?.siteUrl || 'https://dms.example.com',
    supportEmail: settings?.supportEmail || 'support@dms.example.com',
    defaultLanguage: settings?.defaultLanguage || 'fr',
    timezone: settings?.timezone || 'Africa/Abidjan',
    maintenanceMode: settings?.maintenanceMode || false,
    registrationEnabled: settings?.registrationEnabled || true,
  })

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onChange()
  }

  const settingGroups = [
    {
      title: 'Informations du Site',
      icon: Globe,
      fields: [
        {
          name: 'siteName',
          label: 'Nom du site',
          type: 'text',
          value: formData.siteName,
          placeholder: 'Nom de votre plateforme'
        },
        {
          name: 'siteDescription', 
          label: 'Description',
          type: 'textarea',
          value: formData.siteDescription,
          placeholder: 'Description de votre plateforme'
        },
        {
          name: 'siteUrl',
          label: 'URL du site',
          type: 'url',
          value: formData.siteUrl,
          placeholder: 'https://votre-site.com'
        }
      ]
    },
    {
      title: 'Configuration',
      icon: SettingsIcon,
      fields: [
        {
          name: 'defaultLanguage',
          label: 'Langue par défaut',
          type: 'select',
          value: formData.defaultLanguage,
          options: [
            { value: 'fr', label: 'Français' },
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' }
          ]
        },
        {
          name: 'timezone',
          label: 'Fuseau horaire',
          type: 'select',
          value: formData.timezone,
          options: [
            { value: 'Africa/Abidjan', label: 'Abidjan (GMT)' },
            { value: 'Europe/Paris', label: 'Paris (GMT+1)' },
            { value: 'America/New_York', label: 'New York (GMT-5)' }
          ]
        }
      ]
    },
    {
      title: 'Accès',
      icon: Users,
      fields: [
        {
          name: 'registrationEnabled',
          label: 'Inscriptions ouvertes',
          type: 'checkbox',
          value: formData.registrationEnabled,
          description: 'Autoriser les nouvelles inscriptions'
        },
        {
          name: 'maintenanceMode',
          label: 'Mode maintenance',
          type: 'checkbox',
          value: formData.maintenanceMode,
          description: 'Mettre le site en maintenance'
        }
      ]
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {settingGroups.map((group, groupIndex) => (
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
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}
    </div>
  )
}
