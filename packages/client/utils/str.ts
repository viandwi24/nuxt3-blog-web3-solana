export const shortPubKey = (pubkey: string) => {
  return pubkey.slice(0, 6) + "..." + pubkey.slice(-4)
}
