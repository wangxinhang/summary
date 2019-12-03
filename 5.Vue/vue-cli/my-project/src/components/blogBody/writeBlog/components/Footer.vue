
<template>
  <footer>{{msg}}</footer>
</template>

<script>
export default {
  name: "HelloVue",
  data () {
    return {
      msg:"初始化数据"
    }
  },
  mounted() {
    this.eventBus.$on("send", (msg) => {
      this.msg = msg;
    });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
footer {
  background-color: blueviolet;
  color: white;
  text-align: center;
  line-height: 50px;
  height: 50px;
  font-size: 24px;
}
</style>
