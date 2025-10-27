// components/favorites/favorite-button.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import { useFavorites } from '@/hooks/use-favorites'

interface FavoriteButtonProps {
  itemId: string
  itemType: 'mission' | 'product' | 'freelancer'
  size?: 'sm' | 'md' | 'lg'
}

export function FavoriteButton({ itemId, itemType, size = 'md' }: FavoriteButtonProps) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const [isAnimating, setIsAnimating] = useState(false)

  const sizes = {
    sm: 16,
    md: 20,
    lg: 24
  }

  const handleClick = () => {
    setIsAnimating(true)
    toggleFavorite(itemId, itemType)
    setTimeout(() => setIsAnimating(false), 600)
  }

  const favorite = isFavorite(itemId, itemType)

  return (
    <motion.button
      onClick={handleClick}
      className={`
        p-2 rounded-full transition-colors
        ${favorite 
          ? 'bg-red-50 text-red-500 hover:bg-red-100' 
          : 'bg-slate-100 text-slate-400 hover:bg-slate-200'
        }
      `}
      whileTap={{ scale: 0.9 }}
    >
      <motion.div
        animate={isAnimating ? { scale: [1, 1.3, 1] } : {}}
        transition={{ duration: 0.6 }}
      >
        <Heart 
          size={sizes[size]} 
          className={favorite ? 'fill-current' : ''}
        />
      </motion.div>
    </motion.button>
  )
}
