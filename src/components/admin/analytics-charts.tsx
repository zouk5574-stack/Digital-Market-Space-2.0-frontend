// components/admin/analytics-charts.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  ResponsiveContainer
} from 'recharts'
import { TrendingUp, Users, DollarSign, ShoppingCart } from 'lucide-react'

interface AnalyticsChartsProps {
  data: any
  isLoading: boolean
  filters: any
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function AnalyticsCharts({ data, isLoading, filters }: AnalyticsChartsProps) {
  const [activeChart, setActiveChart] = useState('revenue')

  // Données mockées pour les graphiques
  const revenueData = [
    { name: 'Jan', missions: 4000, products: 2400, total: 6400 },
    { name: 'Fév', missions: 3000, products: 1398, total: 4398 },
    { name: 'Mar', missions: 2000, products: 9800, total: 11800 },
    { name: 'Avr', missions: 2780, products: 3908, total: 6688 },
    { name: 'Mai', missions: 1890, products: 4800, total: 6690 },
    { name: 'Jun', missions: 2390, products: 3800, total: 6190 },
  ]

  const userGrowthData = [
    { name: 'Jan', new: 40, active: 100, total: 400 },
    { name: 'Fév', new: 30, active: 120, total: 520 },
    { name: 'Mar', new: 20, active: 150, total: 670 },
    { name: 'Avr', new: 27, active: 180, total: 797 },
    { name: 'Mai', new: 18, active: 200, total: 915 },
    { name: 'Jun', new: 23, active: 220, total: 958 },
  ]

  const categoryData = [
    { name: 'Développement', value: 35 },
    { name: 'Design', value: 25 },
    { name: 'Marketing', value: 15 },
    { name: 'Rédaction', value: 12 },
    { name: 'Autres', value: 13 },
  ]

  const platformData = [
    { name: 'Complétés', value: 75 },
    { name: 'En cours', value: 15 },
    { name: 'Annulés', value: 5 },
    { name: 'En attente', value: 5 },
  ]

  const chartConfigs = {
    revenue: {
      title: 'Revenus par Mois',
      icon: DollarSign,
      data: revenueData,
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={revenueData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="missions" fill="#0088FE" name="Missions" />
            <Bar dataKey="products" fill="#00C49F" name="Produits" />
          </BarChart>
        </ResponsiveContainer>
      )
    },
    users: {
      title: 'Croissance des Utilisateurs',
      icon: Users,
      data: userGrowthData,
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userGrowthData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="new" stroke="#FF8042" name="Nouveaux" />
            <Line type="monotone" dataKey="active" stroke="#0088FE" name="Actifs" />
            <Line type="monotone" dataKey="total" stroke="#00C49F" name="Total" />
          </LineChart>
        </ResponsiveContainer>
      )
    },
    categories: {
      title: 'Répartition par Catégorie',
      icon: ShoppingCart,
      data: categoryData,
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={categoryData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {categoryData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    },
    performance: {
      title: 'Performance Plateforme',
      icon: TrendingUp,
      data: platformData,
      chart: (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={platformData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {platformData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      )
    }
  }

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
            <div className="h-6 bg-slate-200 rounded w-1/3 mb-4"></div>
            <div className="h-64 bg-slate-200 rounded"></div>
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Chart Selector */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(chartConfigs).map(([key, config]) => (
          <button
            key={key}
            onClick={() => setActiveChart(key)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg border transition-all
              ${activeChart === key
                ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                : 'bg-white text-slate-700 border-slate-300 hover:border-blue-300'
              }
            `}
          >
            <config.icon size={16} />
            {config.title}
          </button>
        ))}
      </div>

      {/* Main Chart */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-slate-900">
            {chartConfigs[activeChart as keyof typeof chartConfigs].title}
          </h3>
          <div className="flex items-center gap-4 text-sm text-slate-600">
            <span>Période: {filters.period}</span>
            <span>Mise à jour: Il y a 2 min</span>
          </div>
        </div>

        {chartConfigs[activeChart as keyof typeof chartConfigs].chart}
      </motion.div>

      {/* Mini Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(chartConfigs)
          .filter(([key]) => key !== activeChart)
          .map(([key, config]) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-lg border border-slate-200 p-4 cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => setActiveChart(key)}
            >
              <div className="flex items-center gap-2 mb-3">
                <config.icon size={16} className="text-slate-600" />
                <h4 className="font-medium text-slate-900 text-sm">{config.title}</h4>
              </div>
              <div className="h-32">
                <ResponsiveContainer width="100%" height="100%">
                  {key === 'revenue' || key === 'users' ? (
                    <LineChart data={config.data.slice(0, 3)}>
                      <Line 
                        type="monotone" 
                        dataKey={key === 'revenue' ? 'total' : 'total'} 
                        stroke={COLORS[0]} 
                        strokeWidth={2}
                        dot={false}
                      />
                      <Tooltip />
                    </LineChart>
                  ) : (
                    <PieChart>
                      <Pie
                        data={config.data}
                        cx="50%"
                        cy="50%"
                        innerRadius={30}
                        outerRadius={40}
                        dataKey="value"
                      >
                        {config.data.map((entry: any, index: number) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                    </PieChart>
                  )}
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
      </div>
    </div>
  )
}
