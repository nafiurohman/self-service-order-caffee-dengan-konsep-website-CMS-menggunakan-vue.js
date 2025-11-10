import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref([])
  
  const totalItems = computed(() => {
    return items.value.reduce((total, item) => total + item.quantity, 0)
  })
  
  const subtotal = computed(() => {
    return items.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  })
  
  const tax = computed(() => {
    return subtotal.value * 0.1 // 10% tax
  })
  
  const total = computed(() => {
    return subtotal.value + tax.value
  })
  
  const addToCart = (menuItem, quantity = 1, notes = '') => {
    const existingItem = items.value.find(item => 
      item.id === menuItem.id && item.notes === notes
    )
    
    if (existingItem) {
      existingItem.quantity += quantity
    } else {
      items.value.push({
        ...menuItem,
        quantity,
        notes,
        cartId: Date.now().toString() + Math.random().toString(36).substr(2, 9)
      })
    }
  }
  
  const updateCartItem = (cartId, updates) => {
    const item = items.value.find(item => item.cartId === cartId)
    if (item) {
      Object.assign(item, updates)
    }
  }
  
  const removeFromCart = (cartId) => {
    const index = items.value.findIndex(item => item.cartId === cartId)
    if (index !== -1) {
      items.value.splice(index, 1)
    }
  }
  
  const clearCart = () => {
    items.value = []
  }
  
  return {
    items,
    totalItems,
    subtotal,
    tax,
    total,
    addToCart,
    updateCartItem,
    removeFromCart,
    clearCart
  }
}, {
  persist: {
    key: 'cafe-cart',
    storage: localStorage
  }
})