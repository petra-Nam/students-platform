<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Register Page</h2>

        <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>
        <div v-if="success" class="mb-4 text-green-500">{{ success }}</div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Name</label>
          <input type="text" v-model="form.name" placeholder="Enter your name"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Username</label>
          <input type="text" v-model="form.username" placeholder="Create a username"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input type="email" v-model="form.email" placeholder="Enter your email"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input type="password" v-model="form.password" placeholder="Create a password"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button @click="handleRegister"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200"
                :disabled="loading">
          {{ loading ? 'Registering...' : 'Register' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { RegisterForm } from '../../types/auth';
import { useAuth } from '../../composables/useAuth';

const { register, loading, error, success } = useAuth();

const form = reactive<RegisterForm>({
  name: '',
  username: '',
  email: '',
  password: '',
});

const handleRegister = async () => {
  await register(form);
};
</script>
