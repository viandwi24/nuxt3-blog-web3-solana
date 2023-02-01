export const useUsers = () => {
  const { program, BLOG_ADDRESS } = useContract()
  const loading = ref(false)
  const users = ref<{
    address: string
    name: string
    avatar: string
    authority: string
  }[]>([])
  const fetch_users = async () => {
    loading.value = true
    const _users = (await program.value.account.userAccount.all(BLOG_ADDRESS.toBuffer()))
      .filter((user) => {
        const pda = getPdaUserAccount(user.account.authority.toBuffer())
        return pda.toString() === user.publicKey.toString()
      })
    users.value = _users.map((user) => {
      return {
        address: user.publicKey.toString(),
        name: user.account.name,
        avatar: user.account.image,
        authority: user.account.authority.toString(),
      }
    })
    loading.value = false
  }

  onMounted(() => {
    fetch_users()
  })

  watchEffect(() => fetch_users())

  return {
    loading,
    users,
  }
}
