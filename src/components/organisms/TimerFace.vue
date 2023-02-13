<template>
  <NavigationPrimary />
  <div className="grid grid-rows-[repeat(3,_1fr)] place-items-center">
    <div>
      <ButtonPrimary :onClick="store.mainTimer">Main timer</ButtonPrimary>
      <ButtonPrimary :onClick="store.shortBreak" className="mx-4">Short break</ButtonPrimary>
      <ButtonPrimary :onClick="store.longBreak">Long break</ButtonPrimary>
    </div>
    <div className="text-9xl transition-all w-full grid grid-cols-[1fr,_auto,_1fr] countdown">
      <span :style="{ '--value': store.minutes }" class="justify-self-end"></span>:<span
        :style="{ '--value': store.seconds }"
      ></span>
    </div>
    <div>
      <ButtonPrimary
        class="shadow-box-shadow w-48"
        :onClick="store.running ? handleStopTimer : handleStartTimer"
        >{{ store.running ? 'STOP' : 'START' }}</ButtonPrimary
      >
      <div className="text-center mt-5">
        {{ store.timerType === 'mainTimer' ? 'Time to work! 👨‍💻' : 'Time for break! ☕' }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import NavigationPrimary from '@/components/molecules/NavigationPrimary.vue'
import ButtonPrimary from '@/components/atoms/ButtonPrimary.vue'
import { defineComponent } from 'vue'
import { useTimerStore } from '@/stores/timer'

const formatTime = (time: number) => time.toString().padStart(2, '0')

export default defineComponent({
  name: 'TimeFace',
  components: {
    NavigationPrimary,
    ButtonPrimary,
  },
  methods: {
    formatTime,
  },
  setup() {
    const store = useTimerStore()

    const handleStartTimer = () => store.startTimer()
    const handleStopTimer = () => store.stopTimer()

    return { store, handleStartTimer, handleStopTimer }
  },
})
</script>
