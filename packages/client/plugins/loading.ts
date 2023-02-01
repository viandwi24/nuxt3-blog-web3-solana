export default defineNuxtPlugin((nuxtApp) => {
  const loading = {
    state: ref(false),
    show: () => {
      loading.state.value = true
    },
    hide: () => {
      loading.state.value = false
    }
  }

  return {
    provide: {
      loading
    }
  }
})
