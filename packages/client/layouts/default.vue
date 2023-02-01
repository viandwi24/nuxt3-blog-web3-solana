<script lang="ts" setup>
import { WalletMultiButton } from "solana-wallets-vue"

const $auth = useAuth()
</script>

<template>
  <div class="screen w-full min-h-screen bg-slate-900 text-gray-200">
    <div class="navbar fixed z-30 top-0 left-0 w-full h-[68px] flex border-b-2 border-primary-500/80 bg-slate-900/80 shadow-lg backdrop-filter backdrop-blur-lg">
      <div class="flex-1 max-w-screen-lg mx-auto w-full flex items-center justify-between">
        <div>
          <NuxtLink class="text-lg font-bold capitalize text-white" to="/">Web3 Blog Nuxt3 + solana</NuxtLink>
        </div>
        <ClientOnly>
          <div class="flex space-x-2 items-center">
            <template v-if="$auth.isLogged.value">
              <NuxtLink class="flex items-center space-x-2 cursor-pointer hover:bg-slate-800 px-3 py-1 rounded" :to="{ name: 'post' }">
                <Icon name="uil:plus" />
                <div>Create New Post</div>
              </NuxtLink>
              <NuxtLink class="flex items-center space-x-2 cursor-pointer hover:bg-slate-800 px-3 py-1 rounded" :to="{ name: 'profile' }">
                <Icon name="uil:user" />
                <div>{{ $auth.user.value?.data.name }}</div>
              </NuxtLink>
              <div class="h-8 w-[1px] bg-white/50" />
            </template>
            <div class="pl-3">
              <WalletMultiButton dark />
            </div>
          </div>
        </ClientOnly>
      </div>
    </div>
    <div class="pt-[68px] max-w-screen-lg mx-auto flex flex-col">
      <div class="flex flex-col flex-1 py-4">
        <slot />
      </div>
    </div>
  </div>
</template>
