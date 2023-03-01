

import { defineComponent } from "vue";
import { ElImage } from 'element-plus'


// 废弃
export default defineComponent({
    props: {
        block: { type: Object },
        size: { type: Object }
    },
    setup(props) {
        console.log('$$$$$$$$', props.block)
        console.log('^^^^^^', props.size)
        console.log('^^^^^^', props.size.height)
        console.log('^^^^^^', props.size.width)
        return () => {
            return <ElImage src={(props.block.url) || 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'}
                style={{ height: props.size.height + "px", width: props.size.width + "px" }}></ElImage>
        }
    }
})