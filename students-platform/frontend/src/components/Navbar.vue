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
      <el-menu-item index="0">
        <el-link href="/"><img src="../images/logo-2-1.png" alt="Logo" class="w-32 mb-2"></el-link>
      </el-menu-item>

      <el-menu-item index="1">
        <el-link href="/community" type="text">Community</el-link>
      </el-menu-item>

      <el-sub-menu index="2">
        <template #title>Study Opportunities</template>
        <el-menu-item index="2-1">
          <el-link href="/universities" type="text">Search Universities</el-link>
        </el-menu-item>
        <el-menu-item index="2-2">
          <el-link href="/scholarships" type="text">Search Scholarships</el-link>
        </el-menu-item>
      </el-sub-menu>

      <div class="right-desktop">
        <template v-if="!session.isAuthenticated">
          <el-button text @click="navigate('/login')">Login</el-button>
          <el-button type="primary" @click="navigate('/register')">Register</el-button>
        </template>

        <template v-else>
          <el-dropdown>
            <span class="user-name">{{ session.user?.name }}</span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="navigate('/dashboard')">Dashboard</el-dropdown-item>
                <el-dropdown-item @click="logout">Logout</el-dropdown-item>
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
        <el-menu-item index="1">
          <el-link href="/community" type="text">Community</el-link>
        </el-menu-item>
        <el-sub-menu index="2">
          <template #title>Discover</template>
          <el-menu-item index="2-1">
            <el-link href="/universities" type="text">Search Universities</el-link>
          </el-menu-item>
          <el-menu-item index="2-2">
            <el-link href="/scholarships" type="text">Search Scholarships</el-link>
          </el-menu-item>
        </el-sub-menu>
      </el-menu>
    </el-drawer>

    <el-drawer v-model="drawerAccount" title="Account" direction="rtl" size="260px">
      <template v-if="!session.isAuthenticated">
        <el-button type="primary" class="w-100 mb-2" @click="navigate('/login')">Login</el-button>
        <el-button class="w-100 mb-2" @click="navigate('/register')">Register</el-button>
      </template>

      <template v-else>
        <p>Welcome, <b>{{ session.user?.name }}</b></p>
        <el-button class="w-100 mb-2" @click="navigate('/dashboard')">Dashboard</el-button>
        <el-button type="danger" class="w-100" @click="logout">Logout</el-button>
      </template>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { Menu, User } from '@element-plus/icons-vue'
import { useActiveMenu } from '../composables/useActiveMenu'
import { useNavigation } from '../composables/useNavigation'
import { useAuth } from '../composables/useAuth'
import { useSessionStore } from '../store/session'

const { activeIndex } = useActiveMenu()
const { navigate } = useNavigation()

const { logout } = useAuth()


const session = useSessionStore()

const drawerMenu = ref(false)
const drawerAccount = ref(false)
const isMobile = ref(false)

const checkScreen = () => {
  isMobile.value = window.innerWidth < 768
}

onMounted(() => {
  session.restoreSession()

  checkScreen()
  window.addEventListener('resize', checkScreen)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreen)
})

const handleSelect = () => {
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
  padding-right: 10px;
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
