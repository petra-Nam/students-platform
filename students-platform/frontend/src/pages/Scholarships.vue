<template>
  <div class="min-h-screen bg-gradient-to-br from-yellow-50 to-yellow-100">
    <div class="max-w-6xl mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-yellow-800 mb-4">
          Find Scholarships
        </h1>
        <h2 class="text-3xl text-yellow-600 font-semibold mb-8">
          Unlock Opportunities for Your Education
        </h2>
        <p class="text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Search for scholarships tailored to your needs and make your academic dreams a reality.
        </p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 -mt-10 mb-10">
      <div class="bg-white rounded-xl shadow-lg p-10">
        <h2 class="text-3xl font-bold text-yellow-800 mb-6 text-center">Search Scholarships</h2>
        <div class="flex justify-center space-x-4">
          <input
              v-model="searchInput"
              placeholder="Enter a country or keyword"
              @keyup.enter="newSearch"
              class="px-4 py-3 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <button
              @click="newSearch"
              class="bg-yellow-600 hover:bg-yellow-700 text-white font-bold px-10 py-3 rounded-lg text-lg transition duration-200 shadow-md">
            Search
          </button>
        </div>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 py-5" v-if="hasSearched">
      <div class="bg-white rounded-xl shadow-lg p-10">

        <div v-if="isLoading" class="text-center text-gray-600 text-lg">
          Loading...
        </div>

        <div v-else-if="scholarships.length === 0" class="text-center text-gray-600 text-lg">
          No scholarships found for "{{ searchInput }}".
        </div>

        <div v-else>
          <h2 class="text-2xl font-bold text-yellow-800 mb-6">Results for "{{ searchInput }}"</h2>
          <ul class="space-y-4">
            <li v-for="scholarship in scholarships" :key="scholarship.id" class="p-4 border border-gray-200 rounded-lg shadow-sm">
              <strong class="text-lg text-yellow-700">{{ scholarship.name }}</strong>
              <p class="text-gray-600">{{ scholarship.description }}</p>
              <br />
              <span class="text-gray-500 text-sm">Eligibility: {{ scholarship.eligibility }}</span>
              <br />
              <a :href="scholarship.website" target="_blank" class="text-yellow-500 hover:underline">
                Learn More
              </a>
            </li>
          </ul>

          <div v-if="totalPages > 1" class="flex justify-between items-center mt-8">
            <button
                @click="goToPrevPage"
                :disabled="currentPage === 1"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50">
              Previous
            </button>
            <span class="text-gray-700">Page {{ currentPage }} of {{ totalPages }}</span>
            <button
                @click="goToNextPage"
                :disabled="currentPage === totalPages"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import axios from "axios"; // Make sure axios is imported

// --- 1. STATE ---
// Reactive variables for the component
const scholarships = ref<any[]>([]); // Holds the list of scholarships
const searchInput = ref(""); // The text from the search box
const isLoading = ref(false); // True when API call is in progress
const hasSearched = ref(false); // True after the user clicks "Search"
const currentPage = ref(1); // The current page of results
const totalPages = ref(1); // The total pages from the API

// --- 2. METHODS ---

/**
 * Fetches scholarships from the API for the *current* page.
 */
const fetchScholarships = async () => {
  if (isLoading.value) return; // Don't fetch if already fetching

  isLoading.value = true;
  // Only set 'hasSearched' on the first page load of a new search
  if (currentPage.value === 1) {
    hasSearched.value = true;
  }

  try {
    const response = await axios.get("http://localhost:3000/api/scholarships", {
      params: {
        query: searchInput.value,
        page: currentPage.value // Send the current page number
      },
    });

    scholarships.value = response.data.scholarships;
    totalPages.value = response.data.totalPages; // Save the total pages

  } catch (error) {
    console.error("Error fetching scholarships:", (error as Error).message);
    scholarships.value = []; // Clear results on error
  } finally {
    isLoading.value = false; // Always stop loading
  }
};

/**
 * Starts a new search. Resets to page 1.
 */
const newSearch = () => {
  currentPage.value = 1;
  fetchScholarships();
};

/**
 * Goes to the next page of results.
 */
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchScholarships();
  }
};

/**
 * Goes to the previous page of results.
 */
const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchScholarships();
  }
};
</script>