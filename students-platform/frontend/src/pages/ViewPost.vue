<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div class="max-w-4xl mx-auto px-4">
        <div class="bg-white rounded-2xl shadow-lg p-8">
          <p class="text-blue-600 font-semibold mb-3">Community Post</p>
  
          <h1 class="text-4xl font-bold text-blue-900 mb-4">
            {{ post.title }}
          </h1>
  
          <p class="text-gray-600 mb-6">
            Posted by {{ post.author }}
          </p>
  
          <p class="text-gray-700 leading-relaxed mb-8">
            {{ post.description }}
          </p>
  
          <router-link
            :to="`/posts/${post.id}/edit`"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-3 rounded-lg inline-block"
          >
            Edit Post
          </router-link>
        </div>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { useRoute } from "vue-router";
  
  const route = useRoute();
  
  const post = {
    id: route.params.id,
    title: "How to apply for scholarships?",
    description: "Let’s discuss the best ways to apply for scholarships.",
    author: "John Doe",
  };
  </script>