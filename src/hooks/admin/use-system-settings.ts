// hooks/admin/use-system-settings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'
import { useToast } from '@/hooks/use-toast'
import { useLogger } from '@/hooks/use-logger'

interface SystemSettings {
  siteName: string
  siteDescription: string
  siteUrl: string
  supportEmail: string
  defaultLanguage: string
  timezone: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  fedapayEnabled: boolean
  fedapayPublicKey: string
  fedapayTestMode: boolean
  commissionRateMissions: number
  commissionRateProducts: number
  minimumPayout: number
  enableMobileMoney: boolean
  enableBankTransfer: boolean
  payoutAutoApprove: boolean
  payoutDelayDays: number
  requireEmailVerification: boolean
  sessionTimeout: number
  minPasswordLength: number
  requireStrongPassword: boolean
  loginAttempts: number
  loginLockoutTime: number
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpEncryption: string
  fromEmail: string
  fromName: string
  emailVerificationEnabled: boolean
}

export function useSystemSettings() {
  const queryClient = useQueryClient()
  const { toast } = useToast()
  const { logError, logInfo } = useLogger()

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['system-settings'],
    queryFn: async (): Promise<SystemSettings> => {
      try {
        const response = await api.admin.getSystemSettings()
        return response.data
      } catch (error) {
        logError('Failed to fetch system settings', error)
        toast({
          title: 'Erreur',
          description: 'Impossible de charger les paramètres',
          variant: 'destructive'
        })
        
        // Fallback sécurisé sans données sensibles
        return {
          siteName: process.env.NEXT_PUBLIC_APP_NAME || 'Digital Market Space',
          siteDescription: 'Marketplace freelance et produits digitaux',
          siteUrl: process.env.NEXT_PUBLIC_APP_URL || '',
          supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || '',
          defaultLanguage: 'fr',
          timezone: 'Africa/Abidjan',
          maintenanceMode: false,
          registrationEnabled: true,
          fedapayEnabled: true,
          fedapayPublicKey: process.env.NEXT_PUBLIC_FEDAPAY_PUBLIC_KEY || '',
          fedapayTestMode: process.env.NODE_ENV === 'development',
          commissionRateMissions: 10,
          commissionRateProducts: 15,
          minimumPayout: 5000,
          enableMobileMoney: true,
          enableBankTransfer: true,
          payoutAutoApprove: false,
          payoutDelayDays: 2,
          requireEmailVerification: true,
          sessionTimeout: 24,
          minPasswordLength: 8,
          requireStrongPassword: true,
          loginAttempts: 5,
          loginLockoutTime: 30,
          smtpHost: process.env.SMTP_HOST || '',
          smtpPort: parseInt(process.env.SMTP_PORT || '587'),
          smtpUsername: process.env.SMTP_USERNAME || '',
          smtpEncryption: 'tls',
          fromEmail: process.env.FROM_EMAIL || '',
          fromName: process.env.FROM_NAME || '',
          emailVerificationEnabled: true
        }
      }
    },
    retry: 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<SystemSettings>) => {
      const response = await api.admin.updateSystemSettings(newSettings)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] })
      toast({
        title: 'Succès',
        description: 'Paramètres sauvegardés avec succès',
        variant: 'default'
      })
      logInfo('System settings updated successfully')
    },
    onError: (error) => {
      logError('Failed to update system settings', error)
      toast({
        title: 'Erreur',
        description: 'Échec de la sauvegarde des paramètres',
        variant: 'destructive'
      })
    }
  })

  return {
    data: settings,
    isLoading,
    error,
    updateSettings: updateSettings.mutateAsync
  }
          }
