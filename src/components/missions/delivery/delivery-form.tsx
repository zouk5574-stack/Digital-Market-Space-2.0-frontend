// components/missions/delivery/delivery-form.tsx
'use client'

import { useState } from 'react'
import { Mission } from '@/types'
import { motion } from 'framer-motion'
import { Upload, Paperclip, Send, AlertCircle } from 'lucide-react'
import { AdvancedInput } from '@/components/atomic/advanced-input'
import { MagneticButton } from '@/components/atomic/magnetic-button'

interface DeliveryFormProps {
  mission: Mission
  onDelivery: (data: DeliveryData) => Promise<void>
}

interface DeliveryData {
  deliveryNotes: string
  files: File[]
}

export function DeliveryForm({ mission, onDelivery }: DeliveryFormProps) {
  const [deliveryNotes, setDeliveryNotes] = useState('')
  const [files, setFiles] = useState<File[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<string[]>([])

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || [])
    
    // Validation des fichiers
    const validFiles = selectedFiles.filter(file => {
      const maxSize = 50 * 1024 * 1024 // 50MB
      if (file.size > maxSize) {
        setErrors(prev => [...prev, `Le fichier ${file.name} dépasse 50MB`])
        return false
      }
      return true
    })

    setFiles(prev => [...prev, ...validFiles])
  }

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors([])
    
    if (!deliveryNotes.trim()) {
      setErrors(['Veuillez ajouter des notes de livraison'])
      return
    }

    if (files.length === 0) {
      setErrors(['Veuillez ajouter au moins un fichier'])
      return
    }

    setIsSubmitting(true)
    try {
      await onDelivery({
        deliveryNotes,
        files
      })
      // Reset form on success
      setDeliveryNotes('')
      setFiles([])
    } catch (error) {
      setErrors(['Erreur lors de la livraison. Veuillez réessayer.'])
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="bg-white rounded-xl border border-slate-200 p-6 space-y-6"
    >
      {/* Header */}
      <div>
        <h2 className="text-xl font-semibold text-slate-900 mb-2">
          Livrer votre travail
        </h2>
        <p className="text-slate-600">
          Fournissez les fichiers finaux et décrivez votre livraison
        </p>
      </div>

      {/* Errors */}
      {errors.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center gap-3">
            <AlertCircle className="text-red-500" size={20} />
            <div>
              {errors.map((error, index) => (
                <p key={index} className="text-red-800 text-sm">{error}</p>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Delivery Notes */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Notes de livraison *
        </label>
        <textarea
          value={deliveryNotes}
          onChange={(e) => setDeliveryNotes(e.target.value)}
          placeholder="Décrivez votre travail livré, les fonctionnalités implémentées, les instructions d'installation, etc."
          rows={6}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 resize-none"
          required
        />
        <p className="text-sm text-slate-500 mt-1">
          Ces notes aideront le client à comprendre et utiliser votre travail.
        </p>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Fichiers livrés *
        </label>
        
        {/* Upload Area */}
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="hidden"
            id="file-upload"
            accept=".zip,.rar,.pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png,.psd,.ai,.fig,.sketch,.mp4,.mov,.avi"
          />
          <label htmlFor="file-upload" className="cursor-pointer">
            <Upload className="mx-auto text-slate-400 mb-3" size={32} />
            <p className="text-slate-600 mb-1">
              <span className="text-purple-600 font-medium">Cliquez pour uploader</span> ou glissez-déposez
            </p>
            <p className="text-sm text-slate-500">
              ZIP, PDF, images, documents (max 50MB par fichier)
            </p>
          </label>
        </div>

        {/* File List */}
        {files.length > 0 && (
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium text-slate-700">
              Fichiers sélectionnés ({files.length})
            </p>
            {files.map((file, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-slate-50 rounded-lg"
              >
                <div className="flex items-center gap-3">
                  <Paperclip className="text-slate-400" size={16} />
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-slate-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500">
                      {(file.size / (1024 * 1024)).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => removeFile(index)}
                  className="text-slate-400 hover:text-red-500 transition-colors"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Requirements Checklist */}
      <div className="bg-blue-50 rounded-lg p-4">
        <h4 className="font-medium text-blue-900 mb-3">Checklist de livraison</h4>
        <div className="space-y-2 text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
            <span className="text-blue-800">Tous les fichiers requis sont inclus</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
            <span className="text-blue-800">Le code est propre et commenté</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
            <span className="text-blue-800">La documentation est fournie</span>
          </label>
          <label className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-slate-300 text-blue-600" />
            <span className="text-blue-800">Le travail respecte les spécifications</span>
          </label>
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex gap-3 pt-4 border-t border-slate-200">
        <MagneticButton
          type="submit"
          disabled={isSubmitting || files.length === 0 || !deliveryNotes.trim()}
          className="flex-1 bg-purple-600 hover:bg-purple-700"
        >
          {isSubmitting ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
          ) : (
            <>
              <Send size={16} />
              Livrer la mission
            </>
          )}
        </MagneticButton>
      </div>
    </motion.form>
  )
}
