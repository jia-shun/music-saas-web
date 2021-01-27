import defaultSettings from '@/settings'

const title = defaultSettings.title || 'Cool Music'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
