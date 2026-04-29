<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="bg-white rounded-2xl shadow-lg overflow-hidden h-[720px] flex">

        <!-- Sidebar -->
        <aside class="w-1/3 border-r border-blue-100 bg-white overflow-y-auto">
          <div class="p-5 border-b border-blue-100">
            <h2 class="text-2xl font-bold text-blue-900">Messages</h2>
            <p class="text-sm text-gray-500 mt-1">Your student conversations</p>
          </div>

          <ul>
            <li
              v-for="conversation in conversations"
              :key="conversation.id"
              @click="selectConversation(conversation)"
              :class="[
                'flex items-center p-4 cursor-pointer transition',
                selectedConversation?.id === conversation.id
                  ? 'bg-blue-50'
                  : 'hover:bg-gray-50'
              ]"
            >
              <img
                :src="conversation.user.profilePicture"
                alt="Profile Picture"
                class="w-12 h-12 rounded-full mr-4 object-cover"
              />

              <div class="min-w-0">
                <h3 class="text-base font-bold text-blue-900 truncate">
                  {{ conversation.user.name }}
                </h3>
                <p class="text-sm text-gray-500 truncate">
                  {{ conversation.latestMessage }}
                </p>
              </div>
            </li>
          </ul>
        </aside>

        <!-- Chat Window -->
        <main class="flex-1 flex flex-col">
          <template v-if="selectedConversation">
            <!-- Header -->
            <div class="bg-white border-b border-blue-100 p-5 flex items-center">
              <img
                :src="selectedConversation.user.profilePicture"
                alt="Profile Picture"
                class="w-11 h-11 rounded-full mr-4 object-cover"
              />

              <div>
                <h2 class="text-lg font-bold text-blue-900">
                  {{ selectedConversation.user.name }}
                </h2>
                <p class="text-sm text-green-600">Online</p>
              </div>
            </div>

            <!-- Messages -->
            <div class="flex-1 overflow-y-auto p-6 bg-blue-50/40 space-y-4">
              <div
                v-for="message in selectedConversation.messages"
                :key="message.id"
                :class="message.senderId === currentUser.id ? 'text-right' : 'text-left'"
              >
                <div
                  :class="[
                    'inline-block px-4 py-3 rounded-2xl max-w-[70%] text-sm leading-relaxed',
                    message.senderId === currentUser.id
                      ? 'bg-blue-600 text-white rounded-br-sm'
                      : 'bg-white text-gray-700 rounded-bl-sm shadow-sm'
                  ]"
                >
                  {{ message.text }}
                </div>
              </div>
            </div>

            <!-- Input -->
            <div class="bg-white border-t border-blue-100 p-4 flex items-center gap-3">
              <input
                v-model="newMessage"
                @keyup.enter="sendMessage"
                placeholder="Type a message..."
                class="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
              />

              <button
                @click="sendMessage"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition"
              >
                Send
              </button>
            </div>
          </template>

          <!-- Empty State -->
          <div v-else class="flex-1 flex items-center justify-center bg-blue-50/40">
            <div class="text-center">
              <div class="text-5xl mb-4">💬</div>
              <h2 class="text-2xl font-bold text-blue-900 mb-2">
                Select a conversation
              </h2>
              <p class="text-gray-500">
                Choose a student from the left to start chatting.
              </p>
            </div>
          </div>
        </main>

      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

interface Message {
  id: number;
  senderId: number;
  text: string;
}

interface Conversation {
  id: number;
  user: {
    id: number;
    name: string;
    profilePicture: string;
  };
  latestMessage: string;
  messages: Message[];
}

export default defineComponent({
  name: "Messages",

  data() {
    return {
      currentUser: {
        id: 1,
        name: "John Doe",
      },

      conversations: [
        {
          id: 1,
          user: {
            id: 2,
            name: "Jane Smith",
            profilePicture: "https://via.placeholder.com/150",
          },
          latestMessage: "Hey, how are you?",
          messages: [
            { id: 1, senderId: 1, text: "Hi Jane!" },
            { id: 2, senderId: 2, text: "Hey, how are you?" },
          ],
        },
        {
          id: 2,
          user: {
            id: 3,
            name: "Alice Johnson",
            profilePicture: "https://via.placeholder.com/150",
          },
          latestMessage: "Let's catch up soon!",
          messages: [
            { id: 1, senderId: 1, text: "Hi Alice!" },
            { id: 2, senderId: 3, text: "Let's catch up soon!" },
          ],
        },
      ] as Conversation[],

      selectedConversation: null as Conversation | null,
      newMessage: "",
    };
  },

  mounted() {
    const routeUserId = Number(this.$route.params.id);

    if (routeUserId) {
      let conversation = this.conversations.find(
        (conversation) => conversation.user.id === routeUserId
      );

      if (!conversation) {
        conversation = {
          id: Date.now(),
          user: {
            id: routeUserId,
            name: `User ${routeUserId}`,
            profilePicture: "https://via.placeholder.com/150",
          },
          latestMessage: "Start a new conversation",
          messages: [],
        };

        this.conversations.unshift(conversation);
      }

      this.selectedConversation = conversation;
    } else {
      this.selectedConversation = this.conversations[0] || null;
    }
  },

  methods: {
    selectConversation(conversation: Conversation) {
      this.selectedConversation = conversation;
      this.$router.push(`/messages/${conversation.user.id}`);
    },

    sendMessage() {
      if (!this.newMessage.trim() || !this.selectedConversation) return;

      this.selectedConversation.messages.push({
        id: Date.now(),
        senderId: this.currentUser.id,
        text: this.newMessage,
      });

      this.selectedConversation.latestMessage = this.newMessage;
      this.newMessage = "";
    },
  },
});
</script>