import { usePluginData } from '@docusaurus/useGlobalData';

export const TAG_NEWS = "news"
export const TAG_TROUBLEREPORT = "troublereport"

export function usePosts() {
  const { blogPosts } = usePluginData('plugin-blog-global-data')

  return blogPosts
}

export function usePostsByTag (tagLabel) {
  const posts = usePosts()

  return posts.filter(post =>
    post.metadata.tags.some(tag => tag.label === tagLabel)
  )
}

export function useTroublereportPosts () {
  return usePostsByTag(TAG_TROUBLEREPORT)
}

export function useNewsPosts () {
  return usePostsByTag(TAG_NEWS)
}
