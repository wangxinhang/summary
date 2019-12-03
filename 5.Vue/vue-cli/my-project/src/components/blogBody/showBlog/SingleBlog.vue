<!-- 第一部分：html -->
<template>
  <div id="singleBlog">
    <h4>{{blog.title}}</h4>
    <p>{{blog.body}}</p>
  </div>
</template>

<!-- 第二部分：处理逻辑 -->
<script>
export default {
  name: "SingleBlog",
  data() {
    return {
      // id:this.$route.params.id,
      id: this.$route.query.id,
      blog: {}
    };
  },
  created() {
    // 获取远程数据,该操作须在created钩子函数中，
    this.$http
      .get("http://jsonplaceholder.typicode.com/posts/" + this.id.toString())
      .then(data => {
        console.log(data.body);
        this.blog = data.body;
      });
  }
};
</script>

<!-- 第三部分：样式 -->
<style scope>
</style>
