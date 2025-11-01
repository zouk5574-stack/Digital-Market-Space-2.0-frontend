// app/admin/settings/page.tsx
'use client'

import { useState } from 'react'
import { useSystemSettings } from '@/hooks/admin/use-system-settings'
import { GeneralSettings } from '@/components/admin/settings/general-settings'
import { PaymentSettings } from '@/components/admin/settings/payment-settings'
import { SecuritySettings } from '@/components/admin/settings/security-settings'
import { EmailSettings } from '@/components/admin/settings/email-settings'
import { SettingsNavigation } from '@/components/admin/settings/settings-navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Save, Settings as SettingsIcon, CreditCard, Shield, Mail } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { useToast } from '@/hooks/use-toast'

const settingsSections = [
  { id: 'general', name: 'Général', icon: SettingsIcon },
  { id: 'payment', name: 'Paiements', icon: CreditCard },
  { id: 'security', name: 'Sécurité', icon: Shield },
  { id: 'email', name: 'Email', icon: Mail },
]

export default function SystemSettingsPage() {
  const [activeSection, setActiveSection] = useState('general')
  const [hasChanges, setHasChanges] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const { data: settings, isLoading, updateSettings } = useSystemSettings()
  const { toast } = useToast()

  const handleSave = async () => {
    if (!hasChanges) return
    
    setIsSaving(true)
    try {
      // Dans une vraie app, vous enverriez les données modifiées
      await updateSettings({})
      setHasChanges(false)
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Échec de la sauvegarde',
        variant: 'destructive'
      })
    } finally {
      setIsSaving(false)
    }
  }

  const handleChange = () => {
    if (!hasChanges) {
      setHasChanges(true)
    }
  }

  const renderSection = () => {
    if (isLoading) {
      return (
        <div className="p-6">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-20 bg-slate-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      )
    }

    switch (activeSection) {
      case 'general':
        return <GeneralSettings settings={settings} onChange={handleChange} />
      case 'payment':
        return <PaymentSettings settings={settings} onChange={handleChange} />
      case 'security':
        return <SecuritySettings settings={settings} onChange={handleChange} />
      case 'email':
        return <EmailSettings settings={settings} onChange={handleChange} />
      default:
        return <GeneralSettings settings={settings} onChange={handleChange} />
    }
  }

  return (
    <div className="flex gap-6 min-h-screen">
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
          
          <AnimatePresence>
            {hasChanges && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
              >
                <MagneticButton 
                  onClick={handleSave}
                  disabled={isSaving}
                >
                  <Save size={16} className={isSaving ? 'animate-spin' : ''} />
                  {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
                </MagneticButton>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Settings Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl border border-slate-200 min-h-[600px]"
          >
            {renderSection()}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
