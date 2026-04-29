<template>
  <div class="min-h-screen bg-gray-50 py-12">
    <div class="max-w-4xl mx-auto px-4">
      <!-- Dashboard Header -->
      <div class="bg-white rounded-lg shadow-md p-8 border border-gray-200 mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">User Dashboard</h1>
        <p class="text-lg text-gray-600">
          Welcome to your dashboard! This is where you’ll find your saved universities, scholarships, and community posts.
        </p>
      </div>

      <!-- Dashboard Content Grid -->
      <div class="grid md:grid-cols-3 gap-6">
        <!-- Saved Universities -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Saved Universities</h3>
          <p class="text-gray-600 mb-4">Your shortlisted universities and programs.</p>
          <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
            View Universities
          </button>
        </div>

        <!-- Scholarships -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Scholarships</h3>
          <p class="text-gray-600 mb-4">Track your scholarship applications.</p>
          <button class="w-full bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
            View Scholarships
          </button>
        </div>

        <!-- Community Posts -->
        <div class="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <h3 class="text-xl font-semibold text-gray-800 mb-3">Community Posts</h3>
          <p class="text-gray-600 mb-4">Your discussions and questions.</p>
          <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md font-medium transition duration-200">
            View Posts
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { api } from '../services/api';
import axios from 'axios';


const user = ref<any>(null);
const savedUniversities = ref<any[]>([]);
const isLoading = ref(false);


onMounted(() => {
  fetchUserProfile();
  fetchSavedUniversities();
});

const fetchUserProfile = async () => {
  try {
    const response = await api.get('users/get-profile');
    user.value = response.data;
  } catch (error) {
    console.error('Failed to fetch user profile:', error);
  }
};

const fetchSavedUniversities = async () => {
  isLoading.value = true;
  try {
    const response = await axios.get('http://localhost:3000/api/users/my-saved-universities');
    savedUniversities.value = response.data;
  } catch (error) {
    console.error('Failed to fetch saved universities:', error);
  } finally {
    isLoading.value = false;
  }
};

</script>