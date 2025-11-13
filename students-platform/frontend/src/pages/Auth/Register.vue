<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Register Page</h2>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input 
            type="text" 
            v-model="form.name"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Username</label>
          <input 
            type="text" 
            v-model="form.username"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a username"
          >
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            v-model="form.email"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          >
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input 
            type="password" 
            v-model="form.password"
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Create a password"
          >
        </div>

        <button 
          @click="handleRegister"
          class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
          Register
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
// 
// FIX #1: Use the correct path and FIX #2: use named import { api }
//
import { api } from '../../services/api'; 

const router = useRouter();

// Form data - matches your backend controller
const form = ref({
  name: "",
  username: "",
  email: "",
  password: "",
});

// Handle form submission
const handleRegister = async () => {
  // Manual Validation (since we removed Element Plus)
  if (!form.value.name || !form.value.username || !form.value.email || !form.value.password) {
    alert("Please fill out all fields.");
    return;
  }
  if (form.value.password.length < 6) {
    alert("Password must be at least 6 characters.");
    return;
  }
  
  try {
    // 
    // FIX #3: Use the imported 'api' variable
    //
    const response = await api.post("/users/register", form.value);
    console.log("User registered successfully:", response.data);

    // Show success message and redirect to login
    alert("User registered successfully! Please log in.");
    router.push({ name: 'Login' }); // Redirect to login page

  } catch (error: any) {
    // Handle errors from the API
    if (error.response && error.response.data && error.response.data.message) {
      console.error("Error registering user:", error.response.data);
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("Unexpected error:", error.message);
      alert("An unexpected error occurred.");
    }
  }
};
</script>