import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

import { Button } from 'vant';
import { Tab, Tabs } from 'vant';

// 2. 引入组件样式
import 'vant/lib/index.css';

const app = createApp(App)


app.use(Button);
app.use(ElementPlus)

app.use(Tab);
app.use(Tabs);
app.mount('#app')
