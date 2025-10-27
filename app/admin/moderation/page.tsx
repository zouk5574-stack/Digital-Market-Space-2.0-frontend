// app/admin/moderation/page.tsx
'use client'

import { useState } from 'react'
import { useModeration } from '@/hooks/admin/use-moderation'
import { ReportedContent } from '@/components/admin/moderation/reported-content'
import { ModerationQueue } from '@/components/admin/moderation/moderation-queue'
import { ModerationStats } from '@/components/admin/moderation/moderation-stats'
import { motion } from 'framer-motion'
import { Flag, Users, Eye, Shield } from 'lucide-react'

export default function ModerationPage() {
  const [activeTab, setActiveTab] = useState('reports')
  const { 
    reportedItems, 
    moderationQueue, 
    stats, 
    isLoading,
    takeAction 
  } = useModeration()

  const tabs = [
    { id: 'reports', name: 'Contenu Signalé', icon: Flag, count: stats.pendingReports },
    { id: 'queue', name: 'File d\'Attente', icon: Users, count: moderationQueue.length },
    { id: 'review', name: 'En Révision', icon: Eye, count: stats.inReview },
    { id: 'history', name: 'Historique', icon: Shield, count: stats.resolvedToday },
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
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <ModerationStats stats={stats} />
      </motion.div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="border-b border-slate-200"
      >
        <nav className="flex space-x-8">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                relative flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm
                ${activeTab === tab.id
                  ? 'border-red-500 text-red-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                }
              `}
            >
              <tab.icon size={16} />
              {tab.name}
              {tab.count > 0 && (
                <span className={`
                  absolute -top-1 -right-1 w-5 h-5 rounded-full text-xs flex items-center justify-center font-medium
                  ${activeTab === tab.id 
                    ? 'bg-red-500 text-white' 
                    : 'bg-slate-200 text-slate-700'
                  }
                `}>
                  {tab.count > 99 ? '99+' : tab.count}
                </span>
              )}
            </button>
          ))}
        </nav>
      </motion.div>

      {/* Content */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        {activeTab === 'reports' && (
          <ReportedContent 
            items={reportedItems}
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
          <div className="text-center py-12 text-slate-500">
            <Eye size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">En Révision</h3>
            <p>Contenu actuellement en cours de révision par l'équipe de modération</p>
          </div>
        )}

        {activeTab === 'history' && (
          <div className="text-center py-12 text-slate-500">
            <Shield size={48} className="mx-auto mb-4 opacity-50" />
            <h3 className="text-lg font-medium text-slate-900 mb-2">Historique de Modération</h3>
            <p>Historique complet des actions de modération</p>
          </div>
        )}
      </motion.div>
    </div>
  )
}
