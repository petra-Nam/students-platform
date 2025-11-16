<template>
  <div class="nav-container">

    <el-menu
        v-if="!isMobile"
        :default-active="activeIndex"
        class="el-menu-demo"
        mode="horizontal"
        :ellipsis="false"
        @select="handleSelect"
    >
      <el-menu-item index="0">LOGO</el-menu-item>
      <el-menu-item index="1">Community</el-menu-item>

      <el-sub-menu index="2">
        <template #title>Study opportunities</template>
        <el-menu-item index="2-1">Search Universities</el-menu-item>
        <el-menu-item index="2-2">Search Scholarships</el-menu-item>
      </el-sub-menu>

      <div class="right-desktop">
        <template v-if="!isLoggedIn">
          <el-button text>Login</el-button>
          <el-button type="primary">Register</el-button>
        </template>
        <template v-else>
          <el-dropdown>
            <span class="user-name">{{ userName }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Dashboard</el-dropdown-item>
                <el-dropdown-item>Logout</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </div>
    </el-menu>

    <div v-else class="mobile-header">
      <el-button @click="drawerMenu = true" circle>
        <el-icon><Menu /></el-icon>
      </el-button>

      <el-button @click="drawerAccount = true" circle>
        <el-icon><User /></el-icon>
      </el-button>
    </div>

    <el-drawer v-model="drawerMenu" title="Menu" direction="ltr" size="260px">
      <el-menu :default-active="activeIndex" @select="handleSelect">
        <el-menu-item index="1">Community</el-menu-item>
        <el-sub-menu index="2">
          <template #title>Discover</template>
          <el-menu-item index="2-1">Search Universities</el-menu-item>
          <el-menu-item index="2-2">Search Scholarships</el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-drawer>

    <el-drawer v-model="drawerAccount" title="Account" direction="rtl" size="260px">
      <template v-if="!isLoggedIn">
        <el-button type="primary" class="w-100 mb-2">Login</el-button>
        <el-button style="margin-left:0px" class="w-100 mb-2">Register</el-button>
      </template>

      <template v-else>
        <p>Welcome, <b>{{ userName }}</b></p>
        <el-button class="w-100 mb-2">Dashboard</el-button>
        <el-button type="danger" class="w-100">Logout</el-button>
      </template>
    </el-drawer>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Menu, User } from '@element-plus/icons-vue'

const activeIndex = ref('1')

const drawerMenu = ref(false)
const drawerAccount = ref(false)

const isMobile = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

const isLoggedIn = ref(false)
const userName = ref("John Doe")

const handleSelect = (key: string) => {
  console.log("Selected:", key)
  drawerMenu.value = false
  drawerAccount.value = false
}
</script>


<style scoped>
.nav-container {
  width: 100%;
}

.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}

.right-desktop {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right:10px;
}

.mobile-header {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: 8px;
}

.user-name {
  padding: 0 10px;
  cursor: pointer;
}

.w-100 {
  width: 100%;
}
.mb-2 {
  margin-bottom: 10px;
}
</style>

