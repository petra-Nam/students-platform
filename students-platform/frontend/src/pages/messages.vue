<template>
  <div class="min-h-screen bg-gray-100 flex">
    <!-- Sidebar -->
    <div class="w-1/3 bg-white border-r border-gray-300 overflow-y-auto">
      <div class="p-4">
        <h2 class="text-xl font-bold text-gray-800">Messages</h2>
      </div>
      <ul>
        <li
          v-for="conversation in conversations"
          :key="conversation.id"
          @click="selectConversation(conversation)"
          class="flex items-center p-4 hover:bg-gray-100 cursor-pointer"
        >
          <img
            :src="conversation.user.profilePicture"
            alt="Profile Picture"
            class="w-12 h-12 rounded-full mr-4"
          />
          <div>
            <h3 class="text-lg font-bold text-gray-800">{{ conversation.user.name }}</h3>
            <p class="text-sm text-gray-600 truncate">{{ conversation.latestMessage }}</p>
          </div>
        </li>
      </ul>
    </div>

    <!-- Chat Window -->
    <div class="flex-1 flex flex-col">
      <div class="bg-white border-b border-gray-300 p-4 flex items-center">
        <img
          v-if="selectedConversation"
          :src="selectedConversation.user.profilePicture"
          alt="Profile Picture"
          class="w-10 h-10 rounded-full mr-4"
        />
        <h2 v-if="selectedConversation" class="text-lg font-bold text-gray-800">
          {{ selectedConversation.user.name }}
        </h2>
      </div>

      <!-- Messages -->
      <div class="flex-1 overflow-y-auto p-4 bg-gray-50">
        <div
          v-for="message in selectedConversation?.messages"
          :key="message.id"
          :class="{
            'text-right': message.senderId === currentUser.id,
            'text-left': message.senderId !== currentUser.id,
          }"
          class="mb-4"
        >
          <div
            :class="{
              'bg-blue-500 text-white': message.senderId === currentUser.id,
              'bg-gray-200 text-gray-800': message.senderId !== currentUser.id,
            }"
            class="inline-block px-4 py-2 rounded-lg max-w-xs"
          >
            {{ message.text }}
          </div>
        </div>
      </div>

      <!-- Message Input -->
      <div class="bg-white border-t border-gray-300 p-4 flex items-center">
        <input
          v-model="newMessage"
          placeholder="Type a message..."
          class="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          @click="sendMessage"
          class="ml-4 bg-blue-500 hover:bg-blue-600 text-white font-bold px-6 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

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
      ],
      selectedConversation: null as null | {
        id: number;
        user: {
          id: number;
          name: string;
          profilePicture: string;
        };
        latestMessage: string;
        messages: { id: number; senderId: number; text: string }[];
      },
      newMessage: "",
    };
  },
  methods: {
    selectConversation(conversation: {
      id: number;
      user: {
        id: number;
        name: string;
        profilePicture: string;
      };
      latestMessage: string;
      messages: { id: number; senderId: number; text: string }[];
    }) {
      this.selectedConversation = conversation;
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

<style scoped>
/* Add styles for the messages page */
</style>