// import Vue from 'vue'
import store from '@/store'

import { country } from '@/service/api-config'

const isProd = process.env.NODE_ENV === 'production'
const isStaging = process.env.NODE_ENV === 'staging'

export default [
  {
    path: '/landing',
    redirect: '/'
  },
  {
    path: '/buy',
    redirect: '/purchase'
  },
  {
    path: '/obtenir-la-carte',
    redirect: '/purchase'
  },
  {
    path: '/default.aspx',
    redirect: '/'
  },
  {
    path: '/deal-finder',
    redirect: '/deals'
  },
  {
    path: '/spc-contest-rules',
    redirect: '/'
  },
  {
    path: '/rules-and-regulations',
    redirect: '/'
  },
  {
    path: '/realstudentproblems',
    redirect: '/'
  },
  {
    path: '/choice-promo',
    redirect: '/'
  },
  {
    path: '/spc-advance-screening-the-miracle-season',
    redirect: '/'
  },
  {
    path: '/spc-advance-screening-i-feel-pretty',
    redirect: '/'
  },
  {
    path: '/spc-apple-watch-contest',
    redirect: '/'
  },
  {
    path: '/spc-card-advance-screening-contest-av',
    redirect: '/'
  },
  {
    path: '/welcome-to-spc-card',
    redirect: '/'
  },
  {
    path: '/bienvenue-chez-spc',
    redirect: '/'
  },
  {
    path: '/card-sales-interim',
    redirect: '/'
  },
  {
    path: '/ucbookstores',
    redirect: '/'
  },
  {
    path: '/jobs',
    redirect: '/careers'
  },
  {
    path: '/rules-and-regulations',
    redirect: '/'
  },
  {
    path: '/fundraise',
    redirect: '/fundraising'
  },
  ...(country === 'ca' ? [{
    path: '/business',
    beforeEnter (to, from, next) {
      if (isProd) {
        window.location = 'https://business.spccard.ca'
      } else if (isStaging) {
        window.location = 'https://business.qaspccard.ca'
      } else {
        window.location = 'https://business.qaspccard.ca'
      }
    }
  },
  {
    path: '/verifyEmail',
    beforeEnter (from) {
      const queryParams = from.query
      const mode = queryParams['mode']
      const code = queryParams['code']
      const apiKey = queryParams['apiKey']
      if (isProd) {
        window.location = `https://spc-prod.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${code}&apiKey=${apiKey}`
      } else if (isStaging) {
        window.location = `https://microsites-dot-flash-time-157921.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${code}&apiKey=${apiKey}`
      } else {
        window.location = `https://spc-qa-239219.firebaseapp.com/__/auth/action?mode=${mode}&oobCode=${code}&apiKey=${apiKey}`
      }
    }
  },
  {
    path: '/samsung10',
    beforeEnter (to, from, next) {
      next(`/redirect-to-partner?offer_id=${to.query['offer_id']}`)
    }
  },
  {
    path: '/bmo-signup',
    beforeEnter (to, from, next) {
      if (!store.getters.registered) {
        // Vue.$ga.page(window.location.pathname)
      }
      next('/signup/bmo')
    }
  },
  {
    path: '/freetrial',
    redirect: '/signup'
  },
  {
    path: '/bmo-enregistrer',
    async beforeEnter (to, from, next) {
      await store.dispatch('updateLanguage', 'fr')
      next('/bmo-signup')
    }
  },
  {
    path: '/h&m',
    beforeEnter (to, from, next) {
      if (isProd) {
        window.location = 'https://www.spccard.ca/deals/h&m'
      } else {
        next('/deals')
      }
    }
  }] : []),
  {
    path: '/signup',
    redirect: '/signup/account-creation'
  }
]



// WEBPACK FOOTER //
// ./src/router/redirect-routes.js