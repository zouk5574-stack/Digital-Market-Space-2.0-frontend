// app/auth/verify-email/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion } from 'framer-motion'
import { CheckCircle, XCircle, Mail } from 'lucide-react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const searchParams = useSearchParams()
  const token = searchParams.get('token')
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')

  useEffect(() => {
    if (token) {
      // Simuler la vérification
      setTimeout(() => {
        setStatus('success') // ou 'error' en cas d'échec
      }, 2000)
    }
  }, [token])

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md text-center"
      >
        {status === 'loading' && (
          <>
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Mail className="text-blue-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Vérification en cours...
            </h1>
            <p className="text-slate-600">
              Nous vérifions votre adresse email
            </p>
            <div className="mt-6">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
            </div>
          </>
        )}

        {status === 'success' && (
          <>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="text-green-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Email vérifié !
            </h1>
            <p className="text-slate-600 mb-6">
              Votre adresse email a été vérifiée avec succès. Vous pouvez maintenant accéder à toutes les fonctionnalités.
            </p>
            <Link
              href="/dashboard"
              className="inline-block py-3 px-6 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Accéder à mon dashboard
            </Link>
          </>
        )}

        {status === 'error' && (
          <>
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <XCircle className="text-red-600" size={32} />
            </div>
            <h1 className="text-2xl font-bold text-slate-900 mb-4">
              Lien invalide
            </h1>
            <p className="text-slate-600 mb-6">
              Ce lien de vérification est invalide ou a expiré.
            </p>
            <div className="space-y-3">
              <Link
                href="/auth/login"
                className="block py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Se connecter
              </Link>
              <button className="text-purple-600 hover:text-purple-700 font-medium">
                Renvoyer l'email de vérification
              </button>
            </div>
          </>
        )}
      </motion.div>
    </div>
  )
}
