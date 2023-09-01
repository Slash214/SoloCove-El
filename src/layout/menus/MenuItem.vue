<template>
    <el-sub-menu v-if="menu.haveSon" :index="menu.path" :show-timeout="0" :hide-timeout="0">
        <template #title>
            <el-icon :color="'#ffffff'">
              <component :is="menu.icon"></component>
            </el-icon>
            <span class="ml20">{{ menu.title }}</span>
        </template>
        <menu-item v-for="(val, index) of menu?.children" :menu="val" :key="index"></menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="menu.path">
        <el-icon :color="'#ffffff'">
          <component :is="menu.icon"></component>
        </el-icon>
        <template #title>
            <span class="ml20">{{ menu.title }}</span>
        </template>
    </el-menu-item>
</template>

<script setup lang="ts">
defineProps({
    menu: {
        type: Object,
        required: true,
    },
})
</script>

<style scoped>
.ml20 {
    margin-left: 10px;
}
</style>
