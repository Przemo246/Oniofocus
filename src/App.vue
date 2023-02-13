<template>
  <main
    class="text-dark-gray bg-primary-orange font-manrope font-normal min-h-screen flex items-center justify-center"
  >
    <div className="bg-white w-3/4 max-w-5xl p-10 min-h-[60vh] text-base">
      <TimerFace />
    </div>
  </main>
</template>

<script setup lang="ts">
import TimerFace from './components/organisms/TimerFace.vue'
</script>
