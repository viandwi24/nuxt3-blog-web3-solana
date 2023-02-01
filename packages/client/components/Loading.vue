<template>
  <Teleport to="body">
    <div v-if="$loading.state.value" class="z-50 fixed top-0 left-0 bg-black/75 w-screen h-screen flex flex-col justify-center items-center">
      <div class="h-24 w-24 bg-slate-800 text-white rounded-lg flex flex-col relative justify-center items-center">
        <Icon name="line-md:loading-twotone-loop" class="text-4xl mb-2" />
        <div class="text-xs font-semibold">Loading</div>
      </div>
    </div>
  </Teleport>
</template>
