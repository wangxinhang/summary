<template>
  <div class="hello">
    <ul>
      <li @click="toHelloWorldMsg">{{msg}}</li>
      <li v-for="(item,index) in lists" :key="item.obj" @click="item.show=!item.show">
        <p>{{index+1}}</p>
        <div v-show="item.show" @click.stop="getInfo(item)">name:{{item.name}},position:{{item.position}}</div>
      </li>
    </ul>
    <ThreeLevel :msg="threeLevelMsg"></ThreeLevel>
    <Form></Form>  
  </div>
</template>

<script>
import ThreeLevel from "./ThreeLevel"; //导出3级局部组件
import Form from "./Form"; //导出Form组件
export default {
  name: "TwoLevel",
  // props:["lists"],
  props: {
    lists:{
      type:Array,
      required:true  //表示该lists为必传的值，该属性不是必须的
    },
    threeLevelMsg:{
      type:String,
    }
  },
  data() {
    return {
      msg: "蓝色部分是二级局部组件"
    };
  },
  components: {
    ThreeLevel, //注册3级局部组件
    Form //注册3级局部组件
  },
  methods: {
    getInfo(data){
      this.$emit("changeTitle","姓名："+data.name+", 职位："+data.position);  //子往父传递数据
    },
    toHelloWorldMsg(){
      this.eventBus.$emit("send", "由TwoLevel组件新的内容")//子组件往子组件传递数据
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello {
  background-color: skyblue;
  color: white;
  padding-bottom: 10px;
}
</style>
