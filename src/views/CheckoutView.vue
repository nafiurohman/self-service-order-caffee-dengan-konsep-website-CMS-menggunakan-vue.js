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
          <h1 class="text-3xl font-bold text-gray-800">Checkout</h1>
          <p class="text-gray-600">Lengkapi informasi pesanan Anda</p>
        </div>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Form Checkout -->
        <div class="space-y-6">
          <div class="glassmorphism rounded-xl p-6">
            <h3 class="text-lg font-semibold text-gray-800 mb-4">Informasi Pesanan</h3>
            
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Tipe Pesanan</label>
                <div class="grid grid-cols-2 gap-3">
                  <button
                    v-for="type in orderTypes"
                    :key="type.value"
                    @click="orderData.orderType = type.value"
                    :class="[
                      'p-3 border rounded-lg text-center transition-colors',
                      orderData.orderType === type.value
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-gray-300 hover:border-gray-400'
                    ]"
                  >
                    <div class="font-medium">{{ type.label }}</div>
                  </button>
                </div>
              </div>

              <div v-if="orderData.orderType === 'dine-in'">
                <label class="block text-sm font-medium text-gray-700 mb-2">Nomor Meja</label>
                <select
                  v-model="orderData.tableNumber"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                >
                  <option value="">Pilih Meja</option>
                  <option v-for="n in 50" :key="n" :value="n">Meja {{ n }}</option>
                </select>
              </div>

              <div v-else>
                <label class="block text-sm font-medium text-gray-700 mb-2">Nama untuk Pesanan</label>
                <input
                  v-model="orderData.customerName"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Masukkan nama Anda"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-2">Catatan Khusus (Opsional)</label>
                <textarea
                  v-model="orderData.specialNotes"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Contoh: Pesanan untuk ulang tahun, dll."
                ></textarea>
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
                  <div v-if="item.notes" class="text-xs text-gray-400">
                    {{ item.notes }}
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
            @click="proceedToPayment" 
            class="w-full px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            :disabled="!canProceed"
          >
            Lanjut ke Pembayaran
          </button>
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

const orderData = ref({
  orderType: 'dine-in',
  tableNumber: '',
  customerName: '',
  specialNotes: ''
})

const orderTypes = [
  {
    value: 'dine-in',
    label: 'Makan di Tempat'
  },
  {
    value: 'takeaway',
    label: 'Bawa Pulang'
  }
]

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const canProceed = computed(() => {
  if (orderData.value.orderType === 'dine-in') {
    return orderData.value.tableNumber !== ''
  } else {
    return orderData.value.customerName.trim() !== ''
  }
})

const proceedToPayment = () => {
  // Simpan data order ke localStorage atau store
  localStorage.setItem('currentOrder', JSON.stringify(orderData.value))
  router.push('/payment')
}
</script>