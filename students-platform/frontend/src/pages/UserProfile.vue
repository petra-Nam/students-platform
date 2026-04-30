<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-10">
    <div class="max-w-6xl mx-auto px-4">

      <!-- Profile Header -->
      <div class="bg-white rounded-2xl shadow-lg p-8 mb-8">
        <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div class="flex items-center gap-6">
            <img
              :src="user.profilePicture"
              class="w-24 h-24 rounded-full object-cover border-4 border-blue-100"
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

              <div class="flex gap-5 mt-4 text-sm text-gray-600">
                <span><strong class="text-blue-900">{{ user.followers }}</strong> followers</span>
                <span><strong class="text-blue-900">{{ user.following }}</strong> following</span>
                <span><strong class="text-blue-900">{{ user.posts.length }}</strong> posts</span>
              </div>
            </div>
          </div>

          <!-- Own Profile Actions -->
          <div v-if="isOwnProfile" class="flex gap-3">
            <button
              @click="editProfile"
              class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg"
            >
              Edit Profile
            </button>
          </div>

          <!-- Other Profile Actions -->
          <div v-else class="flex gap-3">
            <button
              @click="toggleFollow"
              :class="[
                'font-bold px-6 py-2 rounded-lg transition',
                isFollowing
                  ? 'bg-green-100 text-green-700 hover:bg-green-200'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              ]"
            >
              {{ isFollowing ? 'Following' : 'Follow' }}
            </button>

            <button
              @click="sendMessage"
              class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-6 py-2 rounded-lg"
            >
              Chat
            </button>
          </div>
        </div>
      </div>

      <!-- Own Profile Dashboard -->
      <div v-if="isOwnProfile" class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        <main class="space-y-8">
          <!-- My Posts -->
          <section class="bg-white rounded-2xl shadow-lg p-8">
            <h2 class="text-2xl font-bold text-blue-900 mb-6">My Posts</h2>

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

                  <div class="flex gap-3">
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
          </section>
        </main>

        <aside class="space-y-8">
          <!-- My Communities -->
          <section class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-blue-900 mb-4">My Communities</h2>

            <ul class="space-y-3">
              <li
                v-for="community in user.communities"
                :key="community"
                class="bg-blue-50 text-blue-700 font-semibold px-4 py-3 rounded-lg"
              >
                {{ community }}
              </li>
            </ul>
          </section>

          <!-- My Friends -->
          <section class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-blue-900 mb-4">My Friends</h2>

            <div class="space-y-4">
              <div
                v-for="friend in user.friends"
                :key="friend.id"
                class="flex items-center justify-between"
              >
                <div class="flex items-center gap-3">
                  <img :src="friend.profilePicture" class="w-10 h-10 rounded-full object-cover" />
                  <p class="font-semibold text-blue-900">{{ friend.name }}</p>
                </div>

                <button
                  @click="goToProfile(friend.id)"
                  class="text-blue-600 font-bold text-sm"
                >
                  View
                </button>
              </div>
            </div>
          </section>
        </aside>
      </div>

      <!-- Other User Profile -->
      <div v-else class="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-8">

        <main class="bg-white rounded-2xl shadow-lg p-8">
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

              <button
                @click="viewPost(post.id)"
                class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg"
              >
                View Post
              </button>
            </li>
          </ul>
        </main>

        <aside class="space-y-8">
          <section class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-blue-900 mb-4">Basic Info</h2>

            <div class="space-y-3 text-gray-600">
              <p><strong class="text-blue-900">Study:</strong> {{ user.study }}</p>
              <p><strong class="text-blue-900">Country:</strong> {{ user.country }}</p>
              <p><strong class="text-blue-900">Interests:</strong> {{ user.interests.join(', ') }}</p>
            </div>
          </section>

          <section class="bg-white rounded-2xl shadow-lg p-6">
            <h2 class="text-xl font-bold text-blue-900 mb-4">Communities</h2>

            <ul class="space-y-3">
              <li
                v-for="community in user.communities"
                :key="community"
                class="bg-blue-50 text-blue-700 font-semibold px-4 py-3 rounded-lg"
              >
                {{ community }}
              </li>
            </ul>
          </section>
        </aside>
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

interface Friend {
  id: number;
  name: string;
  profilePicture: string;
}

interface User {
  id: number;
  name: string;
  profilePicture: string;
  bio: string;
  study: string;
  country: string;
  interests: string[];
  followers: number;
  following: number;
  posts: Post[];
  communities: string[];
  friends: Friend[];
}

export default defineComponent({
  name: "UserProfile",

  data() {
    return {
      currentUserId: 101,
      isFollowing: false,

      users: [
        {
          id: 101,
          name: "John Doe",
          profilePicture: "https://via.placeholder.com/150",
          bio: "Aspiring Data Scientist | Passionate about AI and ML",
          study: "MSc in Data Science at XYZ University",
          country: "Germany",
          interests: ["Scholarships", "Computer Science", "Study Abroad"],
          followers: 245,
          following: 180,
          communities: ["Study in Germany", "Scholarship Seekers"],
          friends: [
            {
              id: 102,
              name: "Jane Smith",
              profilePicture: "https://via.placeholder.com/150",
            },
            {
              id: 103,
              name: "Alice Johnson",
              profilePicture: "https://via.placeholder.com/150",
            },
          ],
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
        },
        {
          id: 102,
          name: "Jane Smith",
          profilePicture: "https://via.placeholder.com/150",
          bio: "Software Engineer helping students understand tech careers",
          study: "BSc Computer Science",
          country: "Canada",
          interests: ["Computer Science", "Career", "Applications"],
          followers: 89,
          following: 55,
          communities: ["University Applications", "Computer Science Abroad"],
          friends: [],
          posts: [
            {
              id: 3,
              title: "How I chose my CS university",
              description: "Here are the things I checked before choosing my program.",
            },
          ],
        },
        {
          id: 103,
          name: "Alice Johnson",
          profilePicture: "https://via.placeholder.com/150",
          bio: "International student sharing honest study abroad tips",
          study: "BA International Relations",
          country: "Australia",
          interests: ["Student Life", "Visa", "Travel"],
          followers: 132,
          following: 99,
          communities: ["Student Life", "Visa Support Circle"],
          friends: [],
          posts: [
            {
              id: 4,
              title: "Things I wish I knew before moving abroad",
              description: "A few practical lessons from my first semester.",
            },
          ],
        },
      ] as User[],
    };
  },

  computed: {
    routeUserId(): number {
      return Number(this.$route.params.id) || this.currentUserId;
    },

    isOwnProfile(): boolean {
      return this.routeUserId === this.currentUserId;
    },

    user(): User {
      return (
        this.users.find((user) => user.id === this.routeUserId) ||
        this.users[0]
      );
    },
  },

  watch: {
    "$route.params.id"() {
      this.isFollowing = false;
    },
  },

  methods: {
    editProfile() {
      this.$router.push("/edit-profile");
    },

    toggleFollow() {
      this.isFollowing = !this.isFollowing;

      if (this.isFollowing) {
        this.user.followers++;
      } else {
        this.user.followers--;
      }
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

    goToProfile(userId: number) {
      this.$router.push(`/profile/${userId}`);
    },
  },
});
</script>