<template>
    <div class="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 py-12">
      <div class="max-w-3xl mx-auto px-4">
        <div class="bg-white rounded-2xl shadow-lg p-8">
  
          <h1 class="text-3xl font-bold text-blue-900 mb-2">Edit Profile</h1>
          <p class="text-gray-500 mb-8">Update your personal information and profile photo.</p>
  
          <!-- Photo Upload -->
          <div class="flex items-center gap-6 mb-8">
            <img
              :src="profile.profilePicture"
              alt="Profile picture"
              class="w-28 h-28 rounded-full object-cover border-4 border-blue-100"
            />
  
            <div>
              <label
                for="profilePhoto"
                class="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold px-5 py-2 rounded-lg cursor-pointer"
              >
                Change Photo
              </label>
  
              <input
                id="profilePhoto"
                type="file"
                accept="image/*"
                class="hidden"
                @change="handlePhotoUpload"
              />
  
              <p class="text-sm text-gray-500 mt-2">
                JPG, PNG, or WEBP recommended.
              </p>
            </div>
          </div>
  
          <!-- Form -->
          <form @submit.prevent="saveProfile" class="space-y-5">
            <div>
              <label class="label">Full Name</label>
              <input
                v-model="profile.name"
                placeholder="Your full name"
                class="input"
              />
            </div>
  
            <div>
              <label class="label">Bio</label>
              <input
                v-model="profile.bio"
                placeholder="Short bio"
                class="input"
              />
            </div>
  
            <div>
              <label class="label">Study / Program</label>
              <input
                v-model="profile.study"
                placeholder="Your study program"
                class="input"
              />
            </div>
  
            <div>
              <label class="label">About Me</label>
              <textarea
                v-model="profile.about"
                rows="5"
                placeholder="Tell others more about you..."
                class="input resize-none"
              ></textarea>
            </div>
  
            <div class="flex justify-between items-center pt-4">
              <button
                type="button"
                @click="goBack"
                class="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold px-6 py-3 rounded-lg"
              >
                Cancel
              </button>
  
              <button
                type="submit"
                class="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-lg"
              >
                Save Changes
              </button>
            </div>
          </form>
  
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "EditProfile",
  
    data() {
      return {
        profile: {
          name: "John Doe",
          bio: "Aspiring Data Scientist | Passionate about AI and ML",
          study: "MSc in Data Science at XYZ University",
          about: "I love learning, technology, scholarships, and helping other students.",
          profilePicture: "https://via.placeholder.com/150",
        },
      };
    },
  
    methods: {
      handlePhotoUpload(event: Event) {
        const input = event.target as HTMLInputElement;
        const file = input.files?.[0];
  
        if (!file) return;
  
        this.profile.profilePicture = URL.createObjectURL(file);
      },
  
      saveProfile() {
        alert("Profile updated successfully!");
        this.$router.push("/profile/101");
      },
  
      goBack() {
        this.$router.back();
      },
    },
  });
  </script>
  
  <style scoped>
  .label {
    display: block;
    font-weight: 700;
    color: #0f2a5f;
    margin-bottom: 8px;
  }
  
  .input {
    width: 100%;
    padding: 12px 16px;
    border: 1px solid #d1d5db;
    border-radius: 12px;
    outline: none;
  }
  
  .input:focus {
    border-color: #2563eb;
    box-shadow: 0 0 0 2px #bfdbfe;
  }
  </style>