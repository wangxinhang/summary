
<template>
  <div id="showInfo">
    <router-link to="/showBlog/helloWorld">我是二级路由</router-link>
    <button @click="add">+</button>
    <button @click="add5">+5</button>
    <button @click="asyncAdd">异步+5</button>
    <div ref="input">{{count}}</div>
    <div>{{count1}}</div>
    <!-- <div>{{addPower}}</div> -->
    <div>{{Power}}</div>
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <input type="text" v-model="search" placeholder="根据title进行搜索" />
    <!-- 由于jsonData已经由filterJsonData方法过滤，因此需要遍历的是filterJsonData -->
    <div v-for="(item,index) in filterJsonData" :key="index.obj">
      <div>
        <!-- <router-link
          :to="{name:'showSingleBlog',params:{id:item.id}}"
          v-randomColor
        >第{{item.id}}条：{{item.title}}</router-link>-->
        <router-link
          :to="{path:'/blog',query:{id:item.id}}"
          v-randomColor
        >第{{item.id}}条：{{item.title}}</router-link>
      </div>
      <div>{{item.title|toUpperCase(item.title)}}</div>
      <div v-width="'narrow'">{{item.body}}</div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from "vuex";
export default {
  name: "ShowInfo",
  data() {
    return {
      jsonData: [],
      search: "",
      count4: 1
    };
  },
  created() {
    // 获取远程数据
    // this.$http.get("http://jsonplaceholder.typicode.com/posts").then((data) => {
    //   this.jsonData = data.body.slice(0,10);
    //   console.log(this.jsonData);
    // });
    // 获取本地数据
    this.$http.get("../../static/localData.json").then(data => {
      this.jsonData = data.body.slice(0, 10);
      console.log(this.jsonData);
    });
  },
  mounted() {},
  methods: {
    add() {
      this.$store.commit("add");
    },
    add5() {
      this.$store.commit("add5", 5);
    },
    asyncAdd() {
      // this.$store.dispatch("add",5);
      // 异步操作成功后，还要告诉外界，可以用promise
      this.$store.dispatch("add", 5).then(() => {
        alert("异步操作+5已成功");
      });
    }
  },
  // 利用计算属性的优点，来放置搜索后的过滤数据
  computed: {
    // count() {
    //   return this.$store.state.count;
    // },
    // 也可以
    ...mapState({
      count: state => state.count,
      //还可以和当前数据一起使用
      count1(state) {
        return state.count + this.count4;
      }
    }),
    // 当状态名一样时，还可以省略，只传一个数组
    // ...mapState(["count"]),

    // mapGetters 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性,如果你想将一个 getter 属性另取一个名字，使用对象形式
    // ...mapGetters(["addPower"]),
    ...mapGetters({ Power: "addPower" }),

    filterJsonData() {
      return this.jsonData.filter(item => {
        //filter是数组中的过滤函数，根据return值的true/false来过滤元素
        return item.title.match(this.search); //match函数返回的是如不匹配，则是null
      });
    }
  },
  // 定义局部过滤器
  filters: {
    toUpperCase(value) {
      return value.toUpperCase();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
#showInfo > div {
  margin-top: 30px;
}
</style>
