export const usePosts = () => {
  const { program, BLOG_ADDRESS } = useContract()
  const loading = ref(false)
  const posts = ref<{
    address: string
    title: string
    content: string
    user: string
  }[]>([])
  const fetch_posts = async () => {
    loading.value = true
    const _posts = (await program.value.account.postAccount.all(BLOG_ADDRESS.toBuffer()))
    posts.value = _posts.map((user) => {
      return {
        address: user.publicKey.toString(),
        title: user.account.title,
        content: user.account.content,
        user: user.account.user.toString(),
      }
    })
    loading.value = false
  }

  onMounted(() => {
    fetch_posts()
  })

  watchEffect(() => fetch_posts())

  return {
    loading,
    posts,
  }
}
