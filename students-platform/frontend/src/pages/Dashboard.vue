<template>
  <div class="dashboard-container">
    <el-card shadow="never">
      <template #header>
        <div class="card-header">
          <h1>User Dashboard</h1>
        </div>
      </template>

      <el-alert 
        title="Welcome to your dashboard!" 
        type="success"
        description="This is where you'll find your saved universities, scholarships, and community posts."
        :closable="false"
      />

      </el-card>
  </div>
</template>

<script setup lang="ts">
// Logic for the dashboard will go here
// e.g., fetching user data from your Pinia store
</script>

<style scoped>
.dashboard-container {
  width: 100%;
  max-width: 800px; /* Dashboards are often wider */
  margin: 2rem auto;
}

.card-header h1 {
  margin: 0;
  font-size: 1.5rem;
}
</style>