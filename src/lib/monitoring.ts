// lib/monitoring.ts
import * as Sentry from '@sentry/nextjs'

export function initMonitoring() {
  Sentry.init({
    dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
    environment: process.env.NODE_ENV,
    tracesSampleRate: 1.0,
    integrations: [
      new Sentry.BrowserTracing({
        tracePropagationTargets: ['localhost', /\.digitalmarketspace\.com$/],
      }),
    ],
  })
}

// Composant de boundary d'erreur
export function ErrorBoundary({ children }: { children: React.ReactNode }) {
  return (
    <Sentry.ErrorBoundary
      fallback={({ error, componentStack, resetError }) => (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <h2>Une erreur est survenue</h2>
          <p>{error.message}</p>
          <button onClick={resetError}>Réessayer</button>
        </div>
      )}
    >
      {children}
    </Sentry.ErrorBoundary>
  )
}
