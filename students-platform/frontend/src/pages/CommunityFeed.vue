<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
  
      <!-- Header -->
      <div class="max-w-6xl mx-auto px-4 py-12 text-center">
        <p class="inline-block bg-blue-100 text-blue-700 font-semibold px-4 py-2 rounded-full mb-4">
          Community
        </p>
  
        <h1 class="text-5xl font-bold text-blue-900 mb-3">
          {{ communityName }}
        </h1>
  
        <p class="text-lg text-gray-600">
          Discussions inside this community
        </p>
      </div>
  
      <!-- Create Post -->
      <div class="max-w-4xl mx-auto px-4 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h2 class="text-xl font-bold text-blue-900 mb-4">Create Post</h2>
  
          <input
            v-model="newPostTitle"
            placeholder="Post title"
            class="input"
          />
  
          <textarea
            v-model="newPostDescription"
            rows="3"
            placeholder="Share something..."
            class="input"
          ></textarea>
  
          <button
            @click="createPost"
            class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2 rounded-lg"
          >
            Post
          </button>
        </div>
      </div>
  
      <!-- Posts -->
      <div class="max-w-4xl mx-auto px-4 pb-16">
        <div v-if="communityThreads.length === 0" class="bg-white rounded-xl shadow-lg p-10 text-center">
          <p class="text-gray-600">No posts yet in this community.</p>
        </div>
  
        <div v-else class="space-y-6">
          <div
            v-for="thread in communityThreads"
            :key="thread.id"
            class="bg-white rounded-xl shadow-md p-6 border border-blue-100"
          >
            <div class="flex items-center mb-4">
              <div class="avatar mr-3">
                {{ getInitial(thread.user.name) }}
              </div>
  
              <div>
                <p class="font-bold text-blue-900">{{ thread.user.name }}</p>
                <p class="text-sm text-gray-500">Posted in {{ communityName }}</p>
              </div>
            </div>
  
            <h3 class="text-xl font-bold text-blue-800 mb-2">
              {{ thread.title }}
            </h3>
  
            <p class="text-gray-600 mb-4">
              {{ thread.description }}
            </p>
  
            <div class="flex flex-wrap gap-3 items-center border-t border-gray-100 pt-4">
              <button
                @click="likeThread(thread)"
                class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg"
              >
                Like ({{ thread.likes }})
              </button>
  
              <button
                @click="toggleComments(thread)"
                class="bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold px-4 py-2 rounded-lg"
              >
                Comment ({{ thread.comments.length }})
              </button>
  
              <button
                @click="startChat(thread.user)"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-4 py-2 rounded-lg ml-auto"
              >
                Chat
              </button>
            </div>
  
            <!-- Comments -->
            <div v-if="thread.showComments" class="mt-5">
              <ul v-if="thread.comments.length > 0" class="space-y-2 mb-4">
                <li
                  v-for="comment in thread.comments"
                  :key="comment.id"
                  class="bg-gray-50 border border-gray-100 rounded-lg p-4"
                >
                  <p class="text-gray-700">{{ comment.text }}</p>
                </li>
              </ul>
  
              <p v-else class="text-sm text-gray-500 mb-4">
                No comments yet. Be the first to comment.
              </p>
  
              <div>
                <input
                  v-model="newComment"
                  placeholder="Write a comment..."
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
          </div>
        </div>
      </div>
  
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  interface Comment {
    id: number;
    text: string;
  }
  
  interface Thread {
    id: number;
    communityId: number;
    title: string;
    description: string;
    likes: number;
    comments: Comment[];
    showComments: boolean;
    user: {
      id: number;
      name: string;
    };
  }
  
  export default defineComponent({
    name: "CommunityFeed",
  
    data() {
      return {
        newPostTitle: "",
        newPostDescription: "",
        newComment: "",
  
        communities: [
          { id: 1, name: "Study in Germany" },
          { id: 2, name: "Scholarship Seekers" },
          { id: 3, name: "Student Life" },
        ],
  
        threads: [
          {
            id: 1,
            communityId: 1,
            title: "Best cities in Germany?",
            description: "Which cities are best for students?",
            likes: 4,
            comments: [
              { id: 1, text: "I think Heidelberg and Berlin are great student cities." },
            ],
            showComments: false,
            user: { id: 101, name: "John" },
          },
          {
            id: 2,
            communityId: 2,
            title: "DAAD scholarship tips",
            description: "How do I improve my chances?",
            likes: 7,
            comments: [
              { id: 2, text: "Start early and make your motivation letter very specific." },
            ],
            showComments: false,
            user: { id: 102, name: "Jane" },
          },
          {
            id: 3,
            communityId: 1,
            title: "Blocked account confusion",
            description: "I don’t understand the process. Can someone explain it simply?",
            likes: 2,
            comments: [],
            showComments: false,
            user: { id: 103, name: "Alice" },
          },
        ] as Thread[],
      };
    },
  
    computed: {
      communityId(): number {
        return Number(this.$route.params.id);
      },
  
      communityName(): string {
        const community = this.communities.find(
          (community) => community.id === this.communityId
        );
  
        return community ? community.name : "Community";
      },
  
      communityThreads(): Thread[] {
        return this.threads.filter(
          (thread) => thread.communityId === this.communityId
        );
      },
    },
  
    methods: {
      getInitial(name: string) {
        return name.charAt(0).toUpperCase();
      },
  
      createPost() {
        if (!this.newPostTitle.trim() || !this.newPostDescription.trim()) {
          alert("Please fill in the title and description.");
          return;
        }
  
        this.threads.unshift({
          id: Date.now(),
          communityId: this.communityId,
          title: this.newPostTitle,
          description: this.newPostDescription,
          likes: 0,
          comments: [],
          showComments: false,
          user: { id: 1, name: "You" },
        });
  
        this.newPostTitle = "";
        this.newPostDescription = "";
      },
  
      likeThread(thread: Thread) {
        thread.likes++;
      },
  
      toggleComments(thread: Thread) {
        thread.showComments = !thread.showComments;
      },
  
      addComment(thread: Thread) {
        if (!this.newComment.trim()) return;
  
        thread.comments.push({
          id: Date.now(),
          text: this.newComment,
        });
  
        this.newComment = "";
      },
  
      startChat(user: { id: number }) {
        this.$router.push(`/messages/${user.id}`);
      },
    },
  });
  </script>
  
  <style scoped>
  .input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 10px;
    margin-bottom: 12px;
    outline: none;
  }
  
  .input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
  
  .avatar {
    width: 44px;
    height: 44px;
    border-radius: 999px;
    background: #dbeafe;
    color: #2563eb;
    font-weight: 800;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>