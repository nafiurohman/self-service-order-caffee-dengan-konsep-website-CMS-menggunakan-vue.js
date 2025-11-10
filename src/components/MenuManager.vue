<template>
  <div class="space-y-8 animate-fade-in">
    <!-- Header Section -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
      <div>
        <h2 class="text-4xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3">
          Menu Management
        </h2>
        <p class="text-gray-600 text-lg">Kelola menu café dengan antarmuka yang intuitif</p>
      </div>
      
      <div class="flex flex-col sm:flex-row gap-4">
        <!-- Data Management Buttons -->
        <Button @click="exportData" variant="outline" size="lg">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
            </svg>
          </template>
          Export Data
        </Button>
        
        <Button @click="showAddModal = true" variant="primary" size="lg">
          <template #icon>
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
            </svg>
          </template>
          Tambah Menu Baru
        </Button>
      </div>
    </div>

    <!-- Statistics Cards -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
      <Card class="p-6 bg-gradient-to-r from-blue-500 to-blue-600 text-white transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-blue-100 text-sm font-medium">Total Menu</p>
            <p class="text-3xl font-bold mt-2">{{ menuStore.menuItems.length }}</p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
        </div>
      </Card>

      <Card class="p-6 bg-gradient-to-r from-purple-500 to-purple-600 text-white transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-purple-100 text-sm font-medium">Kategori</p>
            <p class="text-3xl font-bold mt-2">{{ menuStore.categories.length }}</p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"/>
            </svg>
          </div>
        </div>
      </Card>

      <Card class="p-6 bg-gradient-to-r from-green-500 to-green-600 text-white transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-green-100 text-sm font-medium">Menu Aktif</p>
            <p class="text-3xl font-bold mt-2">{{ menuStore.menuItems.length }}</p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
        </div>
      </Card>

      <Card class="p-6 bg-gradient-to-r from-orange-500 to-orange-600 text-white transform hover:scale-105 transition-all duration-300">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-orange-100 text-sm font-medium">Total Nilai</p>
            <p class="text-2xl font-bold mt-2">{{ formatCurrency(totalValue) }}</p>
          </div>
          <div class="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"/>
            </svg>
          </div>
        </div>
      </Card>
    </div>

    <!-- Categories Filter -->
    <div class="flex flex-wrap gap-3">
      <button
        v-for="category in menuStore.categories"
        :key="category"
        @click="setActiveCategory(category)"
        :class="[
          'px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 border-2',
          activeCategory === category
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-2xl'
            : 'bg-white text-gray-700 border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-200'
        ]"
      >
        {{ category }}
      </button>
      <button
        @click="setActiveCategory('all')"
        :class="[
          'px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 border-2',
          activeCategory === 'all'
            ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-2xl'
            : 'bg-white text-gray-700 border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-200'
        ]"
      >
        Semua Kategori
      </button>
    </div>

    <!-- Menu Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      <Card
        v-for="item in filteredMenu"
        :key="item.id"
        class="group relative overflow-hidden transform hover:scale-105 transition-all duration-500 border border-gray-100 shadow-lg hover:shadow-2xl"
      >
        <!-- Action Buttons -->
        <div class="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10">
          <button
            @click="editItem(item)"
            class="p-3 bg-blue-500 text-white rounded-xl hover:bg-blue-600 transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm"
            aria-label="Edit menu"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"/>
            </svg>
          </button>
          <button
            @click="deleteItem(item)"
            class="p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-all duration-300 transform hover:scale-110 shadow-lg backdrop-blur-sm"
            aria-label="Delete menu"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
            </svg>
          </button>
        </div>

        <!-- Image -->
        <div class="h-48 overflow-hidden relative">
          <img 
            :src="item.image" 
            :alt="item.name"
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            @error="handleImageError"
          >
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          <div class="absolute top-3 left-3">
            <span class="px-3 py-1 bg-white/90 backdrop-blur-sm text-xs font-semibold text-gray-700 rounded-full shadow-lg">
              {{ item.category }}
            </span>
          </div>
        </div>

        <!-- Content -->
        <div class="p-6 space-y-4">
          <div class="space-y-2">
            <h3 class="font-bold text-xl text-gray-800 line-clamp-1 group-hover:text-blue-600 transition-colors">
              {{ item.name }}
            </h3>
            <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 min-h-[2.5rem]">
              {{ item.desc }}
            </p>
          </div>

          <div class="flex justify-between items-center pt-3 border-t border-gray-100">
            <span class="text-2xl font-bold text-blue-600">{{ formatCurrency(item.price) }}</span>
            <span class="text-xs text-gray-500">{{ formatDate(item.createdAt) }}</span>
          </div>
        </div>
      </Card>
    </div>

    <!-- Empty State -->
    <div v-if="filteredMenu.length === 0" class="text-center py-16">
      <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl">
        <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
        </svg>
      </div>
      <h3 class="text-3xl font-bold text-gray-600 mb-4">Belum Ada Menu</h3>
      <p class="text-gray-500 text-lg mb-8 max-w-md mx-auto">
        Mulai dengan menambahkan menu pertama Anda untuk memulai penjualan.
      </p>
      <Button @click="showAddModal = true" variant="primary" size="lg">
        <template #icon>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"/>
          </svg>
        </template>
        Tambah Menu Pertama
      </Button>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fade-in">
      <div class="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto glassmorphism rounded-3xl shadow-2xl animate-scale-in">
        <div class="p-8">
          <!-- Header -->
          <div class="flex items-center justify-between mb-8 pb-6 border-b border-gray-200">
            <div>
              <h2 class="text-3xl font-bold text-gray-800">
                {{ editingItem ? 'Edit Menu' : 'Tambah Menu Baru' }}
              </h2>
              <p class="text-gray-600 mt-2">
                {{ editingItem ? 'Perbarui informasi menu' : 'Isi form berikut untuk menambah menu baru' }}
              </p>
            </div>
            <button
              @click="closeModal"
              class="p-3 text-gray-500 hover:text-gray-700 transition-colors rounded-2xl hover:bg-gray-100"
              aria-label="Close modal"
            >
              <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>

          <form @submit.prevent="saveItem" class="space-y-8">
            <!-- Image URL Input -->
            <div>
              <label class="block text-lg font-semibold text-gray-700 mb-4">Gambar Menu</label>
              <div class="space-y-4">
                <div class="relative">
                  <input
                    v-model="form.image"
                    type="url"
                    class="w-full px-4 py-4 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="https://images.unsplash.com/photo-..."
                    required
                  >
                  <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                    </svg>
                  </div>
                </div>
                
                <!-- Image Preview -->
                <div v-if="form.image" class="flex items-start space-x-6 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                  <img 
                    :src="form.image" 
                    alt="Preview" 
                    class="w-32 h-32 object-cover rounded-2xl shadow-lg"
                    @error="handleFormImageError"
                  >
                  <div class="flex-1">
                    <p class="text-sm text-gray-600 mb-3">Preview gambar akan ditampilkan di sini</p>
                    <button
                      type="button"
                      @click="form.image = ''"
                      class="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm font-medium"
                    >
                      Hapus Gambar
                    </button>
                  </div>
                </div>
                
                <div class="text-sm text-gray-500 bg-blue-50 p-4 rounded-2xl border border-blue-200">
                  <p class="font-medium text-blue-800 mb-2">Tips untuk gambar:</p>
                  <ul class="space-y-1 text-blue-700">
                    <li>• Gunakan URL gambar dari Unsplash, Pexels, atau sumber terpercaya</li>
                    <li>• Pastikan gambar berformat JPG, PNG, atau WebP</li>
                    <li>• Ukuran gambar disarankan 400x300 pixel untuk hasil terbaik</li>
                    <li>• Pastikan URL dapat diakses secara publik</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Form Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <!-- Name -->
              <div>
                <label class="block text-lg font-semibold text-gray-700 mb-3">Nama Menu</label>
                <input
                  v-model="form.name"
                  type="text"
                  class="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  placeholder="Contoh: Espresso Double Shot"
                  required
                >
              </div>

              <!-- Category -->
              <div>
                <label class="block text-lg font-semibold text-gray-700 mb-3">Kategori</label>
                <select
                  v-model="form.category"
                  class="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                  required
                >
                  <option value="">Pilih Kategori</option>
                  <option value="Coffee">Coffee</option>
                  <option value="Tea">Tea</option>
                  <option value="Cold">Cold Beverages</option>
                  <option value="Food">Food</option>
                  <option value="Snack">Snack</option>
                  <option value="Dessert">Dessert</option>
                </select>
              </div>

              <!-- Price -->
              <div>
                <label class="block text-lg font-semibold text-gray-700 mb-3">Harga (IDR)</label>
                <div class="relative">
                  <span class="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 font-medium">Rp</span>
                  <input
                    v-model="form.price"
                    type="number"
                    class="w-full px-4 py-4 pl-12 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm"
                    placeholder="25000"
                    min="0"
                    required
                  >
                </div>
              </div>

              <!-- Description -->
              <div class="lg:col-span-2">
                <label class="block text-lg font-semibold text-gray-700 mb-3">Deskripsi Menu</label>
                <textarea
                  v-model="form.desc"
                  rows="4"
                  class="w-full px-4 py-4 border border-gray-300 rounded-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50 focus:border-blue-500 transition-all duration-300 bg-white/50 backdrop-blur-sm resize-none"
                  placeholder="Jelaskan tentang menu ini, bahan-bahan, dan keunikan..."
                  required
                ></textarea>
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-4 pt-8 border-t border-gray-200">
              <Button type="button" variant="outline" @click="closeModal" fullWidth size="lg">
                Batal
              </Button>
              <Button type="submit" variant="primary" fullWidth size="lg" :disabled="!isFormValid">
                <template #icon>
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
                  </svg>
                </template>
                {{ editingItem ? 'Update Menu' : 'Simpan Menu' }}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Success Notification -->
    <div v-if="showSuccess" class="fixed top-4 right-4 z-50 animate-slide-up">
      <div class="px-6 py-4 bg-green-500 text-white rounded-2xl shadow-2xl flex items-center space-x-3">
        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
        </svg>
        <span class="font-semibold">{{ successMessage }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useMenuStore } from '../stores/menu'
import Button from './ui/Button.vue'
import Card from './ui/Card.vue'

const menuStore = useMenuStore()

const showAddModal = ref(false)
const showEditModal = ref(false)
const showSuccess = ref(false)
const successMessage = ref('')
const editingItem = ref(null)
const activeCategory = ref('all')

const form = reactive({
  name: '',
  category: '',
  price: '',
  desc: '',
  image: ''
})

// Computed properties
const filteredMenu = computed(() => {
  if (activeCategory.value === 'all') {
    return menuStore.menuItems
  }
  return menuStore.menuItems.filter(item => item.category === activeCategory.value)
})

const totalValue = computed(() => {
  return menuStore.menuItems.reduce((total, item) => total + item.price, 0)
})

const isFormValid = computed(() => {
  return form.name && form.category && form.price && form.desc && form.image
})

// Methods
const formatCurrency = (amount) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('id-ID', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const handleImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
}

const handleFormImageError = (event) => {
  event.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
  form.image = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&h=300&fit=crop'
}

const setActiveCategory = (category) => {
  activeCategory.value = category
}

const showNotification = (message) => {
  successMessage.value = message
  showSuccess.value = true
  setTimeout(() => {
    showSuccess.value = false
  }, 3000)
}

const editItem = (item) => {
  editingItem.value = item
  Object.assign(form, {
    name: item.name,
    category: item.category,
    price: item.price,
    desc: item.desc,
    image: item.image
  })
  showEditModal.value = true
}

const deleteItem = (item) => {
  if (confirm(`Apakah Anda yakin ingin menghapus "${item.name}"? Tindakan ini tidak dapat dibatalkan.`)) {
    const success = menuStore.deleteMenuItem(item.id)
    if (success) {
      showNotification(`Menu "${item.name}" berhasil dihapus`)
    }
  }
}

const saveItem = () => {
  if (editingItem.value) {
    const success = menuStore.updateMenuItem(editingItem.value.id, {
      ...form,
      price: parseInt(form.price)
    })
    if (success) {
      showNotification(`Menu "${form.name}" berhasil diperbarui`)
      closeModal()
    }
  } else {
    const newItem = menuStore.addMenuItem({
      ...form,
      price: parseInt(form.price)
    })
    showNotification(`Menu "${newItem.name}" berhasil ditambahkan`)
    closeModal()
  }
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingItem.value = null
  Object.assign(form, {
    name: '',
    category: '',
    price: '',
    desc: '',
    image: ''
  })
}

const exportData = () => {
  const data = menuStore.exportMenuData()
  const blob = new Blob([data], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = 'cafe-menu-data.json'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
  showNotification('Data berhasil diexport')
}

const importData = () => {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.json'
  input.onchange = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        const success = menuStore.importMenuData(e.target.result)
        if (success) {
          showNotification('Data berhasil diimport')
        } else {
          alert('Error: File tidak valid')
        }
      }
      reader.readAsText(file)
    }
  }
  input.click()
}

// Initialize
onMounted(() => {
  menuStore.loadMenu()
})
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