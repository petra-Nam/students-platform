<script setup lang="ts">
// You can leave the script setup blank for now
</script>

<template>
  <div id="app-shell">
    <header style="padding: 1rem; border-bottom: 1px solid #eee;">
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/dashboard">Dashboard</router-link>
    </header>

    <main style="padding: 2rem;">
      
      <router-view />
    </main>
  </div>
</template>

<style scoped>
/* You can keep your global styles, or add new ones */
header { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; }
main { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; }
</style>