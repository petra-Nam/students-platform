<template>
  <nav class="bg-blue-50 shadow-md py-6 border-b border-custom-grayBorder">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex justify-start space-x-12">
        <a href="/" class="text-custom-textDark hover:text-primary-blue font-sans font-medium text-lg">Home</a>
        <a href="/login" class="text-custom-textDark hover:text-primary-blue font-sans font-medium text-lg">Login</a>
        <a href="/register" class="text-custom-textDark hover:text-primary-blue font-sans font-medium text-lg">Register</a>
        <a href="/dashboard" class="text-custom-textDark hover:text-primary-blue font-sans font-medium text-lg">Dashboard</a>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Navbar'
}
</script>