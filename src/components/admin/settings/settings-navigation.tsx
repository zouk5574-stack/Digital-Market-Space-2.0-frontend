// components/admin/settings/settings-navigation.tsx
'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface SettingsSection {
  id: string
  name: string
  icon: LucideIcon
}

interface SettingsNavigationProps {
  sections: SettingsSection[]
  activeSection: string
  onSectionChange: (section: string) => void
}

export function SettingsNavigation({ 
  sections, 
  activeSection, 
  onSectionChange 
}: SettingsNavigationProps) {
  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 sticky top-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-slate-900">Paramètres</h3>
        <p className="text-slate-600 text-sm mt-1">
          Configuration de la plateforme
        </p>
      </div>

      <nav className="space-y-1">
        {sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSectionChange(section.id)}
            className={`
              w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-all duration-200
              ${activeSection === section.id
                ? 'bg-blue-50 text-blue-700 border border-blue-200 shadow-sm'
                : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }
            `}
          >
            <section.icon 
              size={18} 
              className={activeSection === section.id ? 'text-blue-600' : 'text-slate-400'} 
            />
            <span className="font-medium text-sm">{section.name}</span>
            
            {activeSection === section.id && (
              <motion.div
                layoutId="activeSection"
                className="w-1 h-6 bg-blue-500 rounded-full ml-auto"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <div className="space-y-2 text-sm">
          <div className="flex justify-between text-slate-600">
            <span>Statut</span>
            <span className="font-medium text-green-600">● Actif</span>
          </div>
          <div className="flex justify-between text-slate-600">
            <span>Dernière sauvegarde</span>
            <span className="font-medium">Il y a 2h</span>
          </div>
        </div>
      </div>
    </div>
  )
}
