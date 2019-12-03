
<template>
  <div>
    <ul>
      <li><router-link to='/showBlog'>展示blog</router-link></li>
      <li><router-link to='/writeBlog'>写blog</router-link></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "blog-header"
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul::after{
  content: ".";
  height: 0;
  visibility: hidden;
  display: block;
  clear: both;
}
li{
  float: left;
  list-style: none;
  margin-left:20px ;

}
</style>
