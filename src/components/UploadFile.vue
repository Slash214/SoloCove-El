<template>
    <div>
        <el-upload
            v-model:file-list="fileList"
            :action="actionUrl"
            list-type="picture-card"
            :before-upload="beforeUpload"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
        >
            <el-icon><Plus /></el-icon>
        </el-upload>
    </div>
</template>


<script setup lang="ts">
import { Plus } from '@element-plus/icons-vue'
import { UploadProps, UploadUserFile } from 'element-plus'
import { ref } from 'vue'
import { UPLOAD_URL } from '@/common/contanst'

/**
 * 未开发完成！
 */

const actionUrl = UPLOAD_URL

interface CustomUploadProps {
    compress: boolean
    maxFiles: number
}

const props: CustomUploadProps = {
  compress: false,
  maxFiles: 5,
}


const fileList = ref<UploadUserFile[]>([])

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
    console.log(uploadFile, uploadFiles)
}

const handleSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}

const beforeUpload: UploadProps['beforeUpload'] = async rawFile => {
	if (props.compress) {
		await compressAndUpload(rawFile)
	} else 
    return true
}

const compressAndUpload = async (rawFile: File) => {}
</script>

<style lang="scss" scoped></style>
