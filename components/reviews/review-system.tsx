// components/reviews/review-system.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Send } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface ReviewSystemProps {
  orderId: string
  onReviewSubmit: (review: ReviewData) => Promise<void>
}

export function ReviewSystem({ orderId, onReviewSubmit }: ReviewSystemProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async () => {
    if (rating === 0) return
    
    setIsSubmitting(true)
    try {
      await onReviewSubmit({
        orderId,
        rating,
        comment,
        type: 'mission' // ou 'product'
      })
      // Reset form
      setRating(0)
      setComment('')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-6">
      <h3 className="text-lg font-semibold text-slate-900 mb-4">
        Donnez votre avis
      </h3>
      
      {/* Rating Stars */}
      <div className="flex gap-1 mb-4">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => setRating(star)}
            className="p-1 hover:scale-110 transition-transform"
          >
            <Star
              size={32}
              className={star <= rating ? 'text-yellow-400 fill-current' : 'text-slate-300'}
            />
          </button>
        ))}
      </div>

      {/* Comment */}
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Partagez votre expérience..."
        rows={4}
        className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 resize-none"
      />

      <MagneticButton
        onClick={handleSubmit}
        disabled={rating === 0 || isSubmitting}
        className="mt-4"
      >
        <Send size={16} />
        Publier l'avis
      </MagneticButton>
    </div>
  )
}
