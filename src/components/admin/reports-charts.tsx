// components/admin/reports-charts.tsx
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

interface ReportsChartsProps {
  data: any
  isLoading: boolean
  type: string
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

export function ReportsCharts({ data, isLoading, type }: ReportsChartsProps) {
  const [activeChart, setActiveChart] = useState('overview')

  const getChartsConfig = () => {
    const baseConfig = {
      financial: {
        overview: {
          title: 'Revenus Mensuels',
          data: data?.revenueByMonth || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.revenueByMonth || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => [`${(Number(value) / 1000000).toFixed(1)}M FCFA`, 'Revenu']} />
                <Legend />
                <Bar dataKey="revenue" fill="#0088FE" name="Revenu" />
                <Bar dataKey="transactions" fill="#00C49F" name="Transactions" />
              </BarChart>
            </ResponsiveContainer>
          )
        },
        categories: {
          title: 'Revenus par Catégorie',
          data: data?.topCategories || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.topCategories || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percent }) => `${category} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="revenue"
                >
                  {(data?.topCategories || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${(Number(value) / 1000000).toFixed(1)}M FCFA`, 'Revenu']} />
              </PieChart>
            </ResponsiveContainer>
          )
        }
      },
      user: {
        overview: {
          title: 'Activité des Utilisateurs',
          data: data?.userActivity || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.userActivity || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="registrations" stroke="#0088FE" name="Nouvelles inscriptions" />
                <Line type="monotone" dataKey="logins" stroke="#00C49F" name="Connexions" />
              </LineChart>
            </ResponsiveContainer>
          )
        },
        distribution: {
          title: 'Répartition par Type',
          data: data?.usersByType || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.usersByType || []}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ type, percent }) => `${type} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {(data?.usersByType || []).map((entry: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          )
        }
      },
      mission: {
        overview: {
          title: 'Activité des Missions',
          data: data?.missionTimeline || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.missionTimeline || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="created" fill="#0088FE" name="Créées" />
                <Bar dataKey="completed" fill="#00C49F" name="Terminées" />
              </BarChart>
            </ResponsiveContainer>
          )
        },
        categories: {
          title: 'Missions par Catégorie',
          data: data?.missionsByCategory || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.missionsByCategory || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="category" width={100} />
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Count']} />
                <Legend />
                <Bar dataKey="count" fill="#0088FE" name="Nombre de missions" />
              </BarChart>
            </ResponsiveContainer>
          )
        }
      },
      product: {
        overview: {
          title: 'Ventes des Produits',
          data: data?.salesTimeline || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.salesTimeline || []}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line yAxisId="left" type="monotone" dataKey="sales" stroke="#0088FE" name="Ventes" />
                <Line yAxisId="right" type="monotone" dataKey="revenue" stroke="#00C49F" name="Revenu" />
              </LineChart>
            </ResponsiveContainer>
          )
        },
        topProducts: {
          title: 'Top Produits',
          data: data?.topProducts || [],
          chart: (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.topProducts || []} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis type="category" dataKey="product" width={120} />
                <Tooltip formatter={(value) => [value.toLocaleString(), 'Ventes']} />
                <Legend />
                <Bar dataKey="sales" fill="#0088FE" name="Unités vendues" />
                <Bar dataKey="revenue" fill="#00C49F" name="Revenu (FCFA)" />
              </BarChart>
            </ResponsiveContainer>
          )
        }
      }
    }

    return baseConfig[type as keyof typeof baseConfig] || baseConfig.financial
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-xl border border-slate-200 p-6 animate-pulse">
        <div className="h-6 bg-slate-200 rounded w-1/4 mb-6"></div>
        <div className="h-64 bg-slate-200 rounded"></div>
      </div>
    )
  }

  const chartsConfig = getChartsConfig()
  const chartKeys = Object.keys(chartsConfig)

  return (
    <div className="space-y-6">
      {/* Sélecteur de graphique */}
      {chartKeys.length > 1 && (
        <div className="flex flex-wrap gap-2">
          {chartKeys.map((key) => (
            <button
              key={key}
              onClick={() => setActiveChart(key)}
              className={`
                px-4 py-2 rounded-lg border transition-all font-medium
                ${activeChart === key
                  ? 'bg-blue-500 text-white border-blue-500 shadow-lg'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-blue-300'
                }
              `}
            >
              {chartsConfig[key as keyof typeof chartsConfig].title}
            </button>
          ))}
        </div>
      )}

      {/* Graphique principal */}
      <motion.div
        key={activeChart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-xl border border-slate-200 p-6"
      >
        <h3 className="text-xl font-semibold text-slate-900 mb-6">
          {chartsConfig[activeChart as keyof typeof chartsConfig].title}
        </h3>
        
        {chartsConfig[activeChart as keyof typeof chartsConfig].chart}
      </motion.div>
    </div>
  )
}
