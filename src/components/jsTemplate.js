

const getJS = (document) => {

    let jsTemplate = `
        import Vue from 'vue'
        import VueRouter from 'vue-router'
        import '../../utils/rem'
        import 'babel-polyfill'
        import index from './index.vue'
        import { Tab, Tabs } from 'vant'
        import 'vant/lib/index.css'
        Vue.use(Tab)
        Vue.use(Tabs)
        Vue.use(VueRouter)
        const router = new VueRouter({
            routes: [
                {
                    path: '/',
                    redirect: '/index'
                },
                {
                    path: '/index',
                    component: index,
                    meta: {
                        title: ''
                    }
                }
            ],
            // 跳转到新页面，展示的是新页面的顶部开始而不是底部
            scrollBehavior (to, from, savedPosition) {
                if (savedPosition) {
                    return savedPosition
                } else {
                    return { x: 0, y: 0 }
                }
            }
        })
        router.beforeEach((to, from, next) => {
            /* 路由发生变化修改页面title */
            if (to.meta.title) {
                document.title = to.meta.title
            }
            next()
        })
        new Vue({
            router: router
        }).$mount('#${document}')
`
    return jsTemplate
}


export { getJS }





