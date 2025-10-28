// components/dashboard/freelancer/quick-withdrawal.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, ArrowUpRight, AlertTriangle } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { AdvancedInput } from '@/components/atomic/advanced-input'

interface QuickWithdrawalProps {
  balance: number
}

export function QuickWithdrawal({ balance }: QuickWithdrawalProps) {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('mobile_money')

  const minimumWithdrawal = 5000
  const canWithdraw = balance >= minimumWithdrawal

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount)
    if (amount >= minimumWithdrawal && amount <= balance) {
      // Implémenter la demande de retrait
      console.log('Demande de retrait:', { amount, paymentMethod })
      setShowWithdrawalModal(false)
      setWithdrawalAmount('')
    }
  }

  const suggestedAmounts = [
    { label: '5,000 FCFA', value: 5000 },
    { label: '10,000 FCFA', value: 10000 },
    { label: '25,000 FCFA', value: 25000 },
    { label: 'Tout retirer', value: balance }
  ]

  return (
    <>
      <MagneticButton
        onClick={() => setShowWithdrawalModal(true)}
        disabled={!canWithdraw}
        className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        <Wallet size={16} />
        Demander un retrait
      </MagneticButton>

      {/* Withdrawal Modal */}
      <AnimatePresence>
        {showWithdrawalModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowWithdrawalModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <Wallet className="text-purple-600" size={24} />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Retrait de fonds
                    </h2>
                    <p className="text-slate-600 text-sm">
                      Solde disponible: <strong>{balance.toLocaleString()} FCFA</strong>
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Balance Info */}
                <div className="bg-purple-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-purple-700 font-medium">Solde disponible</span>
                    <span className="text-2xl font-bold text-purple-900">
                      {balance.toLocaleString()} FCFA
                    </span>
                  </div>
                  {!canWithdraw && (
                    <div className="flex items-center gap-2 mt-2 text-amber-600 text-sm">
                      <AlertTriangle size={16} />
                      Minimum de retrait: {minimumWithdrawal.toLocaleString()} FCFA
                    </div>
                  )}
                </div>

                {/* Amount Input */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Montant à retirer
                  </label>
                  <AdvancedInput
                    type="number"
                    value={withdrawalAmount}
                    onChange={(e) => setWithdrawalAmount(e.target.value)}
                    placeholder={`Minimum ${minimumWithdrawal.toLocaleString()} FCFA`}
                    min={minimumWithdrawal}
                    max={balance}
                  />
                </div>

                {/* Suggested Amounts */}
                <div className="grid grid-cols-2 gap-2">
                  {suggestedAmounts.map((suggestion) => (
                    <button
                      key={suggestion.value}
                      onClick={() => setWithdrawalAmount(suggestion.value.toString())}
                      className="p-2 border border-slate-300 rounded-lg text-sm hover:border-purple-500 hover:text-purple-700 transition-colors text-center"
                    >
                      {suggestion.label}
                    </button>
                  ))}
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Méthode de paiement
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  >
                    <option value="mobile_money">📱 Mobile Money</option>
                    <option value="bank_transfer">🏦 Virement Bancaire</option>
                  </select>
                </div>

                {/* Payment Details */}
                {paymentMethod === 'mobile_money' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      Numéro de téléphone
                    </label>
                    <AdvancedInput
                      type="tel"
                      placeholder="+225 07 00 00 00 00"
                      icon="📱"
                    />
                  </div>
                )}

                {paymentMethod === 'bank_transfer' && (
                  <div className="space-y-3">
                    <AdvancedInput
                      label="Nom de la banque"
                      placeholder="Banque ABC"
                    />
                    <AdvancedInput
                      label="Numéro de compte"
                      placeholder="XXXX XXXX XXXX XXXX"
                    />
                    <AdvancedInput
                      label="Nom du titulaire"
                      placeholder="Votre nom complet"
                    />
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="flex gap-3 p-6 border-t border-slate-200">
                <button
                  onClick={() => setShowWithdrawalModal(false)}
                  className="flex-1 py-2 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleWithdrawal}
                  disabled={!withdrawalAmount || parseFloat(withdrawalAmount) < minimumWithdrawal || parseFloat(withdrawalAmount) > balance}
                  className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
                >
                  <ArrowUpRight size={16} />
                  Confirmer le retrait
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
