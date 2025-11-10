<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
    @click.self="$emit('close')"
  >
    <div
      class="relative w-full max-w-md max-h-[90vh] overflow-y-auto glassmorphism rounded-2xl shadow-2xl animate-slide-up"
    >
      <div class="p-6">
        <div class="flex items-center justify-between mb-4">
          <h2 class="text-xl font-semibold text-gray-800">
            <slot name="title"></slot>
          </h2>
          <button
            @click="$emit('close')"
            class="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-full hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})

defineEmits(['close'])
</script>