import Vue from "vue"
import Vuex from "vuex"

Vue.use(Vuex)

const store = new Vuex.Store({
  // ...
  state: {
    count: 0,
    stu: [{
        name: "sss",
        age: 10
      },
      {
        name: "qqq",
        age: 11
      },
      {
        name: "ddd",
        age: 12
      },
    ]
  },
  mutations: {
    add(state) {
      state.count++
    },
    add5(state, params) {
      state.count += params
    }
  },
  getters: {
    addPower(state) {
      return state.count * state.count
    },
    moreStuAge(state) {
      return (params) => {
        return state.stu.filter((item) => {
          return item.age > params
        })
      }
    }
  },
  actions: {
    add(context, params) {
      // setTimeout(() => {
      //   context.commit("add5",params);
      // }, 2000);
      // 异步操作成功后，还要告诉外界，可以用promise
      return new Promise(resolve => {
        setTimeout(() => {
          context.commit("add5", params);
          resolve();
        }, 1000);
      })
    }
  }
})
export default store
