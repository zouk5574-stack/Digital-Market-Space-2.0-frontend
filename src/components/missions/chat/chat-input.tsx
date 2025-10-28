// components/missions/chat/chat-input.tsx
'use client'

import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { Send, Paperclip, Smile } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface ChatInputProps {
  onSendMessage: (content: string) => Promise<void>
  isSending: boolean
  disabled?: boolean
}

export function ChatInput({ onSendMessage, isSending, disabled }: ChatInputProps) {
  const [message, setMessage] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!message.trim() || isSending || disabled) return

    const content = message.trim()
    setMessage('')
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
    }

    await onSendMessage(content)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="flex gap-3 items-end"
    >
      {/* Action Buttons */}
      <div className="flex gap-1">
        <button
          type="button"
          disabled={disabled}
          className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors"
        >
          <Paperclip size={20} />
        </button>
        <button
          type="button"
          disabled={disabled}
          className="p-2 text-slate-400 hover:text-slate-600 disabled:opacity-50 transition-colors"
        >
          <Smile size={20} />
        </button>
      </div>

      {/* Message Input */}
      <div className="flex-1 relative">
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={disabled ? "Cette mission est terminée" : "Tapez votre message..."}
          disabled={disabled}
          rows={1}
          className="w-full px-4 py-3 border border-slate-300 rounded-2xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none disabled:opacity-50 disabled:cursor-not-allowed"
          style={{ minHeight: '48px', maxHeight: '120px' }}
        />
      </div>

      {/* Send Button */}
      <MagneticButton
        type="submit"
        disabled={!message.trim() || isSending || disabled}
        size="sm"
        className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSending ? (
          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
        ) : (
          <Send size={16} />
        )}
      </MagneticButton>
    </motion.form>
  )
}
