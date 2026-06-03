import en from '../messages/en.json'
import fr from '../messages/fr.json'

export const siteUrl = 'https://jelifolks.studio'
export const defaultLocale = 'en'
export const locales = ['en', 'fr'] as const

export type Locale = (typeof locales)[number]
export type Messages = typeof en

const dictionaries: Record<Locale, Messages> = {
  en,
  fr,
}

export function isLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale)
}

export function getMessages(locale: Locale): Messages {
  return dictionaries[locale]
}

export function getLocalizedPath(locale: Locale): string {
  return locale === defaultLocale ? '/' : `/${locale}/`
}

export function getCanonicalUrl(locale: Locale): string {
  const path = getLocalizedPath(locale)
  return path === '/' ? siteUrl : `${siteUrl}${path.slice(0, -1)}`
}
