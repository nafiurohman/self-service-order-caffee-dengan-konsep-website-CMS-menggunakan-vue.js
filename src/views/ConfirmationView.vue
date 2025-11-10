<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 py-8">
    <div class="container mx-auto px-4 max-w-2xl">
      <!-- Success Icon -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">Pembayaran Berhasil!</h1>
        <p class="text-gray-600">Pesanan Anda sedang diproses</p>
      </div>

      <!-- Order Summary -->
      <div class="glassmorphism rounded-2xl p-6 mb-6">
        <div class="text-center mb-6">
          <div class="text-sm text-gray-500 mb-1">Nomor Pesanan</div>
          <div class="text-2xl font-bold text-blue-600">{{ orderData.id }}</div>
        </div>

        <div class="space-y-4">
          <!-- Order Info -->
          <div class="grid grid-cols-2 gap-4 text-sm">
            <div>
              <div class="text-gray-500">Tanggal</div>
              <div class="font-semibold">{{ formatDate(orderData.timestamp) }}</div>
            </div>
            <div>
              <div class="text-gray-500">Metode Bayar</div>
              <div class="font-semibold capitalize">{{ orderData.paymentMethod }}</div>
            </div>
            <div v-if="orderData.orderType === 'dine-in'">
              <div class="text-gray-500">Meja</div>
              <div class="font-semibold">Meja {{ orderData.tableNumber }}</div>
            </div>
            <div v-else>
              <div class="text-gray-500">Tipe</div>
              <div class="font-semibold">Bawa Pulang</div>
            </div>
          </div>

          <!-- Items -->
          <div class="border-t pt-4">
            <h3 class="font-semibold text-gray-800 mb-3">Detail Pesanan</h3>
            <div class="space-y-3">
              <div
                v-for="item in orderData.items"
                :key="item.cartId"
                class="flex justify-between items-start"
              >
                <div class="flex-1">
                  <div class="font-medium text-gray-800">{{ item.name }}</div>
                  <div class="text-sm text-gray-500">
                    {{ item.quantity }} × {{ formatCurrency(item.price) }}
                  </div>
                  <div v-if="item.notes" class="text-xs text-gray-400">
                    {{ item.notes }}
                  </div>
                </div>
                <div class="font-semibold text-gray-800">
                  {{ formatCurrency(item.price * item.quantity) }}
                </div>
              </div>
            </div>
          </div>

          <!-- Total -->
          <div class="border-t pt-3 space-y-2">
            <div class="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>{{ formatCurrency(calculateSubtotal) }}</span>
            </div>
            <div class="flex justify-between text-gray-600">
              <span>Pajak (10%)</span>
              <span>{{ formatCurrency(calculateTax) }}</span>
            </div>
            <div class="flex justify-between text-lg font-bold text-gray-800 pt-2 border-t">
              <span>Total</span>
              <span>{{ formatCurrency(orderData.total) }}</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Special Notes -->
      <div v-if="orderData.specialNotes" class="glassmorphism rounded-2xl p-6 mb-6">
        <h3 class="font-semibold text-gray-800 mb-2">Catatan Khusus</h3>
        <p class="text-gray-600">{{ orderData.specialNotes }}</p>
      </div>

      <!-- Actions -->
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <button @click="printReceipt" class="flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
          </svg>
          Cetak Struk
        </button>
        <button @click="newOrder" class="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium flex items-center justify-center">
          <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
          Pesan Lagi
        </button>
      </div>

      <!-- Estimated Time -->
      <div class="text-center mt-8 p-4 bg-blue-50 rounded-lg">
        <div class="text-sm text-gray-600 mb-1">Perkiraan Waktu Penyajian</div>
        <div class="text-lg font-semibold text-blue-600">15-20 menit</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const orderData = ref({})

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (timestamp) => {
  return new Date(timestamp).toLocaleString('id-ID', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}

const calculateSubtotal = computed(() => {
  return orderData.value.items?.reduce((sum, item) => sum + (item.price * item.quantity), 0) || 0
})

const calculateTax = computed(() => {
  return calculateSubtotal.value * 0.1
})

const printReceipt = () => {
  window.print()
}

const newOrder = () => {
  cartStore.clearCart()
  localStorage.removeItem('currentOrder')
  router.push('/')
}

onMounted(() => {
  const savedOrder = localStorage.getItem('currentOrder')
  if (savedOrder) {
    orderData.value = JSON.parse(savedOrder)
  } else {
    router.push('/')
  }
})
</script>

<style scoped>
@media print {
  .no-print {
    display: none !important;
  }
  
  body {
    background: white !important;
  }
}
</style>