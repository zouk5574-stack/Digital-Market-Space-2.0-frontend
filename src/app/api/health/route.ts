// app/api/health/route.ts
export async function GET() {
  const checks = {
    database: await checkDatabase(),
    redis: await checkRedis(),
    fedapay: await checkFedaPay(),
    storage: await checkStorage(),
  }

  const allHealthy = Object.values(checks).every(Boolean)
  const status = allHealthy ? 200 : 503

  return Response.json({
    status: allHealthy ? 'healthy' : 'unhealthy',
    timestamp: new Date().toISOString(),
    checks,
  }, { status })
}

// app/status/page.tsx
'use client'

import { useHealthStatus } from '@/hooks/use-health-status'

export default function StatusPage() {
  const { status, checks, isLoading } = useHealthStatus()

  if (isLoading) {
    return <div>Chargement du statut...</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-slate-900 mb-8">Statut du Service</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(checks).map(([service, isHealthy]) => (
            <div
              key={service}
              className={`p-6 rounded-lg border-2 ${
                isHealthy
                  ? 'bg-green-50 border-green-200'
                  : 'bg-red-50 border-red-200'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isHealthy ? 'bg-green-500' : 'bg-red-500'
                  }`}
                />
                <h3 className="font-semibold text-slate-900 capitalize">
                  {service}
                </h3>
              </div>
              <p className="text-slate-600 mt-2">
                {isHealthy ? 'Opérationnel' : 'Problème détecté'}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
