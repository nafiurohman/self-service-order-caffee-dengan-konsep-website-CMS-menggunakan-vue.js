<template>
  <div
    :class="[
      'rounded-2xl transition-all duration-500 hover:scale-105',
      glassmorphism ? 'glassmorphism shadow-2xl' : 'bg-white shadow-xl',
      paddingClasses,
      hoverAnimation ? 'hover:shadow-2xl hover:translate-y-2' : ''
    ]"
  >
    <slot></slot>
  </div>
</template>

<script setup>
defineProps({
  glassmorphism: {
    type: Boolean,
    default: false
  },
  padding: {
    type: String,
    default: 'md',
    validator: (value) => ['none', 'sm', 'md', 'lg', 'xl'].includes(value)
  },
  hoverAnimation: {
    type: Boolean,
    default: true
  }
})

const paddingClasses = {
  none: 'p-0',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
  xl: 'p-10'
}
</script>