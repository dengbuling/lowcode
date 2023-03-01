<template>
    <ElIcon :size="25">
        <slot name="icon"></slot>
    </ElIcon>
    <span class="tab-pane-title">{{ data }}</span>
</template>
<script>
import { ElIcon } from "element-plus";
import { computed } from "vue";
export default {
    name: "EditorTab",
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
.tab-pane-title {
    font-size: 12px;
    white-space: normal;
}
</style>
<style>
.editor-left .el-tabs__header {
    background: #2882e0;
    border: 0;
}
.editor-left .el-tabs__header.is-left {
    width: 40px;
    margin-right: 0;
}
.editor-left .el-tabs__item.is-left.is-left.is-active {
    background: #ffffff;
    border: 0;
    color: #353140;
}
.editor-left .el-tabs__item.is-left {
    line-height: 15px;
    border: 0;
    height: auto;
    padding: 8px;
    color: #fff;
    box-sizing: border-box;
}
.editor-left .el-tabs--left .el-tabs__item.is-left {
    display: flex;
    flex-direction: column;
}
.editor-left .el-tabs.el-tabs--left {
    height: 100%;
}
.editor-left .el-tab-pane{
    height: 100%;
}
.editor-left .el-tabs__active-bar {
    display: none;
}
.editor-left .el-tabs__content {
    height: 100%;
}
</style>