// lib/rate-limiting.ts
import { LRUCache } from 'lru-cache'

const rateLimitCache = new LRUCache({
  max: 1000,
  ttl: 60 * 1000, // 1 minute
})

export function rateLimit(
  identifier: string,
  limit: number = 10
): { success: boolean; remaining: number } {
  const now = Date.now()
  const windowStart = Math.floor(now / 60000) * 60000 // Minute window
  const key = `${identifier}:${windowStart}`
  
  const current = rateLimitCache.get(key) as number || 0
  
  if (current >= limit) {
    return { success: false, remaining: 0 }
  }
  
  rateLimitCache.set(key, current + 1)
  return { success: true, remaining: limit - (current + 1) }
}

// Middleware pour API routes
export function withRateLimit(handler: any, limit: number = 10) {
  return async (req: any, res: any) => {
    const identifier = req.ip || req.connection.remoteAddress
    const rateLimitResult = rateLimit(identifier, limit)
    
    res.setHeader('X-RateLimit-Limit', limit)
    res.setHeader('X-RateLimit-Remaining', rateLimitResult.remaining)
    
    if (!rateLimitResult.success) {
      res.status(429).json({
        error: 'Trop de requêtes. Veuillez réessayer dans 1 minute.'
      })
      return
    }
    
    return handler(req, res)
  }
}
