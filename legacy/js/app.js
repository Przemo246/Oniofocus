'use strict'

const DOM = {
  body: document.querySelector('body'),
  settingsBtn: document.querySelector('#btn-settings'),
  startStopBtn: document.querySelector('.timer-start__btn'),
  clickSound: document.querySelector('#click'),
  alarmSound: document.querySelector('#alarm'),
  overlay: document.querySelector('.overlay'),
  timeleftMinutes: document.querySelector('.timer__timeleft--minutes'),
  timeleftSeconds: document.querySelector('.timer__timeleft--seconds'),
  settings: document.querySelector('.settings'),
  closeBtn: document.querySelector('#btn-close'),
  mainTimerBtn: document.querySelector('#btn-main'),
  shortTimerBtn: document.querySelector('#btn-short'),
  longTimerBtn: document.querySelector('#btn-long'),
  okBtn: document.querySelector('#btn-ok'),
  timerStatus: document.querySelector('.timer-start__status'),
  timerMainInput: document.querySelector('#timer-main'),
  timerShortInput: document.querySelector('#timer-short'),
  timerLongInput: document.querySelector('#timer-long'),
}

const timerBackgroundColors = {
  main: '#f7b239',
  short: '#0C8346',
  long: '#2364AA',
}

const highlightActiveTimerBtn = timer => {
  document
    .querySelectorAll('#btn-main,#btn-short,#btn-long')
    .forEach(btn => (btn.style.backgroundColor = '#f1f1f1'))
  DOM[`${timer}TimerBtn`].style.backgroundColor = '#E5E5E5'
}

let isTimerOn = false
let currentTimer = 'main'
highlightActiveTimerBtn(currentTimer)
let settings = JSON.parse(localStorage.getItem('userSettings')) || {
  main: 25,
  short: 5,
  long: 15,
}

const renderTimeOnUI = (min, sec = 0) => {
  const minutes = (min + '').length < 2 ? '0' + min : min
  const seconds = (sec + '').length < 2 ? '0' + sec : sec
  DOM.timeleftMinutes.textContent = minutes
  DOM.timeleftSeconds.textContent = seconds
  document.title = `${minutes}:${seconds} - Oniofocus Online Timer`
}

let timerId = null
renderTimeOnUI(settings.main)

const openSettingsPopup = () => {
  DOM.overlay.classList.add('display--block')
  DOM.settings.classList.add('settings--active')
}

const closeSettingsPopup = () => {
  DOM.overlay.classList.remove('display--block')
  DOM.settings.classList.remove('settings--active')
}

DOM.settingsBtn.addEventListener('click', () => {
  openSettingsPopup()
  DOM.timerMainInput.value = settings.main
  DOM.timerShortInput.value = settings.short
  DOM.timerLongInput.value = settings.long
})
DOM.closeBtn.addEventListener('click', closeSettingsPopup)
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeSettingsPopup()
  }
})

DOM.overlay.addEventListener('click', closeSettingsPopup)

const timerState = {
  minutes: settings.main - 1,
  seconds: 60,
}

const timerHandler = () => {
  const id = setInterval(() => {
    timerState.seconds -= 1
    renderTimeOnUI(timerState.minutes, timerState.seconds)
    if (timerState.minutes === 0 && timerState.seconds === 0) {
      clearInterval(id)
      DOM.alarmSound.play()
      startStopButtonHandler()
      DOM.startStopBtn
      timerState.seconds = 60
      if (currentTimer === 'main') {
        switchTimer('short')
        return
      }
      if (currentTimer === 'short') {
        switchTimer('long')
        return
      }
      switchTimer('main')
      return
    }
    if (timerState.seconds === 0) {
      timerState.minutes -= 1
      timerState.seconds = 60
    }
  }, 1000)
  return id
}

const startStopButtonHandler = () => {
  DOM.startStopBtn.classList.toggle('timer-start__btn--active')
  DOM.startStopBtn.textContent = `${isTimerOn ? 'START' : 'STOP'}`
  isTimerOn = isTimerOn ? false : true
  DOM.clickSound.play()
  if (isTimerOn) {
    timerId = timerHandler()
    return
  }
  clearInterval(timerId)
}

DOM.startStopBtn.addEventListener('click', startStopButtonHandler)

const switchTimer = type => {
  isTimerOn = false
  DOM.startStopBtn.classList.remove('timer-start__btn--active')
  DOM.startStopBtn.textContent = 'START'
  DOM.body.style.backgroundColor = timerBackgroundColors[type]
  DOM.timerStatus.textContent = type === 'main' ? 'Time to work! 👨‍💻' : 'Time for break! ☕'
  renderTimeOnUI(settings[type])
  if (timerId) {
    clearInterval(timerId)
  }
  timerState.minutes = settings[type] - 1
  timerState.seconds = 60
  currentTimer = type
  highlightActiveTimerBtn(currentTimer)
}

DOM.mainTimerBtn.addEventListener('click', () => switchTimer('main'))
DOM.shortTimerBtn.addEventListener('click', () => switchTimer('short'))
DOM.longTimerBtn.addEventListener('click', () => switchTimer('long'))

DOM.okBtn.addEventListener('click', () => {
  const main = +DOM.timerMainInput.value
  const short = +DOM.timerShortInput.value
  const long = +DOM.timerLongInput.value
  if (!main || main < 1 || !short || short < 1 || !long || long < 1) {
    return
  }
  const userSettings = {
    main,
    short,
    long,
  }
  localStorage.setItem('userSettings', JSON.stringify(userSettings))
  settings = userSettings
  timerState.minutes = settings[currentTimer] - 1
  if (timerState.seconds === 60 || timerState.seconds === 0) {
    renderTimeOnUI(settings[currentTimer])
  } else {
    renderTimeOnUI(settings[currentTimer] - 1, timerState.seconds)
  }
  closeSettingsPopup()
})
