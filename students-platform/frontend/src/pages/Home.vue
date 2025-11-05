<template>
  <div class="home-container">
    <el-card shadow="never" class="welcome-card">
      <template #header>
        <h1>Welcome to the International Student Compass!</h1>
      </template>
      <p>Your all-in-one platform to find universities, scholarships, and connect with a community of students from around the world.</p>
    </el-card>

    <el-row :gutter="20" class="feature-row">
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>🎓 Find Universities</span>
            </div>
          </template>
          <p>Search our database of universities and programs.</p>
          <el-button type="primary" @click="goToSearch">Start Searching</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card shadow="hover">
          <template #header>
            <div class="card-header">
              <span>💬 Join the Community</span>
            </div>
          </template>
          <p>Ask questions and share your experiences with peers.</p>
          <el-button type="primary" @click="goToCommunity">Browse Discussions</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goToSearch = () => {
  //  need to create a '/search' route in your router/index.ts
  // router.push('/search'); 
  console.log('Navigating to search page...');
}

const goToCommunity = () => {
  // need to create a '/community' route
  // router.push('/community');
  console.log('Navigating to community page...');
}
</script>

<style scoped>
.home-container {
  width: 100%;
  max-width: 960px; /* Homepages are usually wider */
  margin: 2rem auto;
}

.welcome-card {
  text-align: center;
}

.feature-row {
  margin-top: 2rem;
}

.card-header {
  font-weight: bold;
}
</style>