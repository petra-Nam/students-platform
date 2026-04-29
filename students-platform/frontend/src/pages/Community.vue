<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

    <!-- Hero -->
    <section class="max-w-6xl mx-auto px-4 py-16">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <p class="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full mb-5">
            Student community
          </p>

          <h1 class="text-5xl font-bold text-blue-900 mb-5 leading-tight">
            Join the Community
          </h1>

          <h2 class="text-2xl text-blue-600 font-semibold mb-6">
            Connect, ask questions, and grow together
          </h2>

          <p class="text-lg text-gray-700 leading-relaxed max-w-xl">
            Explore discussions, share your experiences, ask for advice, and connect
            with students planning their education journey.
          </p>
        </div>

        <div class="bg-white/70 rounded-2xl shadow-lg p-6">
          <div class="community-hero-image"></div>
        </div>
      </div>
    </section>

    <!-- Search -->
    <section class="max-w-6xl mx-auto px-4 -mt-4 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <div class="grid grid-cols-1 md:grid-cols-[1fr_auto_auto] gap-4">
          <input
            v-model="searchInput"
            placeholder="Search topics, questions, or keywords..."
            @keyup.enter="newSearch"
            class="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            @click="newSearch"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-10 py-3 rounded-lg transition duration-200 shadow-md"
          >
            Search
          </button>

        </div>
      </div>
    </section>

    <!-- Main Content -->
    <section class="max-w-6xl mx-auto px-4 pb-16">
      <div class="grid grid-cols-1 lg:grid-cols-[250px_1fr_280px] gap-6">

        <!-- Categories -->
        <aside class="space-y-6">
          <div class="bg-white rounded-xl shadow-lg p-5">
            <h3 class="font-bold text-blue-900 mb-4">Categories</h3>

            <ul class="space-y-3 text-sm">
              <li class="category active">All Categories <span>1280</span></li>
              <li class="category">Studying Abroad <span>320</span></li>
              <li class="category">Universities <span>245</span></li>
              <li class="category">Scholarships <span>210</span></li>
              <li class="category">Applications <span>180</span></li>
              <li class="category">Visa & Immigration <span>150</span></li>
              <li class="category">Student Life <span>120</span></li>
              <li class="category">Careers <span>55</span></li>
            </ul>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-5">
            <h3 class="font-bold text-blue-900 mb-2">Community Guidelines</h3>
            <p class="text-sm text-gray-600">
              Be kind, respectful, and helpful to other students.
            </p>
          </div>
        </aside>

        <!-- Discussions -->
        <main class="bg-white rounded-xl shadow-lg p-6">

          <div v-if="isLoading" class="text-center text-gray-600 text-lg py-10">
            Loading...
          </div>

          <div v-else-if="hasSearched && communityPosts.length === 0" class="text-center text-gray-600 text-lg py-10">
            No results found for "{{ searchInput }}".
          </div>

          <div v-else>
            <h2 class="text-2xl font-bold text-blue-900 mb-6">
              {{ hasSearched ? `Results for "${searchInput}"` : "Recent Discussions" }}
            </h2>

            <ul class="divide-y divide-gray-100">
              <li
                v-for="post in displayedPosts"
                :key="post.id"
                class="py-5"
              >
                <div class="flex gap-4">
                  <div class="avatar">
                    {{ getInitial(post.author) }}
                  </div>

                  <div class="flex-1">
                    <h3 class="text-lg font-bold text-blue-900 mb-1">
                      {{ post.title }}
                    </h3>

                    <p class="text-gray-600 mb-3">
                      {{ post.description }}
                    </p>

                    <div class="flex flex-wrap gap-2 mb-3">
                      <span class="tag">Community</span>
                      <span class="tag">Student Advice</span>
                    </div>

                    <div class="flex flex-wrap gap-5 text-sm text-gray-500">
                      <span>Posted by {{ post.author }}</span>
                      <span>{{ post.replies || 0 }} replies</span>
                      <span>{{ post.views || 0 }} views</span>
                    </div>
                  </div>
                </div>
              </li>
            </ul>

            <div v-if="totalPages > 1" class="flex justify-between items-center mt-8">
              <button
                @click="goToPrevPage"
                :disabled="currentPage === 1"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50"
              >
                Previous
              </button>

              <span class="text-gray-700">
                Page {{ currentPage }} of {{ totalPages }}
              </span>

              <button
                @click="goToNextPage"
                :disabled="currentPage === totalPages"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-2 rounded-lg transition duration-200 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </main>

        <!-- Right Sidebar -->
        <aside class="space-y-6">
          <div class="bg-white rounded-xl shadow-lg p-5">
            <h3 class="font-bold text-blue-900 mb-4">Trending Topics</h3>

            <ul class="space-y-4 text-sm">
              <li class="trending"><span>1</span> IELTS preparation tips</li>
              <li class="trending"><span>2</span> Top scholarships for 2025</li>
              <li class="trending"><span>3</span> Part-time jobs for students</li>
              <li class="trending"><span>4</span> Study in Australia</li>
              <li class="trending"><span>5</span> SOP writing guide</li>
            </ul>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-5">
            <h3 class="font-bold text-blue-900 mb-4">Suggested Members</h3>

            <div class="space-y-4">
              <div class="member">
                <div class="small-avatar">E</div>
                <div>
                  <p class="font-semibold text-blue-900">Emma Johnson</p>
                  <p class="text-sm text-gray-500">Canada</p>
                </div>
              </div>

              <div class="member">
                <div class="small-avatar">L</div>
                <div>
                  <p class="font-semibold text-blue-900">Liam Chen</p>
                  <p class="text-sm text-gray-500">Australia</p>
                </div>
              </div>

              <div class="member">
                <div class="small-avatar">S</div>
                <div>
                  <p class="font-semibold text-blue-900">Sophia Martinez</p>
                  <p class="text-sm text-gray-500">USA</p>
                </div>
              </div>
            </div>
          </div>
        </aside>

      </div>
    </section>

  </div>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import axios from "axios";

interface CommunityPost {
  id: number;
  title: string;
  description: string;
  author: string;
  replies?: number;
  views?: number;
}

const communityPosts = ref<CommunityPost[]>([]);
const searchInput = ref("");
const isLoading = ref(false);
const hasSearched = ref(false);
const currentPage = ref(1);
const totalPages = ref(1);

const fallbackPosts = ref<CommunityPost[]>([
  {
    id: 1,
    title: "Best universities for Computer Science in Germany?",
    description: "I am planning to study CS in Germany. Can anyone recommend good universities and share their experience?",
    author: "Amira",
    replies: 25,
    views: 1200,
  },
  {
    id: 2,
    title: "How to find fully funded scholarships?",
    description: "I am looking for fully funded Master’s scholarships. Any tips on where to search and how to apply?",
    author: "Sam",
    replies: 18,
    views: 890,
  },
  {
    id: 3,
    title: "Student life in Canada, what should I expect?",
    description: "For those studying in Canada, how is student life there? Any advice for new international students?",
    author: "Maya",
    replies: 12,
    views: 650,
  },
]);

const displayedPosts = computed(() => {
  return hasSearched.value ? communityPosts.value : fallbackPosts.value;
});

const getInitial = (name: string) => {
  return name?.charAt(0).toUpperCase() || "?";
};

const fetchCommunityPosts = async () => {
  if (isLoading.value) return;

  isLoading.value = true;
  hasSearched.value = true;

  try {
    const response = await axios.get("http://localhost:3000/api/community", {
      params: {
        query: searchInput.value,
        page: currentPage.value,
      },
    });

    communityPosts.value = response.data.posts || [];
    totalPages.value = response.data.totalPages || 1;
  } catch (error) {
    console.error("Error fetching community posts:", error);
    communityPosts.value = [];
  } finally {
    isLoading.value = false;
  }
};

const newSearch = () => {
  currentPage.value = 1;
  fetchCommunityPosts();
};

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
    fetchCommunityPosts();
  }
};

const goToPrevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
    fetchCommunityPosts();
  }
};
</script>

<style scoped>
.community-hero-image {
  min-height: 280px;
  border-radius: 20px;
  background:
    linear-gradient(rgba(239, 246, 255, 0.15), rgba(239, 246, 255, 0.15)),
    url("../images/community-hero.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

.category {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #475569;
  padding: 10px 12px;
  border-radius: 10px;
}

.category.active,
.category:hover {
  background: #eff6ff;
  color: #2563eb;
  font-weight: 700;
}

.category span {
  color: #64748b;
}

.avatar {
  width: 48px;
  height: 48px;
  border-radius: 999px;
  background: #dbeafe;
  color: #2563eb;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.small-avatar {
  width: 40px;
  height: 40px;
  border-radius: 999px;
  background: #eff6ff;
  color: #2563eb;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tag {
  background: #eff6ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 600;
  padding: 5px 10px;
  border-radius: 999px;
}

.trending {
  display: flex;
  gap: 10px;
  align-items: center;
  color: #334155;
}

.trending span {
  background: #eff6ff;
  color: #2563eb;
  width: 24px;
  height: 24px;
  border-radius: 999px;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.member {
  display: flex;
  align-items: center;
  gap: 12px;
}
</style>