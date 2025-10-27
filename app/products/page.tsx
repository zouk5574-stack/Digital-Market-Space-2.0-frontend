// app/products/page.tsx
'use client'

import { useState } from 'react'
import { useProducts } from '@/hooks/products/use-products'
import { ProductGrid } from '@/components/products/product-grid'
import { ProductFilters } from '@/components/products/product-filters'
import { ProductSearch } from '@/components/products/product-search'
import { motion } from 'framer-motion'
import { ShoppingCart, Filter, Grid, List } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function ProductsPage() {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sort: 'newest',
    search: ''
  })
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const { data: products, isLoading } = useProducts(filters)

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-900 to-pink-800 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Boutique Digitale
            </h1>
            <p className="text-xl md:text-2xl text-purple-100 mb-8 max-w-3xl mx-auto">
              Découvrez des produits digitaux exclusifs créés par nos talents
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-6">
          {/* Header with Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center"
          >
            <div>
              <h2 className="text-2xl font-bold text-slate-900">
                Tous les produits
              </h2>
              <p className="text-slate-600 mt-1">
                {products?.pagination?.total || 0} produits disponibles
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
              <ProductSearch
                value={filters.search}
                onChange={(search) => setFilters(prev => ({ ...prev, search }))}
              />
              
              <div className="flex gap-2">
                <MagneticButton
                  variant={view === 'grid' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('grid')}
                >
                  <Grid size={16} />
                </MagneticButton>
                <MagneticButton
                  variant={view === 'list' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setView('list')}
                >
                  <List size={16} />
                </MagneticButton>
              </div>
            </div>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <ProductFilters
              filters={filters}
              onFiltersChange={setFilters}
            />
          </motion.div>

          {/* Products Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <ProductGrid
              products={products?.data || []}
              isLoading={isLoading}
              view={view}
            />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
