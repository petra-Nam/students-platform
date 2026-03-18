<template>
  <div class="min-h-screen bg-gradient-to-br from-purple-50 to-purple-100">
    <!-- Search Bar -->
    <div class="max-w-6xl mx-auto px-4 py-6">
      <input
        v-model="searchQuery"
        @input="filterThreads"
        placeholder="Search threads (e.g., scholarships, universities)"
        class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
      />
    </div>

    <!-- Form for creating new posts -->
    <div class="max-w-6xl mx-auto px-4 mb-10">
      <div class="bg-white rounded-xl shadow-lg p-10">
        <h2 class="text-3xl font-bold text-purple-800 mb-6">Create a Post</h2>
        <form @submit.prevent="createPost">
          <div class="mb-4">
            <input
              v-model="newPostTitle"
              placeholder="Enter post title"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
            />
          </div>
          <div class="mb-4">
            <textarea
              v-model="newPostDescription"
              placeholder="Enter post description"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
              rows="4"
            ></textarea>
          </div>
          <button
            type="submit"
            class="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-3 rounded-lg transition duration-200"
          >
            Post
          </button>
        </form>
      </div>
    </div>

    <!-- List of threads -->
    <div class="max-w-6xl mx-auto px-4">
      <div class="bg-white rounded-xl shadow-lg p-10">
        <ul class="space-y-6">
          <li
            v-for="thread in filteredThreads"
            :key="thread.id"
            class="p-6 border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            <div class="flex items-center mb-4">
              <!-- Profile Picture -->
              <img
                :src="thread.user.profilePicture"
                alt="Profile Picture"
                class="w-12 h-12 rounded-full mr-4 cursor-pointer"
                @click="goToProfile(thread.user.id)"
              />
              <!-- User Name -->
              <div>
                <h3
                  class="text-lg font-bold text-purple-700 cursor-pointer"
                  @click="goToProfile(thread.user.id)"
                >
                  {{ thread.user.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ thread.user.title }}</p>
              </div>
            </div>

            <!-- Thread Content -->
            <h4 class="text-2xl font-bold text-purple-700 mb-2">
              {{ thread.title }}
            </h4>
            <p class="text-gray-600 mb-4">
              {{ thread.description }}
            </p>

            <!-- Tags -->
            <div class="flex space-x-2 mb-4">
              <span
                v-for="tag in thread.tags"
                :key="tag"
                class="bg-purple-100 text-purple-700 text-sm font-medium px-2 py-1 rounded"
              >
                {{ tag }}
              </span>
            </div>

            <!-- Actions -->
            <div class="flex justify-between items-center">
              <div class="flex space-x-4">
                <button
                  @click="likeThread(thread)"
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-lg transition duration-200"
                >
                  Like ({{ thread.likes }})
                </button>
                <button
                  @click="toggleComments(thread)"
                  class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-4 py-2 rounded-lg transition duration-200"
                >
                  Comment ({{ thread.comments.length }})
                </button>
              </div>
              <button
                @click="startChat(thread.user)"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg transition duration-200"
              >
                Chat
              </button>
            </div>

            <!-- Comments Section -->
            <div v-if="thread.showComments" class="mt-4">
              <ul class="space-y-2">
                <li
                  v-for="comment in thread.comments"
                  :key="comment.id"
                  class="border border-gray-200 rounded-lg p-4"
                >
                  <p class="text-gray-700">{{ comment.text }}</p>
                </li>
              </ul>
              <div class="mt-4">
                <input
                  v-model="newComment"
                  placeholder="Add a comment..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  @click="addComment(thread)"
                  class="bg-purple-600 hover:bg-purple-700 text-white font-bold px-6 py-2 rounded-lg mt-2"
                >
                  Post Comment
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

interface Thread {
  id: number;
  title: string;
  description: string;
  user: {
    id: number;
    name: string;
    profilePicture: string;
    title: string;
  };
  tags: string[];
  likes: number;
  comments: { id: number; text: string }[];
  showComments: boolean;
}

export default defineComponent({
  name: 'ThreadList',
  data() {
    return {
      threads: [
        {
          id: 1,
          title: 'How to apply for scholarships?',
          description: 'Let’s discuss the best ways to apply for scholarships.',
          user: {
            id: 101,
            name: 'John Doe',
            profilePicture: 'https://via.placeholder.com/150',
            title: 'Student at XYZ University',
          },
          tags: ['Scholarships', 'Education'],
          likes: 5,
          comments: [{ id: 1, text: 'Great post!' }],
          showComments: false,
        },
        {
          id: 2,
          title: 'Best universities for computer science',
          description: 'Share your thoughts on the top universities for CS.',
          user: {
            id: 102,
            name: 'Jane Smith',
            profilePicture: 'https://via.placeholder.com/150',
            title: 'Software Engineer',
          },
          tags: ['Universities', 'Computer Science'],
          likes: 3,
          comments: [],
          showComments: false,
        },
        {
          id: 3,
          title: 'Tips for studying abroad',
          description: 'What are the best tips for students planning to study abroad?',
          user: {
            id: 103,
            name: 'Alice Johnson',
            profilePicture: 'https://via.placeholder.com/150',
            title: 'International Student',
          },
          tags: ['Study Abroad', 'Tips'],
          likes: 8,
          comments: [{ id: 2, text: 'Very helpful!' }],
          showComments: false,
        },
      ],
      searchQuery: '',
      filteredThreads: [] as Thread[],
      newPostTitle: '',
      newPostDescription: '',
      newComment: '',
    };
  },
  methods: {
    createPost() {
      if (!this.newPostTitle || !this.newPostDescription) {
        alert('Please fill in both the title and description.');
        return;
      }

      const newPost = {
        id: this.threads.length + 1,
        title: this.newPostTitle,
        description: this.newPostDescription,
        user: {
          id: Math.floor(Math.random() * 1000), // Simulate user ID
          name: 'New User',
          profilePicture: 'https://via.placeholder.com/150',
          title: 'New Member',
        },
        tags: [],
        likes: 0,
        comments: [],
        showComments: false,
      };

      this.threads.push(newPost);
      this.newPostTitle = '';
      this.newPostDescription = '';
    },
    filterThreads() {
      this.filteredThreads = this.threads.filter((thread) =>
        thread.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        thread.description.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    likeThread(thread: Thread) {
      thread.likes++;
    },
    toggleComments(thread: Thread) {
      thread.showComments = !thread.showComments;
    },
    addComment(thread: Thread) {
      if (this.newComment.trim() === '') return;
      thread.comments.push({ id: Date.now(), text: this.newComment });
      this.newComment = '';
    },
    goToProfile(userId: number) {
      this.$router.push({ name: 'UserProfile', params: { id: userId } });
    },
    startChat(user: { id: number; name: string }) {
      alert(`Starting chat with ${user.name}`);
      // Implement chat functionality here
    },
  },
  mounted() {
    this.filteredThreads = this.threads;
  },
});
</script>

<style scoped>
/* General styling for the page */
.min-h-screen {
  min-height: 100vh;
}

.bg-gradient-to-br {
  background: linear-gradient(to bottom right, #faf5ff, #e9d8fd);
}

.text-center {
  text-align: center;
}

.text-purple-800 {
  color: #6b46c1;
}

.text-purple-700 {
  color: #805ad5;
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