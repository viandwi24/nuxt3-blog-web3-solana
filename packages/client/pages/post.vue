<script lang="ts" setup>
import { PublicKey } from '@solana/web3.js';

const $router = useRouter()
const $auth = useAuth()
const { program, BLOG_ADDRESS } = useContract()
const { isLogged, isConnected } = useAuth()
const $loading = useLoading()

// handle auth
const checkIsConnected = () => {
  if (!$auth.isConnected.value || !$auth.check()) {
    $router.push("/")
  }
}
checkIsConnected()
watch($auth.isConnected, (val) => {
  checkIsConnected()
})

// handle post
const postModel = reactive({
  title: '',
  content: '',
})
const createPost = async () => {
  $loading.show()
  const wal = $auth.wallet.value ? ($auth?.wallet?.value).toBuffer() : Buffer.from("")
  const blogAccount = await program.value.account.blogAccount.fetch(BLOG_ADDRESS)
  const postLastId = blogAccount.lastPostId
  const postAddress = getPdaPostAccount((new PublicKey($auth.user.value?.address || '').toBuffer()), postLastId.toString())

  try {
    const tx = await program.value.methods
      .createPost(
        postModel.title,
        postModel.content,
        postLastId.toString(),
      )
      .accounts({
        postAccount: postAddress,
        blogAccount: BLOG_ADDRESS,
        userAccount: $auth.user.value?.address
      })
      .rpc()
    await new Promise((resolve) => setTimeout(resolve, 5000))
    await $router.push("/")
  } catch (error) {
    console.log(error)
  }
  $loading.hide()
}
</script>

<template>
  <Card>
    <template #header>
      <div class="font-bold text-xl">Create New Post</div>
    </template>
    <div class="flex flex-col space-y-4">
      <div class="flex space-x-2">
        <div class="flex w-full">
          <div class="w-1/5 mt-2">Post Title</div>
          <div class="flex-1">
            <input type="text" class="w-full border-2 border-white/10 rounded-lg px-4 py-2 bg-transparent text-white read-only:bg-slate-800" placeholder="Post Title" v-model="postModel.title" />
          </div>
        </div>
      </div>
      <div class="flex space-x-2">
        <div class="flex w-full">
          <div class="w-1/5 mt-2">Post Content</div>
          <div class="flex-1 flex flex-col space-y-2">
            <textarea
              class="w-full border-2 border-white/10 rounded-lg px-4 py-2 bg-transparent text-white read-only:bg-slate-800"
              placeholder="Post Title"
              v-model="postModel.content"
              :maxlength="2048"
            />
            <div class="font-thin text-sm">* {{ postModel.content.length }} / 2048 characters</div>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-end">
        <button v-if="$auth.isConnected.value && $auth.isLogged.value" class="bg-primary-500 rounded-lg px-4 py-2 text-white font-bold" @click="createPost">
          Create Post
        </button>
      </div>
    </div>
  </Card>
</template>
