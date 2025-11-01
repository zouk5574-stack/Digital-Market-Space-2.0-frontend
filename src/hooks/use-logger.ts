// hooks/use-logger.ts
export function useLogger() {
  const logInfo = (message: string, data?: any) => {
    console.log(`[INFO] ${message}`, data)
    // En production, envoyer à votre service de logging
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureMessage(message, { level: 'info', extra: data })
    }
  }

  const logError = (message: string, error?: any) => {
    console.error(`[ERROR] ${message}`, error)
    // En production, envoyer à votre service de logging
    if (process.env.NODE_ENV === 'production') {
      // Sentry.captureException(error, { extra: { message } })
    }
  }

  return { logInfo, logError }
}
