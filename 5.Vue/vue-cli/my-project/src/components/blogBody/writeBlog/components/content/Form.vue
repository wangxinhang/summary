<template>
  <div>
    <form>
      <div>
        <label>博客标题：</label>
        <input type="text" v-model="msg.title">
      </div>
      <div>
        <label>博客内容：</label>
        <textarea cols="30" rows="10" v-model="msg.content"></textarea>
      </div>
      <div>
        <label>技术分类：</label>
        <input type="radio" name="checked" value="vue.js" v-model="msg.category">vue.js
        <input type="radio" name="checked" value="react.js" v-model="msg.category">react.js
        <input type="radio" name="checked" value="angular.js" v-model="msg.category">angular.js
      </div>
      <button @click.prevent="post">提交</button>
      <p v-if="show">提交成功</p>
    </form>
  </div>
</template>

<script>
export default {
  name: "Form",
  data() {
    return {
      msg: {
        title: "",
        content: "",
        category: ""
      },
      show: false
    };
  },
  methods: {
    post() {
      // 发送数据到远程服务器
      // this.$http
      //   .post("http://jsonplaceholder.typicode.com/posts", {
      //     text: this.msg.title,
      //     content: this.msg.content,
      //     category: this.msg.category,
      //     userId: 1
      //   })
      //   .then(data => {
      //     console.log(data);
      //     if (data.status === 201) {
      //       this.show = true;
      //     }
      //   });
      // 发送数据到Bmob云数据库
      // const query = Bmob.Query("tblBlogs");
      // query.set("title", this.msg.title);
      // query.set("content", this.msg.content);
      // query.set("category", this.msg.category);
      //     console.log(1);

      // query
      //   .save()
      //   .then(res => {
      //     console.log(res);
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
      console.log(1);

      const query = Bmob.Query("tblBlogs");
      query.find().then(res => {
        console.log(res);
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
