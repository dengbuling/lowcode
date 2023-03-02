<template>
    <Editor v-model="state.blockData"></Editor>
</template>

<script>
import Editor from "./packages/editor.jsx";
import { provide, reactive } from "vue";
import blockData from "./data.json";
import { registerConfig } from "./utils/editor-config.jsx";

export default {
    name: "App",
    components: {
        Editor,
    },
    setup() {
        provide("config", registerConfig);
        const state = reactive({
            blockData,
        });
        return {
            state,
        };
    },
};
</script>