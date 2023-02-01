<script lang="ts" setup>
import { PublicKey } from '@solana/web3.js';

const $router = useRouter()
const { isLogged, isConnected } = useAuth()
const { users, loading: usersLoading } = useUsers()
const { posts, loading: postsLoading } = usePosts()


if (isConnected.value && !isLogged.value) {
  $router.push('/profile')
}

const getUserAccountByAddress = (address: string) => {
  console.log()
  return users.value.find((user) => user.address === address)
}

const getSolExplorerUrl = (pubkey: string) => {
  return `https://solaneyes.com/address/${pubkey}?cluster=devnet`
}
</script>

<template>
  <div>
    <Card class="mb-6">
      <template #header>
        <div class="font-bold text-xl">Users</div>
      </template>
      <div v-if="!usersLoading && users.length > 0" class="flex space-x-2">
        <a v-for="item in users" :key="item.address" class="w-12 h-12 bg-slate-500 rounded-full" :href="getSolExplorerUrl(item.address)" target="_blank">
          <img :src="item.avatar" class="w-12 h-12 rounded-full" :alt="`Avatar of ${item.name}`" />
        </a>
      </div>
      <div v-else-if="!usersLoading && users.length === 0" class="w-full text-center">No users found</div>
      <div v-else-if="usersLoading" class="w-full text-center">Loading...</div>
    </Card>
    <template v-if="!postsLoading && posts.length > 0">
      <Card v-for="item in posts" :key="item.address" class="mb-6">
        <div class="flex space-x-2 items-center mb-4">
          <div class="w-4 h-4 rounded-full bg-slate-600 overflow-hidden">
            <img :src="getUserAccountByAddress(item.user)?.avatar" class="w-full h-full" alt="Avatar" />
          </div>
          <div class="w-1 h-1 bg-gray-500" />
          <div class="text-xs font-thin">{{ getUserAccountByAddress(item.user)?.name }}</div>
          <div class="w-1 h-1 bg-gray-500" />
          <a :href="getSolExplorerUrl(getUserAccountByAddress(item.user)?.authority || '')" target="_blank" class="text-xs font-thin underline hover:text-primary-500">{{ shortPubKey(getUserAccountByAddress(item.user)?.authority || '') }}</a>
        </div>
        <div class="text-lg font-semibold capitalize">
          <span>{{ item.title }}</span>
          <a :href="getSolExplorerUrl(item.address)" target="_blank">
            <Icon name="ic:round-open-in-new" class="inline-block text-xs ml-1" />
          </a>
        </div>
        <div>{{ item.content }}</div>
      </Card>
    </template>
    <div v-else-if="!postsLoading && posts.length === 0">
      <div class="w-full text-center">No posts found</div>
    </div>
    <div v-else-if="postsLoading" class="w-full text-center">Loading posts...</div>
  </div>
</template>
