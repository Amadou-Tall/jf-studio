import StudioPage from '../components/StudioPage'
import { getMessages } from '../lib/i18n'
import { getPageMetadata } from '../lib/seo'

export const metadata = getPageMetadata('en')

export default function Page() {
  return <StudioPage locale="en" messages={getMessages('en')} />
}
