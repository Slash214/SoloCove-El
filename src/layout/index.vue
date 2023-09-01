<template>
  <el-container class="layout">
    <el-aside :style="{ 'width': useStore.isCollapse ? '70px' : '240px'}"><menus></menus></el-aside>
    <el-container class="main">
      <el-header>
        <headers></headers>
      </el-header>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script setup lang="ts">
import menus from './menus/index.vue'
import headers from './headers/index.vue'
import { useMenuStore } from '@/store/menu'

const useStore = useMenuStore()


</script>

<style scoped lang="scss">
.layout {
  width: 100vw;
  height: 100vh;
  overflow: hidden;

  .el-aside {
    color: #fff;
    overflow-x: hidden;
    transition: width cubic-bezier(0, 1.03, 0.1, 1.13) 0.3s;
  }

  .main {
    .el-header {
      width: 100%;
      height: 70px;
      background-color: #fff;
    }

    .el-main {
      min-height: 80vh;
    }
  }
}
</style>
