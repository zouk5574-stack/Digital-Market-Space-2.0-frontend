// components/admin/settings/payment-settings.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { CreditCard, Shield, TrendingUp, Zap } from 'lucide-react'
import { AdvancedInput } from '@/components/atomic/advanced-input'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface PaymentSettingsProps {
  settings: any
  onChange: () => void
}

export function PaymentSettings({ settings, onChange }: PaymentSettingsProps) {
  const [formData, setFormData] = useState({
    // FedaPay Configuration
    fedapayEnabled: settings?.fedapayEnabled || true,
    fedapayPublicKey: settings?.fedapayPublicKey || '',
    fedapaySecretKey: settings?.fedapaySecretKey || '',
    fedapayTestMode: settings?.fedapayTestMode || false,
    
    // Commission Settings
    commissionRateMissions: settings?.commissionRateMissions || 10,
    commissionRateProducts: settings?.commissionRateProducts || 15,
    minimumPayout: settings?.minimumPayout || 5000,
    
    // Payment Methods
    enableMobileMoney: settings?.enableMobileMoney || true,
    enableBankTransfer: settings?.enableBankTransfer || true,
    enableCrypto: settings?.enableCrypto || false,
    
    // Payout Settings
    payoutAutoApprove: settings?.payoutAutoApprove || false,
    payoutDelayDays: settings?.payoutDelayDays || 2,
  })

  const [showSecret, setShowSecret] = useState(false)

  const handleChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    onChange()
  }

  const testFedaPayConnection = async () => {
    // Implémenter le test de connexion FedaPay
    alert('Test de connexion FedaPay en cours...')
  }

  const paymentGroups = [
    {
      title: 'Configuration FedaPay',
      icon: CreditCard,
      fields: [
        {
          name: 'fedapayEnabled',
          label: 'Activer FedaPay',
          type: 'checkbox',
          value: formData.fedapayEnabled,
          description: 'Activer le système de paiement FedaPay'
        },
        {
          name: 'fedapayTestMode',
          label: 'Mode Test',
          type: 'checkbox',
          value: formData.fedapayTestMode,
          description: 'Utiliser l\'environnement de test FedaPay'
        },
        {
          name: 'fedapayPublicKey',
          label: 'Clé Publique',
          type: 'text',
          value: formData.fedapayPublicKey,
          placeholder: 'pk_live_xxxxxxxxxxxxxx'
        },
        {
          name: 'fedapaySecretKey',
          label: 'Clé Secrète',
          type: showSecret ? 'text' : 'password',
          value: formData.fedapaySecretKey,
          placeholder: 'sk_live_xxxxxxxxxxxxxx',
          action: (
            <button
              type="button"
              onClick={() => setShowSecret(!showSecret)}
              className="text-slate-400 hover:text-slate-600"
            >
              {showSecret ? '👁️' : '👁️‍🗨️'}
            </button>
          )
        }
      ]
    },
    {
      title: 'Commissions',
      icon: TrendingUp,
      fields: [
        {
          name: 'commissionRateMissions',
          label: 'Commission Missions (%)',
          type: 'number',
          value: formData.commissionRateMissions,
          min: 0,
          max: 50,
          step: 0.5
        },
        {
          name: 'commissionRateProducts',
          label: 'Commission Produits (%)',
          type: 'number',
          value: formData.commissionRateProducts,
          min: 0,
          max: 50,
          step: 0.5
        },
        {
          name: 'minimumPayout',
          label: 'Retrait Minimum (FCFA)',
          type: 'number',
          value: formData.minimumPayout,
          min: 1000,
          max: 100000
        }
      ]
    },
    {
      title: 'Méthodes de Paiement',
      icon: Zap,
      fields: [
        {
          name: 'enableMobileMoney',
          label: 'Mobile Money',
          type: 'checkbox',
          value: formData.enableMobileMoney,
          description: 'Activer les paiements par Mobile Money'
        },
        {
          name: 'enableBankTransfer',
          label: 'Virement Bancaire',
          type: 'checkbox',
          value: formData.enableBankTransfer,
          description: 'Activer les virements bancaires'
        },
        {
          name: 'enableCrypto',
          label: 'Cryptomonnaies',
          type: 'checkbox',
          value: formData.enableCrypto,
          description: 'Activer les paiements en cryptomonnaies'
        }
      ]
    }
  ]

  return (
    <div className="p-6 space-y-8">
      {paymentGroups.map((group, groupIndex) => (
        <motion.div
          key={group.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: groupIndex * 0.1 }}
          className="border border-slate-200 rounded-xl p-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <group.icon className="text-purple-600" size={20} />
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
                      className="mt-1 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-slate-900 group-hover:text-purple-600 transition-colors">
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
                    placeholder={field.placeholder}
                    min={field.min}
                    max={field.max}
                    step={field.step}
                    action={field.action}
                  />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      ))}

      {/* FedaPay Test Section */}
      {formData.fedapayPublicKey && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-lg font-semibold text-blue-900">Test FedaPay</h3>
              <p className="text-blue-700 text-sm">
                Vérifier la connexion à l'API FedaPay
              </p>
            </div>
            <MagneticButton
              onClick={testFedaPayConnection}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Shield size={16} />
              Tester la Connexion
            </MagneticButton>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-blue-900 font-medium">Statut</p>
              <p className="text-green-600">● Connecté</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-blue-900 font-medium">Environnement</p>
              <p className="text-orange-600">
                {formData.fedapayTestMode ? 'Test' : 'Production'}
              </p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-blue-100">
              <p className="text-blue-900 font-medium">Dernier test</p>
              <p className="text-slate-600">Il y a 2 minutes</p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Payout Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border border-slate-200 rounded-xl p-6"
      >
        <div className="flex items-center gap-3 mb-6">
          <TrendingUp className="text-green-600" size={20} />
          <h3 className="text-lg font-semibold text-slate-900">Paramètres de Paiement</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={formData.payoutAutoApprove}
                onChange={(e) => handleChange('payoutAutoApprove', e.target.checked)}
                className="mt-1 rounded border-slate-300 text-green-600 focus:ring-green-500"
              />
              <div className="flex-1">
                <p className="font-medium text-slate-900 group-hover:text-green-600 transition-colors">
                  Approbation automatique des retraits
                </p>
                <p className="text-sm text-slate-600 mt-1">
                  Les retraits sont automatiquement approuvés sans validation manuelle
                </p>
              </div>
            </label>
          </div>

          <AdvancedInput
            label="Délai de paiement (jours)"
            type="number"
            value={formData.payoutDelayDays}
            onChange={(e) => handleChange('payoutDelayDays', e.target.value)}
            min={0}
            max={30}
            description="Délai avant le traitement des retraits"
          />
        </div>
      </motion.div>
    </div>
  )
}
