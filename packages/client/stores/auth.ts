import { PublicKey } from '@solana/web3.js';
import { defineStore } from 'pinia'

export interface AuthStateUser {
  address: string;
  authority: string;
  data: {
    name: string;
    email: string;
    image: string;
  }
}

export interface AuthState {
  user?: AuthStateUser;
  isLogged: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState  => ({
    user: undefined,
    isLogged: false,
  }),
  actions: {
    async login(useraccount: PublicKey) {
      try {
        const { program } = useContract()
        const data = await program.value.account.userAccount.fetch(useraccount)
        this.user = {
          address: useraccount.toBase58(),
          authority: data.authority.toBase58(),
          data: {
            name: data.name,
            email: data.email,
            image: data.image,
          }
        }
        this.isLogged = true
        return true
      } catch (error) {
        console.log(error)
        this.isLogged = false
        return false
      }
    },
    async logout() {
      this.user = undefined
      this.isLogged = false
      return true
    }
  }
})
