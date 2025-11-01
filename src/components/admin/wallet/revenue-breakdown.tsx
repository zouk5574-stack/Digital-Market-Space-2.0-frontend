// components/admin/wallet/revenue-breakdown.tsx
'use client'

import { motion } from 'framer-motion'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts'

interface RevenueBreakdownProps {
  wallet: any
  isLoading: boolean
}

export function RevenueBreakdown({ wallet, isLoading }: RevenueBreakdownProps) {
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-3 border border-slate-200 rounded-lg shadow-lg">
          <p className="font-medium text-slate-900">{data.category}</p>
          <p className="text-sm text-slate-600">
            {data.amount.toLocaleString()} FCFA
          </p>
          <p className="text-sm text-slate-600">
            {data.percentage}% du total
          </p>
          <p className="text-xs text-slate-500">
            {data.count} transactions
          </p>
        </div>
      )
    }
    return null
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
          <div className="h-64 bg-slate-200 rounded"></div>
        </div>
        <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
          <div className="h-6 bg-slate-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 bg-slate-200 rounded"></div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Pie Chart */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Répartition des Revenus
        </h3>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={wallet.earningsByCategory}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ category, percentage }) => `${category} (${percentage}%)`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="amount"
            >
              {wallet.earningsByCategory?.map((entry: any, index: number) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </motion.div>

      {/* Detailed Breakdown */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <h3 className="text-lg font-semibold text-slate-900 mb-6">
          Détail par Catégorie
        </h3>

        <div className="space-y-4">
          {wallet.earningsByCategory?.map((category: any, index: number) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div>
                  <p className="font-medium text-slate-900">
                    {category.category}
                  </p>
                  <p className="text-sm text-slate-500">
                    {category.count} transactions
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="font-semibold text-slate-900">
                  {category.amount.toLocaleString()} FCFA
                </p>
                <p className="text-sm text-slate-500">
                  {category.percentage}% du total
                </p>
              </div>
            </motion.div>
          ))}

          {/* Total */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex items-center justify-between p-4 rounded-lg bg-slate-50 border border-slate-200"
          >
            <div>
              <p className="font-semibold text-slate-900">Total Général</p>
              <p className="text-sm text-slate-500">
                Toutes catégories confondues
              </p>
            </div>
            <div className="text-right">
              <p className="text-xl font-bold text-slate-900">
                {wallet.totalEarnings?.toLocaleString()} FCFA
              </p>
              <p className="text-sm text-slate-500">100%</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  )
}
