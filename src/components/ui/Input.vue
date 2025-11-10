<template>
  <div class="space-y-2">
    <label v-if="label" :for="id" class="block text-sm font-medium text-gray-700">
      {{ label }}
    </label>
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :required="required"
      :class="[
        'w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors',
        error ? 'border-red-500 focus:ring-red-500 focus:border-red-500' : ''
      ]"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
    <p v-if="helper" class="text-sm text-gray-500">{{ helper }}</p>
  </div>
</template>

<script setup>
defineProps({
  id: String,
  label: String,
  type: {
    type: String,
    default: 'text'
  },
  modelValue: [String, Number],
  placeholder: String,
  required: Boolean,
  error: String,
  helper: String
})

defineEmits(['update:modelValue'])
</script>