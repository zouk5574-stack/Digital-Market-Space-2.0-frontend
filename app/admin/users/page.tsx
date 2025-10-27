// app/admin/users/page.tsx
'use client'

import { useState } from 'react'
import { useAdminUsers } from '@/hooks/admin/use-admin-users'
import { UsersTable } from '@/components/admin/tables/users-table'
import { UserFilters } from '@/components/admin/filters/user-filters'
import { BulkActions } from '@/components/admin/bulk-actions'
import { motion } from 'framer-motion'
import { Download, Upload, Plus } from 'lucide-react'
import { MagneticButton } from '@/components/atomic/magnetic-button'

export default function AdminUsersPage() {
  const [filters, setFilters] = useState({
    role: '',
    status: '',
    search: '',
    dateRange: ''
  })
  const [selectedUsers, setSelectedUsers] = useState<string[]>([])

  const { data: users, isLoading, refetch } = useAdminUsers(filters)

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
            Gestion des Utilisateurs
          </h1>
          <p className="text-slate-600 mt-2">
            Gérer les comptes utilisateurs et leurs permissions
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <MagneticButton variant="outline" size="sm">
            <Download size={16} />
            Exporter
          </MagneticButton>
          <MagneticButton variant="outline" size="sm">
            <Upload size={16} />
            Importer
          </MagneticButton>
          <MagneticButton>
            <Plus size={16} />
            Nouvel Utilisateur
          </MagneticButton>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <UserFilters filters={filters} onFiltersChange={setFilters} />
      </motion.div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <BulkActions 
            selectedIds={selectedUsers}
            onActionComplete={() => {
              setSelectedUsers([])
              refetch()
            }}
          />
        </motion.div>
      )}

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <UsersTable 
          users={users?.data || []}
          isLoading={isLoading}
          selectedUsers={selectedUsers}
          onSelectionChange={setSelectedUsers}
          onUserUpdate={refetch}
        />
      </motion.div>
    </div>
  )
}
