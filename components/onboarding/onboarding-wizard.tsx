// components/onboarding/onboarding-wizard.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Check, ArrowRight, Star, Rocket, Target } from 'lucide-react'

interface OnboardingWizardProps {
  isOpen: boolean
  onComplete: () => void
  userRole: 'client' | 'freelancer'
}

export function OnboardingWizard({ isOpen, onComplete, userRole }: OnboardingWizardProps) {
  const [currentStep, setCurrentStep] = useState(0)

  const clientSteps = [
    {
      title: "🎯 Bienvenue Client !",
      description: "Découvrez comment trouver les meilleurs talents pour vos projets",
      features: [
        "Publiez votre première mission en 2 minutes",
        "Recevez des propositions de freelances qualifiés",
        "Suivez l'avancement en temps réel"
      ]
    },
    {
      title: "📝 Créer une Mission Parfaite",
      description: "Nos conseils pour attirer les meilleurs freelances",
      tips: [
        "Soyez précis sur vos besoins",
        "Fixez un budget réaliste",
        "Définissez des délais clairs"
      ]
    },
    {
      title: "💰 Gérer vos Paiements",
      description: "Système de paiement sécurisé",
      features: [
        "Paiement mis en attente jusqu'à livraison",
        "Protection contre les litiges",
        "Support 7j/7"
      ]
    }
  ]

  const freelancerSteps = [
    {
      title: "🚀 Lancez-vous Freelance !",
      description: "Maximisez vos chances de succès sur la plateforme",
      features: [
        "Complétez votre profil à 100%",
        "Ajoutez vos réalisations",
        "Définissez vos tarifs"
      ]
    },
    {
      title: "💼 Trouver des Missions",
      description: "Stratégies pour décrocher vos premiers contrats",
      tips: [
        "Personnalisez chaque proposition",
        "Répondez rapidement aux missions",
        "Construisez votre réputation"
      ]
    },
    {
      title: "⭐ Exceller dans vos Prestations",
      description: "Devenez un freelance top-rated",
      features: [
        "Communiquez régulièrement avec vos clients",
        "Livrez dans les délais",
        "Demandez des avis après chaque mission"
      ]
    }
  ]

  const steps = userRole === 'client' ? clientSteps : freelancerSteps

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
      >
        <div className="p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-slate-900 mb-4">
                {steps[currentStep].title}
              </h2>
              
              <p className="text-slate-600 mb-8">
                {steps[currentStep].description}
              </p>

              {/* Features List */}
              {'features' in steps[currentStep] && (
                <div className="space-y-3 mb-8">
                  {steps[currentStep].features?.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3 text-left">
                      <Check className="text-green-500 flex-shrink-0" size={20} />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Tips List */}
              {'tips' in steps[currentStep] && (
                <div className="bg-blue-50 rounded-lg p-4 mb-8">
                  <h4 className="font-semibold text-blue-900 mb-3">Conseils pro :</h4>
                  <div className="space-y-2 text-left">
                    {steps[currentStep].tips?.map((tip, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <Star className="text-blue-500 mt-0.5 flex-shrink-0" size={16} />
                        <span className="text-blue-800 text-sm">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Progress */}
              <div className="flex justify-center gap-2 mb-8">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentStep ? 'bg-purple-600' : 'bg-slate-300'
                    }`}
                  />
                ))}
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                {currentStep > 0 && (
                  <button
                    onClick={() => setCurrentStep(currentStep - 1)}
                    className="flex-1 py-3 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    Retour
                  </button>
                )}
                
                <button
                  onClick={() => {
                    if (currentStep === steps.length - 1) {
                      onComplete()
                    } else {
                      setCurrentStep(currentStep + 1)
                    }
                  }}
                  className="flex-1 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center justify-center gap-2"
                >
                  {currentStep === steps.length - 1 ? (
                    <>
                      <Rocket size={16} />
                      Commencer maintenant !
                    </>
                  ) : (
                    <>
                      Continuer
                      <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}
