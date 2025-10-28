// lib/i18n.ts
import { createInstance } from 'i18next'
import resourcesToBackend from 'i18next-resources-to-backend'
import { initReactI18next } from 'react-i18next'

const i18n = createInstance({
  fallbackLng: 'fr',
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
})

i18n
  .use(initReactI18next)
  .use(
    resourcesToBackend(
      (language: string, namespace: string) =>
        import(`@/locales/${language}/${namespace}.json`)
    )
  )

await i18n.init()

export default i18n

// locales/fr/common.json
{
  "navigation": {
    "missions": "Missions",
    "products": "Produits",
    "dashboard": "Tableau de bord",
    "profile": "Profil"
  },
  "auth": {
    "login": "Connexion",
    "register": "Inscription",
    "logout": "Déconnexion"
  },
  "actions": {
    "save": "Sauvegarder",
    "cancel": "Annuler",
    "delete": "Supprimer",
    "edit": "Modifier"
  }
}
