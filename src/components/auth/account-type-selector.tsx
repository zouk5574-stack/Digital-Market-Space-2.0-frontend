// components/auth/account-type-selector.tsx
'use client'

export function AccountTypeSelector() {
  const accountTypes = [
    {
      type: 'client',
      title: '👔 Client',
      description: 'Je cherche des freelances ou des produits digitaux',
      features: [
        'Publier des missions',
        'Acheter des produits', 
        'Gérer mes commandes',
        'Évaluer les vendeurs'
      ]
    },
    {
      type: 'freelancer', 
      title: '💼 Freelance/Vendeur',
      description: 'Je propose mes services ou vends des produits digitaux',
      features: [
        'Postuler aux missions',
        'Vendre des produits',
        'Gérer mon portefeuille',
        'Construire ma réputation'
      ]
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {accountTypes.map((account) => (
        <div
          key={account.type}
          className="border-2 border-slate-200 rounded-xl p-6 hover:border-purple-500 cursor-pointer transition-colors"
        >
          <h3 className="text-xl font-semibold text-slate-900 mb-2">
            {account.title}
          </h3>
          <p className="text-slate-600 mb-4">{account.description}</p>
          <ul className="space-y-2 text-sm text-slate-600">
            {account.features.map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="text-green-500" size={16} />
                {feature}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}
