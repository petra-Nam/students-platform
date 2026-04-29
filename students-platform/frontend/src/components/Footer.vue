<template>
  <el-footer class="bg-blue-50 py-10">

    <div class="max-w-6xl mx-auto bg-white rounded-xl shadow-lg p-8">

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">

        <!-- Logo + Description -->
        <div class="flex flex-col">
          <img src="../images/logo.png" alt="Logo" class="w-28 mb-3">
          <h3 class="text-lg font-bold text-blue-800 mb-2">
            International Student Compass
          </h3>
          <p class="text-sm text-gray-600 leading-relaxed">
            Your guide to scholarships, universities, online courses, and a supportive community.
          </p>
        </div>

        <!-- Links -->
        <div>
          <h3 class="font-semibold text-blue-800 mb-3">Easy Links</h3>
          <ul class="flex flex-col gap-2">
            <li><el-link href="/" class="text-blue-600 hover:underline">Home</el-link></li>
            <li><el-link href="/community" class="text-blue-600 hover:underline">Feed</el-link></li>
            <li><el-link href="/universities" class="text-blue-600 hover:underline">Search Universities</el-link></li>
            <li><el-link href="/scholarships" class="text-blue-600 hover:underline">Search Scholarships</el-link></li>
          </ul>
        </div>

        <!-- Support -->
        <div>
          <h3 class="font-semibold text-blue-800 mb-3">Support</h3>
          <ul class="flex flex-col gap-2">
            <li><el-link href="/support" class="text-blue-600 hover:underline">Report a problem</el-link></li>
          </ul>
        </div>

      </div>

      <!-- Divider -->
      <div class="border-t border-gray-200 mt-8 pt-4 text-center">
        <p class="text-sm text-gray-500">
          © 2025 International Student Compass. All rights reserved.
        </p>
      </div>

    </div>

  </el-footer>
</template>