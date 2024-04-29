import store from '@/store'

export default [
  {
    path: '/fr',
    async beforeEnter (to, from, next) {
      await store.dispatch('updateLanguage', 'fr')
      next('/')
    }
  },
  {
    path: '/fr/*',
    async beforeEnter (to, from, next) {
      await store.dispatch('updateLanguage', 'fr')
      next(to.fullPath.replace(/^\/fr/, ''))
    }
  },
  {
    path: '*/fr/',
    async beforeEnter (to, from, next) {
      await store.dispatch('updateLanguage', 'fr')
      next(to.fullPath.replace(/\/fr(\/)?$/, ''))
    }
  },
  {
    path: '/en',
    async beforeEnter (to, from, next) {
      await store.dispatch('updateLanguage', 'en')
      next('/')
    }
  },
  {
    path: '/en/*',
    async beforeEnter (to, from, next) {
      await store.dispatch('updateLanguage', 'en')
      next(to.fullPath.replace(/^\/en/, ''))
    }
  },
  {
    path: '*/en/',
    async beforeEnter (to, from, next) {
      await store.dispatch('updateLanguage', 'en')
      next(to.fullPath.replace(/\/en(\/)?$/, ''))
    }
  }
]



// WEBPACK FOOTER //
// ./src/router/language-routes.js