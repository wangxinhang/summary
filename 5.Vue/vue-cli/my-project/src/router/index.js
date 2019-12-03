import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  // 一级路由
  routes: [{
      path: '/showBlog',
      name: 'showBlog',
      component: () => import('../../src/components/blogBody/showBlog/ShowInfo'),
      // 定义二级路由
      children: [{
        path: 'helloWorld',
        name: 'helloWorld',
        component: () => import('../components/blogBody/writeBlog/components/HelloWorld'),
      }]
    },
    {
      path: '/writeBlog',
      name: 'writeBlog',
      component: () => import('../components/blogBody/writeBlog/WriteInfo')
    },
    {
      //设置一级默认路由
      path: '/',
      redirect: 'writeBlog'
    },
    // {
    //   path: '/blog/:id',
    //   name: 'showSingleBlog',
    //   component: SingleBlog
    // },
    {
      path: '/blog',
      name: 'showSingleBlog',
      component: () => import('../components/blogBody/showBlog/SingleBlog')
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(savedPosition.x, savedPosition.y)
      }, 0)
      console.log(savedPosition)
      return savedPosition
    } else {
      if (from.meta.keepAlive) {
        from.meta.savedPosition = document.body.scrollTop;
      }
      return {
        x: 0,
        y: to.meta.savedPosition || 0
      }
    }
  }
})
