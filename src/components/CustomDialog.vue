<template>
    <teleport to="#dialogs">
        <el-dialog
            v-if="!destroyOnClose || localVisible"
            v-model="localVisible"
            :title="dialogTitle"
            :width="dialogWidth"
            :close-on-click-modal="false"
            :before-close="handleBeforeClose"
        >
            <template>
                <slot name="header">{{ dialogTitle }}</slot>
            </template>
            <slot></slot>
            <template #footer>
                <slot name="footer"></slot>
            </template>
        </el-dialog>
    </teleport>
</template>

<script setup lang="ts">
import useDomCreate from '@/hooks/useDomCreate'
import { watchEffect, ref, defineProps, defineEmits, onBeforeUnmount } from 'vue'

/**
 * @typedef {Object} DialogProps
 * @property {boolean} modelValue - 控制对话框的显示与隐藏
 * @property {string} [title='弹窗标题'] - 对话框标题
 * @property {string|number} [width='50%'] - 对话框宽度
 * @property {Function} [beforeClose] - 对话框关闭前的回调函数，返回 `true` 允许关闭，返回 `false` 阻止关闭
 * @property {boolean} [destroyOnClose=false] - 对话框关闭时是否销毁组件
 */

/** @type {DialogProps} */
const props = defineProps({
    modelValue: {
        required: true,
        type: Boolean,
    },
    dialogTitle: {
        type: String,
        default: '弹窗标题',
    },
    dialogWidth: {
        type: [String, Number],
        default: '50%',
    },
    beforeClose: {
        type: Function,
        default: () => true,
    },
    destroyOnClose: {
        type: Boolean,
        default: false,
    },
})

const localVisible = ref(props.modelValue)

const emits = defineEmits(['update:modelValue'])

// 创建对话框容器
useDomCreate('dialogs')

// 监听外部传入的 modelValue
watchEffect(() => {
    localVisible.value = props.modelValue
})

/**
 * 处理对话框关闭
 * @param {Function} closeDialog - 关闭对话框的函数
 */
const handleBeforeClose = closeDialog => {
    if (props.beforeClose()) {
        closeDialog()
        emits('update:modelValue', false)
    }
}

// 监听本地状态的变化，同步更新外部 modelValue
watchEffect(() => {
    emits('update:modelValue', localVisible.value)
})

// 在组件销毁前取消监听
onBeforeUnmount(() => {
    useDomCreate('dialogs', true)
})
</script>

<style scoped></style>
