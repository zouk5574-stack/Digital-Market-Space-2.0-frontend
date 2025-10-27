// app/dashboard/missions/[id]/chat/page.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useMissionChat } from '@/hooks/missions/use-mission-chat'
import { ChatMessages } from '@/components/missions/chat/chat-messages'
import { ChatInput } from '@/components/missions/chat/chat-input'
import { ChatHeader } from '@/components/missions/chat/chat-header'
import { MissionSidebar } from '@/components/missions/chat/mission-sidebar'
import { motion } from 'framer-motion'
import { MessageCircle, Clock, AlertCircle } from 'lucide-react'

interface ChatPageProps {
  params: {
    id: string
  }
}

export default function ChatPage({ params }: ChatPageProps) {
  const { 
    mission, 
    messages, 
    isLoading, 
    sendMessage,
    isSending 
  } = useMissionChat(params.id)

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

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

  return (
    <div className="h-screen flex bg-white">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <ChatHeader mission={mission} />

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          <ChatMessages 
            messages={messages}
            mission={mission}
          />
          <div ref={messagesEndRef} />
        </div>

        {/* Chat Input */}
        <div className="border-t border-slate-200 p-6">
          <ChatInput 
            onSendMessage={sendMessage}
            isSending={isSending}
            disabled={mission.status === 'completed'}
          />
        </div>
      </div>

      {/* Sidebar */}
      <div className="w-80 border-l border-slate-200">
        <MissionSidebar mission={mission} />
      </div>
    </div>
  )
}
