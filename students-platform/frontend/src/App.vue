<script setup lang="ts">
import { onMounted, ref } from "vue";
const health = ref<any>(null);
onMounted(async () => {
  try {
    const r = await fetch("/api/health");
    health.value = await r.json();
  } catch (e) {
    health.value = { error: String(e) };
  }
});
</script>

<template>
  <main style="padding:2rem">
    <h1>Vue + TS + Docker</h1>
    <p>Dev server proxied to API at <code>/api</code>.</p>
    <pre v-if="health">{{ health }}</pre>
  </main>
</template>

<style scoped>
main { font-family: system-ui, -apple-system, Segoe UI, Roboto, Ubuntu, Cantarell, "Helvetica Neue", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif; }
</style>
