import type { Metadata } from 'next'
import { getCanonicalUrl, getMessages, siteUrl, type Locale } from './i18n'

const keywords = [
  'narrative strategy',
  'storytelling',
  'strategic communications',
  'media influence',
  'thought leadership',
  'culture strategy',
  'editorial studio',
  'brand storytelling',
  'executive positioning',
  'public narrative',
  'communications strategy',
  'campaign strategy',
  'content strategy',
  'influence campaigns',
  'creative studio',
  'Jeli and Folks',
  'JF Studio',
]

export function getPageMetadata(locale: Locale): Metadata {
  const messages = getMessages(locale)
  const canonical = getCanonicalUrl(locale)

  return {
    metadataBase: new URL(siteUrl),
    title: messages.metadata.title,
    description: messages.metadata.description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: '/',
        fr: '/fr/',
      },
    },
    robots: {
      index: true,
      follow: true,
    },
    openGraph: {
      type: 'website',
      locale: locale === 'fr' ? 'fr_CA' : 'en_US',
      alternateLocale: locale === 'fr' ? ['en_US'] : ['fr_CA'],
      title: messages.metadata.title,
      description: messages.metadata.socialDescription,
      url: canonical,
      siteName: 'JF Studio',
      images: [
        {
          url: '/og-image.jpg',
          width: 1200,
          height: 630,
          type: 'image/jpeg',
          alt: messages.metadata.ogAlt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: messages.metadata.title,
      description: messages.metadata.socialDescription,
      images: [
        {
          url: '/og-image.jpg',
          alt: messages.metadata.ogAlt,
        },
      ],
    },
    icons: {
      icon: [
        { url: '/favicon.ico', sizes: 'any' },
        { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
      ],
      apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
    },
  }
}

export function getOrganizationSchema(locale: Locale) {
  const messages = getMessages(locale)

  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'JF Studio',
    url: siteUrl,
    description:
      locale === 'fr'
        ? 'Studio créatif spécialisé en stratégie narrative, storytelling, communications, influence et culture.'
        : 'Creative studio specializing in narrative strategy, storytelling, communications, influence, and culture.',
    parentOrganization: {
      '@type': 'Organization',
      name: 'Jeli & Folks',
    },
    sameAs: [siteUrl],
    inLanguage: locale,
    slogan: messages.hero.tagline,
  }
}
