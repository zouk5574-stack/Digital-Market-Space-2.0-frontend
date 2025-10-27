// components/admin/wallet/admin-withdrawal-panel.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Wallet, Banknote, TrendingUp, AlertTriangle } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { AdvancedInput } from '@/components/atomic/advanced-input'

interface PlatformEarnings {
  totalCommissions: number
  availableForWithdrawal: number
  pendingWithdrawals: number
  thisMonth: number
  lastMonth: number
}

interface AdminWithdrawalPanelProps {
  platformEarnings: PlatformEarnings
  onWithdraw: (amount: number, method: string) => void
}

export function AdminWithdrawalPanel({ platformEarnings, onWithdraw }: AdminWithdrawalPanelProps) {
  const [showWithdrawalModal, setShowWithdrawalModal] = useState(false)
  const [withdrawalAmount, setWithdrawalAmount] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('bank_transfer')

  const availableBalance = platformEarnings.availableForWithdrawal
  const canWithdraw = availableBalance > 0

  const handleWithdrawal = () => {
    const amount = parseFloat(withdrawalAmount)
    if (amount > 0 && amount <= availableBalance) {
      onWithdraw(amount, paymentMethod)
      setShowWithdrawalModal(false)
      setWithdrawalAmount('')
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Total Commissions */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-blue-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Commissions Totales</p>
              <p className="text-2xl font-bold text-slate-900">
                {platformEarnings.totalCommissions.toLocaleString()} FCFA
              </p>
            </div>
          </div>
        </div>

        {/* Available for Withdrawal */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Wallet className="text-green-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Disponible</p>
              <p className="text-2xl font-bold text-slate-900">
                {availableBalance.toLocaleString()} FCFA
              </p>
            </div>
          </div>
        </div>

        {/* This Month */}
        <div className="bg-white rounded-xl border border-slate-200 p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Banknote className="text-purple-600" size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-600">Ce Mois</p>
              <p className="text-2xl font-bold text-slate-900">
                {platformEarnings.thisMonth.toLocaleString()} FCFA
              </p>
            </div>
          </div>
        </div>

        {/* Withdrawal Action */}
        <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl p-6">
          <div className="text-white text-center">
            <Wallet className="mx-auto mb-3" size={32} />
            <p className="text-sm opacity-90 mb-2">Retrait Admin</p>
            <MagneticButton
              onClick={() => setShowWithdrawalModal(true)}
              disabled={!canWithdraw}
              className="w-full bg-white text-green-600 hover:bg-green-50"
            >
              Retirer les fonds
            </MagneticButton>
          </div>
        </div>
      </div>

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
                  <Wallet className="text-green-600" size={24} />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-900">
                      Retrait Admin
                    </h2>
                    <p className="text-slate-600 text-sm">
                      Retrait des commissions plateforme
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-6">
                {/* Available Balance */}
                <div className="bg-green-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-green-700 font-medium">Fonds disponibles</span>
                    <span className="text-2xl font-bold text-green-900">
                      {availableBalance.toLocaleString()} FCFA
                    </span>
                  </div>
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
                    placeholder="Montant en FCFA"
                    min="1"
                    max={availableBalance}
                  />
                </div>

                {/* Payment Method */}
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Méthode de retrait
                  </label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  >
                    <option value="bank_transfer">🏦 Virement Bancaire Entreprise</option>
                    <option value="business_account">💼 Compte Business</option>
                  </select>
                </div>

                {/* Warning */}
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="text-amber-600 mt-0.5" size={16} />
                    <div className="text-sm text-amber-800">
                      <p className="font-medium">Retrait administrateur</p>
                      <p className="mt-1">
                        Cette action retirera les commissions plateforme vers le compte administrateur.
                        Les fonds seront disponibles sous 24-48 heures.
                      </p>
                    </div>
                  </div>
                </div>
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
                  disabled={!withdrawalAmount || parseFloat(withdrawalAmount) <= 0 || parseFloat(withdrawalAmount) > availableBalance}
                  className="flex-1 py-2 px-4 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
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
