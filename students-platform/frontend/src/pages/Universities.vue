<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
    <div class="max-w-6xl mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-blue-800 mb-4">
          Find your University
        </h1>
        <h2 class="text-3xl text-blue-600 font-semibold mb-8">
          Make your Abroad Dream a Reality
        </h2>
        <p class="text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your comprehensive guide to studying abroad with scholarships, university information, online courses, and a supportive community.
        </p>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 -mt-10 mb-10">
      <div class="bg-white rounded-xl shadow-lg p-10">
        <h2 class="text-3xl font-bold text-blue-800 mb-6 text-center">Search Universities</h2>
        <div class="flex justify-center space-x-4">
          <input
              v-model="countryInput"
              placeholder="Enter a country (e.g., Germany)"
              @keyup.enter="newSearch"
              class="px-4 py-3 border border-gray-300 rounded-lg w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
              @click="newSearch"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-3 rounded-lg text-lg transition duration-200 shadow-md">
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

        <div v-else-if="universities.length === 0" class="text-center text-gray-600 text-lg">
          No universities found for "{{ countryInput }}".
        </div>

        <div v-else>
          <h2 class="text-2xl font-bold text-blue-800 mb-6">Results for "{{ countryInput }}"</h2>
          <ul class="space-y-4">
            <li v-for="university in universities" :key="university.name" class="p-4 border border-gray-200 rounded-lg shadow-sm">
              <strong class="text-lg text-blue-700">{{ university.name }}</strong>
              <span class="text-gray-600"> ({{ university.country }})</span>
              <br />
              <a :href="university.website" target="_blank" class="text-blue-500 hover:underline">
                {{ university.website }}
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
import { useRouter } from "vue-router";
import axios from "axios"; // Make sure axios is imported

// --- 1. NAVIGATION ---
const router = useRouter();

const goToSearch = () => {
  console.log("Navigating to search page...");
  // router.push('/search'); // Example
};

const goToCommunity = () => {
  console.log("Navigating to community page...");
  // router.push('/community'); // Example
};

// --- 2. STATE ---
// Reactive variables for the component
const universities = ref<any[]>([]); // Holds the list of universities
const countryInput = ref(""); // The text from the search box
const isLoading = ref(false); // True when API call is in progress
const hasSearched = ref(false); // True after the user clicks "Search"
const currentPage = ref(1); // The current page of results
const totalPages = ref(1); // The total pages from the API

// --- 3. METHODS ---

/**
 * Fetches universities from the API for the *current* page.
 */
const fetchUniversities = async () => {
  if (isLoading.value) return; // Don't fetch if already fetching

  isLoading.value = true;
  // Only set 'hasSearched' on the first page load of a new search
  if (currentPage.value === 1) {
    hasSearched.value = true;
  }

  try {
    const response = await axios.get("http://localhost:3000/api/universities", {
      params: {
        country: countryInput.value,
        page: currentPage.value // Send the current page number
      },
    });

    universities.value = response.data.universities;
    totalPages.value = response.data.totalPages; // Save the total pages

  } catch (error) {
    console.error("Error fetching universities:", (error as Error).message);
    universities.value = []; // Clear results on error
  } finally {
    isLoading.value = false; // Always stop loading
  }
};

/**
 * Starts a new search. Resets to page 1.
 */
const newSearch = () => {
  currentPage.value = 1;
  fetchUniversities();
};

/**
 * Goes to the next page of results.
 */
const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchUniversities();
  }
};

/**
 * Goes to the previous page of results.
 */
const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchUniversities();
  }
};
</script>