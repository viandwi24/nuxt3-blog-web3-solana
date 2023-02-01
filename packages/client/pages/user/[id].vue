<script lang="ts" setup>import { PublicKey } from '@solana/web3.js';

const $route = useRoute()
const $router = useRouter()
const { program } = useContract()

const loading = ref(true)
const currentUserAddress = computed(() => $route.params.id as string | undefined)
const checkAddr = () => {
  if (typeof currentUserAddress.value === 'undefined') $router.push('/')
}
watch(currentUserAddress, (value) => {
  checkAddr()
})

const user = reactive({
  name: '',
  email: '',
  image: '',
  authority: '',
  address: ''
})
const fetch = async () => {
  checkAddr()
  loading.value = true
  const _user = await program.value.account.userAccount.fetch(
    new PublicKey(currentUserAddress.value || '')
  )
  user.address = currentUserAddress.value || ''
  user.name = _user.name
  user.email = _user.email
  user.image = _user.image
  user.authority = _user.authority.toBase58()
  loading.value = false
}
onBeforeMount(() => {
  fetch()
})
</script>

<template>
  <div>
    <Card class="mb-6">
      <template #header>
        <div class="font-bold text-xl">User Information</div>
      </template>
      <div v-if="loading" class="w-full text-center flex items-center justify-center space-x-2">
        <Icon name="line-md:loading-twotone-loop" class="" />
        <div class="text-sm">Loading...</div>
      </div>
      <div v-else-if="!loading" class="flex space-x-8">
        <div class="h-28 w-28 overflow-hidden rounded-full bg-slate-700">
          <img :src="user.image" alt="Avatar" />
        </div>
        <div class="flex-1 flex flex-col space-y-1">
          <div class="flex w-full">
            <div class="w-1/6">User Account</div>
            <div class="flex-1">
              : <a target="_blank" :href="getSolExplorerUrl(user.address)" class="hover:underline">{{ user.address }} <Icon name="ic:round-open-in-new" class="inline-block text-xs ml-1" /></a>
            </div>
          </div>
          <div class="flex w-full">
            <div class="w-1/6">Authority</div>
            <div class="flex-1">
              : <a target="_blank" :href="getSolExplorerUrl(user.authority)" class="hover:underline">{{ user.authority }} <Icon name="ic:round-open-in-new" class="inline-block text-xs ml-1" /></a>
            </div>
          </div>
          <div class="flex w-full">
            <div class="w-1/6">Name</div>
            <div class="flex-1">: {{ user.name }}</div>
          </div>
          <div class="flex w-full">
            <div class="w-1/6">Email</div>
            <div class="flex-1">: {{ user.email }}</div>
          </div>
        </div>
      </div>
    </Card>
  </div>
</template>
