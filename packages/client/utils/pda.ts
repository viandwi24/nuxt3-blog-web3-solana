import { PublicKey } from "@solana/web3.js"

export const getPdaUserAccount = (userpubkey: Buffer) => {
  const { programID, SEEDS, BLOG_ADDRESS } = useContract()
  const [pda] = PublicKey.findProgramAddressSync(
    [
      // my program seed (just random word :D)
      Buffer.from(SEEDS.user),
      // take from blog address to make it unique
      BLOG_ADDRESS.toBuffer(),
      // take from wallet address to make it unique
      userpubkey,
    ],
    programID.value,
  )
  return pda
}


export const getPdaPostAccount = (userpubkey: Buffer, id: string) => {
  const { programID, SEEDS, BLOG_ADDRESS } = useContract()
  const [pda] = PublicKey.findProgramAddressSync(
    [
      // my program seed (just random word :D)
      Buffer.from(SEEDS.post),
      // take from blog address to make it unique
      BLOG_ADDRESS.toBuffer(),
      // take from wallet address to make it unique
      userpubkey,
      // take from id post to make it unique
      Buffer.from(id),
    ],
    programID.value,
  )
  return pda
}
