// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Headers de sécurité
  const response = NextResponse.next()
  
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:;"
  )

  // Protection contre le clickjacking
  response.headers.set('X-Frame-Options', 'DENY')
  
  // Prévention XSS
  response.headers.set('X-XSS-Protection', '1; mode=block')

  return response
}

// lib/security/sanitize.ts
import DOMPurify from 'dompurify'
import { JSDOM } from 'jsdom'

const window = new JSDOM('').window
const purify = DOMPurify(window)

export function sanitizeHTML(dirty: string): string {
  return purify.sanitize(dirty, {
    ALLOWED_TAGS: ['b', 'i', 'em', 'strong', 'p', 'br'],
    ALLOWED_ATTR: [],
  })
}

export function validateFileUpload(file: File): { isValid: boolean; error?: string } {
  const maxSize = 50 * 1024 * 1024 // 50MB
  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/gif',
    'application/pdf',
    'application/zip',
    'text/plain'
  ]

  if (file.size > maxSize) {
    return { isValid: false, error: 'Fichier trop volumineux' }
  }

  if (!allowedTypes.includes(file.type)) {
    return { isValid: false, error: 'Type de fichier non autorisé' }
  }

  return { isValid: true }
}
