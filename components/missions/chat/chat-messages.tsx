// components/missions/chat/chat-messages.tsx
'use client'

import { Message, Mission } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/hooks/use-auth'
import { formatDistanceToNow } from 'date-fns'
import { fr } from 'date-fns/locale'
import { Check, CheckCheck, Clock } from 'lucide-react'

interface ChatMessagesProps {
  messages: Message[]
  mission: Mission
}

export function ChatMessages({ messages, mission }: ChatMessagesProps) {
  const { user } = useAuth()

  if (messages.length === 0) {
    return (
      <div className="text-center py-12 text-slate-500">
        <MessageCircle className="mx-auto mb-4 opacity-50" size={48} />
        <h3 className="text-lg font-medium text-slate-900 mb-2">Aucun message</h3>
        <p>Envoyez le premier message pour commencer la conversation</p>
      </div>
    )
  }

  return (
    <AnimatePresence>
      {messages.map((message, index) => {
        const isOwnMessage = message.senderId === user?._id
        const showAvatar = index === 0 || messages[index - 1].senderId !== message.senderId
        
        return (
          <motion.div
            key={message._id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            className={`flex gap-3 ${isOwnMessage ? 'flex-row-reverse' : 'flex-row'}`}
          >
            {/* Avatar */}
            {showAvatar && (
              <div className={`flex-shrink-0 ${isOwnMessage ? 'ml-3' : 'mr-3'}`}>
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white text-xs font-medium">
                  {isOwnMessage ? 'Vous' : message.sender?.firstName?.[0]}
                </div>
              </div>
            )}

            {/* Message Content */}
            <div className={`flex-1 ${!showAvatar && (isOwnMessage ? 'mr-11' : 'ml-11')}`}>
              {/* Sender name and time */}
              {showAvatar && !isOwnMessage && (
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-slate-900">
                    {message.sender?.firstName} {message.sender?.lastName}
                  </span>
                  <span className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(message.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </span>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`
                  relative max-w-xs lg:max-w-md px-4 py-2 rounded-2xl
                  ${isOwnMessage
                    ? 'bg-purple-600 text-white rounded-br-none'
                    : 'bg-slate-100 text-slate-900 rounded-bl-none'
                  }
                `}
              >
                <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                {/* Message status */}
                {isOwnMessage && (
                  <div className="flex justify-end mt-1">
                    {message.status === 'sent' && <Check size={12} className="text-slate-300" />}
                    {message.status === 'delivered' && <CheckCheck size={12} className="text-slate-300" />}
                    {message.status === 'read' && <CheckCheck size={12} className="text-blue-500" />}
                    {message.status === 'sending' && <Clock size={12} className="text-slate-300 animate-pulse" />}
                  </div>
                )}
              </div>

              {/* Time for own messages */}
              {isOwnMessage && (
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-slate-500">
                    {formatDistanceToNow(new Date(message.createdAt), { 
                      addSuffix: true,
                      locale: fr 
                    })}
                  </span>
                </div>
              )}
            </div>
          </motion.div>
        )
      })}
    </AnimatePresence>
  )
}
