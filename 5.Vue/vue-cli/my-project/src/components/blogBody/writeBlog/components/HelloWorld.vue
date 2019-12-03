
<template>
  <header>{{ms}}</header>
</template>

<script>
export default {
  name: "HelloVue",
  props: {
    ms: undefined
  },
  // 生命周期函数示例
  // beforeCreate() {
  //   alert("组件实例化之前执行的函数");
  // },
  // created() {
  //   alert("组件实例化完毕执行的函数，但此时页面还未显示");
  // },
  // beforeMount() {
  //   alert("组件挂载前，页面还未显示，但虚拟DOM已配置");
  // },
  // mounted() {
  //   alert("组件挂载完毕执行的函数，页面显示");
  // },
  // beforeUpdate() {
  //   alert("组件更新前，页面还未显示，但虚拟DOM已配置");
  // },
  // updated() {
  //   alert("组件更新完毕执行的函数，页面显示");
  // }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
header {
  background-color: rgb(0, 255, 55);
  color: white;
  text-align: center;
  line-height: 50px;
  height: 50px;
  font-size: 24px;
}
</style>
