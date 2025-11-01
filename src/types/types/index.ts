// types/index.ts (mise à jour)
export interface ActivityLog {
  _id: string
  action: string
  description: string
  severity: 'info' | 'warning' | 'error' | 'critical' // Garder la cohérence
  userId?: string
  user?: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  ipAddress: string
  userAgent: string
  metadata: Record<string, any>
  createdAt: string
  updatedAt?: string
}