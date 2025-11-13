<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto px-4">
      <!-- Register Card -->
      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Register Page</h2>
        
        <!-- Full Name Field -->
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Full Name</label>
          <input 
            type="text" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your full name"
          >
        </div>

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
            placeholder="Create a password"
          >
        </div>

        <!-- Register Button -->
        <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
  Register
</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios";

// Form data
const form = ref({
  name: "",
  username: "",
  email: "",
  password: "",
});

// Validation rules
const rules = {
  name: [
    { required: true, message: "Name is required", trigger: "blur" },
    { min: 3, message: "Name must be at least 3 characters", trigger: "blur" },
  ],
  username: [
    { required: true, message: "Username is required", trigger: "blur" },
    { min: 3, message: "Username must be at least 3 characters", trigger: "blur" },
  ],
  email: [
    { required: true, message: "Email is required", trigger: "blur" },
    { type: "email", message: "Please enter a valid email", trigger: "blur" },
  ],
  password: [
    { required: true, message: "Password is required", trigger: "blur" },
    { min: 6, message: "Password must be at least 6 characters", trigger: "blur" },
  ],
};

// Form reference
const registerForm = ref(null);

// Handle form submission
const handleRegister = async () => {
  try {
    // Validate the form
    await registerForm.value.validate();

    // Send the form data to the backend
    const response = await axios.post("http://localhost:3000/api/users/register", form.value);
    console.log("User registered successfully:", response.data);

    // Show success message
    alert("User registered successfully!");
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error registering user:", error.response.data);
      alert(`Error: ${error.response.data.message}`);
    } else {
      console.error("Unexpected error:", error.message);
      alert("An unexpected error occurred.");
    }
  }
};

// Reset the form
const resetForm = () => {
  registerForm.value.resetFields();
};
</script>