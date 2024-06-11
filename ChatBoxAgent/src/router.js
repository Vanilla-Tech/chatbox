import Vue from 'vue'
import Router from 'vue-router'

import auth from './middleware/auth'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      meta: { middleware: auth, layout: 'default' },
      component: () => import('@/pages/Index.vue')
    },
    {
      path: '/downloadTranscript/:chatId',
      name: 'downloadTranscript',
      meta: { layout: 'none' },
      component: () => import('@/pages/ChatTranscript.vue')
    },
    {
      path: '/login',
      name: 'login',
      meta: { layout: 'none' },
      component: () => import('@/pages/auth/Login.vue')
    },
    {
      path: '/forceChangePassword',
      name: 'forceChangePassword',
      meta: { middleware: auth, layout: 'none' },
      component: () => import('@/pages/auth/ForceChangePassword.vue')
    },
    // and finally the default route, when none of the above matches:
    {
      path: '*',
      component: () => import('@/pages/error/notfound.vue')
    }
  ]
})

// Creates a `nextMiddleware()` function which not only
// runs the default `next()` callback but also triggers
// the subsequent Middleware function.
function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index]
  // If no subsequent Middleware exists,
  // the default `next()` callback is returned.
  if (!subsequentMiddleware) return context.next

  return (...parameters) => {
    // Run the default Vue Router `next()` callback first.
    context.next(...parameters)
    // Then run the subsequent Middleware with a new
    // `nextMiddleware()` callback.
    const nextMiddleware = nextFactory(context, middleware, index + 1)
    subsequentMiddleware({ ...context, next: nextMiddleware })
  }
}

router.beforeEach((to, from, next) => {
  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware) ? to.meta.middleware : [to.meta.middleware]
    const context = {
      from,
      next,
      router,
      to
    }
    const nextMiddleware = nextFactory(context, middleware, 1)

    return middleware[0]({ ...context, next: nextMiddleware })
  }

  return next()
})
export default router
