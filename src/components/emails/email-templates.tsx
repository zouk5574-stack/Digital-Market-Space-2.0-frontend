// components/emails/email-templates.tsx
'use client'

export function WelcomeEmail({ userName }: { userName: string }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; background: #f8fafc; padding: 40px; }
        .container { max-width: 600px; background: white; border-radius: 12px; padding: 40px; }
        .header { text-align: center; margin-bottom: 30px; }
        .button { background: #7c3aed; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>🎉 Bienvenue sur Digital Market Space!</h1>
        </div>
        <p>Bonjour ${userName},</p>
        <p>Votre compte a été créé avec succès. Commencez dès maintenant à :</p>
        <ul>
          <li>📋 Publier des missions</li>
          <li>🛍️ Vendre des produits digitaux</li>
          <li>💼 Trouver des opportunités freelance</li>
        </ul>
        <div style="text-align: center; margin: 30px 0;">
          <a href="${process.env.NEXT_PUBLIC_APP_URL}/dashboard" class="button">
            Accéder à mon dashboard
          </a>
        </div>
      </div>
    </body>
    </html>
  `
}

export function PaymentConfirmationEmail({ 
  userName, 
  amount, 
  productName 
}: { 
  userName: string
  amount: number
  productName: string
}) {
  return `
    <div class="container">
      <div class="header">
        <h1>✅ Paiement Confirmé!</h1>
      </div>
      <p>Bonjour ${userName},</p>
      <p>Votre achat de <strong>${productName}</strong> pour <strong>${amount} FCFA</strong> a été confirmé.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/downloads" class="button">
          Télécharger le produit
        </a>
      </div>
    </div>
  `
}
