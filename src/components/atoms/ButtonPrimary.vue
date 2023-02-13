<template>
  <button
    :class="`btn rounded bg-light-gray border-none transition-all hover:bg-light-gray-1 font-normal normal-case text-lg	${
      className ?? ''
    }`"
    @click="onClick()"
  >
    <slot></slot>
  </button>
</template>

<script lang="ts">
export default {
  name: 'ButtonPrimary',
  props: {
    className: String,
    onClick: {
      type: Function,
      required: true,
    },
  },
}
</script>
