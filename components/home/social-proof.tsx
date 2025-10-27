// components/home/social-proof.tsx
'use client'

import { motion } from 'framer-motion'

export function SocialProof() {
  const testimonials = [
    {
      name: "Marie K.",
      role: "Freelance Designer",
      content: "J'ai multiplié mes revenus par 3 en 6 mois sur la plateforme. Les clients sont sérieux et les paiements rapides.",
      avatar: "👩‍🎨",
      rating: 5
    },
    {
      name: "Ahmed S.",
      role: "Entrepreneur",
      content: "J'ai trouvé les meilleurs développeurs pour mon startup. La qualité du travail est exceptionnelle.",
      avatar: "👨‍💼",
      rating: 5
    },
    {
      name: "Sophie T.",
      role: "Marketing Manager",
      content: "Plateforme intuitive et efficace. J'ai économisé des milliers en frais d'agence.",
      avatar: "👩‍💼",
      rating: 5
    }
  ]

  const stats = [
    { value: "1000+", label: "Utilisateurs actifs" },
    { value: "2.5M+", label: "FCFA de revenus générés" },
    { value: "98%", label: "Taux de satisfaction" },
    { value: "24h", label: "Support moyen" }
  ]

  return (
    <section className="py-20 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl md:text-4xl font-bold text-slate-900 mb-2">
                {stat.value}
              </div>
              <div className="text-slate-600">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center text-slate-900 mb-4">
            Ils nous font confiance
          </h2>
          <p className="text-xl text-slate-600 text-center mb-12 max-w-2xl mx-auto">
            Découvrez pourquoi des milliers de professionnels choisissent notre plateforme
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2 }}
                className="bg-white rounded-2xl p-6 shadow-lg"
              >
                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">⭐</span>
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-700 mb-6 italic">"{testimonial.content}"</p>

                {/* Author */}
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{testimonial.avatar}</div>
                  <div>
                    <p className="font-semibold text-slate-900">{testimonial.name}</p>
                    <p className="text-sm text-slate-600">{testimonial.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
