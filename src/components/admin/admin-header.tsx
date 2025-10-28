// components/admin/admin-header.tsx
'use client'

import { useState } from 'react'
import { useAuth } from '@/hooks/use-auth'
import { GlobalSearch } from '@/components/admin/global-search'
import { NotificationsDropdown } from '@/components/admin/notifications-dropdown'
import { UserMenu } from '@/components/admin/user-menu'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, Bell, Settings } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export function AdminHeader() {
  const [showSearch, setShowSearch] = useState(false)
  const { user } = useAuth()

  return (
    <header className="border-b border-slate-200 bg-white/80 backdrop-blur-md">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left side - Search */}
        <div className="flex items-center gap-4 flex-1 max-w-2xl">
          <AnimatePresence mode="wait">
            {showSearch ? (
              <motion.div
                key="search-expanded"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: '100%' }}
                exit={{ opacity: 0, width: 0 }}
                className="flex-1"
              >
                <GlobalSearch onClose={() => setShowSearch(false)} />
              </motion.div>
            ) : (
              <motion.div
                key="search-collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex items-center gap-4"
              >
                <MagneticButton
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowSearch(true)}
                  className="text-slate-600 hover:text-slate-900"
                >
                  <Search size={20} />
                </MagneticButton>
                
                <div className="hidden md:block">
                  <h2 className="text-lg font-semibold text-slate-900">
                    Bon retour, {user?.firstName} 👋
                  </h2>
                  <p className="text-sm text-slate-600">
                    {new Date().toLocaleDateString('fr-FR', { 
                      weekday: 'long', 
                      year: 'numeric', 
                      month: 'long', 
                      day: 'numeric' 
                    })}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right side - Actions */}
        <div className="flex items-center gap-2">
          <NotificationsDropdown />
          
          <MagneticButton variant="ghost" size="sm">
            <Settings size={20} />
          </MagneticButton>
          
          <UserMenu />
        </div>
      </div>
    </header>
  )
}
