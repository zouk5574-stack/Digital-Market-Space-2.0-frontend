// components/admin/global-search.tsx
'use client'

import { useState, useRef, useEffect } from 'react'
import { useDebounce } from '@/hooks/use-debounce'
import { useAdminSearch } from '@/hooks/admin/use-admin-search'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Clock, Users, Briefcase, ShoppingCart } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GlobalSearchProps {
  onClose: () => void
}

export function GlobalSearch({ onClose }: GlobalSearchProps) {
  const [query, setQuery] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)
  const debouncedQuery = useDebounce(query, 300)
  
  const { data: results, isLoading } = useAdminSearch(debouncedQuery)

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  const recentSearches = [
    { type: 'user', term: 'john doe', count: 5 },
    { type: 'mission', term: 'react development', count: 12 },
    { type: 'product', term: 'logo design', count: 8 },
  ]

  const getIcon = (type: string) => {
    switch (type) {
      case 'user': return <Users size={16} />
      case 'mission': return <Briefcase size={16} />
      case 'product': return <ShoppingCart size={16} />
      default: return <Search size={16} />
    }
  }

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          placeholder="Rechercher des utilisateurs, missions, produits..."
          className="w-full pl-10 pr-12 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white shadow-sm"
        />
        <button
          onClick={onClose}
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Results Dropdown */}
      <AnimatePresence>
        {(isFocused && (query || recentSearches.length > 0)) && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-xl shadow-2xl z-50 max-h-96 overflow-y-auto"
          >
            {/* Recent Searches */}
            {!query && recentSearches.length > 0 && (
              <div className="p-3 border-b border-slate-100">
                <h3 className="text-sm font-medium text-slate-600 mb-2 flex items-center gap-2">
                  <Clock size={16} />
                  Recherches récentes
                </h3>
                {recentSearches.map((search, index) => (
                  <button
                    key={index}
                    onClick={() => setQuery(search.term)}
                    className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                  >
                    {getIcon(search.type)}
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{search.term}</p>
                      <p className="text-xs text-slate-500 capitalize">{search.type} • {search.count} résultats</p>
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Search Results */}
            {query && (
              <div className="p-3">
                {isLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                  </div>
                ) : results && results.length > 0 ? (
                  <>
                    <h3 className="text-sm font-medium text-slate-600 mb-2">
                      Résultats pour "{query}"
                    </h3>
                    {results.slice(0, 8).map((result: any, index: number) => (
                      <button
                        key={index}
                        className="w-full flex items-center gap-3 p-2 rounded-lg hover:bg-slate-50 transition-colors text-left"
                      >
                        {getIcon(result.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium text-slate-900">{result.title}</p>
                          <p className="text-xs text-slate-500 capitalize">
                            {result.type} • {result.subtitle}
                          </p>
                        </div>
                      </button>
                    ))}
                  </>
                ) : (
                  <div className="text-center py-8 text-slate-500">
                    <Search size={32} className="mx-auto mb-2 opacity-50" />
                    <p className="text-sm">Aucun résultat trouvé</p>
                    <p className="text-xs">Essayez d'autres termes de recherche</p>
                  </div>
                )}
              </div>
            )}

            {/* Quick Actions */}
            <div className="p-3 border-t border-slate-100 bg-slate-50/50">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 text-center">
                  ↑↓ Navigation
                </kbd>
                <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 text-center">
                  ↵ Sélection
                </kbd>
                <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 text-center">
                  Esc Fermer
                </kbd>
                <kbd className="px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 text-center">
                  ⌘K Recherche
                </kbd>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
