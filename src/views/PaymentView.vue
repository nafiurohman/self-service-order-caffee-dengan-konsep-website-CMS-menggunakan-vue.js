<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 py-8">
    <div class="container mx-auto px-4 max-w-4xl">
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
          <h1 class="text-3xl font-bold text-gray-800">Pembayaran</h1>
          <p class="text-gray-600">Pilih metode pembayaran</p>
        </div>
        
        <div class="text-right">
          <div class="text-2xl font-bold text-blue-600">{{ formatCurrency(cartStore.total) }}</div>
          <div class="text-sm text-gray-500">Total pembayaran</div>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Payment Methods -->
        <div class="space-y-6">
          <div class="glassmorphism rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Metode Pembayaran</h3>
            
            <div class="space-y-3">
              <button
                v-for="method in paymentMethods"
                :key="method.id"
                @click="selectedMethod = method.id"
                :class="[
                  'w-full p-4 border rounded-lg text-left transition-all',
                  selectedMethod === method.id
                    ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-200'
                    : 'border-gray-300 hover:border-gray-400'
                ]"
              >
                <div class="flex items-center space-x-3">
                  <div class="flex-1">
                    <div class="font-semibold text-gray-800">{{ method.name }}</div>
                    <div class="text-sm text-gray-500">{{ method.description }}</div>
                  </div>
                  <div
                    v-if="selectedMethod === method.id"
                    class="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center"
                  >
                    <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
              </button>
            </div>
          </div>

          <!-- Payment Details -->
          <div v-if="selectedMethod === 'card'" class="space-y-4">
            <div class="glassmorphism rounded-xl p-6">
              <h4 class="font-semibold text-gray-800 mb-4">Informasi Kartu</h4>
              <div class="space-y-3">
                <input
                  v-model="cardData.number"
                  type="text"
                  placeholder="Nomor Kartu"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div class="grid grid-cols-2 gap-3">
                  <input
                    v-model="cardData.expiry"
                    type="text"
                    placeholder="MM/YY"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    v-model="cardData.cvc"
                    type="text"
                    placeholder="CVC"
                    class="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <input
                  v-model="cardData.name"
                  type="text"
                  placeholder="Nama di Kartu"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Order Summary -->
        <div class="space-y-6">
          <div class="glassmorphism rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Ringkasan Pesanan</h3>
            
            <div class="space-y-3 mb-4">
              <div
                v-for="item in cartStore.items"
                :key="item.cartId"
                class="flex justify-between items-start"
              >
                <div>
                  <div class="font-medium text-gray-800">{{ item.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ item.quantity }} × {{ formatCurrency(item.price) }}
                  </div>
                </div>
                <div class="font-semibold text-gray-800">
                  {{ formatCurrency(item.price * item.quantity) }}
                </div>
              </div>
            </div>

            <div class="border-t pt-3 space-y-2">
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
          </div>

          <button 
            @click="processPayment" 
            class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!selectedMethod || (selectedMethod === 'card' && !isCardValid)"
          >
            Bayar Sekarang
          </button>

          <div class="text-center">
            <button
              @click="$router.push('/')"
              class="text-blue-600 hover:text-blue-700 font-medium"
            >
              Lanjutkan Belanja
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const selectedMethod = ref('')
const cardData = ref({
  number: '',
  expiry: '',
  cvc: '',
  name: ''
})

const paymentMethods = [
  {
    id: 'cash',
    name: 'Tunai',
    description: 'Bayar di kasir'
  },
  {
    id: 'qr',
    name: 'QRIS',
    description: 'Scan QR code'
  },
  {
    id: 'card',
    name: 'Kartu Kredit/Debit',
    description: 'Mastercard, Visa, dll.'
  }
]

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const isCardValid = computed(() => {
  return cardData.value.number.length >= 16 &&
         cardData.value.expiry.length === 5 &&
         cardData.value.cvc.length >= 3 &&
         cardData.value.name.trim() !== ''
})

const processPayment = async () => {
  // Simulasi proses pembayaran
  const orderId = 'ORD-' + Date.now().toString(36).toUpperCase().slice(-8)
  
  // Simpan data order
  const orderData = {
    id: orderId,
    items: cartStore.items,
    total: cartStore.total,
    paymentMethod: selectedMethod.value,
    timestamp: new Date().toISOString(),
    ...JSON.parse(localStorage.getItem('currentOrder') || '{}')
  }
  
  localStorage.setItem('currentOrder', JSON.stringify(orderData))
  
  // Simulasi delay pembayaran
  await new Promise(resolve => setTimeout(resolve, 2000))
  
  // Redirect ke halaman konfirmasi
  router.push('/confirmation')
}
</script>