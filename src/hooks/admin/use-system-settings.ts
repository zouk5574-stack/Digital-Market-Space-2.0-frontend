// hooks/admin/use-system-settings.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

interface SystemSettings {
  // General Settings
  siteName: string
  siteDescription: string
  siteUrl: string
  supportEmail: string
  defaultLanguage: string
  timezone: string
  maintenanceMode: boolean
  registrationEnabled: boolean
  
  // Payment Settings
  fedapayEnabled: boolean
  fedapayPublicKey: string
  fedapaySecretKey: string
  fedapayTestMode: boolean
  commissionRateMissions: number
  commissionRateProducts: number
  minimumPayout: number
  enableMobileMoney: boolean
  enableBankTransfer: boolean
  enableCrypto: boolean
  payoutAutoApprove: boolean
  payoutDelayDays: number
  
  // Security Settings
  requireEmailVerification: boolean
  allowSocialLogin: boolean
  sessionTimeout: number
  minPasswordLength: number
  requireStrongPassword: boolean
  passwordExpiry: number
  loginAttempts: number
  loginLockoutTime: number
  enableAPIRateLimit: boolean
  apiRateLimit: number
  
  // Email Settings
  smtpHost: string
  smtpPort: number
  smtpUsername: string
  smtpPassword: string
  smtpEncryption: string
  fromEmail: string
  fromName: string
  emailVerificationEnabled: boolean
  newsletterEnabled: boolean
}

export function useSystemSettings() {
  const queryClient = useQueryClient()

  const { data: settings, isLoading, error } = useQuery({
    queryKey: ['system-settings'],
    queryFn: async (): Promise<SystemSettings> => {
      try {
        const response = await api.admin.getSystemSettings()
        return response.data
      } catch (error) {
        // Fallback to default settings
        return {
          // General
          siteName: 'Digital Market Space',
          siteDescription: 'Marketplace freelance et produits digitaux',
          siteUrl: 'https://dms.example.com',
          supportEmail: 'support@dms.example.com',
          defaultLanguage: 'fr',
          timezone: 'Africa/Abidjan',
          maintenanceMode: false,
          registrationEnabled: true,
          
          // Payment
          fedapayEnabled: true,
          fedapayPublicKey: 'pk_test_xxxxxxxxxxxxxx',
          fedapaySecretKey: 'sk_test_xxxxxxxxxxxxxx',
          fedapayTestMode: true,
          commissionRateMissions: 10,
          commissionRateProducts: 15,
          minimumPayout: 5000,
          enableMobileMoney: true,
          enableBankTransfer: true,
          enableCrypto: false,
          payoutAutoApprove: false,
          payoutDelayDays: 2,
          
          // Security
          requireEmailVerification: true,
          allowSocialLogin: false,
          sessionTimeout: 24,
          minPasswordLength: 8,
          requireStrongPassword: true,
          passwordExpiry: 90,
          loginAttempts: 5,
          loginLockoutTime: 30,
          enableAPIRateLimit: true,
          apiRateLimit: 1000,
          
          // Email
          smtpHost: 'smtp.example.com',
          smtpPort: 587,
          smtpUsername: 'noreply@example.com',
          smtpPassword: '',
          smtpEncryption: 'tls',
          fromEmail: 'noreply@example.com',
          fromName: 'Digital Market Space',
          emailVerificationEnabled: true,
          newsletterEnabled: true
        }
      }
    },
  })

  const updateSettings = useMutation({
    mutationFn: async (newSettings: Partial<SystemSettings>) => {
      const response = await api.admin.updateSystemSettings(newSettings)
      return response.data
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['system-settings'] })
    },
  })

  return {
    data: settings,
    isLoading,
    error,
    updateSettings: updateSettings.mutateAsync
  }
}
