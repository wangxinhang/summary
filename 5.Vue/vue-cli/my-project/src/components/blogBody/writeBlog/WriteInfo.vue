b<!-- 第一部分：html -->
<template>
  <div id="writeInfo">
    <div id="login">
      <!-- 3.使用全局组件 -->
      <HelloWorld :ms="HelloWorldMsg" />
      <!-- 3.使用局部组件 -->
      <TwoLevel :lists="users" :threeLevelMsg="msg" @changeTitle="updateTitle($event)" />
      <!-- 3.使用局部组件 -->
      <Footer />
      <div>{{$store.getters.addPower}}</div>
      
      <div
        v-for="(item,index) in $store.getters.moreStuAge(11)"
        :key="index"
      >{{ item.name }}:{{item.age}}</div>
    </div>
  </div>
</template>

<!-- 第二部分：处理逻辑 -->
<script>
import TwoLevel from "./components/content/TwoLevel"; /* 1.导出组件 */
import Footer from "./components/Footer"; /* 1.导出组件 */

export default {
  name: "WriteInfo",
  data() {
    return {
      //1.父往子传递数据，利用属性绑定以及props属性进行传值
      users: [
        { name: "wang", age: 20, position: "程序员", show: false },
        { name: "xin", age: 20, position: "设计员", show: false },
        { name: "hang", age: 20, position: "工程师", show: false }
      ],
      msg: "我是三级局部组件",
      HelloWorldMsg: "Hello Vue,我是一个全局组件"
    };
  },
  components: {
    TwoLevel: TwoLevel, //2.注册成局部组件
    Footer: Footer //2.注册成局部组件
  },
  //2.子往父传递数据，利用$emit()触发自定义事件进行传值
  methods: {
    updateTitle(data) {
      this.HelloWorldMsg = data;
    }
  },
  created() {
    // 获取远程数据,该操作须在created钩子函数中，
    this.$http.get("http://jsonplaceholder.typicode.com/users").then(data => {
      // console.log(data.body);
      // this.users = data.body;
    });
  }
};
</script>

<!-- 第三部分：样式 -->
<style scope>
</style>
