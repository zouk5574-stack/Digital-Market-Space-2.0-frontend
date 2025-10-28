// components/admin/actions/withdrawal-actions.tsx
'use client'

import { useState } from 'react'
import { Withdrawal } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, X, MoreVertical, Loader2 } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface WithdrawalActionsProps {
  withdrawal: Withdrawal
  onProcess: (id: string, action: 'approve' | 'reject', reason?: string) => Promise<void>
  isProcessing: boolean
}

export function WithdrawalActions({ withdrawal, onProcess, isProcessing }: WithdrawalActionsProps) {
  const [showRejectModal, setShowRejectModal] = useState(false)
  const [rejectReason, setRejectReason] = useState('')
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const canProcess = withdrawal.status === 'pending' || withdrawal.status === 'processing'

  const handleApprove = async () => {
    await onProcess(withdrawal._id, 'approve')
  }

  const handleReject = async () => {
    if (!rejectReason.trim()) return
    
    await onProcess(withdrawal._id, 'reject', rejectReason)
    setShowRejectModal(false)
    setRejectReason('')
  }

  if (!canProcess) {
    return (
      <span className="text-slate-400 text-sm">
        Traité
      </span>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {/* Approve Button */}
      <MagneticButton
        size="sm"
        onClick={handleApprove}
        disabled={isProcessing}
        className="bg-green-500 hover:bg-green-600 text-white"
      >
        {isProcessing ? (
          <Loader2 size={14} className="animate-spin" />
        ) : (
          <Check size={14} />
        )}
      </MagneticButton>

      {/* Reject Button */}
      <MagneticButton
        size="sm"
        onClick={() => setShowRejectModal(true)}
        disabled={isProcessing}
        className="bg-red-500 hover:bg-red-600 text-white"
      >
        <X size={14} />
      </MagneticButton>

      {/* Reject Modal */}
      <AnimatePresence>
        {showRejectModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowRejectModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-xl p-6 w-full max-w-md"
              onClick={(e) => e.stopPropagation()}
            >
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Rejeter le retrait
              </h3>
              
              <p className="text-slate-600 mb-4">
                Veuillez indiquer la raison du rejet du retrait de{' '}
                <strong>{withdrawal.amount.toLocaleString()} FCFA</strong> par{' '}
                <strong>{withdrawal.user?.firstName} {withdrawal.user?.lastName}</strong>.
              </p>

              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Raison du rejet..."
                className="w-full h-32 p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
              />

              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => setShowRejectModal(false)}
                  className="flex-1 py-2 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                >
                  Annuler
                </button>
                <button
                  onClick={handleReject}
                  disabled={!rejectReason.trim() || isProcessing}
                  className="flex-1 py-2 px-4 bg-red-500 text-white rounded-lg hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {isProcessing ? (
                    <Loader2 size={16} className="animate-spin mx-auto" />
                  ) : (
                    'Confirmer le rejet'
                  )}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
