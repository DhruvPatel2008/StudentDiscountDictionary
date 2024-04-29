import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store'
import footerRoutes from '@/router/footer-routes'
import redirectRoutes from '@/router/redirect-routes'
import languageRoutes from '@/router/language-routes'
import vanityRoutes from '@/router/vanity-routes'
import { isAllowedLogin } from '@/service/register-service'
import {
  setRoute,
  setPepperjamClickID,
  getPepperjamClickIds,
  setGetUTMData,
  trackSignupFlow
} from '@/service/storage'
import { unixNow, updateReNavigation, validUtmUrl, getQueryParams } from '@/utils'

import { country } from '@/service/api-config'
import { logout, getToken, isLoggedIn, getEmail } from '@/service/user-service'
import { getCards, getIsSpcPlusUser } from '@/service/profile-service'
import {
  getIsFreeTrial,
  getActiveOffersByPartnerUrlName,
  getOffer
} from '@/service/offer-service'
import {
  setCIBCValidation,
  AFFILIATE_VALUE_CIBC
} from '@/service/seabiscuit-service'
import {
  setSchoolPortalToken
} from '@/service/school-service'
import { ACTIONS } from '@/service/analytics-service'
import MODAL_TYPES from '@/store/modules/modals/modal-types'
import { setExpiredCardPromoCode } from '@/service/cookie-service'

export const PAGE_NAMES = {
  PAGE_NOT_FOUND: '404',
  LOGIN: 'Login',
  LOGOUT: 'Logout',
  SIGNUP_ACCOUNT_CREATION: 'Signup Account Creation',
  SIGNUP_PERSONAL_INFO: 'Signup Personal Info',
  SIGNUP_PAYMENT_PURCHASE: 'Signup Payment Purchase',
  SIGNUP_PAYMENT_ACTIVATE: 'Signup Payment Activate',
  ACTIVATION_COMPLETE: 'Activation Complete',
  SPCPLUS: 'Spc-plus',
  REGISTER: 'Register',
  PROFILE: 'Profile',
  Billing: 'Billing Details',
  HOME: 'Home',
  DEALS: 'Deals',
  DEAL: 'Deal',
  PARTNER: 'Partner',
  SEARCH: 'Search',
  SPC_PLUS_OFFERS: 'SPC Plus Offers',
  CATEGORY: 'Category',
  COLLECTION: 'Collection',
  TRENDING: 'Trending',
  FAVOURITES: 'Favourites',
  LIST: 'List',
  CONTEST: 'Contest',
  PURCHASE: 'Purchase',
  APPLE_CONTEST: 'Contest Regulations',
  CONTEST_RULES: 'Contest Rules',
  RESET_PASSWORD: 'Reset Password',
  BUY_SPC_CONTEST: 'Contest Buy SPC',
  SUMMARY: 'Summary',
  COMPLETION: 'Completion',
  WHY_SPC: 'Why SPC',
  WHY_SPC_HM: 'Why SPC H&M',
  BUYSPC: 'Buy SPC',
  GIFT_SPC: 'Gift SPC',
  BTS: 'Back to School',
  LANDING_CONTEST: 'Landing Contest',
  CIBC_OFFERS: 'CIBC Offers',
  QR_LANDING: 'QR Landing',
  QR_SELECT_MEMBERSHIP: 'QR Select Membership',
  QR_TEMPORARY_MEMBERSHIP: 'QR Temporary Membership',
  HOW_IT_WORKS: 'How It Works',
  HOLIDAY_EVENT: 'Holiday Event',
  SIGNUP_ADDITIONAL_QUESTIONS: 'Signup Additional Questions',
  EDIT_PROFILE: 'Edit Profile',
  SHEIN_LANDING_PAGE: 'Shein Landing Page',
  ACTIVATION_MEMBERSHIP: 'Activation Membership Number',
  ACTIVATION_ACCOUNT: 'Activation Email and Password',
  ACTIVATION_INFO: 'Activation Personal Info',
  ACTIVATION_COMPLETION: 'Activation Completion',
  SCHOOL_PORTAL: 'School Portal',
  EASY_PROMO: 'Holiday Contest EasyPromo',
  BACK_TO_SCHOOL_EASY_PROMO: 'Back To School Contest EasyPromo',
  HOLIDAY_CONTEST: 'Holiday Contest',
  LOAD_PROXY_PARTNER_URL: 'Proxy Partner URL',
  TRAVEL_PHOTO: 'Travel Photo',
  ADD_SUBSCRIPTION: 'Add Subscription',
  DATING_ADS: 'Dating Ads',
  BRANDS: 'Brands',
  OPEN_CLOSE_CONTEST: 'Open Close Contest',
  HUDSONS_BAY: 'HudsonsBay',
  CIBC_INTERNATIONAL: 'CIBC International',
  CIBC_RAF_LANDING: 'CIBC RAF',
  EMAIL_VERIFICATION: 'Email Verification'
}

Vue.use(Router)

const router = new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    ...languageRoutes,
    {
      path: '/favourites',
      name: PAGE_NAMES.FAVOURITES,
      component: () => import(/* webpackChunkName: "Favourites" */ '@/components/Pages/Favourites'),
      meta: { requiresAuth: true }
    },
    {
      path: '/favourites/list/:id',
      name: PAGE_NAMES.LIST,
      component: () => import(/* webpackChunkName: "SavedList" */ '@/components/Pages/SavedList'),
      meta: { requiresAuth: true },
      props: (route) => ({
        id: route.params.id,
        sourceSection: String(route.query.source)
      })
    },
    {
      path: '/deals',
      name: PAGE_NAMES.DEALS,
      component: () => import(/* webpackChunkName: "Deals" */ '@/components/Deals'),
      props: (route) => ({
        query: route.query.q,
        category: route.query.category,
        bmo: String(route.query.registerBMO) === 'true',
        offerID: route.query.offerID,
        register: String(route.query.register) === 'true',
        categoryChooser: String(route.query.categoryChooser) === 'true'
      })
    },
    {
      path: '/deals/category/:name',
      name: PAGE_NAMES.CATEGORY,
      component: () => import(/* webpackChunkName: "Category" */ '@/components/Category'),
      props: (route) => ({
        name: route.params.name,
        applyFilter: route.query.filter ? route.query.filter : null,
        sourceSection: String(route.query.source)
      })
    },
    {
      path: '/deals/:partnerUrlName',
      async beforeEnter (to, from, next) {
        const partnerUrlName = to.params.partnerUrlName
        let offers = []
        try {
          offers = await getActiveOffersByPartnerUrlName(partnerUrlName)
        } catch (err) {
          console.log(err)
        }

        if (offers.length === 1) {
          next({
            name: PAGE_NAMES.DEAL,
            params: {
              id: offers[0].id,
              partnerName: partnerUrlName
            }
          })
        } else {
          if (partnerUrlName && partnerUrlName.toLowerCase() === 'cibc') {
            next('/cibc')
          } else {
            next({
              name: PAGE_NAMES.SEARCH,
              params: {
                query: partnerUrlName
              }
            })
          }
        }
      }
    },
    {
      path: '/deals/offer/:id', // Old offer link format
      name: PAGE_NAMES.DEAL,
      async beforeEnter (to, from, next) {
        let modifiedRoute = ''
        try {
          const data = await getOffer(to.params.id)
          modifiedRoute = `/deals/${data.partner.url_name}/offer/${to.params.id}`
          if (to.query.source) {
            modifiedRoute = `${modifiedRoute}?source=${to.query.source}`
          }
        } catch (e) {
          const response = e.response.data
          if (typeof response === 'object' && response.partner_url_name) {
            modifiedRoute = `/deals/${response.partner_url_name}`
          } else {
            modifiedRoute = '/deals'
          }
        }
        next(modifiedRoute)
      }
    },
    {
      path: '/deals/:partnerName/offer/:id',
      name: PAGE_NAMES.DEAL,
      component: () => import(/* webpackChunkName: "Deal" */ '@/components/Deal'),
      async beforeEnter (to, from, next) {
        try {
          const data = await getOffer(to.params.id)
          to.query.partnerName = data.partner.partner_name
        } catch (e) {
          to.query.partnerName = to.params.partnerName
        }
        next()
      },
      props: (route) => ({
        id: route.params.id,
        partnerName: route.params.partnerName,
        sourceSection: String(route.query.source),
        partner_name: route.query.partnerName
      })
    },
    {
      path: '/search/:query',
      name: PAGE_NAMES.SEARCH,
      component: () => import(/* webpackChunkName: "SearchResults" */ '@/components/SearchResults'),
      props: (route) => ({
        query: route.params.query
      })
    },
    {
      path: '/weekly-deals/:id',
      name: PAGE_NAMES.COLLECTION,
      component: () => import(/* webpackChunkName: "Collection" */ '@/components/Collection'),
      props: true
    },
    {
      path: '/plus-offers',
      name: PAGE_NAMES.SPC_PLUS_OFFERS,
      component: () => import(/* webpackChunkName: "SPCPlusOffers" */ '@/components/Pages/SPCPlusOffers'),
      props: (route) => ({
        sourceSection: String(route.query.source)
      })
    },
    {
      path: '/trending',
      name: PAGE_NAMES.TRENDING,
      component: () => import(/* webpackChunkName: "Trending" */ '@/components/Pages/Trending'),
      props: (route) => ({
        sourceSection: String(route.query.source)
      })
    },
    {
      path: '/partner/:name',
      name: PAGE_NAMES.PARTNER,
      props: true,
      beforeEnter (to, from, next) {
        const partnerName = to.params.name
        if (partnerName && partnerName.toLowerCase() === 'cibc') {
          next('/cibc')
        } else {
          next({
            name: PAGE_NAMES.SEARCH,
            params: {
              query: partnerName
            },
            query: {
              tags: [
                partnerName
              ]
            }
          })
        }
      }
    },
    {
      path: '/partners/:name',
      beforeEnter (to, from, next) {
        next({
          name: PAGE_NAMES.PARTNER,
          params: {
            name: to.params.name
          }
        })
      }
    },
    {
      path: '/offer/:id',
      name: 'Offer',
      beforeEnter (to, from, next) {
        next({
          name: PAGE_NAMES.DEAL,
          params: {
            id: to.params.id
          }
        })
      }
    },

    {
      path: '/billing',
      name: PAGE_NAMES.Billing,
      component: () => import(/* webpackChunkName: "ManageBilling" */ '@/components/ManageBilling'),
      meta: { requiresAuth: true },
      props: true,
      async beforeEnter (to, from, next) {
        try {
          const cards = await getCards()
          const { is_free_trial: isFreetrial } = await getIsFreeTrial()
          const spcCards = cards.filter(card => !card.is_expired && card.status === 'active' && card.cobrand === 'spc')
          if (!isFreetrial && spcCards && spcCards.length > 0) {
            next()
          } else {
            next('/deals')
          }
        } catch (error) {
          console.error(error)
        }
      }
    },
    {
      path: '/profile',
      name: PAGE_NAMES.PROFILE,
      component: () => import(/* webpackChunkName: "SecretariatDeals" */ '@/components/Profile'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/contest',
      name: PAGE_NAMES.APPLE_CONTEST,
      redirect: {
        // TODO: while locking open close contest
        // revert this back to All deals
        // name: PAGE_NAMES.DEALS
        name: PAGE_NAMES.OPEN_CLOSE_CONTEST
      }
      // component: () => import(/* webpackChunkName: "AppleContestPage" */ '@/components/Pages/AppleContest')
    },
    {
      path: '/contest/rules',
      name: PAGE_NAMES.CONTEST_RULES,
      component: () => import(/* webpackChunkName: "ContestRulesPage" */ '@/components/Pages/ContestRules')
    },
    {
      path: '/contest/rules/:contestname',
      name: PAGE_NAMES.CONTEST_RULES,
      component: () => import(/* webpackChunkName: "ContestRulesPage" */ '@/components/Pages/ContestRules'),
      props: (route) => ({
        contestName: route.params.contestname
      })
    },
    {
      path: '/contest/buy-spc',
      name: PAGE_NAMES.BUY_SPC_CONTEST,
      redirect: {
        name: PAGE_NAMES.DEALS
      }
      // component: () => import(/* webpackChunkName: "BuySPCContestPage" */ '@/components/Pages/BuySPCContest')
    },
    {
      path: '/contest/:id',
      name: PAGE_NAMES.CONTEST,
      component: () => import(/* webpackChunkName: "ContestPage" */ '@/components/ContestPage'),
      props: (route) => ({
        id: window.parseInt(route.params.id),
        sourceSection: String(route.query.source)
      })
    },
    {
      path: '/',
      alias: '/mobile',
      name: PAGE_NAMES.HOME,
      component: () => import(/* webpackChunkName: "Home" */ '@/components/Pages/Home'),
      async beforeEnter (to, from, next) {
        if (!to.params.redirectHome && await getIsSpcPlusUser()) {
          next(PAGE_NAMES.DEALS)
        } else {
          next()
        }
      }
    },
    {
      path: '/spc-plus',
      name: PAGE_NAMES.SPCPLUS,
      component: () => import(/* webpackChunkName: "SecretariatDeals" */ '@/components/Pages/SecretariatDeals')
    },
    {
      path: '/register',
      name: PAGE_NAMES.REGISTER,
      component: () => import(/* webpackChunkName: "Register" */ '@/components/MembershipActivation/Register'),
      props: () => ({
        // FIXME: (Urgent Jul 31, 2020) Replace hardcoded bool with feature flag
        isFreeTrial: true
      }),
      async beforeEnter (to, from, next) {
        await registerRouteValidation(to, from, next)
      }
    },
    {
      path: '/login',
      name: PAGE_NAMES.LOGIN,
      component: () => import(/* webpackChunkName: "Login" */ '@/components/Login'),
      props: true,
      async beforeEnter (to, from, next) {
        await store.dispatch('updateRouteIntent', from)
        store.getters.loggedIn ? next('/signup') : next()
      }
    },
    {
      path: '/__/auth/action',
      name: PAGE_NAMES.RESET_PASSWORD,
      component: () => import(/* webpackChunkName: "ResetPassword" */ '@/components/ResetPassword'),
      beforeEnter (to, from, next) {
        const queryParams = to.query
        const mode = queryParams['mode']
        const code = queryParams['oobCode']
        const oobCode = queryParams['oobCode']
        const apiKey = queryParams['apiKey']
        const continueUrl = queryParams['continueUrl']
        if (code && mode && apiKey && mode === 'verifyEmail') {
          if (continueUrl) {
            // redirect - website email verification
            try {
              const queryParams = getQueryParams(continueUrl)
              if (!queryParams['verifyToken']) {
                throw Object.assign(
                  new Error('Invalid'),
                  { message: 'Invalid Email Verification Link' }
               )
              }
              next({
                path: '/emailverification',
                query: { mode, oobCode, apiKey, continueUrl }
              })
            } catch (error) {
              next({ path: '/' })
            }
          } else {
            // redirect - dashboard email verification
            next({
              path: '/verifyEmail',
              query: { mode, code, apiKey }
            })
          }
        } else {
          next()
        }
      }
    },
    {
      path: '/emailverification',
      name: PAGE_NAMES.EMAIL_VERIFICATION,
      component: () => import(/* webpackChunkName: "VerifyEmail" */ '@/components/VerifyEmail')
    },
    {
      path: '/logout',
      name: PAGE_NAMES.LOGOUT,
      async beforeEnter (to, from, next) {
        if (store.getters.loggedIn) {
          await logout()
        }
        next('/')
      }
    },
    {
      path: '/purchase',
      name: PAGE_NAMES.PURCHASE,
      meta: { requiresAuth: true },
      component: () => import(/* webpackChunkName: "Purchase" */ '@/components/Purchase/Purchase'),
      props: (route) => ({
        code: route.query.referral || route.query.promo || route.query.code || null
      }),
      // protect purchase flow during free trial
      async beforeEnter (to, from, next) {
        await purchaseRouteValidation(to, from, next)
      }
    }, {
      path: '/purchase/summary',
      name: PAGE_NAMES.SUMMARY,
      component: () => import(/* webpackChunkName: "Summary" */ '@/components/Purchase/Summary'),
      meta: { requiresAuth: true },
      props: true,
      // protect purchase flow during free trial
      beforeEnter (to, from, next) {
        try {
          if (from.name === PAGE_NAMES.SIGNUP_PAYMENT_PURCHASE || from.name === PAGE_NAMES.ADD_SUBSCRIPTION) {
            next()
          } else {
            next('/purchase')
          }
        } catch (error) {
          console.error(error)
        }
      }
    }, {
      path: '/purchase/completion',
      name: PAGE_NAMES.COMPLETION,
      component: () => import(/* webpackChunkName: "Completion" */ '@/components/Purchase/Completion'),
      meta: { requiresAuth: true },
      // protect purchase flow during free trial
      beforeEnter (to, from, next) {
        try {
          if (from.name === 'Summary') {
            next()
          } else {
            next('/purchase')
          }
        } catch (error) {
          console.error(error)
        }
      }
    },
    ...(country === 'ca' ? [{
      path: '/cibc',
      name: 'CIBC',
      component: () => import(/* webpackChunkName: "cibc" */ '@/components/Pages/Seabiscuit')
    }] : []),
    {
      path: '/banking',
      redirect: '/cibc'
    },
    {
      path: '/cibc/offers',
      name: PAGE_NAMES.CIBC_OFFERS,
      component: () => import(/* webpackChunkName: "cibc" */ '@/components/Pages/Cibc')
    },
    {
      path: '/signup/account-creation',
      name: PAGE_NAMES.SIGNUP_ACCOUNT_CREATION,
      component: () => import(/* webpackChunkName: "Signup" */ '@/components/Signup/AccountCreation'),
      props: true,
      beforeEnter (to, from, next) {
        // Coming from extension
        if ('from_extension' in to.query) {
          store.dispatch('updateFromExtension', true)

          if (store.getters.loggedIn) {
            // Logged In
            const extensionId = process.env.EXTENTION_ID
            const token = getToken()

            // Log user in the extension
            window.postMessage({
              extensionId,
              action: 'updateToken',
              token
            }, '*')

            if (store.getters.validMemberWithCard) {
              // Close the tab if user has membership
              window.close()
            }
          }
        }

        // Check for UTM sign-up
        if (validUtmUrl(to.query)) {
          setGetUTMData(to.query)
        }
        store.getters.registered ? next('/signup/purchase') : next()
      }
    },
    {
      path: '/signup/personal-info',
      name: PAGE_NAMES.SIGNUP_PERSONAL_INFO,
      component: () => import(/* webpackChunkName: "PersonalInfo" */ '@/components/Signup/PersonalInfo'),
      props: true,
      beforeEnter (to, from, next) {
        if (store.getters.registered) {
          next('/signup/purchase')
        } else {
          if (store.getters['accountCreation/isStepOneComplete']) {
            next()
          } else {
            next('/signup/account-creation')
          }
        }
      }
    },
    {
      path: '/signup/additional',
      name: PAGE_NAMES.SIGNUP_ADDITIONAL_QUESTIONS,
      component: () => import(/* webpackChunkName: "Additional" */ '@/components/Signup/Additional'),
      props: true,
      async beforeEnter (to, from, next) {
        if (store.getters['accountCreation/isStepOneComplete']) {
          next()
        } else if (store.getters.loggedIn && store.getters.registered) {
          next()
        } else {
          next('/signup/account-creation')
        }
      }
    },
    {
      path: '/signup/purchase',
      name: PAGE_NAMES.SIGNUP_PAYMENT_PURCHASE,
      component: () => import(/* webpackChunkName: "Payment" */ '@/components/Signup/Payment'),
      props: true,
      // protect purchase flow during free trial
      async beforeEnter (to, from, next) {
        if ('from_extension' in to.query) {
          store.dispatch('updateFromExtension', true)
        }

        await purchaseRouteValidation(to, from, next, true)
      }
    },
    {
      path: '/signup/activate',
      name: PAGE_NAMES.SIGNUP_PAYMENT_ACTIVATE,
      component: () => import(/* webpackChunkName: "SignupPayment" */ '@/components/Signup/Payment'),
      props: true,
      async beforeEnter (to, from, next) {
        await registerRouteValidation(to, from, next, true)
      }
    },
    {
      path: '/signup/activation/complete',
      name: PAGE_NAMES.ACTIVATION_COMPLETE,
      component: () => import(/* webpackChunkName: "ActivationConfirmation" */ '@/components/MembershipActivation/ActivationConfirmation'),
      props: true
    },
    {
      path: '/purchase/instore',
      name: 'InStore',
      component: () => import(/* webpackChunkName: "InStore" */ '@/components/Pages/InStore')
    },
    ...footerRoutes,
    ...redirectRoutes,
    {
      path: '/coming-soon',
      component: () => import(/* webpackChunkName: "ComingSoon" */ '@/components/ComingSoon')
    },
    ...vanityRoutes,
    {
      path: '/why-spc',
      name: PAGE_NAMES.WHY_SPC,
      component: () => import(/* webpackChunkName: "WhySPC" */ '@/components/Pages/WhySPC')
    },
    {
      path: '/why-spc-hm',
      redirect: {
        name: PAGE_NAMES.WHY_SPC
      }
    },
    {
      path: '/sportchek',
      name: PAGE_NAMES.FAVOURITES,
      redirect: {
        name: PAGE_NAMES.HOME
      }
    },
    {
      path: '/buyspc',
      name: PAGE_NAMES.BUYSPC,
      redirect: {
        name: PAGE_NAMES.WHY_SPC
      }
    },
    {
      path: '/landingcontest/:url',
      name: PAGE_NAMES.LANDING_CONTEST,
      component: () => import(/* webpackChunkName: "LandingContest" */ '@/components/Pages/LandingContest'),
      props: (route) => ({
        bannerUrl: route.params.url
      })
    },
    {
      path: '/Sheinlanding',
      name: PAGE_NAMES.SHEIN_LANDING_PAGE,
      component: () => import(/* webpackChunkName: "Shein" */ '@/components/Pages/Shein')
    },
    {
      path: '/howitworks',
      name: PAGE_NAMES.HOW_IT_WORKS,
      component: () => import(/* webpackChunkName: "HowItWorks" */ '@/components/Pages/HowItWorks')
    },
    {
      path: '/giftspc',
      name: PAGE_NAMES.SAMPLES,
      component: () => import(/* webpackChunkName: "Samples" */ '@/components/GiftSPC/Main')
    },
    {
      path: '/qrlanding',
      name: PAGE_NAMES.QR_LANDING,
      component: () => import(/* webpackChunkName: "QRLanding" */ '@/components/QR/QRLanding')
    },
    {
      path: '/qr-select-membership',
      name: PAGE_NAMES.QR_SELECT_MEMBERSHIP,
      redirect: {
        name: PAGE_NAMES.QR_TEMPORARY_MEMBERSHIP
      },
      component: () => import(/* webpackChunkName: "QRSelectMembership" */ '@/components/QR/QRSelectMembership')
    },
    {
      path: '/membership-screen',
      name: PAGE_NAMES.QR_TEMPORARY_MEMBERSHIP,
      component: () => import(/* webpackChunkName: "QRTemporaryMembership" */ '@/components/QR/QRTemporaryMembership'),
      meta: { requiresAuth: true }
    },
    {
      path: '/profile/edit',
      name: PAGE_NAMES.EDIT_PROFILE,
      component: () => import(/* webpackChunkName: "EditProfile" */ '@/components/Pages/EditProfile'),
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/activate',
      name: PAGE_NAMES.ACTIVATION_MEMBERSHIP,
      component: () => import(/* webpackChunkName: "ActivationMembership" */ '@/components/Activation/Membership')
    },
    {
      path: '/activate/account',
      name: PAGE_NAMES.ACTIVATION_ACCOUNT,
      component: () => import(/* webpackChunkName: "ActivationAccount" */ '@/components/Activation/Account')
    },
    {
      path: '/activate/info',
      name: PAGE_NAMES.ACTIVATION_INFO,
      component: () => import(/* webpackChunkName: "ActivationInfo" */ '@/components/Activation/Info')
    },
    {
      path: '/activate/completion',
      name: PAGE_NAMES.ACTIVATION_COMPLETION,
      component: () => import(/* webpackChunkName: "ActivationCompletion" */ '@/components/Activation/CompletionMobile'),
      props: (route) => ({
        expiryDate: route.params.expiryDate
      })
    },
    {
      path: '/campus/:id?',
      name: PAGE_NAMES.SCHOOL_PORTAL,
      component: () => import(/* webpackChunkName: "SchoolPortal" */ '@/components/Pages/SchoolPortal'),
      props: true,
      async beforeEnter (to, from, next) {
        await schoolPortalRouteValidation(to, from, next, true)
      }
    },
    {
      path: '/redirect-to-partner',
      name: PAGE_NAMES.LOAD_PROXY_PARTNER_URL,
      component: () => import(/* webpackChunkName: "ProxyPartnerWebsite" */ '@/components/Pages/ProxyPartnerWebsite'),
      props: (route) => ({
        offerId: route.query.offer_id,
        firebaseUid: route.query.firebase_uid
      })
    },
    {
      path: '/activate/subscription',
      name: PAGE_NAMES.ADD_SUBSCRIPTION,
      component: () => import(/* webpackChunkName: "AddSubscription" */ '@/components/Activation/AddSubscription'),
      beforeEnter (to, from, next) {
        try {
          if (from.name === PAGE_NAMES.ACTIVATION_INFO || from.name === PAGE_NAMES.ACTIVATION_MEMBERSHIP) {
            next()
          } else {
            next('/deals')
          }
        } catch (error) {
          console.error(error)
        }
      }
    },
    {
      path: '/dating-ads',
      name: PAGE_NAMES.DATING_ADS,
      component: () => import(/* webpackChunkName: "DatingAds" */ '@/components/Pages/DatingAds')
    },
    {
      path: '/brands',
      name: PAGE_NAMES.BRANDS,
      component: () => import(/* webpackChunkName: "AllBrands" */ '@/components/Pages/AllBrands')
    },
    {
      path: '/international',
      name: PAGE_NAMES.CIBC_INTERNATIONAL,
      component: () => import(/* webpackChunkName: "CibcInternational" */ '@/components/Pages/CibcInternational')
    },
    {
      path: '/CIBC_RAF',
      name: PAGE_NAMES.CIBC_RAF_LANDING,
      component: () => import(/* webpackChunkName: "CibcRAF" */ '@/components/Pages/CibcRAF')
    },
    {
      path: '/hudsonsbay',
      name: PAGE_NAMES.HUDSONS_BAY,
      component: () => import(/* webpackChunkName: "HudsonsBay" */ '@/components/Pages/HudsonsBay')
    },
    // {
    //   path: '/matchgame',
    //   name: PAGE_NAMES.BACK_TO_SCHOOL_EASY_PROMO,
    //   component: () => import(/* webpackChunkName: "EasyPromo" */ '@/components/Pages/EasyPromo')
    // },
    // {
    //   path: '/12-days-giveaways-2022/',
    //   name: PAGE_NAMES.HOLIDAY_CONTEST,
    //   component: () => import(/* webpackChunkName: "HolidayContestPage" */ '@/components/Pages/HolidayContest'),
    //   props: true
    // },
    // {
    //  path: '/12-days-giveaways-2023',
    //  name: PAGE_NAMES.OPEN_CLOSE_CONTEST,
    //  component: () => import(/* webpackChunkName: "OpenCloseContest" */ '@/components/Pages/OpenCloseContest')
    // },
    // {
    //  path: '/holiday-contest',
    //  name: PAGE_NAMES.EASY_PROMO,
    //  component: () => import(/* webpackChunkName: "EasyPromo" */ '@/components/Pages/EasyPromo'),
    //  async beforeEnter (to, from, next) {
    //    await validateUserBeforeRedirect(next)
    //  }
    // },
    {
      path: '/:id',
      name: PAGE_NAMES.HOLIDAY_EVENT,
      component: () => import(/* webpackChunkName: "HolidayEvents" */ '@/components/Pages/HolidayEvents'),
      props: true
    },
    {
      path: '*',
      name: PAGE_NAMES.PAGE_NOT_FOUND,
      component: () => import(/* webpackChunkName: "FourOhFour" */ '@/components/Pages/FourOhFour')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  let socialSignUpFlow = trackSignupFlow()
  if (socialSignUpFlow) {
    socialSignUpFlow = ['google', 'facebook', 'apple'].includes(socialSignUpFlow.toLowerCase())
  } else {
    socialSignUpFlow = false
  }
  if (isLoggedIn() && !socialSignUpFlow) {
    const email = getEmail()
    if (email) {
      try {
        await isAllowedLogin(email)
      } catch (error) {
        await logout()
      }
    }
  }
  store.dispatch('updateNextRoute', to)
  if (to.query.clickId) {
    const clickId = {
      id: to.query.clickId,
      timestamp: unixNow()
    }
    const clickIds = getPepperjamClickIds()
    setPepperjamClickID((clickIds != null ? clickIds : []).concat([clickId]))
  }

  if (to.path === '/billing' && to.query.promo_code) {
    // Save promocode to cookies
    setExpiredCardPromoCode(to.query.promo_code)
  }

  // Check if the route needs authentication
  function proceed () {
    if (to.matched.some(record => record.meta.requiresAuth)) {
      if (!store.getters.loggedIn) {
        setRoute(to)
        if (to.name === 'Purchase') {
          store.dispatch('updatePurchaseNavigation', true)
          next('/signup')
          return
        }
        updateReNavigation(to.fullPath)
        store.dispatch('modals/openModal', MODAL_TYPES.LOGIN_PROMPT)
      } else if (!store.getters.registered) {
        setRoute(to)
        next('/signup')
      } else next()
    } else {
      next()
    }
  }

  // Wait for authentication to load
  if (store.getters.loading) {
    let unwatch = store.watch(
      () => store.getters.loading,
      loading => {
        if (!loading) {
          unwatch()
          proceed()
        }
      }
    )
  } else {
    proceed()
  }
})
// pages that dont track
const BLCOKED_PAGE = [
  PAGE_NAMES.SIGNUP
]

router.afterEach((to, from) => {
  if (!BLCOKED_PAGE.includes(to.name)) {
    ACTIONS.TRACK_PAGES(
      { toName: to.name, toPath: to.fullPath },
      { fromName: from.name, fromPath: from.fullPath }
    )
  }
})

async function registerRouteValidation (to, from, next, sameRoute = false) {
  const hasCardCached = store.getters['registration/hasCardCached']
  const query = to.query
  const handleCIBC = async (query) => {
    const affiliate = query['affiliate_registration']
    if (
      affiliate === AFFILIATE_VALUE_CIBC &&
      query['cibc_token']
    ) {
      await logout()
      try {
        setCIBCValidation(query['cibc_token'])
      } catch (error) {
        window.alert('Unable to store CIBC credentials')
      }
      return true
    } else {
      return false
    }
  }
  const isCIBC = await handleCIBC(query)
  if (isCIBC || hasCardCached) {
    next('/signup')
  } else {
    await store.dispatch('updateRouteIntent', from)
    if (sameRoute) {
      if (!store.getters.loggedIn) {
        if ('from_activate' in to.query) {
          next({
            path: '/signup',
            query: {
              from_activate: to.query['from_activate']
            }
          })
        } else {
          next('/signup')
        }
        return
      }
      next()
    } else {
      next('/activate')
    }
  }
}

async function purchaseRouteValidation (to, from, next, sameRoute = false) {
  try {
    const { is_free_trial: isFreetrial } = await getIsFreeTrial()
    if (!store.getters.loggedIn) {
      store.dispatch('updatePurchaseNavigation', true)

      if ('from_extension' in to.query) {
        next('/login')
      } else {
        this.$router.push('/signup')
      }
    }
    if (!isFreetrial && !store.getters.validMemberWithCard) {
      if (sameRoute) {
        next()
      } else {
        next('/signup/purchase')
      }
    } else {
      if (store.getters.fromQRLanding) {
        next('/qr-select-membership')
        return
      }

      next('/deals')
    }
  } catch (error) {
    console.error(error)
  }
}

async function schoolPortalRouteValidation (to, from, next, sameRoute = false) {
  const query = to.query
  await logout()
  if (query['unique_token']) {
    setSchoolPortalToken(query['unique_token'])
    next()
  } else {
    next()
  }
}

// function validateUserBeforeRedirect (next) {
//   if (isLoggedIn()) {
//     next()
//   } else {
//     updateReNavigation('/holiday-contest')
//     next('/login')
//   }
// }

export default router



// WEBPACK FOOTER //
// ./src/router/index.js