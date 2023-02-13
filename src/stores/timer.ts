import { defineStore } from 'pinia'

type TimerTypes = 'mainTimer' | 'shortBreak' | 'longBreak'

type TimerState = {
  minutes: number
  seconds: number
  timerId: number | null
  running: boolean
  timerType: TimerTypes
}

export const useTimerStore = defineStore('timer', {
  state: (): TimerState => ({
    minutes: 25,
    seconds: 0,
    timerId: null,
    running: false,
    timerType: 'mainTimer',
  }),
  actions: {
    startTimer() {
      const id = setInterval(() => {
        this.running = true

        if (this.minutes === 0 && this.seconds === 0) {
          this.switchTimerType()
          return
        }

        if (this.minutes >= 0 && this.seconds === 0) {
          this.seconds = 60
          this.minutes -= 1
        }
        if (this.minutes >= 0) this.seconds -= 1
      }, 1000)

      this.timerId = id
    },
    stopTimer() {
      if (this.timerId) clearInterval(this.timerId)
      this.running = false
    },
    mainTimer() {
      this.minutes = 25
      this.seconds = 0
    },
    shortBreak() {
      this.minutes = 5
      this.seconds = 0
    },
    longBreak() {
      this.minutes = 15
      this.seconds = 0
    },
    switchTimerType() {
      let timerType: TimerTypes = 'mainTimer'

      if (this.timerType === 'mainTimer') {
        timerType = 'shortBreak'
      }

      if (this.timerType === 'shortBreak') {
        timerType = 'longBreak'
      }
      this.stopTimer()
      this[timerType]()
      this.startTimer()
    },
  },
})
