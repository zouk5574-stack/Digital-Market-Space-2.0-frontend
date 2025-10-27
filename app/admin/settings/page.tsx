// app/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import { useSystemSettings } from '@/hooks/admin/use-system-settings'
import { GeneralSettings } from '@/components/admin/settings/general-settings'
import { PaymentSettings } from '@/components/admin/settings/payment-settings'
import { SecuritySettings } from '@/components/admin/settings/security-settings'
import { EmailSettings } from '@/components/admin/settings/email-settings'
import { SettingsNavigation } from '@/components/admin/settings/settings-navigation'
import { motion } from 'framer-motion'
import { Save, Settings as SettingsIcon } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

const settingsSections = [
  { id: 'general', name: 'Général', icon: SettingsIcon },
  { id: 'payment', name: 'Paiements', icon: SettingsIcon },
  { id: 'security', name: 'Sécurité', icon: SettingsIcon },
  { id: 'email', name: 'Email', icon: SettingsIcon },
]

export default function SystemSettingsPage() {
  const [activeSection, setActiveSection] = useState('general')
  const [hasChanges, setHasChanges] = useState(false)
  const { data: settings, isLoading, updateSettings } = useSystemSettings()

  const handleSave = async () => {
    // Implémenter la sauvegarde des paramètres
    setHasChanges(false)
  }

  const renderSection = () => {
    switch (activeSection) {
      case 'general':
        return <GeneralSettings settings={settings} onChange={() => setHasChanges(true)} />
      case 'payment':
        return <PaymentSettings settings={settings} onChange={() => setHasChanges(true)} />
      case 'security':
        return <SecuritySettings settings={settings} onChange={() => setHasChanges(true)} />
      case 'email':
        return <EmailSettings settings={settings} onChange={() => setHasChanges(true)} />
      default:
        return <GeneralSettings settings={settings} onChange={() => setHasChanges(true)} />
    }
  }

  return (
    <div className="flex gap-6">
      {/* Navigation */}
      <div className="w-64 flex-shrink-0">
        <SettingsNavigation
          sections={settingsSections}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
      </div>

      {/* Content */}
      <div className="flex-1 space-y-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between"
        >
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
              Paramètres Système
            </h1>
            <p className="text-slate-600 mt-2">
              Configuration et personnalisation de la plateforme
            </p>
          </div>
          
          {hasChanges && (
            <MagneticButton onClick={handleSave}>
              <Save size={16} />
              Sauvegarder
            </MagneticButton>
          )}
        </motion.div>

        {/* Settings Content */}
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-xl border border-slate-200"
        >
          {renderSection()}
        </motion.div>
      </div>
    </div>
  )
}
