<template>
    <div>
        <quill-rich-text :type="'html'" @content="getContent"></quill-rich-text>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'

onMounted(() => { })

const getContent = (val: any) => {
    console.log(val)
}
</script>

<style scoped>
.editor {
    background-color: #fff;
    width: 100%;
    height: 80vh;
}
</style>
