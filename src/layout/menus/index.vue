<template>
    <el-menu
        router
        class="layout-menu custom-menu"
        :style="{ width: useStore.isCollapse ? '70px' : '240px' }"
        :default-active="activeMenu"
        :default-openeds="openeds"
        :collapse="useStore.isCollapse"
        :collapse-transition="false"
        :background-color="menuBackgroundColor"
        :text-color="menuTextColor"
    >
        <div class="logo">
            <div v-if="!useStore.isCollapse" class="logo-info">
                <img src="@/assets/images/logo.png" alt="logo" />
                <p class="logo-text">SOLOCOVE</p>
            </div>
            <img v-else class="logo-images" src="@/assets/images/logo.png" alt="logo" />
        </div>
        <menu-item v-for="(item, key) in allRoutes" :menu="item" :key="key"></menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import MenuItem from './MenuItem.vue'
import { useMenuStore } from '@/store/menu'
import { MenuRoute } from '@/types'
const route = useRoute()
const router = useRouter()
const useStore = useMenuStore()

const menuBackgroundColor = '#1a2942'
const menuTextColor = '#bbbbbb'

// 默认打开菜单
const openeds = ['/']
const allRoutes: any = ref([])

onMounted(() => {
    const itemRoute: any = router.options.routes
    allRoutes.value = genMenuList(itemRoute)
    // console.error('格式', allRoutes.value)
})

type ListItemType = MenuRoute & { icon?: string }

const genMenuList = (list: MenuRoute[], basePath?: string): ListItemType[] => {
    if (!list || list.length === 0) return []

    list.sort((a, b) => {
        return (b.meta?.orderNo || 0) - (a.meta?.orderNo || 0)
    })

    return list
        .map(item => {
            const path = basePath && !item.path.includes(basePath) ? `${basePath}/${item.path}` : item.path
            const len = genMenuList(item.children, path).length || 0
            // console.warn(item)
            return {
                path,
                title: item.meta?.title,
                icon: item.meta?.icon,
                children: genMenuList(item.children, path),
                meta: item.meta,
                redirect: item?.redirect || '',
                haveSon: len > 1 ? true : false,
            }
        })
        .filter(item => item.meta && item.meta.hidden !== true)
}

const activeMenu = computed(() => {
    const { meta, path } = route
    if (meta.activeMenu) return '/'
    else return path
})
</script>

<style scoped lang="scss">
$width: 240px;
$widths: 100px;
.layout-menu {
    height: 100%;
    border-left: 1px solid #bbb;
    background-color: #1a2942;
    color: #2a384f;
    // background: linear-gradient(120deg, #3494e6, #ec6ead);
    // background: linear-gradient(120deg, #74ebd5, #9face6);
    animation: gradientAnimation 3s ease infinite;
    .logo {
        // background: linear-gradient(120deg, #3494e6, #ec6ead);
        color: #6cce25;

        display: flex;
        align-items: center;
        justify-content: center;
        animation: gradientAnimation 3s ease infinite;
        height: 70px;
        background-size: 200% 200%;
        .logo-info {
            display: flex;
            align-items: center;
            justify-content: center;
            img {
                width: 40px;
                height: 40px;
            }
            .logo-text {
                font-size: 24px;
                padding-left: 6px;
            }
        }
        .logo-images {
            width: 40px;
            height: 40px;
        }
    }
    @keyframes gradientAnimation {
        0% {
            background-position: 0% 50%;
        }
        50% {
            background-position: 100% 50%;
        }
        100% {
            background-position: 0% 50%;
        }
    }
}

::v-deep .el-menu-item {
    color: #bbbbbb;
}

::v-deep .el-submenu .el-menu-item.is-active {
    background-color: #3b4b68;
}

::v-deep .el-menu-item.is-active {
    color: #fff;
    background-color: #2a384f;
}
</style>
