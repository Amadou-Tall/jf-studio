import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'
import './globals.css'
import { isLocale, siteUrl, type Locale } from '../lib/i18n'
import { getOrganizationSchema } from '../lib/seo'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.png', type: 'image/png', sizes: '512x512' },
    ],
    apple: [{ url: '/apple-touch-icon.png', sizes: '180x180' }],
  },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f6f4ef',
}

type RootLayoutProps = {
  children: ReactNode
  params?: Promise<{ locale?: string }>
}

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const resolvedParams = params ? await params : {}
  const locale: Locale = resolvedParams.locale && isLocale(resolvedParams.locale) ? resolvedParams.locale : 'en'

  return (
    <html lang={locale}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getOrganizationSchema(locale)) }}
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
