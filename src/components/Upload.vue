<template>
    <el-upload
        class="avatar-uploader"
        action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
        :show-file-list="false"
        :on-change="UploadImage"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
        :auto-upload="false"
    >
        <el-image v-if="data" :src="data" class="avatar"></el-image>
        <el-icon v-else class="avatar-uploader-icon"><UploadFilled /></el-icon>
        <!-- <div v-else>5555555</div> -->

    </el-upload>
</template>

<script>
import { computed, onMounted } from "vue";
import { ElUpload, ElImage, ElIcon } from "element-plus";
import { Upload } from "@element-plus/icons-vue";
import { EditPen, Picture, PictureFilled, UploadFilled, SwitchButton, Grid, Tickets, List } from '@element-plus/icons-vue'

export default {
    name: "Upload",
    components: {
        ElUpload,
        ElImage,
        ElIcon,
        UploadFilled
        
    },
    props: {
        modelValue: { type: String },
        propConfig: { type: Object },
    },
    emits: ["update:modelValue"],
    setup(props, context) {
        let data = computed({
            get() {
                return (
                    props.modelValue
                    // props.modelValue ||"https://puui.qpic.cn/vupload/0/1573555382625_bhp0wud8l6w.png/0"
                );
            },
            set(newvalue) {
                context.emit("update:modelValue",JSON.parse(JSON.stringify(newvalue)));
            },
        });

        onMounted(() => {
            // console.log('组件挂载了')
        });

        function UploadImage(file, files) {
            // console.log('上传的图片',file);
            // console.log('上传的图片列表',files);

            let fileReader;
            if (window.FileReader) {
                fileReader = new FileReader();
            } else {
                alert("你的浏览器不支持读取文件");
            }
            fileReader.readAsDataURL(files[files.length - 1].raw);
            fileReader.onload = () => {
                // console.log("图片读取结果", fileReader.result);
                data.value = fileReader.result;
            };
        }

        const handleAvatarSuccess = (res) => {
            console.log("图片上传成功", res);
        };
        function beforeAvatarUpload(rawFile) {
            if (rawFile.size / 1024 / 1024 > 10) {
                ElMessage.error("单张图片大小不能超过10MB!");
                return false;
            }
            return true;
        }
        return {
            handleAvatarSuccess,
            beforeAvatarUpload,
            UploadImage,
            data,
            Upload,
            UploadFilled
        };
    },
};
</script>
<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>

