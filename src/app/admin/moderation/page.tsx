// app/admin/moderation/page.tsx
'use client'

import { useState } from 'react'
import { useModeration } from '@/hooks/admin/use-moderation'
import { ReportedContent } from '@/components/admin/moderation/reported-content'
import { ModerationQueue } from '@/components/admin/moderation/moderation-queue'
import { ModerationStats } from '@/components/admin/moderation/moderation-stats'
import { ReviewContent } from '@/components/admin/moderation/review-content'
import { ModerationHistory } from '@/components/admin/moderation/moderation-history'
import { motion, AnimatePresence } from 'framer-motion'
import { Flag, Users, Eye, Shield, AlertTriangle, RefreshCw } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const { 
    reportedItems, 
    moderationQueue, 
    stats, 
    isLoading,
    takeAction,
    refetch
  } = useModeration()

  // Filtrer les éléments par statut pour les différents onglets
  const pendingReports = reportedItems.filter(item => item.status === 'pending')
  const inReviewItems = reportedItems.filter(item => item.status === 'in_review')
  const resolvedItems = reportedItems.filter(item => 
    item.status === 'resolved' || item.status === 'dismissed'
  )

  const tabs = [
    { 
      id: 'reports', 
      name: 'Contenu Signalé', 
      icon: Flag, 
      count: pendingReports.length,
      description: 'Nouveaux signalements à traiter'
    },
    { 
      id: 'queue', 
      name: 'File d\'Attente', 
      icon: Users, 
      count: moderationQueue.length,
      description: 'Contenu prioritaire nécessitant une action immédiate'
    },
    { 
      id: 'review', 
      name: 'En Révision', 
      icon: Eye, 
      count: inReviewItems.length,
      description: 'Contenu en cours d\'examen par l\'équipe'
    },
    { 
      id: 'history', 
      name: 'Historique', 
      icon: Shield, 
      count: stats.resolvedToday,
      description: 'Actions de modération récentes'
    },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-br from-slate-900 to-slate-700 bg-clip-text text-transparent">
            Centre de Modération
          </h1>
          <p className="text-slate-600 mt-2">
            Gestion du contenu signalé et modération en temps réel
          </p>
        </div>
        
        {/* Actions globales */}
        <div className="flex items-center gap-3">
          <MagneticButton
            variant="outline"
            size="sm"
            onClick={() => refetch()}
            disabled={isLoading}
          >
            <RefreshCw size={16} className={isLoading ? 'animate-spin' : ''} />
            Actualiser
          </MagneticButton>
        </div>
      </motion.div>

      {/* Alertes critiques */}
      {moderationQueue.some(item => item.severity === 'critical') && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center gap-3"
        >
          <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
            <AlertTriangle className="text-red-600" size={20} />
          </div>
          <div className="flex-1">
            <p className="text-red-800 font-medium">Contenu critique détecté</p>
            <p className="text-red-600 text-sm">
              {moderationQueue.filter(item => item.severity === 'critical').length} 
              signalement{moderationQueue.filter(item => item.severity === 'critical').length > 1 ? 's' : ''} 
              nécessite{moderationQueue.filter(item => item.severity === 'critical').length > 1 ? 'nt' : ''} 
              une attention immédiate
            </p>
          </div>
          <MagneticButton
            variant="primary"
            size="sm"
            onClick={() => setActiveTab('queue')}
          >
            Voir la file d'attente
          </MagneticButton>
        </motion.div>
      )}

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ModerationStats stats={stats} />
      </motion.div>

      {/* Tabs avec indicateurs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-slate-900">Tableau de Modération</h3>
          <div className="text-sm text-slate-500">
            {tabs.find(tab => tab.id === activeTab)?.description}
          </div>
        </div>

        <nav className="flex space-x-1 bg-slate-100 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-2 py-3 px-4 rounded-md font-medium text-sm transition-all duration-200
                ${activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-white/50'
                }
              `}
            >
              <tab.icon size={16} />
              {tab.name}
              {tab.count > 0 && (
                <span className={`
                  w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium
                  ${activeTab === tab.id 
                    ? 'bg-red-500 text-white' 
                    : 'bg-slate-300 text-slate-700'
                  }
                `}>
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Contenu avec animations améliorées */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.2 }}
          className="min-h-[400px]"
        >
          {activeTab === 'reports' && (
            <ReportedContent 
              items={pendingReports}
              onAction={takeAction}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'queue' && (
            <ModerationQueue 
              items={moderationQueue}
              onAction={takeAction}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'review' && (
            <ReviewContent 
              items={inReviewItems}
              onAction={takeAction}
              isLoading={isLoading}
            />
          )}

          {activeTab === 'history' && (
            <ModerationHistory 
              items={resolvedItems}
              stats={stats}
              isLoading={isLoading}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
