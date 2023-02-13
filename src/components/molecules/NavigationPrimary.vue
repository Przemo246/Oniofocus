<template>
  <nav className="flex items-center justify-around border-b border-light-gray pb-4">
    <div className="text-2xl flex items-center">
      <img src="@/assets/icons/onion.svg" alt="" className="w-12 h-12 rotate-[-20deg]" />niofocus
    </div>
    <ButtonPrimary :onClick="handleClick" class="flex items-center justify-center"
      ><img
        src="@/assets/icons/cog.svg"
        alt=""
        className="w-4 h-4 mr-1 transition-transform duration-500"
      />Settings</ButtonPrimary
    >
  </nav>
</template>

<script lang="ts">
import ButtonPrimary from '@/components/atoms/ButtonPrimary.vue'

export default {
  name: 'NavigationPrimary',
  components: {
    ButtonPrimary,
  },
  methods: {
    handleClick() {
      console.log('Hello')
    },
  },
}
</script>

<style scoped>
button:hover img {
  transform: rotate(180deg);
}
</style>
