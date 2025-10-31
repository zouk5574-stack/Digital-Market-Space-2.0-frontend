// src/controllers/logController.ts
// Simple logging utility. In prod -> plug Sentry or remote logging.
type LogLevel = 'debug' | 'info' | 'warn' | 'error'

function log(level: LogLevel, ...args: any[]) {
  const ts = new Date().toISOString()
  if (level === 'error') {
    console.error(`[${ts}] [${level.toUpperCase()}]`, ...args)
  } else if (level === 'warn') {
    console.warn(`[${ts}] [${level.toUpperCase()}]`, ...args)
  } else {
    console.log(`[${ts}] [${level.toUpperCase()}]`, ...args)
  }
}

export const LogController = {
  debug: (...args: any[]) => log('debug', ...args),
  info: (...args: any[]) => log('info', ...args),
  warn: (...args: any[]) => log('warn', ...args),
  error: (...args: any[]) => log('error', ...args)
}

export default LogController
