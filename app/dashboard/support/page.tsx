// app/dashboard/support/page.tsx
'use client'

import { useState } from 'react'
import { useSupportTickets } from '@/hooks/use-support-tickets'
import { TicketsList } from '@/components/support/tickets-list'
import { NewTicketModal } from '@/components/support/new-ticket-modal'
import { motion } from 'framer-motion'
import { Plus, MessageCircle, Search } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function SupportPage() {
  const [showNewTicket, setShowNewTicket] = useState(false)
  const [filter, setFilter] = useState('all')
  const { tickets, isLoading, createTicket } = useSupportTickets()

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
            Support
          </h1>
          <p className="text-slate-600 mt-2">
            Obtenez de l'aide pour vos questions et problèmes
          </p>
        </div>
        
        <MagneticButton onClick={() => setShowNewTicket(true)}>
          <Plus size={16} />
          Nouveau ticket
        </MagneticButton>
      </motion.div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-blue-600" size={24} />
            <div>
              <p className="text-sm text-slate-600">Tickets ouverts</p>
              <p className="text-2xl font-bold text-slate-900">
                {tickets.filter(t => t.status === 'open').length}
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-xl border border-slate-200 p-4">
          <div className="flex items-center gap-3">
            <MessageCircle className="text-green-600" size={24} />
            <div>
              <p className="text-sm text-slate-600">Résolus</p>
              <p className="text-2xl font-bold text-slate-900">
                {tickets.filter(t => t.status === 'resolved').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tickets List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <TicketsList 
          tickets={tickets}
          isLoading={isLoading}
          filter={filter}
          onFilterChange={setFilter}
        />
      </motion.div>

      {/* New Ticket Modal */}
      <NewTicketModal
        isOpen={showNewTicket}
        onClose={() => setShowNewTicket(false)}
        onSubmit={createTicket}
      />
    </div>
  )
}
