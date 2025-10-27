// components/admin/tables/users-table.tsx
'use client'

import { useState } from 'react'
import { User } from '@/types'
import { AdvancedTable } from '@/components/atomic/advanced-table'
import { UserStatusBadge } from '@/components/admin/badges/user-status-badge'
import { UserActions } from '@/components/admin/actions/user-actions'
import { LoadingSpinner } from '@/components/atomic/loading-spinner'
import { motion } from 'framer-motion'

interface UsersTableProps {
  users: User[]
  isLoading: boolean
  selectedUsers: string[]
  onSelectionChange: (userIds: string[]) => void
  onUserUpdate: () => void
}

export function UsersTable({ 
  users, 
  isLoading, 
  selectedUsers, 
  onSelectionChange, 
  onUserUpdate 
}: UsersTableProps) {
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 10

  const columns = [
    {
      key: 'select',
      header: '',
      cell: (user: User) => (
        <input
          type="checkbox"
          checked={selectedUsers.includes(user._id)}
          onChange={(e) => {
            if (e.target.checked) {
              onSelectionChange([...selectedUsers, user._id])
            } else {
              onSelectionChange(selectedUsers.filter(id => id !== user._id))
            }
          }}
          className="rounded border-slate-300 text-green-600 focus:ring-green-500"
        />
      ),
    },
    {
      key: 'user',
      header: 'Utilisateur',
      cell: (user: User) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-slate-400 to-slate-600 rounded-full flex items-center justify-center text-white font-medium text-sm">
            {user.firstName[0]}{user.lastName[0]}
          </div>
          <div className="min-w-0">
            <p className="font-medium text-slate-900 truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-sm text-slate-500 truncate">{user.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'role',
      header: 'Rôle',
      cell: (user: User) => (
        <span className={`
          inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium
          ${user.role === 'admin' ? 'bg-purple-100 text-purple-800' : ''}
          ${user.role === 'freelancer' ? 'bg-blue-100 text-blue-800' : ''}
          ${user.role === 'client' ? 'bg-green-100 text-green-800' : ''}
        `}>
          {user.role === 'admin' && '👑 Admin'}
          {user.role === 'freelancer' && '💼 Freelance'}
          {user.role === 'client' && '👤 Client'}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Statut',
      cell: (user: User) => <UserStatusBadge user={user} />,
    },
    {
      key: 'wallet',
      header: 'Portefeuille',
      cell: (user: User) => (
        <div className="text-right">
          <p className="font-medium text-slate-900">
            {user.walletBalance.toLocaleString()} FCFA
          </p>
        </div>
      ),
    },
    {
      key: 'joined',
      header: 'Inscrit le',
      cell: (user: User) => (
        <div className="text-slate-500 text-sm">
          {new Date(user.createdAt).toLocaleDateString('fr-FR')}
        </div>
      ),
    },
    {
      key: 'actions',
      header: 'Actions',
      cell: (user: User) => (
        <UserActions user={user} onUpdate={onUserUpdate} />
      ),
    },
  ]

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white rounded-xl border border-slate-200 overflow-hidden"
    >
      <AdvancedTable
        columns={columns}
        data={users}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
        emptyMessage="Aucun utilisateur trouvé"
      />
    </motion.div>
  )
}
