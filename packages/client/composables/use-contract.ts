import { Keypair, PublicKey } from "@solana/web3.js"
import { useAnchorWallet, AnchorWallet } from "solana-wallets-vue"
import { AnchorProvider, Program, Wallet } from "@project-serum/anchor";
import * as anchor from "@project-serum/anchor"

// you must build contract and deploy first to get this generated idl & types
import idl from '@nuxt3-blog-web3-solana/contract/target/idl/contract.json'
import { Contract } from '@nuxt3-blog-web3-solana/contract/target/types/contract'

export const useContract = () => {
  const wallet = useAnchorWallet()
  const { connection } = useConnection()

  const provider = computed(
    () => {
      const con = connection.value
      const wal = wallet.value || ((Keypair.generate())) as unknown as Wallet
      if (!connection.value) return null as unknown as AnchorProvider
      return new AnchorProvider(
        con,
        wal,
        {}
      )
    }
  )
  const programID = computed(() => new PublicKey(idl.metadata.address))
  const program = computed(() => new Program((idl as any), programID.value, provider.value) as Program<Contract>)

  // seeds
  const SEED = 'n3bw3s'
  const SEEDS = {
    user: `${SEED}user`, // n3bw3suser
    post: `${SEED}post`, // n3bw3spost
    blog: `${SEED}blog`, // n3bw3sblog
  }

  // BLOG
  const BLOG_ADDRESS = new PublicKey('22SF5EVHBVGf9LxDAYGqqWuppzJgnVDAU2ugLm3PpiKj')

  return {
    programID,
    program,
    SEED,
    SEEDS,
    BLOG_ADDRESS,
  }
}
