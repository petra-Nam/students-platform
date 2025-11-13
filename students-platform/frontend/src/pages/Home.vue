<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
    <!-- Hero Section -->
    <div class="max-w-6xl mx-auto px-4 py-20">
      <div class="text-center mb-16">
        <h1 class="text-5xl font-bold text-blue-800 mb-4">
          Welcome to ISC
        </h1>
        <h2 class="text-3xl text-blue-600 font-semibold mb-8">
          Make your Abroad Dream a Reality
        </h2>
        <p class="text-xl text-gray-700 max-w-2xl mx-auto mb-10 leading-relaxed">
          Your comprehensive guide to studying abroad with scholarships, university information, online courses, and a supportive community.
        </p>
        <div class="flex justify-center space-x-6">
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-4 rounded-lg text-lg transition duration-200 shadow-md">
            GET STARTED
          </button>
          <button class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-10 py-4 rounded-lg text-lg transition duration-200 shadow-md">
            Learn More
          </button>
        </div>
      </div>

      <!-- Resources Section -->
      <div class="bg-white rounded-xl shadow-lg p-10">
        <div class="text-center mb-10">
          <h2 class="text-3xl font-bold text-blue-800 mb-4">
            Explore Our Resources
          </h2>
          <p class="text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to make your international education journey successful
          </p>
        </div>

        <!-- Features Grid -->
        <div class="grid md:grid-cols-2 gap-8">
          <!-- Scholarships Card -->
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition duration-300">
            <h3 class="text-2xl font-bold mb-4">SCHOLARSHIPS</h3>
            <p class="text-blue-100 mb-6 leading-relaxed">Find funding opportunities to support your education abroad</p>
            <button class="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-6 py-3 rounded-lg transition duration-200 shadow">
              Explore Scholarships
            </button>
          </div>

          <!-- Universities Card -->
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition duration-300">
            <h3 class="text-2xl font-bold mb-4">UNIVERSITIES</h3>
            <p class="text-blue-100 mb-6 leading-relaxed">Discover the perfect university and program for your goals</p>
            <button class="bg-white hover:bg-gray-100 text-blue-600 font-semibold px-6 py-3 rounded-lg transition duration-200 shadow">
              Discover Universities
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
import axios from "axios";

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

    // This is the fix: save the array from 'response.data.universities'
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