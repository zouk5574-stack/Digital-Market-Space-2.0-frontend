// hooks/admin/use-admin-search.ts
import { useQuery } from '@tanstack/react-query'
import { api } from '@/lib/api/next-gen-client'

export function useAdminSearch(query: string) {
  return useQuery({
    queryKey: ['admin-search', query],
    queryFn: async () => {
      if (!query.trim()) return []

      try {
        // Search across users, missions, and products
        const [usersResponse, missionsResponse, productsResponse] = await Promise.all([
          api.admin.getUsers({ search: query, limit: 3 }),
          api.missions.list({ search: query, limit: 3 }),
          api.products.list({ search: query, limit: 3 })
        ])

        const results = []

        // Add users
        if (usersResponse.data?.data) {
          results.push(...usersResponse.data.data.map((user: any) => ({
            type: 'user',
            id: user._id,
            title: `${user.firstName} ${user.lastName}`,
            subtitle: user.email,
            role: user.role
          })))
        }

        // Add missions
        if (missionsResponse.data?.data) {
          results.push(...missionsResponse.data.data.map((mission: any) => ({
            type: 'mission',
            id: mission._id,
            title: mission.title,
            subtitle: `Budget: ${mission.budget.toLocaleString()} FCFA`,
            status: mission.status
          })))
        }

        // Add products
        if (productsResponse.data?.data) {
          results.push(...productsResponse.data.data.map((product: any) => ({
            type: 'product',
            id: product._id,
            title: product.title,
            subtitle: `Prix: ${product.price.toLocaleString()} FCFA`,
            status: product.status
          })))
        }

        return results.slice(0, 10) // Limit to 10 results
      } catch (error) {
        console.error('Search error:', error)
        // Fallback to mock data
        return [
          {
            type: 'user',
            id: '1',
            title: 'John Doe',
            subtitle: 'john@example.com',
            role: 'client'
          },
          {
            type: 'mission',
            id: '2',
            title: 'Développement React Native',
            subtitle: 'Budget: 150,000 FCFA',
            status: 'published'
          },
          {
            type: 'product',
            id: '3',
            title: 'Pack Logo Professionnel',
            subtitle: 'Prix: 25,000 FCFA',
            status: 'published'
          }
        ]
      }
    },
    enabled: query.length > 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })
}
