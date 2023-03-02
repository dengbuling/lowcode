import { createApp } from 'vue'
import App from './App.vue'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

// 引入组件样式
import 'vant/lib/index.css';

import { Button } from 'vant';
import { Tab, Tabs } from 'vant';

const app = createApp(App)

app.use(ElementPlus)
app.use(Button);
app.use(Tab);
app.use(Tabs);
app.mount('#app')
