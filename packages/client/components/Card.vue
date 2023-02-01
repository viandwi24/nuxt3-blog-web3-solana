<template>
  <div class="border-2 border-white/10 rounded-lg flex flex-col">
    <div v-if="$slots.header" class="px-6 py-4 border-b-2 border-white/10">
      <slot name="header" />
    </div>
    <div class="flex-1 px-6 py-4">
      <slot />
    </div>
  </div>
</template>
