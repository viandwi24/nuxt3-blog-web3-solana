import "solana-wallets-vue/styles.css"
import SolanaWallets from "solana-wallets-vue"
import {
  BackpackWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets"

const walletOptions = {
  wallets: [
    new BackpackWalletAdapter(),
    new PhantomWalletAdapter(),
    new SlopeWalletAdapter(),
  ],
  autoConnect: false,
}

export default defineNuxtPlugin((nuxtApp) => {
  // register solana wallet plugins
  nuxtApp.vueApp.use(SolanaWallets, walletOptions)
})
