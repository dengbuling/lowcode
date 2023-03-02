<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
  <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
  <Editor v-model="state.data2"></Editor>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Editor from './packages/editor.jsx'
import data2 from './data.json'
import { computed, provide, reactive, ref } from 'vue'
import {registerConfig} from './utils/editor-config.jsx'


export default {
  name: 'App',
  components: {
    // HelloWorld,
    Editor,
    // data2
  },
  setup(){
    provide('config',registerConfig)

    const data4 = computed({
      get(){
        return data2
      },
      set(value){
        // data2 = JSON.parse(JSON.stringify(value))
        data2 = value
      }
    })

    console.log(data4.value)

    const state = reactive({
      data2
    })

    // const data3 = reactive({
    //   state:data4
    // })
    return{
      // data2,
      // data3,
      data4,
      state
    }
  }
}
</script>

<style lang="scss">
// #app {
//   font-family: Avenir, Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
//   margin-top: 60px;
// }
</style>
