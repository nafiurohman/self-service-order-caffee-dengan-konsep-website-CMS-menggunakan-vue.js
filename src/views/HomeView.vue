<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
    <!-- Header Premium -->
    <header class="glassmorphism sticky top-0 z-40 backdrop-blur-lg border-b border-white/20 shadow-sm">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="flex items-center space-x-4">
            <img src="/src/assets/logo.png" class="w-12 h-auto" alt="logo caffe">
            <div>
              <h1 class="text-2xl font-bold text-gray-800">BEZN Café Premium</h1>
              <p class="text-gray-600 text-sm">Experience the finest coffee</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-4">
            <!-- Admin Controls -->
            <div v-if="authStore.isLoggedIn" class="flex items-center space-x-3">
              <button
                @click="showMenuManager = !showMenuManager"
                :class="[
                  'px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105',
                  showMenuManager 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg'
                    : 'bg-white text-gray-700 border border-gray-300 hover:border-green-500 shadow-lg hover:shadow-xl'
                ]"
              >
                <div class="flex items-center space-x-2">
                  <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
                  </svg>
                  <span>{{ showMenuManager ? 'Tutup Manager' : 'Kelola Menu' }}</span>
                </div>
              </button>
              
              <button
                @click="authStore.logout()"
                class="px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl font-semibold hover:from-red-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
                <span>Logout</span>
              </button>
            </div>

            <!-- Login Button -->
            <button
              v-else
              @click="$router.push('/login')"
              class="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              <span>Admin Login</span>
            </button>
            
            <!-- Cart Button -->
            <button
              @click="$router.push('/cart')"
              class="relative p-4 text-gray-600 hover:text-blue-600 transition-colors bg-white rounded-2xl shadow-lg hover:shadow-xl group"
            >
              <svg class="w-6 h-6 group-hover:scale-110 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
              </svg>
              <span
                v-if="cartStore.totalItems > 0"
                class="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold shadow-lg animate-pulse"
              >
                {{ cartStore.totalItems }}
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>

    <!-- Main Content -->
    <main class="container mx-auto px-6 py-12">
      <!-- Menu Manager atau Menu List -->
      <div v-if="showMenuManager && authStore.isLoggedIn">
        <MenuManager />
      </div>
      <div v-else>
        <!-- Hero Section -->
        <div class="text-center mb-16">
          <h2 class="text-6xl font-bold text-gray-800 mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent leading-tight">
            Discover Our<br>Exquisite Menu
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Indulge in our carefully crafted selection of premium beverages and delightful snacks, 
            made with the finest ingredients for an unforgettable experience
          </p>
        </div>

        <!-- Kategori Filter -->
        <div class="flex flex-wrap justify-center gap-4 mb-16">
          <button
            v-for="category in menuStore.categories"
            :key="category"
            @click="setActiveCategory(category)"
            :class="[
              'px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 border-2',
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
              'px-8 py-4 rounded-2xl font-semibold transition-all duration-500 transform hover:scale-105 border-2',
              activeCategory === 'all'
                ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white border-transparent shadow-2xl'
                : 'bg-white text-gray-700 border-gray-200 shadow-lg hover:shadow-2xl hover:border-blue-200'
            ]"
          >
            Semua Menu
          </button>
        </div>

        <!-- Menu Grid dengan spacing yang lebih longgar -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <MenuCard
            v-for="item in filteredMenu"
            :key="item.id"
            :item="item"
            class="animate-fade-in"
          />
        </div>

        <!-- Empty State -->
        <div v-if="filteredMenu.length === 0" class="text-center py-20">
          <div class="w-32 h-32 mx-auto mb-6 bg-gradient-to-r from-blue-100 to-purple-100 rounded-3xl flex items-center justify-center shadow-2xl">
            <svg class="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
            </svg>
          </div>
          <h3 class="text-3xl font-bold text-gray-600 mb-4">Menu Tidak Ditemukan</h3>
          <p class="text-gray-500 text-lg mb-8 max-w-md mx-auto">
            Tidak ada menu yang tersedia untuk kategori ini. Coba kategori lain atau lihat semua menu.
          </p>
          <button
            @click="setActiveCategory('all')"
            class="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Lihat Semua Menu
          </button>
        </div>
      </div>
    </main>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-200 mt-20">
      <div class="container mx-auto px-6 py-8">
        <div class="text-center text-gray-600">
          <p>&copy; 2024 BEZN Café Premium. All rights reserved.</p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useMenuStore } from '../stores/menu'
import { useCartStore } from '../stores/cart'
import { useAuthStore } from '../stores/auth'
import MenuCard from '../components/MenuCard.vue'
import MenuManager from '../components/MenuManager.vue'

const menuStore = useMenuStore()
const cartStore = useCartStore()
const authStore = useAuthStore()
const showMenuManager = ref(false)
const activeCategory = ref('all')

const filteredMenu = computed(() => {
  if (activeCategory.value === 'all') {
    return menuStore.menuItems
  }
  return menuStore.menuItems.filter(item => item.category === activeCategory.value)
})

const setActiveCategory = (category) => {
  activeCategory.value = category
  // Scroll to menu section
  const menuSection = document.querySelector('.grid')
  if (menuSection) {
    menuSection.scrollIntoView({ behavior: 'smooth' })
  }
}

onMounted(() => {
  menuStore.loadMenu()
  authStore.checkAuth()
})
</script>