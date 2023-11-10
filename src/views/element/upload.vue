<template>
	<div class="container">
      <div>
		<p class="mb2">图片卡片模式上传</p>
		<upload-file @getUploadFile="getImageList"></upload-file>
	</div>
	</div>
</template>

<script setup lang="ts">

const getImageList = (files: any) => {
	console.log('获取的图片数组', files)
}

</script>

<style scoped lang="scss">
.container {
	background-color: #fff;
	padding: 20px;
}
</style>