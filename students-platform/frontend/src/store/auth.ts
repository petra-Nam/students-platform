import { ref, computed } from 'vue';
import { defineStore } from 'pinia'; // <-- FIX #1: Changed 'in' to 'from'
import { api } from '../services/api'; 

// Define an interface for your user object
interface User {
  _id: string;
  email: string;
  name: string; // Or 'fullName'
  // ... any other fields from your safeUser
}

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  const user = ref<User | null>(null);

  // --- Getters ---
  const isAuthenticated = computed(() => !!user.value);
  const currentUser = computed(() => user.value);

  // --- Actions ---

  async function loginSuccess() {
    await fetchUser();
  }

  async function fetchUser() {
    try {
      //
      // FIX #2: Corrected 'get-prfile' to 'get-profile'
      //
      const response = await api.get('/users/get-profile');
      user.value = response.data;
    } catch (error) {
      user.value = null;
      console.error('Not authenticated:', error);
    }
  }

  function logout() {
    user.value = null;
    // e.g., api.post('/users/logout');
  }

  return {
    user,
    isAuthenticated,
    currentUser,
    loginSuccess,
    fetchUser,
    logout,
  };
});