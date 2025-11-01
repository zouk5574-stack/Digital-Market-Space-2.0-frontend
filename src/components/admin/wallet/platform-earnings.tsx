// components/admin/wallet/platform-earnings.tsx
'use client'

import { motion } from 'framer-motion'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface PlatformEarningsProps {
  earnings: any
  isLoading: boolean
}

export function PlatformEarnings({ earnings, isLoading }: PlatformEarningsProps) {
  const monthlyData = [
    { month: 'Jan', earnings: 1800000, commissions: 450000 },
    { month: 'Fév', earnings: 2200000, commissions: 520000 },
    { month: 'Mar', earnings: 1900000, commissions: 480000 },
    { month: 'Avr', earnings: 2100000, commissions: 510000 },
    { month: 'Mai', earnings: 2400000, commissions: 580000 },
    { month: 'Jun', earnings: 2500000, commissions: 620000 },
    { month: 'Jul', earnings: 2300000, commissions: 590000 },
    { month: 'Aoû', earnings: 2600000, commissions: 650000 },
    { month: 'Sep', earnings: 2800000, commissions: 720000 },
    { month: 'Oct', earnings: 3000000, commissions: 780000 },
    { month: 'Nov', earnings: 3200000, commissions: 820000 },
    { month: 'Déc', earnings: 3500000, commissions: 890000 }
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
        <div className="h-80 bg-slate-200 rounded"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Performance Mensuelle</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Ce mois</span>
              <span className="font-bold text-green-600">
                +{earnings.thisMonth?.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Mois dernier</span>
              <span className="font-semibold text-slate-900">
                {earnings.lastMonth?.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Croissance</span>
              <span className={`font-semibold ${
                earnings.growthRate >= 0 ? 'text-green-600' : 'text-red-600'
              }`}>
                {earnings.growthRate >= 0 ? '+' : ''}{earnings.growthRate?.toFixed(1)}%
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-xl border border-slate-200 p-6"
        >
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Disponibilité</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Retirable</span>
              <span className="font-bold text-blue-600">
                {earnings.availableForWithdrawal?.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">En attente</span>
              <span className="font-semibold text-amber-600">
                {earnings.pendingWithdrawals?.toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-600">Total commissions</span>
              <span className="font-semibold text-slate-900">
                {earnings.totalCommissions?.toLocaleString()} FCFA
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl p-6 text-white"
        >
          <h3 className="text-lg font-semibold mb-4">Projection</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="opacity-90">Moyenne mensuelle</span>
              <span className="font-bold">
                {Math.round(earnings.totalCommissions / 12).toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-90">Projection annuelle</span>
              <span className="font-bold">
                {((earnings.totalCommissions / 12) * 12).toLocaleString()} FCFA
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="opacity-90">Taux de croissance</span>
              <span className="font-bold">
                +{earnings.growthRate?.toFixed(1)}%
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Earnings Chart */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Évolution des Revenus (12 derniers mois)
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis 
              dataKey="month" 
              stroke="#64748b"
              fontSize={12}
            />
            <YAxis 
              stroke="#64748b"
              fontSize={12}
              tickFormatter={(value) => `${(value / 1000000).toFixed(1)}M`}
            />
            <Tooltip 
              formatter={(value: number) => [`${value.toLocaleString()} FCFA`, 'Montant']}
              labelFormatter={(label) => `Mois: ${label}`}
              contentStyle={{ 
                backgroundColor: '#fff',
                border: '1px solid #e2e8f0',
                borderRadius: '8px'
              }}
            />
            <Bar dataKey="earnings" name="Revenus totaux" radius={[4, 4, 0, 0]}>
              {monthlyData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Bar>
            <Bar dataKey="commissions" name="Commissions" radius={[4, 4, 0, 0]} fill="#00C49F" />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  )
}
