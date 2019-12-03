<template>
  <div>
    <p>{{msg}}</p>
  </div>
</template>

<script>
export default {
  name: "ThreeLevel",
  props: {
    msg: {
      type: String
    }
  },
  data() {
    return {};
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
p {
  background-color: pink;
  color: white;
}
</style>
