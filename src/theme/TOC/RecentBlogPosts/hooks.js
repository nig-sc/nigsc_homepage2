import { usePluginData } from '@docusaurus/useGlobalData'

export const TAG_NEWS = 'news'
export const TAG_MAINTENANCE = 'maintenance'

export function usePosts () {
  const { blogPosts: posts } = usePluginData('nigsc-plugin-blog-data')
  return posts
}

export function usePostsByTag (tagLabel) {
  const posts = usePosts()

  return posts.filter(post =>
    post.metadata.tags.some(tag => tag.label === tagLabel)
  )
}

export function useMaintenancePosts () {
  return usePostsByTag(TAG_MAINTENANCE)
}

export function useNewsPosts () {
  return usePostsByTag(TAG_NEWS)
}
