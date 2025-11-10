<template>
  <Card class="cursor-pointer group hover:scale-105 transition-all duration-500 overflow-hidden border border-gray-100 shadow-lg hover:shadow-2xl">
    <!-- Image Section -->
    <div class="h-48 overflow-hidden relative">
      <img 
        :src="item.image" 
        :alt="item.name"
        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        @error="handleImageError"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
      <div class="absolute top-3 left-3">
        <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-lg">
          {{ item.category }}
        </span>
      </div>
      <div class="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span class="px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full shadow-lg">
          Popular
        </span>
      </div>
    </div>
    
    <!-- Content Section dengan padding yang cukup -->
    <div class="p-6 space-y-4">
      <!-- Header -->
      <div class="space-y-2">
        <h3 class="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {{ item.name }}
        </h3>
        <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
          {{ item.desc }}
        </p>
      </div>

      <!-- Price & Action -->
      <div class="flex items-center justify-between pt-2 border-t border-gray-100">
        <div class="space-y-1">
          <span class="text-2xl font-bold text-blue-600">{{ formatCurrency(item.price) }}</span>
          <div class="flex items-center space-x-1">
            <svg class="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <span class="text-xs text-gray-500">4.8 • 120 reviews</span>
          </div>
        </div>
        <button
          @click.stop="openModal"
          class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
          </svg>
          <span>Pesan</span>
        </button>
      </div>
    </div>
  </Card>

  <!-- Modal Pesan -->
  <div v-if="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
    <div class="relative w-full max-w-md max-h-[90vh] overflow-y-auto glassmorphism rounded-3xl shadow-2xl animate-scale-in">
      <div class="p-8">
        <!-- Header -->
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-bold text-gray-800">{{ item.name }}</h2>
          <button
            @click="closeModal"
            class="p-2 text-gray-500 hover:text-gray-700 transition-colors rounded-xl hover:bg-gray-100"
            aria-label="Close modal"
          >
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div class="space-y-6">
          <!-- Image & Basic Info -->
          <div class="flex items-start space-x-4">
            <img 
              :src="item.image" 
              :alt="item.name"
              class="w-24 h-24 object-cover rounded-2xl shadow-lg"
              @error="handleImageError"
            >
            <div class="flex-1">
              <div class="flex items-center justify-between mb-2">
                <span class="text-3xl font-bold text-blue-600">{{ formatCurrency(item.price) }}</span>
                <span class="px-3 py-1 bg-blue-100 text-blue-600 text-sm font-semibold rounded-full">
                  {{ item.category }}
                </span>
              </div>
              <p class="text-gray-600 text-sm leading-relaxed">{{ item.desc }}</p>
            </div>
          </div>

          <!-- Quantity Controls -->
          <div class="space-y-3">
            <label class="block text-sm font-semibold text-gray-700">Kuantitas</label>
            <div class="flex items-center justify-between bg-gray-50 rounded-2xl p-4">
              <button
                @click="decrementQuantity"
                :disabled="quantity <= 1"
                class="w-12 h-12 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"/>
                </svg>
              </button>
              <span class="text-2xl font-bold text-gray-800 w-16 text-center">{{ quantity }}</span>
              <button
                @click="incrementQuantity"
                class="w-12 h-12 bg-white border border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 flex items-center justify-center shadow-lg"
              >
                <svg class="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Notes -->
          <div>
            <label class="block text-sm font-semibold text-gray-700 mb-2">
              Catatan Spesial <span class="text-gray-400 font-normal">(opsional)</span>
            </label>
            <textarea
              v-model="notes"
              rows="3"
              class="w-full px-4 py-3 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
              placeholder="Contoh: Tanpa gula, es sedikit, tambah whipped cream..."
            ></textarea>
          </div>

          <!-- Action Buttons -->
          <div class="flex space-x-4 pt-4 border-t border-gray-200">
            <button 
              @click="closeModal"
              class="flex-1 px-6 py-4 border-2 border-gray-300 text-gray-700 rounded-2xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 font-semibold"
            >
              Batal
            </button>
            <button 
              @click="addToCart"
              class="flex-1 px-6 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 font-semibold shadow-lg hover:shadow-xl"
            >
              Tambah ke Keranjang
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useCartStore } from '../stores/cart'
import Card from './ui/Card.vue'

const props = defineProps({
  item: {
    type: Object,
    required: true
  }
})

const cartStore = useCartStore()
const showModal = ref(false)
const quantity = ref(1)
const notes = ref('')

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
}

const openModal = () => {
  showModal.value = true
  quantity.value = 1
  notes.value = ''
}

const closeModal = () => {
  showModal.value = false
}

const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

const addToCart = () => {
  cartStore.addToCart(props.item, quantity.value, notes.value)
  closeModal()
  
  // Show success notification
  const notification = document.createElement('div')
  notification.className = 'fixed top-4 right-4 z-50 px-6 py-4 bg-green-500 text-white rounded-2xl shadow-2xl animate-slide-up'
  notification.innerHTML = `
    <div class="flex items-center space-x-3">
      <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
      </svg>
      <span class="font-semibold">${props.item.name} berhasil ditambahkan!</span>
    </div>
  `
  document.body.appendChild(notification)
  
  setTimeout(() => {
    notification.remove()
  }, 3000)
}
</script>

<style scoped>
.line-clamp-1 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
}

.line-clamp-2 {
  overflow: hidden;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
}

.min-h-\[2\.5rem\] {
  min-height: 2.5rem;
}
</style>