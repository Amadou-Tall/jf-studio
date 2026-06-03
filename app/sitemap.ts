import type { MetadataRoute } from 'next'
import { getCanonicalUrl, locales, siteUrl } from '../lib/i18n'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: getCanonicalUrl(locale),
    lastModified: new Date('2026-06-03'),
    changeFrequency: 'monthly',
    priority: locale === 'en' ? 1 : 0.9,
    alternates: {
      languages: {
        en: siteUrl,
        fr: `${siteUrl}/fr`,
      },
    },
  }))
}
