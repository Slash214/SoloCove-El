<template>
    <div>
        <el-upload
            v-model:file-list="fileList"
            :action="actionUrl"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            accept="image/*"
            :limit="1"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>
    </div>
</template>

<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'
import { ref, defineEmits } from 'vue'
import { UPLOAD_URL } from '@/common/contanst'
const actionUrl = UPLOAD_URL

const emits = defineEmits(['getUploadFile'])

/**
 * 是否开启压缩 目前还没有开发compress
 * limit 限制图片数量
 */
const props = defineProps({
    compress: {
        type: Boolean,
        default: false,
    },
    limit: {
        type: Number,
        default: 1,
    },
})

const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = () => {
    const files = formatImageList(fileList.value)
    emits('getUploadFile', files)
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    const files = formatImageList(fileList.value)
    emits('getUploadFile', files)
}

const beforeUpload: UploadProps['beforeUpload'] = async rawFile => {
    console.log(rawFile)
    return true
}

/**
 * 格式化图片 返回图片数组
 * @param data 
 */
const formatImageList = (fileList: any) => {
    const array = []
    for (let item of fileList) {
        let { name, uid, status, response } = item || {}
        // 我这里的图片上传成功的结构就是这样，具体以你的为准
        const url = response?.data?.url
        array.push({ name, uid, status, url })
    }
    return array
}
</script>

<style lang="scss" scoped></style>
