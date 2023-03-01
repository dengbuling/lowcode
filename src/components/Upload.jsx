import { defineComponent } from "vue";
import {reactive} from "vue";

export default defineComponent({
    setup(){
        let dataSet = reactive({
            // uploadUrl: baseurl+'/api/common/upload',
            // addfrom:{
                image:'',
                image2:"88888888888"
            // }
        })
        return ()=>{
            return <div>{dataSet.image2}</div>
        }
    }
})