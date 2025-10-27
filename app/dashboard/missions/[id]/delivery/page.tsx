// app/dashboard/missions/[id]/delivery/page.tsx
'use client'

import { useState } from 'react'
import { useMissionDelivery } from '@/hooks/missions/use-mission-delivery'
import { DeliveryForm } from '@/components/missions/delivery/delivery-form'
import { DeliveryFiles } from '@/components/missions/delivery/delivery-files'
import { MissionDetails } from '@/components/missions/delivery/mission-details'
import { motion } from 'framer-motion'
import { Package, Clock, AlertCircle } from 'lucide-react'

interface DeliveryPageProps {
  params: {
    id: string
  }
}

export default function DeliveryPage({ params }: DeliveryPageProps) {
  const { mission, isLoading, deliverMission } = useMissionDelivery(params.id)
  const [activeTab, setActiveTab] = useState('delivery')

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    )
  }

  if (!mission) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="mx-auto text-red-500 mb-4" size={48} />
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Mission non trouvée</h2>
          <p className="text-slate-600">La mission que vous recherchez n'existe pas.</p>
        </div>
      </div>
    )
  }

  const tabs = [
    { id: 'delivery', name: 'Livraison', icon: Package },
    { id: 'details', name: 'Détails Mission', icon: Clock },
  ]

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-purple-900 to-purple-700 bg-clip-text text-transparent">
            Livrer la Mission
          </h1>
          <p className="text-slate-600 mt-2">
            {mission.title}
          </p>
        </div>

        <div className="flex items-center gap-3 text-sm text-slate-600">
          <Clock size={16} />
          <span>Échéance: {new Date(mission.deadline).toLocaleDateString('fr-FR')}</span>
        </div>
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="border-b border-slate-200"
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-purple-500 text-purple-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              <tab.icon size={16} />
              {tab.name}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {activeTab === 'delivery' ? (
            <motion.div
              key="delivery"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <DeliveryForm 
                mission={mission}
                onDelivery={deliverMission}
              />
            </motion.div>
          ) : (
            <motion.div
              key="details"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <MissionDetails mission={mission} />
            </motion.div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <DeliveryFiles missionId={mission._id} />
          
          {/* Progress */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-white rounded-xl border border-slate-200 p-6"
          >
            <h3 className="font-semibold text-slate-900 mb-4">Progression</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Temps restant</span>
                <span className="font-medium text-slate-900">
                  {Math.ceil((new Date(mission.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24))} jours
                </span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2">
                <div 
                  className="bg-green-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: '75%' }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}
