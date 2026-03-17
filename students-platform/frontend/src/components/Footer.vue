<template>
  <el-footer class="bg-gray-100 text-gray-700 pt-10">

    <div class="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mb-6">
      <div class="flex flex-col items-start">
        <img src="../images/logo.png" alt="Logo" class="w-32 mb-2">
        <p class="footer-desc text-sm text-gray-600">
          Your comprehensive guide to studying abroad with scholarships, university information, online courses, and a supportive community.</p>
      </div>

      <div>
        <h3 class="font-semibold mb-3">Easy Links</h3>
        <ul class="flex flex-col gap-2">
          <li><el-link href="/" type="primary">Home</el-link></li>
          <li><el-link href="/community" type="primary">Feed</el-link></li>
          <li><el-link href="/universities" type="primary">Search Universities</el-link></li>
          <li><el-link href="/scholarships" type="primary">Search Scholarships</el-link></li>
        </ul>
      </div>

      <div>
        <h3 class="font-semibold mb-3">Support</h3>
        <ul class="flex flex-col gap-2">
          <li><el-link href="/support" type="primary">Report a problem</el-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-credentials py-4">
      <div class="container mx-auto text-center text-sm text-gray-600">
        &copy; 2025 MyApp. All rights reserved.
      </div>
    </div>
  </el-footer>
</template>

<script setup>

</script>

<style scoped>

.el-footer a:hover {
  text-decoration: underline;
}
</style>
