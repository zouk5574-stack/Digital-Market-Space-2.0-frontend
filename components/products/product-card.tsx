// components/products/product-card.tsx
'use client'

import { useState } from 'react'
import { Product } from '@/types'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Star, Download, Eye, Lock } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'
import { useFedaPay } from '@/hooks/payments/use-fedaPay'

interface ProductCardProps {
  product: Product
  view?: 'grid' | 'list'
}

export function ProductCard({ product, view = 'grid' }: ProductCardProps) {
  const [showPreview, setShowPreview] = useState(false)
  const { initiatePayment, isLoading } = useFedaPay()

  const handlePurchase = async () => {
    try {
      await initiatePayment({
        productId: product._id,
        amount: product.price,
        description: `Achat: ${product.title}`
      })
    } catch (error) {
      console.error('Erreur de paiement:', error)
    }
  }

  if (view === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-all duration-300"
      >
        <div className="flex gap-6">
          {/* Product Image */}
          <div className="flex-shrink-0 w-48 h-32 bg-slate-100 rounded-lg overflow-hidden">
            {product.previewUrl ? (
              <img
                src={product.previewUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-slate-200 to-slate-300 flex items-center justify-center">
                <ShoppingCart className="text-slate-400" size={32} />
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-semibold text-slate-900 mb-2">
              {product.title}
            </h3>
            <p className="text-slate-600 mb-4 line-clamp-2">
              {product.description}
            </p>

            <div className="flex items-center gap-6 text-sm text-slate-500 mb-4">
              <div className="flex items-center gap-1">
                <Star className="text-yellow-400" size={16} />
                <span>{product.rating}/5</span>
                <span>({product.reviewCount})</span>
              </div>
              <div>
