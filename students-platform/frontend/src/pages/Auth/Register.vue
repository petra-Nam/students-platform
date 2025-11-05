<template>
  <div class="register-container">
    <h1>Register Page</h1>
    <el-form class="register-form">
      <el-form-item label="Full Name">
        <el-input v-model="fullName" />
      </el-form-item>
      <el-form-item label="Email">
        <el-input type="email" v-model="email" />
      </el-form-item>
      <el-form-item label="Password">
        <el-input type="password" v-model="password" show-password />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleRegister">Register</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

// Use ref for v-model
const fullName = ref('');
const email = ref('');
const password = ref('');

const handleRegister = () => {
  console.log('Registering with:', fullName.value, email.value, password.value);
  // Your registration logic will go here
}
</script>

<style scoped>
.register-container {
  width: 100%;
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
  border: 1px solid #eee;
  border-radius: 8px;
}
</style>