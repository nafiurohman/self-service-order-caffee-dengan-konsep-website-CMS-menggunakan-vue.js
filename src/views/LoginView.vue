<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-blue-900 flex items-center justify-center p-4 relative overflow-hidden">
    <!-- Background Elements -->
    <div class="absolute inset-0 bg-black/40 backdrop-blur-sm"></div>
    <div class="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
    <div class="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
    <div class="absolute top-1/2 left-1/2 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
    
    <!-- Login Card -->
    <div class="relative z-10 w-full max-w-md mx-auto transform hover:scale-105 transition-transform duration-700 m-5">
      <Card class="backdrop-blur-2xl bg-white/10 border border-white/20 shadow-2xl">
        <!-- Logo & Header -->
        <div class="text-center mb-8">
          <div class="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl border border-white/20">
            <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
            </svg>
          </div>
          <h1 class="text-3xl font-bold text-white mb-2">Admin Access</h1>
          <p class="text-blue-100/80">Masuk ke sistem manajemen café</p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="handleLogin" class="space-y-6">
          <!-- Username Field -->
          <div class="space-y-2 m-7">
            <label class="block text-sm font-semibold text-blue-100">Username</label>
            <div class="relative group">
              <input
                v-model="form.username"
                type="text"
                class="w-full px-4 py-4 pl-12 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/10"
                placeholder="Enter your username"
                required
                autocomplete="username"
              >
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200/70 group-focus-within:text-blue-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                </svg>
              </div>
            </div>
          </div>

          <!-- Password Field -->
          <div class="space-y-2 m-7">
            <label class="block text-sm font-semibold text-blue-100">Password</label>
            <div class="relative group">
              <input
                v-model="form.password"
                :type="showPassword ? 'text' : 'password'"
                class="w-full px-4 py-4 pl-12 pr-12 bg-white/5 border border-white/20 rounded-2xl text-white placeholder-blue-200/50 focus:outline-none focus:ring-4 focus:ring-blue-500/50 focus:border-blue-400 transition-all duration-300 backdrop-blur-sm group-hover:bg-white/10"
                placeholder="Enter your password"
                required
                autocomplete="current-password"
              >
              <div class="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-200/70 group-focus-within:text-blue-300 transition-colors">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                </svg>
              </div>
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-4 top-1/2 transform -translate-y-1/2 text-blue-200/70 hover:text-blue-300 transition-colors"
              >
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path v-if="showPassword" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                  <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                </svg>
              </button>
            </div>
          </div>

          <!-- Error Message -->
          <div v-if="error" class="p-4 bg-red-500/20 border border-red-400/30 rounded-2xl backdrop-blur-sm animate-shake">
            <div class="flex items-center space-x-3 text-red-200">
              <svg class="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span class="text-sm font-medium">{{ error }}</span>
            </div>
          </div>

          <!-- Login Button -->
          <Button 
            type="submit" 
            variant="primary" 
            size="xl" 
            fullWidth 
            :disabled="loading"
            class="relative overflow-hidden group"
          >
            <div class="relative z-10 flex items-center justify-center space-x-3 ">
              <svg v-if="loading" class="w-5 h-5 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"/>
              </svg>
              <span class="font-semibold">{{ loading ? 'Authenticating...' : 'Access System' }}</span>
            </div>
            
            <!-- Animated background -->
            <div class="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 group-hover:from-blue-700 group-hover:to-purple-700 transition-all duration-300"></div>
            <div class="absolute inset-0 bg-gradient-to-r from-blue-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </Button>
        </form>

        <!-- Security Notice -->
        <div class="mt-8 p-4 bg-blue-500/10 border border-blue-400/20 rounded-2xl backdrop-blur-sm m-7">
          <div class="flex items-start space-x-3">
            <svg class="w-5 h-5 text-blue-300 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <div>
              <p class="text-blue-200 text-sm font-medium">Secure Access</p>
              <p class="text-blue-300/70 text-xs mt-1">
                This area is restricted to authorized personnel only. Unauthorized access is prohibited.
              </p>
            </div>
          </div>
        </div>

        <!-- Back to Home -->
        <div class="mt-6 text-center">
          <button
            @click="$router.push('/')"
            class="text-blue-300/70 hover:text-blue-200 transition-colors text-sm font-medium flex items-center justify-center space-x-2 mx-auto group"
          >
            <svg class="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
            </svg>
            <span>Back to Café</span>
          </button>
        </div>
      </Card>
    </div>

    <!-- Floating Particles -->
    <div class="absolute top-10 left-10 w-2 h-2 bg-blue-400/30 rounded-full animate-float"></div>
    <div class="absolute top-20 right-20 w-1 h-1 bg-purple-400/40 rounded-full animate-float delay-700"></div>
    <div class="absolute bottom-20 left-20 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-float delay-300"></div>
    <div class="absolute bottom-32 right-32 w-1 h-1 bg-blue-300/50 rounded-full animate-float delay-1000"></div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import Card from '../components/ui/Card.vue'
import Button from '../components/ui/Button.vue'

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
  username: '',
  password: ''
})
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')

// Auto-focus username field on mount
onMounted(() => {
  const usernameInput = document.querySelector('input[autocomplete="username"]')
  if (usernameInput) {
    usernameInput.focus()
  }
})

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  try {
    // Simulasi delay untuk UX yang lebih baik
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    const success = authStore.login(form.username, form.password)
    
    if (success) {
      // Success feedback
      const button = document.querySelector('button[type="submit"]')
      if (button) {
        button.classList.add('bg-green-500')
        setTimeout(() => {
          router.push('/')
        }, 500)
      }
    } else {
      error.value = 'Invalid credentials. Please try again.'
      // Shake animation for error
      const formElement = document.querySelector('form')
      formElement.classList.add('animate-shake')
      setTimeout(() => {
        formElement.classList.remove('animate-shake')
      }, 500)
    }
  } catch (err) {
    error.value = 'Authentication failed. Please try again.'
    console.error('Login error:', err)
  } finally {
    loading.value = false
  }
}

// Handle Enter key press
const handleKeyPress = (event) => {
  if (event.key === 'Enter' && !loading.value) {
    handleLogin()
  }
}

// Add event listener for Enter key
onMounted(() => {
  document.addEventListener('keypress', handleKeyPress)
})
</script>

<style scoped>
/* Custom animations */
@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
    opacity: 0.7;
  }
}

@keyframes shake {
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-5px); }
  75% { transform: translateX(5px); }
}

.animate-float {
  animation: float 6s ease-in-out infinite;
}

.animate-shake {
  animation: shake 0.5s ease-in-out;
}

/* Custom scrollbar for the card */
.glassmorphism::-webkit-scrollbar {
  width: 6px;
}

.glassmorphism::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 10px;
}

.glassmorphism::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.3);
  border-radius: 10px;
}

.glassmorphism::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.5);
}

/* Improved focus styles for dark background */
input:focus {
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.3);
}

/* Placeholder color */
input::placeholder {
  color: rgba(191, 219, 254, 0.5);
}
</style>