// app/auth/register/page.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { AccountTypeSelector } from '@/components/auth/account-type-selector'
import { motion } from 'framer-motion'
import { Eye, EyeOff, Check, AlertCircle } from 'lucide-react'

export default function RegisterPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    accountType: '',
    firstName: '',
    lastName: '', 
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeToTerms: false
  })
  const [showPassword, setShowPassword] = useState(false)
  const { register, isLoading, error } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (step === 1) {
      if (!formData.accountType) return
      setStep(2)
      return
    }

    // Validation finale
    if (formData.password !== formData.confirmPassword) {
      // Gérer erreur
      return
    }

    await register(formData)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold bg-gradient-to-br from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Rejoindre la communauté
          </h1>
          <p className="text-slate-600 mt-2">
            {step === 1 ? 'Choisissez votre profil' : 'Créez votre compte'}
          </p>
        </div>

        {/* Progress Bar */}
        <div className="flex items-center justify-between mb-8">
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step >= 1 ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-400'
          }`}>
            1
          </div>
          <div className="flex-1 h-1 bg-slate-200 mx-2">
            <div 
              className="h-1 bg-purple-600 transition-all duration-300"
              style={{ width: step === 2 ? '100%' : '0%' }}
            />
          </div>
          <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
            step === 2 ? 'bg-purple-600 text-white' : 'bg-slate-200 text-slate-400'
          }`}>
            2
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {step === 1 ? (
            <AccountTypeSelector />
          ) : (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-4"
            >
              {/* Personal Info */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Prénom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Nom *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Téléphone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  placeholder="+225 07 00 00 00 00"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Mot de passe *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={formData.password}
                    onChange={(e) => setFormData(prev => ({ ...prev, password: e.target.value }))}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Confirmer le mot de passe *
                </label>
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>

              {/* Password Requirements */}
              <div className="bg-slate-50 rounded-lg p-3 text-sm">
                <p className="font-medium text-slate-700 mb-2">Le mot de passe doit contenir :</p>
                <ul className="space-y-1 text-slate-600">
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-green-500" />
                    Au moins 8 caractères
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-green-500" />
                    Une majuscule et une minuscule
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-green-500" />
                    Un chiffre
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={12} className="text-green-500" />
                    Un caractère spécial
                  </li>
                </ul>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.agreeToTerms}
                  onChange={(e) => setFormData(prev => ({ ...prev, agreeToTerms: e.target.checked }))}
                  className="mt-1 rounded border-slate-300 text-purple-600 focus:ring-purple-500"
                />
                <span className="text-sm text-slate-600">
                  J'accepte les{' '}
                  <a href="/terms" className="text-purple-600 hover:text-purple-700">
                    conditions d'utilisation
                  </a>{' '}
                  et la{' '}
                  <a href="/privacy" className="text-purple-600 hover:text-purple-700">
                    politique de confidentialité
                  </a>
                </span>
              </label>
            </motion.div>
          )}

          {/* Error Display */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center gap-3">
              <AlertCircle className="text-red-500" size={16} />
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-3">
            {step === 2 && (
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2 px-4 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
              >
                Retour
              </button>
            )}
            <button
              type="submit"
              disabled={isLoading || (step === 2 && !formData.agreeToTerms)}
              className="flex-1 py-2 px-4 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mx-auto"></div>
              ) : step === 1 ? (
                'Continuer'
              ) : (
                'Créer mon compte'
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <p className="text-center text-slate-600 mt-6">
          Déjà un compte ?{' '}
          <a href="/auth/login" className="text-purple-600 hover:text-purple-700 font-medium">
            Se connecter
          </a>
        </p>
      </motion.div>
    </div>
  )
}
