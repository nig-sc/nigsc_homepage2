import { translate } from '@docusaurus/Translate'

export function useTagLabel (tagName) {
  switch (tagName) {
    case 'news':
      return translate({ id: 'theme.tag.news' })
    case 'maintenance':
      return translate({ id: 'theme.tag.maintenance' })
    default:
      return tagName
  }
}
