// components/seo/structured-data.tsx
export function ProductStructuredData({ product }: { product: any }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.title,
    description: product.description,
    image: product.previewUrl,
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'XOF',
      availability: 'https://schema.org/InStock'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}

export function MissionStructuredData({ mission }: { mission: any }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: mission.title,
    description: mission.description,
    datePosted: mission.createdAt,
    validThrough: mission.deadline,
    hiringOrganization: {
      '@type': 'Organization',
      name: 'Digital Market Space'
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressCountry: 'CI'
      }
    },
    baseSalary: {
      '@type': 'MonetaryAmount',
      currency: 'XOF',
      value: {
        '@type': 'QuantitativeValue',
        value: mission.budget,
        unitText: 'MONTH'
      }
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  )
}
