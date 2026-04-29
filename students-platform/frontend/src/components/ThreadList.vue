<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">

    <div class="max-w-6xl mx-auto px-4 py-16 text-center">
      <h1 class="text-5xl font-bold text-blue-900 mb-4">
        Community Threads
      </h1>
      <p class="text-xl text-gray-700 max-w-2xl mx-auto">
        Ask questions, share experiences, and connect with students.
      </p>
    </div>

    <div class="max-w-6xl mx-auto px-4 mb-8">
      <div class="bg-white rounded-xl shadow-lg p-6">
        <input
          v-model="searchQuery"
          @input="filterThreads"
          placeholder="Search threads (e.g., scholarships, universities)"
          class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 mb-10">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-blue-900 mb-5">Create a Post</h2>

        <form @submit.prevent="createPost">
          <input
            v-model="newPostTitle"
            placeholder="Enter post title"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            v-model="newPostDescription"
            placeholder="Enter post description"
            rows="4"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>

          <button
            type="submit"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg transition duration-200"
          >
            Post
          </button>
        </form>
      </div>
    </div>

    <div class="max-w-6xl mx-auto px-4 pb-16">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <ul class="space-y-6">
          <li
            v-for="thread in filteredThreads"
            :key="thread.id"
            class="p-6 border border-blue-100 rounded-xl shadow-sm hover:shadow-md transition duration-200 bg-white"
          >
            <div class="flex items-center mb-4">
              <img
                :src="thread.user.profilePicture"
                alt="Profile Picture"
                class="w-12 h-12 rounded-full mr-4 cursor-pointer object-cover"
                @click="goToProfile(thread.user.id)"
              />

              <div>
                <h3
                  class="text-lg font-bold text-blue-900 cursor-pointer"
                  @click="goToProfile(thread.user.id)"
                >
                  {{ thread.user.name }}
                </h3>
                <p class="text-sm text-gray-500">{{ thread.user.title }}</p>
              </div>
            </div>

            <h4 class="text-2xl font-bold text-blue-800 mb-2">
              {{ thread.title }}
            </h4>

            <p class="text-gray-600 mb-4">
              {{ thread.description }}
            </p>

            <div class="flex flex-wrap gap-2 mb-4">
              <span
                v-for="tag in thread.tags"
                :key="tag"
                class="bg-blue-100 text-blue-700 text-sm font-medium px-3 py-1 rounded-full"
              >
                {{ tag }}
              </span>
            </div>

            <div class="flex justify-between items-center">
              <div class="flex space-x-4">
                <button
                  @click="likeThread(thread)"
                  class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg transition duration-200"
                >
                  Like ({{ thread.likes }})
                </button>

                <button
                  @click="toggleComments(thread)"
                  class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg transition duration-200"
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

            <div v-if="thread.showComments" class="mt-5">
              <ul class="space-y-2">
                <li
                  v-for="comment in thread.comments"
                  :key="comment.id"
                  class="bg-gray-50 border border-gray-100 rounded-lg p-4"
                >
                  <p class="text-gray-700">{{ comment.text }}</p>
                </li>
              </ul>

              <div class="mt-4">
                <input
                  v-model="newComment"
                  placeholder="Add a comment..."
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <button
                  @click="addComment(thread)"
                  class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg mt-2"
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
      this.$router.push(`/messages/${user.id}`);
      // Implement chat functionality here
    },
  },
  mounted() {
    this.filteredThreads = this.threads;
  },
});
</script>

