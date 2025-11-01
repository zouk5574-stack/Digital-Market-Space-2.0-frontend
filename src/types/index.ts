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

// types/index.ts (ajouts)
export interface Withdrawal {
  _id: string
  userId: string
  user?: {
    _id: string
    firstName: string
    lastName: string
    email: string
  }
  amount: number
  paymentMethod: 'mobile_money' | 'bank_transfer' | 'crypto'
  paymentDetails: {
    phoneNumber?: string
    provider?: string
    accountNumber?: string
    bankName?: string
    walletAddress?: string
  }
  status: 'pending' | 'processing' | 'completed' | 'rejected'
  rejectionReason?: string
  createdAt: string
  updatedAt: string
  processedAt?: string
}
