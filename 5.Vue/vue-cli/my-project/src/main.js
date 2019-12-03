// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import Vue from 'vue'
import App from './App'
import router from './router/index'
import store from "@/store/index";

import Resource from 'vue-resource' /* vue已不在支持该插件，首先安装cnpm install vue-resource --save,其次import引入，最后使用Vue.use(Resouce) */
// import Resource from 'axios' /* 首先安装cnpm install axios --save,其次import引入 */
import HelloWorld from './components/blogBody/writeBlog/components/HelloWorld' /* 1.导出组件 */

Vue.config.productionTip = false
Vue.component('HelloWorld', HelloWorld) /* 2.注册全局组件,就可以在任何vue实例内进行使用 */
Vue.prototype.eventBus = new Vue() /* 2.添加事件车，为了子组件往子组件传递数据 */

// 1.利用npm进行安装Bmob：cnpm install hydrogen-js-sdk并引入Bmob
import Bmob from 'hydrogen-js-sdk'
// 2.初始化
Bmob.initialize("c35bc5905607524afc4c905fb6b6fd15", "6ca28bcfef50ff7e02c8f9a9bc714e2f")
// 3.挂载到全局使用
Vue.prototype.Bmob = Bmob


// 使用路由以及http工具
Vue.use(Resource)
//自定义指令(此为全局指令)
Vue.directive("randomColor", {
  bind(el, binds, vnode) {
    el.style.fontWeight = "bold",
      el.style.color = "#" + Math.random().toString(10).slice(3, 6)
  }
})
Vue.directive("width", {
  bind(el, binds, vnode) {
    if (binds.value == "wide") {
      el.style.width = "100%"
    } else if (binds.value == "narrow") {
      el.style.width = "80%"
    }
  }
})
//自定义过滤器(此为全局过滤器，也可以定义局部的)
// Vue.filter("toUpperCase",function (value) {  
//   return value.toUpperCase();
// })
/* eslint-disable no-new */
// var store = {
//   debug: true,
//   state: {
//     message: 'Hello!'
//   },
//   setMessageAction (newValue) {
//     if (this.debug) console.log('setMessageAction triggered with', newValue)
//     this.state.message = newValue
//   },
//   clearMessageAction () {
//     if (this.debug) console.log('clearMessageAction triggered')
//     this.state.message = ''
//   }
// }

new Vue({
  el: '#app',
  data : {
    
  },
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
