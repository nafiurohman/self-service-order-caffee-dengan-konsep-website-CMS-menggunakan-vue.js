<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
    <div class="container mx-auto px-4">
      <!-- Header -->
      <div class="flex items-center justify-between mb-8">
        <div>
          <button
            @click="$router.back()"
            class="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors mb-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Kembali</span>
          </button>
          <h1 class="text-3xl font-bold text-gray-800">Keranjang Belanja</h1>
          <p class="text-gray-600">Review pesanan Anda</p>
        </div>
        
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-600">{{ formatCurrency(cartStore.total) }}</div>
          <div class="text-sm text-gray-500">{{ cartStore.totalItems }} item</div>
        </div>
      </div>

      <!-- Cart Items -->
      <div v-if="cartStore.items.length > 0" class="space-y-4 mb-8">
        <div
          v-for="item in cartStore.items"
          :key="item.cartId"
          class="glassmorphism rounded-xl p-4 flex items-center justify-between"
        >
          <div class="flex items-center space-x-4 flex-1">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
              <span class="text-xs text-gray-500">Gambar</span>
            </div>
            
            <div class="flex-1">
              <h3 class="font-semibold text-gray-800">{{ item.name }}</h3>
              <p class="text-sm text-gray-600">{{ item.category }}</p>
              <p v-if="item.notes" class="text-xs text-gray-500">Catatan: {{ item.notes }}</p>
            </div>
          </div>

          <div class="flex items-center space-x-4">
            <!-- Quantity Controls -->
            <div class="flex items-center space-x-2">
              <button
                @click="updateQuantity(item.cartId, item.quantity - 1)"
                :disabled="item.quantity <= 1"
                class="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4" />
                </svg>
              </button>
              <span class="w-8 text-center font-semibold">{{ item.quantity }}</span>
              <button
                @click="updateQuantity(item.cartId, item.quantity + 1)"
                class="p-1 border border-gray-300 rounded hover:bg-gray-50"
              >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
                </svg>
              </button>
            </div>

            <div class="text-right min-w-24">
              <div class="font-semibold text-gray-800">{{ formatCurrency(item.price * item.quantity) }}</div>
              <div class="text-sm text-gray-500">{{ formatCurrency(item.price) }} × {{ item.quantity }}</div>
            </div>

            <button
              @click="removeItem(item.cartId)"
              class="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
              aria-label="Hapus item"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty Cart -->
      <div v-else class="text-center py-16">
        <div class="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
          <svg class="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
        </div>
        <h3 class="text-xl font-semibold text-gray-600 mb-2">Keranjang Kosong</h3>
        <p class="text-gray-500 mb-6">Silakan tambahkan beberapa item menu terlebih dahulu</p>
        <button 
          @click="$router.push('/')" 
          class="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
        >
          Lihat Menu
        </button>
      </div>

      <!-- Order Summary -->
      <div v-if="cartStore.items.length > 0" class="glassmorphism rounded-2xl p-6 max-w-md ml-auto">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pesanan</h3>
        
        <div class="space-y-2 mb-4">
          <div class="flex justify-between text-gray-600">
            <span>Subtotal</span>
            <span>{{ formatCurrency(cartStore.subtotal) }}</span>
          </div>
          <div class="flex justify-between text-gray-600">
            <span>Pajak (10%)</span>
            <span>{{ formatCurrency(cartStore.tax) }}</span>
          </div>
          <div class="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
            <span>Total</span>
            <span>{{ formatCurrency(cartStore.total) }}</span>
          </div>
        </div>

        <button 
          @click="$router.push('/checkout')" 
          class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          :disabled="cartStore.items.length === 0"
        >
          Lanjut ke Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../stores/cart'
import { useRouter } from 'vue-router'

const router = useRouter()
const cartStore = useCartStore()

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const updateQuantity = (cartId, newQuantity) => {
  if (newQuantity < 1) return
  cartStore.updateCartItem(cartId, { quantity: newQuantity })
}

const removeItem = (cartId) => {
  if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
    cartStore.removeFromCart(cartId)
  }
}
</script>