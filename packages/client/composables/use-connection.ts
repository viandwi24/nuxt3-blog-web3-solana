import { clusterApiUrl, Connection } from "@solana/web3.js"

export const useConnection = () => {
  const connection = computed(() => new Connection('https://devnet.genesysgo.net/'))
  return {
    connection,
  }
}
