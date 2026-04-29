<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div class="max-w-3xl mx-auto px-4">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <h1 class="text-3xl font-bold text-blue-900 mb-6">Edit Post</h1>
  
          <form @submit.prevent="savePost" class="space-y-5">
            <input v-model="post.title" placeholder="Post title" class="input" />
            <textarea v-model="post.description" placeholder="Post description" rows="6" class="input"></textarea>
  
            <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg">
              Save Changes
            </button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from "vue";
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  
  const post = ref({
    id: route.params.id,
    title: "How to apply for scholarships?",
    description: "Let’s discuss the best ways to apply for scholarships.",
  });
  
  const savePost = () => {
    alert("Post updated!");
  };
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    outline: none;
  }
  .input:focus {
    border-color: #3b82f6;
  }
  </style>