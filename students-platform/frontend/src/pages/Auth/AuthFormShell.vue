<template>
    <div class="min-h-screen bg-gray-50 py-12">
      <div class="max-w-md mx-auto px-4">
        <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200">
          <h2 class="text-2xl font-bold text-gray-800 text-center mb-6">
            {{ title }}
          </h2>
  
          <div v-if="error" class="mb-4 text-red-500">{{ error }}</div>
          <div v-if="success" class="mb-4 text-green-500">{{ success }}</div>
  
          <slot />
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  defineProps<{
    title: string;
    error?: string | null;
    success?: string | null;
  }>();
  </script>
  