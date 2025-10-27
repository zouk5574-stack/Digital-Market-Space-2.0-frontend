// app/api/webhooks/fedapay/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { headers } from 'next/headers'

export async function POST(request: NextRequest) {
  try {
    const headersList = headers()
    const signature = headersList.get('x-feedpay-signature')
    
    // Vérifier la signature
    if (!verifySignature(await request.text(), signature)) {
      return NextResponse.json({ error: 'Signature invalide' }, { status: 401 })
    }

    const body = await request.json()
    
    switch (body.type) {
      case 'payment.succeeded':
        await handlePaymentSuccess(body.data)
        break
      
      case 'payment.failed':
        await handlePaymentFailure(body.data)
        break
      
      case 'transfer.succeeded':
        await handleTransferSuccess(body.data)
        break
    }

    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
  }
}

async function handlePaymentSuccess(payment: any) {
  // Mettre à jour la commande comme payée
  // Envoyer l'email de confirmation
  // Débloquer le téléchargement
}

async function handleTransferSuccess(transfer: any) {
  // Mettre à jour le statut du retrait
  // Notifier l'utilisateur
}
