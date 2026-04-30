<template>
  <AuthFormShell title="Register Page" :error="error" :success="success">
    <div class="mb-4">
      <label for="name" class="block text-gray-700 text-sm font-medium mb-2">Name</label>
      <input
        id="name"
        name="name"
        type="text"
        v-model="form.name"
        placeholder="Enter your name"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</div>
    </div>

    <div class="mb-4">
      <label for="username" class="block text-gray-700 text-sm font-medium mb-2">Username</label>
      <input
        id="username"
        name="username"
        type="text"
        v-model="form.username"
        placeholder="Create a username"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div v-if="errors.username" class="text-red-500 text-sm mt-1">{{ errors.username }}</div>
    </div>

    <div class="mb-4">
      <label for="email" class="block text-gray-700 text-sm font-medium mb-2">Email</label>
      <input
        id="email"
        name="email"
        type="email"
        v-model="form.email"
        placeholder="Enter your email"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div v-if="errors.email" class="text-red-500 text-sm mt-1">{{ errors.email }}</div>
    </div>

    <div class="mb-6">
      <label for="password" class="block text-gray-700 text-sm font-medium mb-2">Password</label>
      <input
        id="password"
        name="password"
        type="password"
        v-model="form.password"
        placeholder="Create a password"
        class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div v-if="errors.password" class="text-red-500 text-sm mt-1">{{ errors.password }}</div>
    </div>

    <button
      @click="handleRegister"
      class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200"
      :disabled="loading"
    >
      {{ loading ? 'Registering...' : 'Register' }}
    </button>
  </AuthFormShell>
</template>

<script lang="ts" setup>
import { reactive } from 'vue';
import type { RegisterForm } from '../../types/auth';
import { useAuth } from '../../composables/useAuth';
import AuthFormShell from '../../components/auth/AuthFormShell.vue';

const { register, loading, error, success } = useAuth();

const form = reactive<RegisterForm>({
  name: '',
  username: '',
  email: '',
  password: '',
});

const errors = reactive({
  name: '',
  username: '',
  email: '',
  password: '',
});

const validateForm = () => {
  let isValid = true;

  if (!form.name) {
    errors.name = 'Name is required';
    isValid = false;
  } else {
    errors.name = '';
  }

  if (!form.username || form.username.length < 3) {
    errors.username = 'Username must be at least 3 characters long';
    isValid = false;
  } else {
    errors.username = '';
  }

  if (!form.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
    errors.email = 'Please enter a valid email address';
    isValid = false;
  } else {
    errors.email = '';
  }

  if (!form.password || form.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
    isValid = false;
  } else {
    errors.password = '';
  }

  return isValid;
};

const handleRegister = async () => {
  if (!validateForm()) return;

  try {
    await register(form);
  } catch (err) {
    error.value = (err as any).response?.data?.message || 'Registration failed';
  }
};
</script>
