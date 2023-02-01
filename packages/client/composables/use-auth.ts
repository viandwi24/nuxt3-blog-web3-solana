import { PublicKey } from '@solana/web3.js'
import { useWallet } from 'solana-wallets-vue'
import { useAuthStore } from '~/stores/auth'

export const useAuth = () => {
  const $router = useRouter()
  const { $state, login, logout } = useAuthStore()
  const { connected, publicKey } = useWallet()
  const $loading = useLoading()

  const check = async () => {
    if (!publicKey.value || !connected) return await logout()
    $loading.show()
    const pda = getPdaUserAccount(publicKey.value ? (publicKey?.value).toBuffer() : Buffer.from(""))
    const res = await login(pda)
    $loading.hide()
    return res
  }


  // watch wallet connected
  const watchWalletConnected = ref(false)
  watch(connected, (val) => {
    if (!watchWalletConnected.value) checkFirstLogin()
    watchWalletConnected.value = val
  })
  const checkFirstLogin = async () => {
    // check connected user has been registered or not in our contract pda account
    if (!(await check())) {
      // if not registered, navigate to /profile page
      $router.push("/profile")
    } else {
      // if registered, navigate to / page
      $router.push("/")
    }
  }

  return {
    user: computed(() => $state.user),
    isLogged: computed(() => $state.isLogged),
    isConnected: connected,
    wallet: publicKey,
    check,
    login,
  }
}
