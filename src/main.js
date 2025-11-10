import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
import App from './App.vue'
import './index.css'

// Import stores
import { useAuthStore } from './stores/auth'

// Import views
import LoginView from './views/LoginView.vue'
import HomeView from './views/HomeView.vue'
import CartView from './views/CartView.vue'
import CheckoutView from './views/CheckoutView.vue'
import PaymentView from './views/PaymentView.vue'
import ConfirmationView from './views/ConfirmationView.vue'

// Setup router dengan route guard
const routes = [
  { path: '/login', component: LoginView, meta: { requiresGuest: true } },
  { path: '/', component: HomeView },
  { path: '/cart', component: CartView },
  { path: '/checkout', component: CheckoutView },
  { path: '/payment', component: PaymentView },
  { path: '/confirmation', component: ConfirmationView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// Route guard
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  authStore.checkAuth()

  if (to.meta.requiresGuest && authStore.isLoggedIn) {
    next('/')
  } else {
    next()
  }
})

// Setup Pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

// Create app
const app = createApp(App)
app.use(pinia)
app.use(router)
app.mount('#app')