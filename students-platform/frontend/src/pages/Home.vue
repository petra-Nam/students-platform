<template>
  <div class="landing">
    <div class="container">
      <div class="landing-sec">
        <div class="landing-card">
        </div>
      </div>
      <div class="landing-sec">
        <h1 class="animate__animated animate__bounce animate__slower">Find Your Way, Shape Your World.</h1>
        <el-button
            @click="goDown"
            class="animate__animated animate__bounce animate__slower animate__infinite"
            circle
        >
          <el-icon><ArrowDownBold /></el-icon>
        </el-button>
      </div>
    </div>
  </div>
  <div class="home-sec banner">
    <div class="container">
      <p>find opportunities</p>
      <h2>Looking for a University?</h2>
      <div class="banner-img backtoschool animate__animated animate__headShake animate__slower"></div>
      <router-link to="/universities"><el-button size="large"><el-icon><Search /></el-icon> Search for University</el-button></router-link>
    </div>
  </div>
  <div class="home-sec main-sec bordered">
    <div class="container">
      <div class="landing-sec">
        <h2>FAQ</h2>
        <el-collapse :expand-icon-position="position">
          <el-collapse-item title="How can I find universities in a specific country?" name="1">
            <div>
              You can search for universities by name or country using the search bar on the home page or the dedicated University Search page.
            </div>
          </el-collapse-item>
          <el-collapse-item title="What information is available for each university?" name="2">
            <div>
              Search results show the university's name and official website. Clicking on a result takes you to a profile page with more details.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Can I save universities to view later?" name="3">
            <div>
              Yes, logged-in users can save favorite universities, scholarships, and courses to their personal profile for future reference.
            </div>
          </el-collapse-item>
          <el-collapse-item title="How do I contact other students?" name="4">
            <div>
              You can initiate one-on-one chats with other students to ask for advice and send real-time text messages.
            </div>
          </el-collapse-item>
          <el-collapse-item title="Can I post questions to the community?" name="5">
            <div>
              Yes, logged-in users can post new threads, questions, and replies within university community discussion spaces.
            </div>
          </el-collapse-item>
          <el-collapse-item title="How do I register?" name="6">
            <div>
              To create an account, click the "Register" button on the login page. You will need to provide your full name, email address, and create a password that is at least 8 characters long.
            </div>
          </el-collapse-item>
          <el-collapse-item title="I forgot my password. How can I reset it?" name="7">
            <div>
              You can use the "Forgot Password" feature on the login page to initiate a password reset process via email
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>
      <div class="landing-sec">
        <div class="landing-side-img school"></div>
      </div>
    </div>
  </div>
  <div class="home-sec banner">
    <div class="container">
      <p>enroll now</p>
      <h2>Searching for a scholarship?</h2>
      <div class="banner-img scholarship animate__animated animate__headShake animate__slower"></div>
      <router-link to="/universities"><el-button size="large"><el-icon><Search /></el-icon> Search for Scholarships</el-button></router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { CollapseIconPositionType } from 'element-plus'

function goDown() {
  const target = document.querySelector('.home-sec')
  target?.scrollIntoView({ behavior: 'smooth' })
}
</script>