<template>
    <div class="exercise">
        <codemirror
            v-model:value="data"
            :options="cmOptions"
            @focus="log('focus', $event)"
            @ready="log('ready', $event)"
            @change="log('change', $event)"
            @blur="log('blur', $event)"
        />
    </div>
    <!-- <el-button @click="copy(data)">复制</el-button> -->
</template>

<script>
import Codemirror from "codemirror-editor-vue3";
// 编辑器代码格式
import "codemirror/mode/javascript/javascript.js";
// 自动刷新(防止codemirror需要手动刷新才出数据)
import "codemirror/addon/display/autorefresh";
// 主题
import "codemirror/theme/ayu-mirage.css";

import { computed, onMounted, reactive, ref, toRefs } from "vue";
import { ElButton, ElNotification } from "element-plus";

export default {
    components: {
        Codemirror,
        ElButton,
        ElNotification,
    },
    props: {
        code: { type: Object },
        mode: { type: String },
    },
    setup(props) {
        // 父组件代码
        let data = computed(() => {
            if (props.mode == "application/json") {
                return JSON.stringify(props.code, null, "\t");
            } else {
                return localStorage.getItem("vue");
            }
        });

        // 配置项
        const cmOptions = reactive({
            autoRefresh: true,
            tabSize: 4,
            mode: "text/javascript",
            theme: "ayu-mirage",
            // line: true,
            viewportMargin: Infinity, //处理高度自适应时搭配使用
            highlightDifferences: true,
            autofocus: true,
            indentUnit: 2,
            smartIndent: true,
            readOnly: true, // 只读
            showCursorWhenSelecting: true,
            firstLineNumber: 1,
        });

        onMounted(() => {
            // console.log("组件挂载了");
        });

        const copy = (content) => {
            var input = document.createElement("input"); // 创建input对象
            input.value = orderId; // 设置复制内容
            document.body.appendChild(input); // 添加临时实例
            input.select(); // 选择实例内容
            document.execCommand("Copy"); // 执行复制
            document.body.removeChild(input); // 删除临时实例
            ElNotification({
                message: "复制成功",
                position: "bottom-right",
                type: "success",
            });
        };

        // 返回
        return {
            data,
            copy,
            cmOptions,
            // ...toRefs(options),
            log: console.log,
        };
    },
};
</script>
<style lang="scss">
.exercise {
    font-family: monospace;
    height: 72vh;
    color: black;
    direction: ltr;
}
</style>
