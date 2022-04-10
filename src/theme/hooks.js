import { translate } from '@docusaurus/Translate'

export function useTagLabel (tagName) {
  switch (tagName) {
    case 'news':
      return translate({ id: 'theme.tag.news' })
    case 'troublereport':
      return translate({ id: 'theme.tag.troublereport' })
    default:
      return tagName
  }
}
