import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useMenuStore = defineStore('menu', () => {
  const menuItems = ref([])
  
  // Load initial data dari localStorage
  const loadMenu = () => {
    try {
      const savedMenu = localStorage.getItem('cafe-menu-data')
      if (savedMenu) {
        const parsedMenu = JSON.parse(savedMenu)
        // Validate data structure
        if (Array.isArray(parsedMenu) && parsedMenu.every(item => 
          item.id && item.name && item.category && item.price && item.desc
        )) {
          menuItems.value = parsedMenu
        } else {
          throw new Error('Invalid menu data structure')
        }
      } else {
        // Load default menu jika tidak ada data
        loadDefaultMenu()
      }
    } catch (error) {
      console.error('Error loading menu:', error)
      loadDefaultMenu()
    }
  }
  
  const loadDefaultMenu = () => {
    const defaultMenu = [
      {
        id: '1',
        name: 'Espresso',
        category: 'Coffee',
        price: 15000,
        desc: 'Shot kopi pekat dan kuat',
        image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '2',
        name: 'Americano',
        category: 'Coffee',
        price: 18000,
        desc: 'Espresso dengan air panas',
        image: 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '3',
        name: 'Cappuccino',
        category: 'Coffee',
        price: 25000,
        desc: 'Espresso dengan lapisan busa susu',
        image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '4',
        name: 'Latte',
        category: 'Coffee',
        price: 28000,
        desc: 'Espresso dengan susu steamed',
        image: 'https://images.unsplash.com/photo-1561047029-3000c68339ca?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '5',
        name: 'Mocha',
        category: 'Coffee',
        price: 30000,
        desc: 'Cokelat dengan espresso dan susu',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '6',
        name: 'Matcha Latte',
        category: 'Tea',
        price: 32000,
        desc: 'Bubuk matcha premium dengan susu',
        image: 'https://images.unsplash.com/photo-1515823064-d6e0c04616a7?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '7',
        name: 'Jasmine Tea',
        category: 'Tea',
        price: 20000,
        desc: 'Teh jasmine harum dan menenangkan',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '8',
        name: 'Chocolate Frappe',
        category: 'Cold',
        price: 33000,
        desc: 'Minuman cokelat dingin yang creamy',
        image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '9',
        name: 'Mango Smoothie',
        category: 'Cold',
        price: 30000,
        desc: 'Puree mangga segar dan manis',
        image: 'https://images.unsplash.com/photo-1505252585461-04db1a846087?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      },
      {
        id: '10',
        name: 'Banana Bread',
        category: 'Snack',
        price: 22000,
        desc: 'Pisang panggang yang lembut',
        image: 'https://images.unsplash.com/photo-1586444248902-2f64eddc13df?w=400&h=300&fit=crop',
        createdAt: new Date().toISOString()
      }
    ]
    menuItems.value = defaultMenu
    saveMenu()
  }
  
  // Save menu ke localStorage
  const saveMenu = () => {
    try {
      localStorage.setItem('cafe-menu-data', JSON.stringify(menuItems.value))
      return true
    } catch (error) {
      console.error('Error saving menu:', error)
      return false
    }
  }
  
  const categories = computed(() => {
    const cats = [...new Set(menuItems.value.map(item => item.category))]
    return cats.sort()
  })
  
  const addMenuItem = (item) => {
    try {
      const newItem = {
        ...item,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        price: parseInt(item.price)
      }
      menuItems.value.push(newItem)
      const success = saveMenu()
      return success ? newItem : null
    } catch (error) {
      console.error('Error adding menu item:', error)
      return null
    }
  }
  
  const updateMenuItem = (id, updatedItem) => {
    try {
      const index = menuItems.value.findIndex(item => item.id === id)
      if (index !== -1) {
        menuItems.value[index] = { 
          ...updatedItem, 
          id,
          price: parseInt(updatedItem.price),
          createdAt: menuItems.value[index].createdAt // Preserve original creation date
        }
        const success = saveMenu()
        return success
      }
      return false
    } catch (error) {
      console.error('Error updating menu item:', error)
      return false
    }
  }
  
  const deleteMenuItem = (id) => {
    try {
      const index = menuItems.value.findIndex(item => item.id === id)
      if (index !== -1) {
        menuItems.value.splice(index, 1)
        const success = saveMenu()
        return success
      }
      return false
    } catch (error) {
      console.error('Error deleting menu item:', error)
      return false
    }
  }
  
  const getMenuByCategory = (category) => {
    if (category === 'all') return menuItems.value
    return menuItems.value.filter(item => item.category === category)
  }

  const exportMenuData = () => {
    return JSON.stringify(menuItems.value, null, 2)
  }

  const importMenuData = (jsonData) => {
    try {
      const data = JSON.parse(jsonData)
      // Validate imported data
      if (Array.isArray(data) && data.every(item => 
        item.id && item.name && item.category && item.price && item.desc
      )) {
        menuItems.value = data
        const success = saveMenu()
        return success
      } else {
        throw new Error('Invalid data format')
      }
    } catch (error) {
      console.error('Error importing data:', error)
      return false
    }
  }

  return {
    menuItems,
    categories,
    loadMenu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    getMenuByCategory,
    exportMenuData,
    importMenuData
  }
})