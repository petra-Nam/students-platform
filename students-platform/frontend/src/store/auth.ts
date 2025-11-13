import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import axios from 'axios';

// Define an interface for your user object
interface User {
  _id: string;
  email: string;
  name: string; // Or 'fullName'
  // ... any other fields from your safeUser
}

export const useAuthStore = defineStore('auth', () => {
  // --- State ---
  // We store the user object, not the token
  const user = ref<User | null>(null);

  // --- Getters ---
  const isAuthenticated = computed(() => !!user.value);
  const currentUser = computed(() => user.value);

  // --- Actions ---

  /**
   * Called by Login.vue after a successful login.
   * We immediately fetch the user's profile to confirm login.
   */
  async function loginSuccess() {
    await fetchUser();
  }

  /**
   * This is the new way to check if we are logged in.
   * It asks the backend for the user profile.
   * The browser automatically sends the httpOnly cookie.
   */
  async function fetchUser() {
    try {
      const response = await axios.get('http://localhost:3000/api/users/get-profile');
      user.value = response.data;
    } catch (error) {
      user.value = null;
      console.error('Not authenticated:', error);
    }
  }

  /**
   * Logs the user out by clearing the state and (later) calling a logout endpoint.
   */
  function logout() {
    user.value = null;
    // You should also call a backend endpoint to clear the cookie
    // e.g., axios.post('http://localhost:3000/api/users/logout');
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