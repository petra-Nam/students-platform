<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-md mx-auto px-4">
      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
        <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">Login Page</h2>

        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2">Email</label>
          <input type="email" v-model="form.email" placeholder="Enter your email"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-medium mb-2">Password</label>
          <input type="password" v-model="form.password" @keyup.enter="handleLogin" placeholder="Enter your password"
                 class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" />
        </div>

        <button @click="handleLogin"
                class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
          Login
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import type { LoginForm } from '../../types/auth';
import { useAuth } from '../../composables/useAuth';
import { useRouter } from 'vue-router';

const auth = useAuth();
const router = useRouter();

const form = reactive<LoginForm>({
  email: '',
  password: '',
});

const handleLogin = async () => {
  const user = await auth.login(form);
  if (user) {
    router.push('/dashboard');
  }
};

if (auth.isAuthenticated) {
  router.push('/dashboard');
}
</script>

