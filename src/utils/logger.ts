// src/utils/logger.ts
import { LogController } from '@/controllers/logController'

export const logger = {
  debug: (...args: any[]) => LogController.debug(...args),
  info: (...args: any[]) => LogController.info(...args),
  warn: (...args: any[]) => LogController.warn(...args),
  error: (...args: any[]) => LogController.error(...args)
}

export default logger
