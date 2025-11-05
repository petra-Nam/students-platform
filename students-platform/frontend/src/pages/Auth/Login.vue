<template>
  <div class="login-container">
    <h1>Login Page</h1>
    <el-form class="login-form">
      <el-form-item label="Email">
        <el-input type="email" v-model="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleLogin">Login</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Use ref for v-model
const email = ref('');
const password = ref('');

const handleLogin = () => {
  console.log('Logging in with:', email.value, password.value);
  // Logic for logging in will go here
}
</script>

<style scoped>
.login-container {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>