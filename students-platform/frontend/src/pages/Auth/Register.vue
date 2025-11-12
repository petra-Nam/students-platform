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

<script>
export default {
  name: 'RegisterPage'
}
</script>