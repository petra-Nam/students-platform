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
              placeholder="Field of study"
              @keyup.enter="newSearch"
              @input="isFieldInvalid = false"
              :class="[
                'px-4 py-3 border rounded-lg w-1/3 focus:outline-none focus:ring-2',
                isFieldInvalid ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-yellow-500'
              ]"
          />
          <div class="relative w-1/4">
            <input
                v-model="location"
                @input="filterLocations"
                @focus="showDropdown = true"
                @blur="hideDropdown"
                @keyup.enter="newSearch"
                placeholder="Location (optional)"
                class="px-4 py-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-yellow-500"
            />
            <ul
                v-if="showDropdown && filteredLocations.length > 0"
                class="absolute z-10 w-full bg-white border border-gray-300 rounded-lg mt-1 max-h-60 overflow-y-auto shadow-lg">
              <li
                  v-for="(loc, index) in filteredLocations"
                  :key="index"
                  @mousedown="selectLocation(loc)"
                  class="px-4 py-2 hover:bg-yellow-50 cursor-pointer">
                {{ loc }}
              </li>
            </ul>
          </div>
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

        <div v-else-if="errorMessage" class="text-center text-red-600 text-lg">
          {{ errorMessage }}
        </div>

        <div v-else-if="scholarships.length === 0" class="text-center text-gray-600 text-lg">
          No training programs found for "{{ searchInput }}".
        </div>

        <div v-else>
          <h2 class="text-2xl font-bold text-yellow-800 mb-6">Results for "{{ searchInput }}"</h2>
          <ul class="space-y-4">
            <li v-for="(scholarship, index) in scholarships" :key="index" class="p-4 border border-gray-200 rounded-lg shadow-sm">
              <strong class="text-lg text-yellow-700">{{ scholarship.programName }}</strong>
              <p class="text-gray-600 mt-2">{{ scholarship.schoolName }}</p>
              <div class="mt-2 text-sm text-gray-500">
                <p v-if="scholarship.city || scholarship.state">
                  Location: {{ scholarship.city }}<span v-if="scholarship.city && scholarship.state">, </span>{{ scholarship.state }}
                </p>
                <p v-if="scholarship.address">
                  Address: {{ scholarship.address }}
                </p>
                <p v-if="scholarship.phone">
                  Phone: {{ scholarship.phone }}
                </p>
                <p v-if="scholarship.programLength">
                  Duration: {{ scholarship.programLength }}
                </p>
              </div>
              <a
                v-if="scholarship.website"
                :href="scholarship.website.startsWith('http') ? scholarship.website : 'https://' + scholarship.website"
                target="_blank"
                class="text-yellow-500 hover:underline mt-2 inline-block">
                Visit Website
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
import { api } from "../services/api";
import { US_STATES } from "../utils/locations";

const scholarships = ref<any[]>([]);
const searchInput = ref("");
const location = ref("");
const isLoading = ref(false);
const hasSearched = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);
const errorMessage = ref("");
const showDropdown = ref(false);
const filteredLocations = ref<string[]>([]);
const isFieldInvalid = ref(false);

const fetchScholarships = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  errorMessage.value = "";

  if (currentPage.value === 1) {
    hasSearched.value = true;
  }

  try {
    const response = await api.get("scholarships", {
      params: {
        q: searchInput.value,
        location: location.value || undefined,
      },
    });

    scholarships.value = response.data.scholarships || [];
    totalPages.value = 1;

  } catch (error: any) {
    console.error("Error fetching scholarships:", error);
    if (error.response?.data?.error) {
      errorMessage.value = error.response.data.error;
    } else {
      errorMessage.value = "Failed to fetch scholarships. Please try again.";
    }
    scholarships.value = [];
  } finally {
    isLoading.value = false;
  }
};

const newSearch = () => {
  if (!searchInput.value.trim()) {
    errorMessage.value = "Please enter a search keyword (e.g., nursing, computer science, business)";
    hasSearched.value = true;
    scholarships.value = [];
    isFieldInvalid.value = true;
    return;
  }

  isFieldInvalid.value = false;
  currentPage.value = 1;
  fetchScholarships();
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchScholarships();
  }
};

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchScholarships();
  }
};

const filterLocations = () => {
  if (!location.value) {
    filteredLocations.value = [];
    return;
  }
  filteredLocations.value = US_STATES.filter(loc =>
    loc.toLowerCase().includes(location.value.toLowerCase())
  );
};

const selectLocation = (loc: string) => {
  location.value = loc;
  showDropdown.value = false;
};

const hideDropdown = () => {
  setTimeout(() => {
    showDropdown.value = false;
  }, 200);
};
</script>