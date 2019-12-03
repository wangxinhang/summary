<!-- 第一部分：html -->
<template>
  <div id="app">
    <blog-header></blog-header>
      <router-view></router-view>
  </div>
</template>

<!-- 第二部分：处理逻辑 -->
<script>
import BlogHeader from "./components/BlogHeader"; /* 1.导出另一个也页面 */
import WriteInfo from "./components/blogBody/writeBlog/WriteInfo"; /* 1.导出另一个也页面 */
import ShowInfo from "./components/blogBody/showBlog/ShowInfo"; /* 1.导出另一个也页面 */

export default {
  name: "App",
  components: {
    BlogHeader //2.注册成局部组件
  }
};
</script>

<!-- 第三部分：样式 -->
<style scope>
</style>
