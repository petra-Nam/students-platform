<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
    <div class="max-w-4xl mx-auto px-4 py-10">
      <!-- Profile Section -->
      <div class="bg-white rounded-xl shadow-lg p-10 mb-10">
        <div class="flex items-center space-x-6">
          <!-- Profile Picture -->
          <img
            :src="user.profilePicture"
            alt="Profile Picture"
            class="w-24 h-24 rounded-full"
          />
          <div>
            <h1 class="text-3xl font-bold text-blue-800">{{ user.name }}</h1>
            <p class="text-lg text-gray-600">{{ user.bio }}</p>
            <p class="text-sm text-gray-500">{{ user.study }}</p>
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="mt-6 flex space-x-4">
          <button
            v-if="isOwnProfile"
            @click="editProfile"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg transition duration-200"
          >
            Edit Profile
          </button>
          <button
            v-else
            @click="sendMessage"
            class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg transition duration-200"
          >
            Message
          </button>
        </div>
      </div>

      <!-- Recent Posts Section -->
      <div class="bg-white rounded-xl shadow-lg p-10">
        <h2 class="text-2xl font-bold text-blue-800 mb-6">Recent Posts</h2>
        <ul class="space-y-6">
          <li
            v-for="post in user.posts"
            :key="post.id"
            class="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <h3 class="text-xl font-bold text-blue-700 mb-2">{{ post.title }}</h3>
            <p class="text-gray-600 mb-4">{{ post.description }}</p>
            <div class="flex justify-between items-center">
              <button
                @click="viewPost(post.id)"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-lg transition duration-200"
              >
                View
              </button>
              <div v-if="isOwnProfile" class="flex space-x-4">
                <button
                  @click="editPost(post.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-lg transition duration-200"
                >
                  Edit
                </button>
                <button
                  @click="deletePost(post.id)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg transition duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

interface Post {
  id: number;
  title: string;
  description: string;
}

interface User {
  id: number;
  name: string;
  profilePicture: string;
  bio: string;
  study: string;
  posts: Post[];
}

export default defineComponent({
  name: 'UserProfile',
  data() {
    return {
      user: {
        id: 101,
        name: 'John Doe',
        profilePicture: 'https://via.placeholder.com/150',
        bio: 'Aspiring Data Scientist | Passionate about AI and ML',
        study: 'MSc in Data Science at XYZ University',
        posts: [
          {
            id: 1,
            title: 'How to apply for scholarships?',
            description: 'Let’s discuss the best ways to apply for scholarships.',
          },
          {
            id: 2,
            title: 'Best universities for computer science',
            description: 'Share your thoughts on the top universities for CS.',
          },
        ],
      } as User,
      isOwnProfile: true, // Set to false if viewing someone else's profile
    };
  },
  methods: {
    editProfile() {
      alert('Navigating to edit profile page...');
      // Implement navigation to edit profile page
    },
    sendMessage() {
      alert(`Sending a message to ${this.user.name}...`);
      // Implement messaging functionality
    },
    viewPost(postId: number) {
      alert(`Viewing post with ID: ${postId}`);
      // Implement navigation to the post details page
    },
    editPost(postId: number) {
      alert(`Editing post with ID: ${postId}`);
      // Implement post editing functionality
    },
    deletePost(postId: number) {
      if (confirm('Are you sure you want to delete this post?')) {
        this.user.posts = this.user.posts.filter((post) => post.id !== postId);
      }
    },
  },
});
</script>

<style scoped>
/* General styling for the page */
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #ebf8ff, #bee3f8);
}

.text-center {
  text-align: center;
}

.text-blue-800 {
  color: #2c5282;
}

.text-blue-700 {
  color: #2b6cb0;
}

.text-gray-600 {
  color: #718096;
}

.text-gray-700 {
  color: #4a5568;
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.hover\:shadow-md:hover {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.transition-shadow {
  transition: box-shadow 0.2s;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.space-y-6 > :not(:last-child) {
  margin-bottom: 1.5rem;
}
</style>