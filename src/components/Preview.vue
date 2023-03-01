<template>
    <div class="editor-preview">
        <ElIcon class="editor-preview-icon" :size="20">
            <slot name="icon"></slot>
        </ElIcon>
        <span class="editor-preview-title">{{ data }}</span>
    </div>
</template>
<script>
import { ElIcon } from "element-plus";
import { computed } from "vue";
export default {
    name: "preview",
    components: {
        ElIcon,
    },
    props: {
        title: { type: String },
    },
    setup(props) {
        let data = computed(() => props.title);
        return {
            data,
        };
    },
};
</script>
<style scoped>
.editor-preview {
    display: flex;
    overflow: hidden;
    text-overflow: ellipsis;
    margin: 5px 10px;
    box-sizing: border-box;
    color: #070303;
    flex-direction: column;
    width: 42px;
    cursor: pointer;
}
.editor-preview-icon {
    background: #fff;
    height: 40px;
    width: 40px;
    line-height: 40px;
    border-radius: 5px;
    color: #909090;
    border: 1px solid #d9dbdd;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    margin-bottom: 5px;
}
.editor-preview-icon:hover {
    background: #2882e0;
    color: #ffffff;
}
.editor-preview-title {
    font-size: 12px;
    text-align: center;
}
</style>