<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
    <div class="max-w-4xl mx-auto px-4">

      <!-- Profile -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-10">
        <div class="flex items-center gap-6">

          <img
            :src="user.profilePicture"
            class="w-24 h-24 rounded-full object-cover"
          />

          <div>
            <h1 class="text-3xl font-bold text-blue-900">
              {{ user.name }}
            </h1>

            <p class="text-gray-600 mt-1">
              {{ user.bio }}
            </p>

            <p class="text-sm text-gray-500 mt-1">
              {{ user.study }}
            </p>
          </div>
        </div>

        <!-- Actions -->
        <div class="mt-6 flex gap-4">
          <button
            v-if="isOwnProfile"
            @click="editProfile"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg"
          >
            Edit Profile
          </button>

          <button
            v-else
            @click="sendMessage"
            class="bg-green-600 hover:bg-green-700 text-white font-bold px-6 py-2 rounded-lg"
          >
            Message
          </button>
        </div>
      </div>

      <!-- Posts -->
      <div class="bg-white rounded-2xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-blue-900 mb-6">
          Recent Posts
        </h2>

        <ul class="space-y-5">
          <li
            v-for="post in user.posts"
            :key="post.id"
            class="border border-blue-100 rounded-xl p-5 shadow-sm hover:shadow-md transition"
          >
            <h3 class="text-xl font-bold text-blue-800 mb-2">
              {{ post.title }}
            </h3>

            <p class="text-gray-600 mb-4">
              {{ post.description }}
            </p>

            <div class="flex justify-between items-center">

              <button
                @click="viewPost(post.id)"
                class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg"
              >
                View
              </button>

              <div v-if="isOwnProfile" class="flex gap-3">
                <button
                  @click="editPost(post.id)"
                  class="bg-yellow-500 hover:bg-yellow-600 text-white font-bold px-4 py-2 rounded-lg"
                >
                  Edit
                </button>

                <button
                  @click="deletePost(post.id)"
                  class="bg-red-500 hover:bg-red-600 text-white font-bold px-4 py-2 rounded-lg"
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
import { defineComponent } from "vue";

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
  name: "UserProfile",

  data() {
    return {
      user: {
        id: 101,
        name: "John Doe",
        profilePicture: "https://via.placeholder.com/150",
        bio: "Aspiring Data Scientist | Passionate about AI and ML",
        study: "MSc in Data Science at XYZ University",
        posts: [
          {
            id: 1,
            title: "How to apply for scholarships?",
            description: "Let’s discuss the best ways to apply for scholarships.",
          },
          {
            id: 2,
            title: "Best universities for computer science",
            description: "Share your thoughts on the top universities for CS.",
          },
        ],
      } as User,

      isOwnProfile: true,
    };
  },

  methods: {
    editProfile() {
      this.$router.push("/edit-profile");
    },

    sendMessage() {
      this.$router.push(`/messages/${this.user.id}`);
    },

    viewPost(postId: number) {
      this.$router.push(`/posts/${postId}`);
    },

    editPost(postId: number) {
      this.$router.push(`/posts/${postId}/edit`);
    },

    deletePost(postId: number) {
      if (confirm("Are you sure you want to delete this post?")) {
        this.user.posts = this.user.posts.filter((post) => post.id !== postId);
      }
    },
  },
});
</script>