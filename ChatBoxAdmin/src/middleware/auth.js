import store from '@/store'

export default function auth({ to, next, router }) {
  if (!store.state.auth.authUser) {
    return router.push('/login')
  }
  if (store.state.auth.authUser && !store.state.auth.authUser.token) {
    return router.push('/login')
  }
  if (store.state.auth.authUser && store.state.auth.authUser.token === '') {
    return router.push('/login')
  }
  if (to.path.includes('forceChangePassword')) {
    return next()
  } else {
    if (store.state.auth.authUser && store.state.auth.authUser.forceChangePassword) {
      return router.push('/forceChangePassword')
    }
  }
  return next()
}
