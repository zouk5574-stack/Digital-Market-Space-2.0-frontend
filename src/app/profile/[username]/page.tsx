// app/profile/[username]/page.tsx
'use client'

import { usePublicProfile } from '@/hooks/use-public-profile'
import { ProfileHeader } from '@/components/profile/profile-header'
import { PortfolioGrid } from '@/components/profile/portfolio-grid'
import { ReviewsList } from '@/components/profile/reviews-list'
import { StatsCards } from '@/components/profile/stats-cards'
import { motion } from 'framer-motion'

interface PublicProfilePageProps {
  params: {
    username: string
  }
}

export default function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { profile, isLoading } = usePublicProfile(params.username)

  if (isLoading) {
    return <div>Chargement...</div>
  }

  if (!profile) {
    return <div>Profil non trouvé</div>
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Profile Header */}
      <ProfileHeader profile={profile} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <StatsCards stats={profile.stats} />
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Portfolio */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <PortfolioGrid projects={profile.portfolio} />
            </motion.section>

            {/* Reviews */}
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <ReviewsList reviews={profile.reviews} />
            </motion.section>
          </div>
        </div>
      </div>
    </div>
  )
}
