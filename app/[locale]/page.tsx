import { notFound } from 'next/navigation'
import StudioPage from '../../components/StudioPage'
import { getMessages, isLocale, type Locale } from '../../lib/i18n'
import { getPageMetadata } from '../../lib/seo'

type LocalePageProps = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return [{ locale: 'fr' }]
}

async function getLocale(params: LocalePageProps['params']): Promise<Locale> {
  const { locale } = await params

  if (!isLocale(locale) || locale === 'en') {
    notFound()
  }

  return locale
}

export async function generateMetadata({ params }: LocalePageProps) {
  const locale = await getLocale(params)
  return getPageMetadata(locale)
}

export default async function LocalePage({ params }: LocalePageProps) {
  const locale = await getLocale(params)

  return <StudioPage locale={locale} messages={getMessages(locale)} />
}
