import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

const originalPush = Router.prototype.push

Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: resolve => require(['@/views/Index'], resolve),
      meta: {
        required: true,
        title: '页面设置'
      },
      children: [
        {
          path: '/category/list',
          name: '分类列表',
          component: resolve => require(['@/views/category/List'], resolve),
          meta: {
            required: true,
            title: '分类列表'
          }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: resolve => require(['@/views/Login'], resolve),
      meta: {
        required: false,
        title: '登录'
      }
    },
    {
      path: '/registered',
      name: 'registered',
      component: resolve => require(['@/views/Registered'], resolve),
      meta: {
        required: false,
        title: '注册'
      }
    }
  ]
})

router.beforeEach((to, from, next) => {
  // ...
  console.log(to)
  console.log(from)
  document.title = `${to.meta.title}-金山`
  // 是否需要验证
  if (to.matched.some(r => r.meta.required)) {
    if (localStorage.getItem('userInfo')) {
      next()
    } else {
      next({
        path: '/login'
        // query: { redirect: to.fullPath }
      })
    }
  } else {
    next()
  }
})

export default router
