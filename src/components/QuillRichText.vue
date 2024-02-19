<template>
    <div class="editor-box">
        <div class="options">
            <el-button @click="getContent" class="save" type="primary" size="small">保存内容</el-button>
        </div>
        <div ref="editorContainer" class="editor"></div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.core.css'

const emit = defineEmits(['content'])
const editorContainer = ref<HTMLElement | null>(null)
let quillInstance: Quill | null = null

const props = defineProps({
    type: {
        type: String,
        default: 'delta'
    }
})

onMounted(() => {
    if (editorContainer.value) {
        initQuill(editorContainer.value)
    }
})

const initQuill = (container: HTMLElement) => {
    const toolbarOptions = [
        ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],
        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction
        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],
        ['clean'], // remove formatting button
    ]
    quillInstance = new Quill(container, {
        theme: 'snow',
        placeholder: '平等表达，友善交流',
        modules: {
            toolbar: toolbarOptions,
            history: {
                delay: 2000,
                maxStack: 200,
            },
        },
    })
}

const getContent = () => {
    let content: any = null
    if (quillInstance) {
        if (props.type === 'delta') {
            content = quillInstance.getContents()
        } else if (props.type === 'html') {
            content = editorContainer.value?.innerHTML
        } else if (props.type === 'text') {
            content = quillInstance.getText()
        }
    }

    emit('content', content)
}

</script>

<style lang="scss" scoped>
.editor-box {
    position: relative;
    .editor {
        background-color: #fff;
        width: 100%;
        height: 80vh;
    }
    .options {
        background-color: #EAF1F3;
        border: 1px solid #CCCCCC;
        border-bottom: none;
        padding: 10px 15px;
    }
}
</style>
