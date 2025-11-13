<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto px-4">
      <!-- Login Card -->
      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Login Page</h2>
        
        <!-- Email Field -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          >
        </div>

        <!-- Password Field -->
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input 
            type="password" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          >
        </div>

        <!-- Login Button -->
        <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../../store/auth.ts'; // Corrected path
import axios from 'axios';
import { ElMessage } from 'element-plus';

const email = ref('');
const password = ref('');
const router = useRouter();
const authStore = useAuthStore();

const handleLogin = async () => {
  if (!email.value || !password.value) {
    ElMessage.error('Please enter both email and password.');
    return;
  }

  try {
    // 1. Call your login endpoint. The browser will auto-set the cookie.
    await axios.post('http://localhost:3000/api/users/login', {
      email: email.value,
      password: password.value,
    });

    // 2. Tell the auth store to fetch the user profile.
    // This will confirm the cookie was set and update our app state.
    await authStore.loginSuccess();

    // 3. Check the store to see if we are now authenticated
    if (authStore.isAuthenticated) {
      ElMessage.success('Login successful!');
      router.push({ name: 'Dashboard' }); // Or router.push('/dashboard')
    } else {
      // This should not happen if the login was successful
      throw new Error('Failed to verify login.');
    }

  } catch (error) {
    console.error('Login failed:', error);
    ElMessage.error('Invalid email or password. Please try again.');
  }
};
</script>