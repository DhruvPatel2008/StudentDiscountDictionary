import Vue from 'vue'
import { generatePepperjamPixel } from '@/service/pepperjam'
import bugsnagClient from '@/vendor/bugsnag'
import Leanplum from 'leanplum-sdk'
import axios from 'axios'
import { createRefreshed } from '@/service/auth-service'
import { compose, mapObject, setUTM, decryptText } from '@/utils'

/**
 * @param {string} serviceLabel a string to identify the service call
 * @param {string} func a function that returns a promise from a service call
 * @return {function} a function that passes its arguments to func, sends the analytics call,
 * and passes on the promise resolution or rejections
 */

const LEANPLUM_APP_ID = process.env.LEANPLUM_APP_ID
const LEANPLUM_APP_KEY = process.env.LEANPLUM_APP_KEY
const LEANPLUM_API = 'https://api.leanplum.com/api?'

export function createServiceAnalyzed (serviceLabel, func) {
  return async function (...args) {
    try {
      const response = await func(...args)
      return response
    } catch (error) {
      throw error
    }
  }
}

export function setUserId (uid) {
  Leanplum.setUserId(uid)
}

export function initMixpanel (token, debug = false) {
  return new Promise((resolve, reject) => {
    if (!token) { reject(new Error('Missing token parameter')) }
    /* eslint-disable */
    (function(e,a){if(!a.__SV){var b=window;try{var c,l,i,j=b.location,g=j.hash;c=function(a,b){return(l=a.match(RegExp(b+"=([^&]*)")))?l[1]:null};g&&c(g,"state")&&(i=JSON.parse(decodeURIComponent(c(g,"state"))),"mpeditor"===i.action&&(b.sessionStorage.setItem("_mpcehash",g),history.replaceState(i.desiredHash||"",e.title,j.pathname+j.search)))}catch(m){}var k,h;window.mixpanel=a;a._i=[];a.init=function(b,c,f){function e(b,a){var c=a.split(".");2==c.length&&(b=b[c[0]],a=c[1]);b[a]=function(){b.push([a].concat(Array.prototype.slice.call(arguments,
      0)))}}var d=a;"undefined"!==typeof f?d=a[f]=[]:f="mixpanel";d.people=d.people||[];d.toString=function(b){var a="mixpanel";"mixpanel"!==f&&(a+="."+f);b||(a+=" (stub)");return a};d.people.toString=function(){return d.toString(1)+".people (stub)"};k="disable time_event track track_pageview track_links track_forms register register_once alias unregister identify name_tag set_config reset people.set people.set_once people.increment people.append people.union people.track_charge people.clear_charges people.delete_user".split(" ");
      for(h=0;h<k.length;h++)e(d,k[h]);a._i.push([b,c,f])};a.__SV=1.2;b=e.createElement("script");b.type="text/javascript";b.setAttribute('defer','');b.src="undefined"!==typeof MIXPANEL_CUSTOM_LIB_URL?MIXPANEL_CUSTOM_LIB_URL:"file:"===e.location.protocol&&"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js".match(/^\/\//)?"https://cdn.mxpnl.com/libs/mixpanel-2-latest.min.js":"//cdn.mxpnl.com/libs/mixpanel-2-latest.min.js";c=e.getElementsByTagName("script")[0];c.parentNode.insertBefore(b,c)}})(document,window.mixpanel||[]);
    mixpanel.init(token, { debug })
    campaignParams();
    resolve()
  })
}

async function getQueryParam(url, param) {
  param = param.replace(/[[]/, "\[").replace(/[]]/, "\]")
  var regexS = "[\?&]" + param + "=([^&#]*)",
      regex = new RegExp( regexS ),
      results = regex.exec(url)
  if (results === null || (results && typeof(results[1]) !== 'string' && results[1].length)) {
    return ''
  } else {
    if (param === 'utm_code') {
      let utmCode = ''
      try {
        utmCode = await decryptText(decodeURIComponent(results[1]))
      } catch (error) {
        console.error(error)
        utmCode = decodeURIComponent(results[1]).replace(/\W/gi, ' ')
      }
      return utmCode
    }
  return decodeURIComponent(results[1]).replace(/\W/gi, ' ')
  }
}
async function campaignParams() {
  let campaign_keywords = 'utm_source utm_medium utm_campaign utm_content utm_term utm_code'.split(' ')
    , campaign_keywords_display = ['UTM_Source_Latest', 'UTM_Medium_Latest', 'UTM_Campaign_Latest', 'UTM_Content_Latest', 'UTM_Term_Latest', 'UTM_Code']
    , kw = ''
    , params = {}
    , count = 0
  let index;
  for (index = 0; index < campaign_keywords.length; ++index) {
    kw = await getQueryParam(document.URL, campaign_keywords[index])
    if (kw.length) {
      params[campaign_keywords_display[index]] = kw
    } else {
      count++
      params[campaign_keywords_display[index]] = '--'
    }
  }
  if (count !== campaign_keywords_display.length) {
    setUTM(params)
    mixpanel.people.set(params)
    mixpanel.register(params)
  }
}

export function initLeanplum () {
  const env = process.env.NODE_ENV
  if (env === 'production') {
    Leanplum.setAppIdForProductionMode(LEANPLUM_APP_ID, LEANPLUM_APP_KEY)
  } else if (env === 'staging') {
    Leanplum.setAppIdForDevelopmentMode(LEANPLUM_APP_ID, LEANPLUM_APP_KEY)
  } else if (env === 'qa') {
    Leanplum.setAppIdForProductionMode(LEANPLUM_APP_ID, LEANPLUM_APP_KEY)
  } else {
    Leanplum.setAppIdForDevelopmentMode(LEANPLUM_APP_ID, LEANPLUM_APP_KEY)
  }

  Leanplum.setVariables({
    GiftSPCNow: "GIFT SPC NOW",
    SeeAllDeals: "See all deals",
    SeeMoreDeals: "See more deals",
    ShowOnboardingLogos: false,
    ShowWhySPCForm: false,
    JoinNowDiscount: null,
    IncentiveOffer: 10
  });

  window.Leanplum = { processMessageEvent: Leanplum.processMessageEvent }

  Leanplum.start()
}

const getDataLayer = () => (window.dataLayer = window.dataLayer || [])
const dataLayerPush = (...items) => getDataLayer().push(...items)

function handleECommerce (order, product, { tax, priceAfterTax }) {
  Vue.$ga.ecommerce.addTransaction({
    'id': order.order_number,
    'affiliation': 'SPC',
    'revenue': String(priceAfterTax),
    'shipping': '0',
    'tax': String(tax)
  })
  Vue.$ga.ecommerce.addItem({
    id: order.order_number,
    name: product.description_en,
    sku: product.id,
    category: 'SPC Membership',
    price: String(product.price),
    quantity: String(order.product.quantity)
  })
  Vue.$ga.ecommerce.send()
}

function handlePepperjam (order, product) {
  const orderId = order.order_number
  const id = product.id
  const quantity = order.product.quantity
  const price = product.price
  const orderItems = [
    {
      id,
      price,
      quantity
    }
  ]
  const pjs = generatePepperjamPixel(orderId, orderItems)
  document.querySelector('body').appendChild((() => {
    const div = document.createElement('div')
    div.innerHTML = pjs
    const pj = div.childNodes[0]
    return pj
  })())
}

function updateDefaultLeanplumAttributesFunc (attribute) {
  const attributes = {
    'appId': LEANPLUM_APP_ID,
    'clientKey': LEANPLUM_APP_KEY,
    'action': 'setUserAttributes',
    ...attribute
  }

  return axios({
    url: LEANPLUM_API,
    method: 'post',
    params: {
      ...attributes
    },
    headers: {
      'Content-Type': 'application/json',
      'sec-fetch-site': 'cross-site',
      'sec-fetch-mode': 'cors'
    }
  })
}

const updateDefaultLeanplumAttributes = compose(
  createRefreshed
)(updateDefaultLeanplumAttributesFunc)

export function purchaseAnalytics (
  {
    orderID,
    productID,
    productDescription,
    quantity,
    price,
    tax,
    priceAfterTax
  }
) {
  const order = {
    order_number: orderID,
    product: {
      quantity
    }
  }
  const product = {
    id: productID,
    description_en: productDescription,
    price
  }
  handlePepperjam(order, product)
}

let isSubscribedToWebPush = false;
let isWebPushSupported = Leanplum.isWebPushSupported();
if(isWebPushSupported){
  Leanplum.isWebPushSubscribed().then(subscriptionStatus => {
      isSubscribedToWebPush = subscriptionStatus;
      if(!isSubscribedToWebPush){
        Leanplum.registerForWebPush('/static/sw/sw.min.js').then(subscriptionStatus => {
          console.log('Subscription status: %s', subscriptionStatus);
        });
      }
  });
}

Leanplum.enableRichInAppMessages(true)

export const EVENTS = {
  APP_OPEN: 'App Open',
  BEGIN_LOGIN: 'Begin Login',
  COMPLETE_LOGIN: 'Complete Login',
  LOGOUT: 'Logout',
  CLICKED_RESET_PASSWORD: 'Clicked Reset Password',
  BEGIN_REGISTRATION: 'Begin Registration',
  COMPLETE_REGISTRATION: 'Complete Registration',
  BEGIN_ACCOUNT_CREATION: 'Begin Account Creation',
  ACCOUNT_CREATION_VALIDATION_FAILED: 'Account Creation Validation Failed',
  COMPLETE_ACCOUNT_CREATION: 'Complete Account Creation',
  SELECTED_FAVOURITE_CATEGORIES: 'Selected Favourite Categories',
  SELECTED_FAVOURITE_OFFERS: 'Selected Favourite Offers',
  BEGIN_PURCHASE_FLOW: 'Begin Purchase Flow',
  BEGIN_FREE_TRIAL_REGISTRATION: 'Begin Free Trial Registration',
  COMPLETE_FREE_TRIAL_REGISTRATION: 'Complete Free Trial Registration',
  VIEW_FREE_TRIAL_MEMBERSHIP_GATE: 'View Free Trial Membership Gate',
  COMPLETE_PURCHASE_FLOW: 'Complete Purchase Flow',
  VIEW_HOME_PAGE: 'View Home Page',
  VIEW_TRENDING: 'View Trending',
  VIEW_CATEGORY: 'View Category',
  VIEW_OFFER: 'View Offer',
  AD_CLICKED: 'Ad Clicked',
  FILTER_SELECTED: 'Filter Selected',
  LOCATION_FILTER_SELECTED: 'Location Filter Selected',
  VIEW_COLLECTION: 'View Collection',
  REDEEM_ONLINE_OFFER: 'Redeem Online',
  PRESSED_COPY_CODE: 'Pressed Copy Code',
  VIEW_CONTEST: 'View Contest',
  ENTER_CONTEST: 'Enter Contest',
  SEARCH_PERFORMED: 'Search Performed',
  UPDATED_PERSONAL_INFO: 'Updated Personal Info',
  UPDATED_OFFER_PREFERENCES: 'Updated Offer Preferences',
  CLICKED_CAROUSEL: 'Clicked Carousel',
  DOWNLOAD_APP_STORE_CLICKED: 'Download App Store Clicked',
  DOWNLOAD_PLAY_STORE_CLICKED: 'Download Play Store Clicked',
  NAV_BAR_ITEM_CLICKED: 'Nav Bar Item Clicked',
  FOOTER_ITEM_CLICKED: 'Footer Item Clicked',
  TRACK_PAGES: 'Track Pages',
  CLICKED_FAQ: 'Clicked FAQ',
  CLICKED_CTA: 'Clicked CTA',
  CLICKED_CIBC_RAF_CTA: 'Clicked CIBC RAF CTA',
  FAVOURITE_ADDED: 'Favourite Added',
  FAVOURITE_REMOVED: 'Favourite Removed',
  VIEW_FAVOURITES: 'View Favourites',
  VIEW_ALL_PLUS_OFFERS: 'View All Plus Offers',
  VIEW_PLUS_MEMBERSHIP_GATE: 'View Plus Membership Gate',
  LEARN_MORE_ON_WELCOME: 'Click Learn More On Welcome',
  VIEW_SPC_PLUS_WELCOME_MODAL: 'View SPC+ Welcome Modal',
  VIEW_PLUS_PAGE: 'View Plus Page',
  LEARN_MORE_ON_MEMBERSHIP_GATE: 'Click Learn More On Membership Gate',
  KEEP_BROWSING_ON_MEMBERSHIP_GATE: 'Click Keep Browsing On Membership Gate',
  VIEW_PLUS_ACCESS_REMINDER: 'View Plus Access Reminder',
  VIEW_PLUS_OFFER:'View Plus Offer',
  VIEW_PLUS_COLLECTION: 'View Plus Collection',
  VIEW_PLUS_CONTEST: 'View Plus Contest',
  ENTER_PLUS_CONTEST: 'Enter Plus Contest',
  REDEEM_ONLINE_PLUS_OFFER: 'Redeem Online Plus Offer',
  CLICKED_VIEW_PLUS_ON_ACCESS_REMINDER:
    'Click View Plus Deal On Access Reminder',
  CLICKED_REDEEM_ANYWAY_ON_ACCESS_REMINDER:
    'Click Redeem Anyway On Access Reminder',
  CLICKED_PLUS_CAROUSEL: 'Clicked Plus Carousel',
  VIEW_AUTO_RENEWAL_GATE: 'View Auto Renewal Gate',
  ENABLE_AUTO_RENEW: 'Enable Auto Renew',
  DISABLE_AUTO_RENEW: 'Disable Auto Renew',
  VIEW_BILLING_DETAILS: 'View Billing Details',
  SELECT_WHAT_IS_AUTO_RENEW: 'Select What is Auto Renew',
  VIEW_BILLING_HISTORY: 'View Billing History',
  AUTO_RENEW_PAYMENT_COMPLETE: 'Auto Renew Payment Complete',
  SCHOOL_CODE_ENTERED: 'School Code Entered',
  SCHOOL_CODE_APPLIED: 'School Code Applied',
  PROMO_CODE_ENTERED: 'Promo Code Entered',
  PROMO_CODE_APPLIED: 'Promo Code Applied',
  PAYMENT_METHOD_CLICKED: 'Payment Method Clicked',
  PAYMENT_METHOD_NEXT_CLICKED: 'Payment Method Next Clicked',
  VIEWED_PURCHASE_SUMMARY: 'Viewed Purchase Summary',
  CLICKED_FEATURED_AD: 'Clicked Featured',
  CLICKED_CATEGORY_BUBBLE: 'Clicked Category Bubble',
  SUBSCRIBE_EMAIL: 'Subscribe Email',
  CLICKED_VIEW_ALL_SPC_DEALS: 'Clicked view all spc deals',
  VIEW_SAMPLES_PAGE: 'View Samples Page',
  START_ADDITIONAL_QUESTIONS: 'Start Additional Questions',
  COMPLETE_ADDITIONAL_QUESTIONS: 'Complete Additional Questions',
  CLICKED_INSTAGRAM_POST: 'Clicked Instagram Post',
  CLICKED_VALUE_PROP: 'Clicked Value Prop',
  CLICKED_TRENDING: 'Clicked Trending',
  CLICKED_PARTNER_LOGO: 'Clicked Partner Logo',
  SHARE_CLICKED: 'Share Clicked',
  FAVOURITE_THEME: 'Favourite Theme',
  CREATE_SAVED_LIST: 'Create Saved List',
  DELETE_SAVED_LIST: 'Delete Saved List',
  THEME_CHANGED: 'Theme Changed',
  CLICKED_CIBC_OFFER: 'Clicked CIBC Offer',
  BEGIN_ACTIVATION: 'Begin Activation',
  COMPLETE_ACTIVATION: 'School Portal - Complete Activation',
  CLICKED_JOIN_NOW_QR_STUDENT_DISCOUNT: 'Clicked Top Join Now QR Student Discounts',
  CLICKED_JOIN_NOW_QR_WHY_SPC: 'Clicked Bottom Join Now QR Why SPC',
  MOBILE_WEB_VIEW_DIGITAL_MEMBERSHIP: 'Mobile Web - View Digital Membership',
  CLICKED_APP_OPEN_BANNER: 'Clicked App Open Banner',
  CLICKED_START_SHOPPING: 'Clicked Start Shopping',
  SCHOOL_PORTAL_SELECTED_SCHOOL: 'School Portal Selected School',
  SCHOOL_PORTAL_CLICKED_VERIFY_MY_STATUS: 'School Portal Clicked Verify My Status',
  JOIN_NOW_DISCOUNT_SHOWN: 'Join Now Discount Shown',
  ADD_PAYMENT_METHOD: 'Add Payment Method',
  CLICK_SOCIAL: 'Click Social',
  VIEW_ACTIVATION_CONFIRMATION_MODAL: 'View Activation Confirmation Modal',
  CLICK_RENEW_NOW: 'Click Renew Now - Activation Confirmation Modal',
  CLICK_START_SAVING: 'Click Start Saving - Activation Confirmation Modal',
  SCHOOL_PORTAL_VIEW_ACTIVATION_CONFIRMATION_MODAL: 'School Portal - View Activation Confirmation Modal',
  SCHOOL_PORTAL_CLICK_START_SAVING: 'School Portal - Start Saving - Activation Confirmation Modal',
  UTM_2_DISCOUNT: ' UTM_2$_discount',
  VIEW_MEMBERSHIP_EXPIRED_BANNER: 'View Membership Expired Banner',
  CLICK_MEMBERSHIP_EXPIRED_BANNER: 'Click Membership Expired Banner',
  VIEW_PM_EXPIRING_BANNER: 'View Payment Method Expiring Banner',
  CLICK_PM_EXPIRING_BANNER: 'Click Payment Method Expiring Banner',
  VIEW_PM_EXPIRED_BANNER: 'View Payment Method Expired Banner',
  CLICK_PM_EXPIRED_BANNER: 'Click Payment Method Expired Banner',
  VIEW_MEMBERSHIP_EXPIRING_BANNER: 'View Membership Expiring Banner',
  CLICK_MEMBERSHIP_EXPIRING_BANNER: 'Click Membership Expiring Banner',
  VIEW_PAYMENT_METHOD_EXPIRED_MODAL: 'View Payment Method Expired Modal',
  CLICK_UPDATE_PAYMENT_METHOD: 'Click Update Payment Method',
  VIEW_MEMBERSHIP_EXPIRING_MODAL: 'View Membership Expiring Modal',
  CLICK_START_SUBSCRIPTION: 'Click Start Subscription',
  VIEW_MEMBERSHIP_EXPIRED_MODAL: 'View Membership Expired Modal',
  CLICK_RESUBSCRIBE_NOW: 'Click Resubscribe Now',
  CLICK_SUBMIT_NOW: 'Click Submit Now',
  CLICK_LEARN_MORE: 'Click Learn More',
  CLICK_FORM_SUBMISSION: 'Click Form Submission',
  MEMBER_DETAILS_COMPLETED: 'Member Details Completed',
  SUBSCRIPTION_TOGGLE_STATUS_ON: 'Subscription Toggled On',
  SUBSCRIPTION_TOGGLE_STATUS_OFF: 'Subscription Toggled Off',
  INCENTIVE_SHOWN: 'Incentive Shown',
  INCENTIVE_ACCEPTED: 'Incentive Accepted',
  INCENTIVE_DENIED: 'Incentive Denied',
  ACTIVATION_COMPLETED: 'Activation Completed - Incentive Flow',
  ACTIVATION_INCOMPLETE: 'Activation Incomplete',
  BILLING_INFORMATION_COMPLETED: 'Billing Information Completed',
  BILLING_INFORMATION_INCOMPLETE: 'Billing Information Incomplete',
  VERIFICATION_EMAIL_SENT: 'replaceFlowName - Verification Email Sent',
  VERIFIED_EMAIL: 'replaceFlowName - Email Verified',
  COMPLETE_PURCHASE_IMPACT: 'Membership purchased - Impact',
  COMPLETE_PURCHASE_PINTEREST: 'Membership purchased - Pinterest',
  HBC_SPC_BEGIN_ACCOUNT_CREATION: 'HBC-SPC begin account creation',
  HBC_SPC_COMPLETE_ACCOUNT_CREATION: 'HBC-SPC Complete account creation',
  HBC_SPC_LOGIN_SUCCESSFUL: 'HBC-SPC login successful',
  HBC_SPC_LINK: 'HBC-SPC Link ',
  HBC_SPC_SHOP_NOW: 'HBC-SPC Shop Now',
  HBC_SPC_JOIN_HBC: 'HBC-SPC Join HBC',
  COMPLETE_PURCHASE_IMPACT_ERROR: 'Membership purchased - Impact - error',
  COMPLETE_PURCHASE_PINTEREST_ERROR: 'Membership purchased - Pinterest - error',
  OFFER_SUBTITLE_CLICK: 'Offer Subtitle Click'
}

const ACTIONS_INTERNAL = {
  VIEW_PAYMENT_METHOD_EXPIRED_MODAL: () => {
    //  Event to Track Payment Modal Appear

    window.mixpanel.track(EVENTS.VIEW_PAYMENT_METHOD_EXPIRED_MODAL)
    dataLayerPush({
      'event': EVENTS.VIEW_PAYMENT_METHOD_EXPIRED_MODAL
    })

    Leanplum.track(EVENTS.VIEW_PAYMENT_METHOD_EXPIRED_MODAL)
  },
  CLICK_UPDATE_PAYMENT_METHOD: modalName => {
    //  Event to Track Click Update Payment Method

    const properties = {
      'Modal': modalName
    }

    window.mixpanel.track(EVENTS.CLICK_UPDATE_PAYMENT_METHOD, properties)
    dataLayerPush({
      'event': EVENTS.CLICK_UPDATE_PAYMENT_METHOD,
      ...properties
    })

    Leanplum.track(EVENTS.CLICK_UPDATE_PAYMENT_METHOD, properties)
  },
  VIEW_MEMBERSHIP_EXPIRING_MODAL: () => {
    //  Event to Track Membership Expiring Modal Appear

    window.mixpanel.track(EVENTS.VIEW_MEMBERSHIP_EXPIRING_MODAL)
    dataLayerPush({
      'event': EVENTS.VIEW_MEMBERSHIP_EXPIRING_MODAL
    })

    Leanplum.track(EVENTS.VIEW_MEMBERSHIP_EXPIRING_MODAL)
  },
  CLICK_START_SUBSCRIPTION: (modalName) => {
    //  Event to Track User Click Start Subscription

    const properties = {
      'Modal': modalName
    }

    window.mixpanel.track(EVENTS.CLICK_START_SUBSCRIPTION, properties)
    dataLayerPush({
      'event': EVENTS.CLICK_START_SUBSCRIPTION,
      ...properties
    })

    Leanplum.track(EVENTS.CLICK_START_SUBSCRIPTION, properties)
  },
  VIEW_MEMBERSHIP_EXPIRED_MODAL: () => {
    //  Event to Track Membership Expired Modal Appear

    window.mixpanel.track(EVENTS.VIEW_MEMBERSHIP_EXPIRED_MODAL)
    dataLayerPush({
      'event': EVENTS.VIEW_MEMBERSHIP_EXPIRED_MODAL
    })

    Leanplum.track(EVENTS.VIEW_MEMBERSHIP_EXPIRED_MODAL)
  },
  CLICK_RESUBSCRIBE_NOW: modalName => {
    //  Event to Track User Click Resubscribe Now

    const properties = {
      'Modal': modalName
    }

    window.mixpanel.track(EVENTS.CLICK_RESUBSCRIBE_NOW, properties)
    dataLayerPush({
      'event': EVENTS.CLICK_RESUBSCRIBE_NOW,
      ...properties
    })

    Leanplum.track(EVENTS.CLICK_RESUBSCRIBE_NOW, properties)
  },
  UTM_2_DISCOUNT: (utm) => {
    //  Event to Track UTM Sign-Up
    const properties = utm

    window.mixpanel.track(EVENTS.UTM_2_DISCOUNT, properties)
    dataLayerPush({
      'event': EVENTS.UTM_2_DISCOUNT,
      ...properties
    })

    Leanplum.track(EVENTS.UTM_2_DISCOUNT, properties)
  },
  CLICKED_APP_OPEN_BANNER: () => {
    // Event to check App Open from Mobile Web
    window.mixpanel.track(EVENTS.CLICKED_APP_OPEN_BANNER)
    dataLayerPush({
      'event': EVENTS.CLICKED_APP_OPEN_BANNER
    })

    Leanplum.track(EVENTS.CLICKED_APP_OPEN_BANNER)
  },
  APP_OPEN: () => {
    window.mixpanel.register({ Platform: 'Web', Online: true })
    window.mixpanel.track(EVENTS.APP_OPEN)
    dataLayerPush({
      'event': EVENTS.APP_OPEN
    })

    Leanplum.track(EVENTS.APP_OPEN, { Platform: 'Web' })
  },
  BEGIN_LOGIN: () => {
    window.mixpanel.track(EVENTS.BEGIN_LOGIN)
    dataLayerPush({
      'event': EVENTS.BEGIN_LOGIN
    })

    Leanplum.track(EVENTS.BEGIN_LOGIN)
  },
  CREATE_SAVED_LIST: () => {
    window.mixpanel.track(EVENTS.CREATE_SAVED_LIST)
    dataLayerPush({
      'event': EVENTS.CREATE_SAVED_LIST
    })

    Leanplum.track(EVENTS.CREATE_SAVED_LIST)
  },
  DELETE_SAVED_LIST: () => {
    window.mixpanel.track(EVENTS.DELETE_SAVED_LIST)
    dataLayerPush({
      'event': EVENTS.DELETE_SAVED_LIST
    })

    Leanplum.track(EVENTS.DELETE_SAVED_LIST)
  },
  MOBILE_WEB_VIEW_DIGITAL_MEMBERSHIP: () => {
    window.mixpanel.track(EVENTS.MOBILE_WEB_VIEW_DIGITAL_MEMBERSHIP)
    dataLayerPush({
      'event': EVENTS.MOBILE_WEB_VIEW_DIGITAL_MEMBERSHIP
    })

    Leanplum.track(EVENTS.MOBILE_WEB_VIEW_DIGITAL_MEMBERSHIP)
  },
  COMPLETE_LOGIN: (uid, email, provider) => {
    bugsnagClient.user = {
      id: uid,
      email
    }
    window.mixpanel.identify(uid)
    window.mixpanel.people.set_once('$braze_external_id', uid)
    const properties = {
      '$email': email,
      'Login Method': provider
    }
    window.mixpanel.track(EVENTS.COMPLETE_LOGIN, properties)
    window.mixpanel.people.set(properties)
    window.mixpanel.register({ Authenticated: true })
    dataLayerPush({
      'userId': uid
    })
    dataLayerPush({
      'event': EVENTS.COMPLETE_LOGIN,
      'Email': email,
      'Login Method': provider
    })

    Leanplum.setUserId(uid)
    Leanplum.setUserAttributes({
      'email': email,
    })
    Leanplum.track(EVENTS.COMPLETE_LOGIN, {
      'Login Method': provider,
      'email': email
    })
  },
  LOGOUT: () => {
    bugsnagClient.user = null
    window.mixpanel.track(EVENTS.LOGOUT)
    window.mixpanel.register({ Authenticated: false })
    dataLayerPush({
      'userId': null
    })

    Leanplum.track(EVENTS.LOGOUT)
    Leanplum.start()
  },
  CLICKED_RESET_PASSWORD: () => {
    window.mixpanel.track(EVENTS.CLICKED_RESET_PASSWORD)
    dataLayerPush({
      'event': EVENTS.CLICKED_RESET_PASSWORD
    })

    Leanplum.track(EVENTS.CLICKED_RESET_PASSWORD)
  },
  BEGIN_REGISTRATION: () => {
    window.mixpanel.track(EVENTS.BEGIN_REGISTRATION)
    dataLayerPush({
      'event': EVENTS.BEGIN_REGISTRATION
    })

    Leanplum.track(EVENTS.BEGIN_REGISTRATION)
  },
  VIEW_FREE_TRIAL_MEMBERSHIP_GATE: () => {
    window.mixpanel.track(EVENTS.VIEW_FREE_TRIAL_MEMBERSHIP_GATE)
    dataLayerPush({
      'event': EVENTS.VIEW_FREE_TRIAL_MEMBERSHIP_GATE
    })

    Leanplum.track(EVENTS.VIEW_FREE_TRIAL_MEMBERSHIP_GATE)
  },
  BEGIN_FREE_TRIAL_REGISTRATION: () => {
    window.mixpanel.track(EVENTS.BEGIN_FREE_TRIAL_REGISTRATION)
    dataLayerPush({
      'event': EVENTS.BEGIN_FREE_TRIAL_REGISTRATION
    })

    Leanplum.track(EVENTS.BEGIN_FREE_TRIAL_REGISTRATION)
  },
  COMPLETE_FREE_TRIAL_REGISTRATION: () => {
    const properties = {
      '19/20_free_trial': true
    }
    window.mixpanel.track(EVENTS.COMPLETE_FREE_TRIAL_REGISTRATION)
    dataLayerPush({
      'event': EVENTS.COMPLETE_FREE_TRIAL_REGISTRATION
    })

    Leanplum.track(EVENTS.COMPLETE_FREE_TRIAL_REGISTRATION)
    Leanplum.setUserAttributes(properties)
  },

  COMPLETE_REGISTRATION: (cardNumber, cardType, isFreeTrial = false, retailer = '') => {
    const registrationDate = (new Date()).toISOString().split('T')[0];
    const properties = {
      'Membership number': cardNumber,
      'Membership Type': cardType,
      'Registration Date': registrationDate,
      'Free Trial': isFreeTrial,
      'Retailer': retailer
    }
    const leanPlumProperties = {
      'Membership Number': cardNumber,
      'Membership Type': cardType,
      'Registration Date': registrationDate,
      'Retailer': retailer
    }
    window.mixpanel.track(EVENTS.COMPLETE_REGISTRATION, properties)
    window.mixpanel.people.append({
      'Membership Numbers': cardNumber,
      'Free Trial': isFreeTrial,
      'Retailer': retailer
    })
    window.mixpanel.people.set({
      'Registration Date': registrationDate,
      'Free Trial': isFreeTrial,
      'Retailer': retailer
    })
    dataLayerPush({
      'event': EVENTS.COMPLETE_REGISTRATION,
      ...properties
    })

    Leanplum.track(EVENTS.COMPLETE_REGISTRATION, leanPlumProperties)
  },
  BEGIN_ACCOUNT_CREATION: () => {
    window.mixpanel.track(EVENTS.BEGIN_ACCOUNT_CREATION)
    dataLayerPush({
      'event': EVENTS.BEGIN_ACCOUNT_CREATION
    })

    Leanplum.track(EVENTS.BEGIN_ACCOUNT_CREATION)
  },
  ACCOUNT_CREATION_VALIDATION_FAILED: (step, missingFields) => {
    const properties = {
      'Step': step,
      'Missing Fields': missingFields
    }
    window.mixpanel.track(EVENTS.ACCOUNT_CREATION_VALIDATION_FAILED, properties)
    dataLayerPush({
      'event': EVENTS.ACCOUNT_CREATION_VALIDATION_FAILED,
      ...properties
    })

    Leanplum.track(EVENTS.ACCOUNT_CREATION_VALIDATION_FAILED, properties)
  },
  COMPLETE_ACCOUNT_CREATION: (uid, { email, firstName, lastName, emailOptIn, birthdate, gender, postalCode, schoolType, language, international, age }) => {
    const properties = {
      'First Name': firstName,
      'Last Name': lastName,
      'email opt-in': emailOptIn,
      'Birthdate': birthdate.toISOString(),
      'Gender': gender,
      'Postal Code': postalCode,
      'School Type': schoolType,
      'Language': language,
      'email': email,
      'International': international,
      'Age': age
    }
    const lpDefaultAttribute = emailOptIn ? { 'unsubscribeChannelsToRemove': 'Email', 'userId': uid } : { 'unsubscribeChannelsToAdd': 'Email', 'userId': uid }
    const eventProperties = {
      '$email': email,
      ...properties
    }
    const peopleProperties = {
      '$email': email,
      '$name': [firstName, lastName].filter(x => !!x).join(' '),
      ...properties
    }
    window.mixpanel.alias(uid)
    window.mixpanel.track(EVENTS.COMPLETE_ACCOUNT_CREATION, eventProperties)
    window.mixpanel.people.set(peopleProperties)
    dataLayerPush({
      'event': EVENTS.COMPLETE_ACCOUNT_CREATION,
      'Email': email,
      ...properties
    })

    Leanplum.setUserId(uid)
    Leanplum.track(EVENTS.COMPLETE_ACCOUNT_CREATION, properties)
    Leanplum.setUserAttributes(properties)
    updateDefaultLeanplumAttributes(lpDefaultAttribute)
  },
  SELECTED_FAVOURITE_CATEGORIES: (categories) => {
    const properties = {
      'Favourite Categories': categories
    }
    window.mixpanel.track(EVENTS.SELECTED_FAVOURITE_CATEGORIES, properties)
    dataLayerPush({
      'event': EVENTS.SELECTED_FAVOURITE_CATEGORIES,
      ...properties
    })

    Leanplum.track(EVENTS.SELECTED_FAVOURITE_CATEGORIES, properties)
    Leanplum.setUserAttributes(properties)
  },
  SELECTED_FAVOURITE_OFFERS: (offersId) => {
    const properties = {
      'Favourite Offers': offersId
    }
    window.mixpanel.track(EVENTS.SELECTED_FAVOURITE_OFFERS, properties)
    window.mixpanel.people.set(properties)
    dataLayerPush({
      'event': EVENTS.SELECTED_FAVOURITE_OFFERS,
      ...properties
    })

    Leanplum.track(EVENTS.SELECTED_FAVOURITE_OFFERS, properties)
    Leanplum.setUserAttributes(properties)
  },
  BEGIN_PURCHASE_FLOW: () => {
    window.mixpanel.track(EVENTS.BEGIN_PURCHASE_FLOW)
    dataLayerPush({
      'event': EVENTS.BEGIN_PURCHASE_FLOW
    })

    Leanplum.track(EVENTS.BEGIN_PURCHASE_FLOW)
  },
  COMPLETE_PURCHASE_FLOW: ({
    province, method, quantity, cardNumber, cardNumbers, total, referralCode,
    orderID, productID, productDescription, price, tax, priceAfterTax, email,
    membershipType, retailer, promo_code, school_code, school_name, auto_renew,
    guest_purchase, fromExtension = false
  }) => {
    const eventProperties = {
      'Province': province,
      'Payment Method': method,
      'Quantity': quantity,
      'Purchased Memberships': cardNumbers,
      'Referral Code': referralCode,
      'Purchase Amount': total,
      'Purchase Email': email,
      'Membership Type': membershipType,
      'Retailer': retailer,
      'Promo Code': promo_code,
      'School Code': school_code,
      'School Name': school_name,
      'Auto Renew': auto_renew,
      'Guest Purchase': guest_purchase,
      'From Extension': fromExtension
    }
    window.mixpanel.track(EVENTS.COMPLETE_PURCHASE_FLOW, eventProperties)
    if (cardNumber) window.mixpanel.people.append({ 'Membership Numbers': cardNumber })
    window.mixpanel.people.union({ 'Payment Method': method })
    window.mixpanel.people.append({ 'Purchased Memberships': cardNumbers })
    window.mixpanel.people.append({ 'Referral Codes': referralCode })
    window.mixpanel.people.append({ 'Retailer': retailer })
    window.mixpanel.people.append({ 'Promo Code': promo_code })
    window.mixpanel.people.append({ 'School Code': school_code })
    window.mixpanel.people.append({ 'School Name': school_name })
    window.mixpanel.people.append({ 'Auto Renew': auto_renew })
    window.mixpanel.people.append({ 'Guest Purchase': guest_purchase })
    window.mixpanel.people.increment({ 'Number of cards purchased': quantity })
    window.mixpanel.people.increment({ 'Lifetime Revenue': total })
    window.mixpanel.people.track_charge(total)
    dataLayerPush({
      'event': EVENTS.COMPLETE_PURCHASE_FLOW,
      ...eventProperties
    })
    dataLayerPush({
      'event':'ecomm_event',
      'transactionId': String(orderID), // Transaction ID - this is normally generated by your system.
      'transactionAffiliation': 'SPC Online Store', // Affiliation or store name
      'transactionTotal': String(priceAfterTax), // Grand Total
      'transactionTax': String(tax) , // Tax.
      'transactionShipping':'0', // Shipping cost
      'transactionProducts': [
        {
          'sku': String(productID), // SKU/code.
          'name': String(productDescription), // Product name.
          'category': 'Membership', // Category or variation.
          'price': String(price), // Unit price.
          'quantity': String(quantity)
        }
      ]
    })

    Leanplum.track(EVENTS.COMPLETE_PURCHASE_FLOW, eventProperties)
    // TODO: append Payment Method, Purchased Memberships, Referral Codes
    // TODO: increment Number of Cards Purchased, Lifetime Revenue
  },
  VIEW_HOME_PAGE: () => {
    window.mixpanel.track(EVENTS.VIEW_HOME_PAGE)
    dataLayerPush({
      'event': EVENTS.VIEW_HOME_PAGE
    })

    Leanplum.track(EVENTS.VIEW_HOME_PAGE)
  },
  VIEW_TRENDING: (section) => {
    const properties = {
      'Source Section': section
    }
    window.mixpanel.track(EVENTS.VIEW_TRENDING, properties)
    dataLayerPush({
      'event': EVENTS.VIEW_TRENDING,
      ...properties
    })

    Leanplum.track(EVENTS.VIEW_TRENDING, properties)
  },
  VIEW_CATEGORY: (category, sourceSection, plusCategory) => {
    const properties = {
      'Category Name': category,
      'Source Section': sourceSection,
      'Plus Category': plusCategory
    }
    window.mixpanel.track(EVENTS.VIEW_CATEGORY, properties)
    dataLayerPush({
      'event': EVENTS.VIEW_CATEGORY,
      ...properties
    })

    Leanplum.track(EVENTS.VIEW_CATEGORY, properties)
  },
  VIEW_OFFER: ({ offerID, offerName, category, partnerName, offerType, featured, sourceSection, isSPCPlus, userCampus}) => {
    // register super props userCampus
    window.mixpanel.register({ 'User Campus': userCampus ?  userCampus : 'None'})
    // TODO: track event property Souce Page, Partner ID, Promo Code Type
    const properties = {
      'Offer ID': offerID,
      'Offer Name': offerName,
      'Category': category,
      'Category SPC': isSPCPlus,
      'Partner Name': partnerName,
      'Offer Type': offerType,
      'Featured': featured,
      'Plus Offer': isSPCPlus,
      'Source Section': sourceSection,
    }
    window.mixpanel.track(EVENTS.VIEW_OFFER, properties)
    window.mixpanel.people.increment('Total Number of Offers Viewed', 1)
    dataLayerPush({
      'event': EVENTS.VIEW_OFFER,
      ...properties
    })

    Leanplum.track(EVENTS.VIEW_OFFER, properties)
    // TODO: increment Total Offers Viewed
    //
    if (isSPCPlus) {
      dataLayerPush({
        'event': EVENTS.VIEW_PLUS_OFFER,
        ...properties
      })
      Leanplum.track(EVENTS.VIEW_PLUS_OFFER, properties)
    }
  },
  AD_CLICKED: (adName) => {
    const properties = { 'Ad Name': adName }
    // TODO: track event property Ad Type
    window.mixpanel.track(EVENTS.AD_CLICKED, properties)
    dataLayerPush({
      'event': EVENTS.AD_CLICKED,
      ...properties
    })

    Leanplum.track(EVENTS.AD_CLICKED, properties)
  },
  FILTER_SELECTED: (offerType) => {
    const properties = { 'Offer Type': offerType }
    window.mixpanel.track(EVENTS.FILTER_SELECTED, properties)
    dataLayerPush({
      'event': EVENTS.FILTER_SELECTED,
      ...properties
    })

    Leanplum.track(EVENTS.FILTER_SELECTED, properties)
  },
  LOCATION_FILTER_SELECTED: (postalCode, distance) => {
    const properties = { 'Postal Code': postalCode, 'Distance': distance }
    window.mixpanel.track(EVENTS.LOCATION_FILTER_SELECTED, properties)
    dataLayerPush({
      'event': EVENTS.LOCATION_FILTER_SELECTED,
      ...properties
    })

    Leanplum.track(EVENTS.LOCATION_FILTER_SELECTED, properties)
  },
  VIEW_COLLECTION: ({ collectionName, offers, partners, plusCollection }) => {
    const properties = {
      'Collection Name': collectionName,
      'Offers in Collection': offers,
      'Partners in Collection': partners,
      'Plus Collection': plusCollection
    }
    window.mixpanel.track(EVENTS.VIEW_COLLECTION, properties)
    dataLayerPush({
      'event': EVENTS.VIEW_COLLECTION,
      ...properties
    })

    Leanplum.track(EVENTS.VIEW_COLLECTION, properties)

    if (plusCollection) {
      dataLayerPush({
        'event': EVENTS.VIEW_PLUS_COLLECTION,
        ...properties
      })
      Leanplum.track(EVENTS.VIEW_PLUS_COLLECTION, properties)
    }
  },
  FAVOURITE_ADDED: ({
    offerID,
    offerName,
    offerType,
    featured,
    category,
    partnerName,
    partnerID,
    sourceSection,
    plusOffer
  }) => {
    const properties = {
      'Offer ID': offerID,
      'Offer Name': offerName,
      'Category': category,
      'Partner Name': partnerName,
      'Partner ID': partnerID,
      'Offer Type': offerType,
      'Featured': featured,
      'Source Section': sourceSection,
      'Plus Offer': plusOffer
    }
    window.mixpanel.track(EVENTS.FAVOURITE_ADDED, properties)
    dataLayerPush({
      'event': EVENTS.FAVOURITE_ADDED,
      ...properties
    })

    Leanplum.track(EVENTS.FAVOURITE_ADDED, properties)
  },
  FAVOURITE_REMOVED: ({
    offerID,
    offerName,
    offerType,
    featured,
    category,
    partnerName,
    partnerID,
    sourceSection,
    plusOffer
  }) => {
    const properties = {
      'Offer ID': offerID,
      'Offer Name': offerName,
      'Category': category,
      'Partner Name': partnerName,
      'Partner ID': partnerID,
      'Offer Type': offerType,
      'Featured': featured,
      'Source Section': sourceSection,
      'Plus Offer': plusOffer
    }
    window.mixpanel.track(EVENTS.FAVOURITE_REMOVED, properties)
    dataLayerPush({
      'event': EVENTS.FAVOURITE_REMOVED,
      ...properties
    })

    Leanplum.track(EVENTS.FAVOURITE_REMOVED, properties)
  },
  VIEW_FAVOURITES: ({ partnerNames, offerCount }) => {
    const properties = {
      'Number of Favourites': offerCount,
      'Partner Names': partnerNames
    }
    window.mixpanel.track(EVENTS.VIEW_FAVOURITES, properties)
    dataLayerPush({
      'event': EVENTS.VIEW_FAVOURITES,
      ...properties
    })

    Leanplum.track(EVENTS.VIEW_FAVOURITES, properties)
  },
  REDEEM_ONLINE_OFFER: ({ offerID, offerName, category, partnerName, partnerID, offerType, featured, plusOffer}) => {
    const properties = {
      'Offer ID': offerID,
      'Offer Name': offerName,
      'Offer Type': offerType,
      'Category': category,
      'Partner Name': partnerName,
      'Partner ID': partnerID,
      'Featured': featured,
      'Plus Offer': plusOffer
    }
    window.mixpanel.track(EVENTS.REDEEM_ONLINE_OFFER, properties)
    dataLayerPush({
      'event': EVENTS.REDEEM_ONLINE_OFFER,
      ...properties
    })

    Leanplum.track(EVENTS.REDEEM_ONLINE_OFFER, properties)
    if (plusOffer){
      dataLayerPush({
        'event': EVENTS.REDEEM_ONLINE_PLUS_OFFER,
        ...properties
      })
      Leanplum.track(EVENTS.REDEEM_ONLINE_PLUS_OFFER, properties)
    }

  },
  PRESSED_COPY_CODE: ({ offerID, offerName, category, partnerName, partnerID, offerType, featured, plusOffer, isHoverClicked = false }) => {
    // TODO: track event property Promo Code
    const properties = {
      'Offer ID': offerID,
      'Offer Name': offerName,
      'Category': category,
      'Partner Name': partnerName,
      'Partner ID': partnerID,
      'Offer Type': offerType,
      'Featured': featured,
      'Hover Clicked': isHoverClicked,
      'Plus Offer': plusOffer
    }
    window.mixpanel.track(EVENTS.PRESSED_COPY_CODE, properties)
    dataLayerPush({
      'event': EVENTS.PRESSED_COPY_CODE,
      ...properties
    })

    Leanplum.track(EVENTS.PRESSED_COPY_CODE, properties)
  },
  OFFER_SUBTITLE_CLICK: ({ offerID, offerName, category, partnerName, partnerID, offerType }) => {
    const properties = {
      'Offer ID': offerID,
      'Offer Name': offerName,
      'Offer Type': offerType,
      'Category': category,
      'Partner Name': partnerName,
      'Partner ID': partnerID
    }
    window.mixpanel.track(EVENTS.OFFER_SUBTITLE_CLICK, properties)
    dataLayerPush({
      'event': EVENTS.OFFER_SUBTITLE_CLICK,
      ...properties
    })
 
    Leanplum.track(EVENTS.OFFER_SUBTITLE_CLICK, properties)
  },
  VIEW_CONTEST: (contestTitle, sourceSection, plusContest) => {
    const properties = {
      'Contest Title': contestTitle,
      'Source Section': sourceSection,
      'Plus Contest': plusContest
    }
    window.mixpanel.track(EVENTS.VIEW_CONTEST, properties)
    dataLayerPush({
      'event': EVENTS.VIEW_CONTEST,
      ...properties
    }),

    Leanplum.track(EVENTS.VIEW_CONTEST, properties)

    if (plusContest){
      dataLayerPush({
        'event': EVENTS.VIEW_PLUS_CONTEST,
        ...properties
      }),

        Leanplum.track(EVENTS.VIEW_PLUS_CONTEST, properties)
    }
  },
  ENTER_CONTEST: (contestTitle, sourceSection, plusContest) => {
    const properties = {
      'Contest Title': contestTitle,
      'Source Section': sourceSection,
      'Plus Contest': plusContest
    }
    window.mixpanel.track(EVENTS.ENTER_CONTEST, properties)
    dataLayerPush({
      'event': EVENTS.ENTER_CONTEST,
      ...properties
    })

    Leanplum.track(EVENTS.ENTER_CONTEST, properties)

    if (plusContest) {
      dataLayerPush({
        'event': EVENTS.ENTER_PLUS_CONTEST,
        ...properties
      })

      Leanplum.track(EVENTS.ENTER_PLUS_CONTEST, properties)
      }

  },
  SEARCH_PERFORMED: (query) => {
    const properties = { 'Search Term': query }
    window.mixpanel.track(EVENTS.SEARCH_PERFORMED, properties)
    dataLayerPush({
      'event': EVENTS.SEARCH_PERFORMED,
      ...properties
    })

    Leanplum.track(EVENTS.SEARCH_PERFORMED, properties)
  },
  UPDATED_PERSONAL_INFO: (uid, { email, firstName, lastName, emailOptIn, birthdate, gender, postalCode, schoolType, language, international, age }) => {
    const properties = {
      'First Name': firstName,
      'Last Name': lastName,
      'email opt-in': emailOptIn,
      'Birthdate': birthdate.toISOString(),
      'Gender': gender,
      'Postal Code': postalCode,
      'School Type': schoolType,
      'Language': language,
      'International': international,
      'Age': age
    }
    const lpDefaultAttribute = emailOptIn ? { 'unsubscribeChannelsToRemove': 'Email', 'userId': uid } : { 'unsubscribeChannelsToAdd': 'Email', 'userId': uid }
    window.mixpanel.track(EVENTS.UPDATED_PERSONAL_INFO, {
      '$email': email,
      ...properties
    })
    window.mixpanel.people.set({
      '$email': email,
      ...properties
    })
    window.mixpanel.people.set({
      '$email': email,
      '$name': [firstName, lastName].filter(x => !!x).join(' ')
    })
    dataLayerPush({
      'event': EVENTS.UPDATED_PERSONAL_INFO,
      'Email': email,
      ...properties
    })

    Leanplum.track(EVENTS.UPDATED_PERSONAL_INFO, { ...properties, 'email': email})
    Leanplum.setUserAttributes(properties)
    updateDefaultLeanplumAttributes(lpDefaultAttribute)
  },
  UPDATED_OFFER_PREFERENCES: (categories) => {
    const properties = {
      'Favourite Categories': categories
    }
    window.mixpanel.track(EVENTS.UPDATED_OFFER_PREFERENCES, properties)
    window.mixpanel.people.set(properties)
    dataLayerPush({
      'event': EVENTS.UPDATED_OFFER_PREFERENCES,
      ...properties
    })

    Leanplum.track(EVENTS.UPDATED_OFFER_PREFERENCES, properties)
    Leanplum.setUserAttributes(properties)
  },
  CLICKED_CAROUSEL: (bannerName, carouselIndex, plusCarousel=false, language) => {
    const properties = {
      'Banner Name': bannerName,
      'Carousel Number': carouselIndex,
      'Plus Carousel':plusCarousel,
      'Language': language
    }
    window.mixpanel.track(EVENTS.CLICKED_CAROUSEL, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_CAROUSEL,
      ...properties
    })
    Leanplum.track(EVENTS.CLICKED_CAROUSEL, properties)

    if (plusCarousel){
      dataLayerPush({
        'event': EVENTS.CLICKED_PLUS_CAROUSEL,
        ...properties
      })
      Leanplum.track(EVENTS.CLICKED_PLUS_CAROUSEL, properties)
    }
  },
  DOWNLOAD_APP_STORE_CLICKED: () => {
    window.mixpanel.track(EVENTS.DOWNLOAD_APP_STORE_CLICKED)
    dataLayerPush({
      'event': EVENTS.DOWNLOAD_APP_STORE_CLICKED
    })

    Leanplum.track(EVENTS.DOWNLOAD_APP_STORE_CLICKED)
  },
  DOWNLOAD_PLAY_STORE_CLICKED: () => {
    window.mixpanel.track(EVENTS.DOWNLOAD_PLAY_STORE_CLICKED)
    dataLayerPush({
      'event': EVENTS.DOWNLOAD_PLAY_STORE_CLICKED
    })

    Leanplum.track(EVENTS.DOWNLOAD_PLAY_STORE_CLICKED)
  },
  NAV_BAR_ITEM_CLICKED: (title) => {
    const properties = { 'Menu Title Name': title }
    window.mixpanel.track(EVENTS.NAV_BAR_ITEM_CLICKED, properties)
    dataLayerPush({
      'event': EVENTS.NAV_BAR_ITEM_CLICKED,
      ...properties
    })

    Leanplum.track(EVENTS.NAV_BAR_ITEM_CLICKED, properties)
  },
  FOOTER_ITEM_CLICKED: (title) => {
    const properties = { 'Menu Title Name': title }
    window.mixpanel.track(EVENTS.FOOTER_ITEM_CLICKED, properties)
    dataLayerPush({
      'event': EVENTS.FOOTER_ITEM_CLICKED,
      ...properties
    })

    Leanplum.track(EVENTS.FOOTER_ITEM_CLICKED, properties)
  },
  TRACK_PAGES: ({ toName, toPath }, { fromName, fromPath }, otherProps = {}) => {
    window.mixpanel.register({ 'Page Name': toName, 'Page Path': toPath, 'Source Page': fromName, 'Source Path': fromPath })
    window.mixpanel.track(EVENTS.TRACK_PAGES, { 'URL': toPath, ...otherProps })

    Leanplum.advanceTo(toName)
  },
  CLICKED_FAQ: (title) => {
    const properties = { 'Title': title }
    window.mixpanel.track(EVENTS.CLICKED_FAQ, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_FAQ,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_FAQ, properties)
  },
  CLICKED_CTA: (title, section = '') => {
    let properties = { 'Title': title }
    if (section != '') {
      properties['Source Section'] = section
    }
    window.mixpanel.track(EVENTS.CLICKED_CTA, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_CTA,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_CTA, properties)
  },
  CLICKED_CIBC_RAF_CTA: (title, section = '') => {
    let properties = { 'Title': title }
    if (section != '') {
      properties['Source Section'] = section
    }
    window.mixpanel.track(EVENTS.CLICKED_CIBC_RAF_CTA, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_CIBC_RAF_CTA,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_CIBC_RAF_CTA, properties)
  },
  VIEW_ALL_PLUS_OFFERS: () => {
    window.mixpanel.track(EVENTS.VIEW_ALL_PLUS_OFFERS)
    dataLayerPush({
      'event': EVENTS.VIEW_ALL_PLUS_OFFERS
    })
    Leanplum.track(EVENTS.VIEW_ALL_PLUS_OFFERS)
  },
  VIEW_PLUS_MEMBERSHIP_GATE: () => {
    window.mixpanel.track(EVENTS.VIEW_PLUS_MEMBERSHIP_GATE)
    dataLayerPush({
      'event': EVENTS.VIEW_PLUS_MEMBERSHIP_GATE
    })
    Leanplum.track(EVENTS.VIEW_PLUS_MEMBERSHIP_GATE)
  },
  LEARN_MORE_ON_WELCOME: () => {
    window.mixpanel.track(EVENTS.LEARN_MORE_ON_WELCOME)
    dataLayerPush({
      'event': EVENTS.LEARN_MORE_ON_WELCOME
    })
    Leanplum.track(EVENTS.LEARN_MORE_ON_WELCOME)
  },
  VIEW_SPC_PLUS_WELCOME_MODAL: () => {
    window.mixpanel.track(EVENTS.VIEW_SPC_PLUS_WELCOME_MODAL)
    dataLayerPush({
      'event': EVENTS.VIEW_SPC_PLUS_WELCOME_MODAL
    })
    Leanplum.track(EVENTS.VIEW_SPC_PLUS_WELCOME_MODAL)
  },
  VIEW_PLUS_PAGE: () => {
    window.mixpanel.track(EVENTS.VIEW_PLUS_PAGE)
    dataLayerPush({
      'event': EVENTS.VIEW_PLUS_PAGE
    })
    Leanplum.track(EVENTS.VIEW_PLUS_PAGE)
  },
  LEARN_MORE_ON_MEMBERSHIP_GATE: () => {
    window.mixpanel.track(EVENTS.LEARN_MORE_ON_MEMBERSHIP_GATE)
    dataLayerPush({
      'event': EVENTS.LEARN_MORE_ON_MEMBERSHIP_GATE
    })
    Leanplum.track(EVENTS.LEARN_MORE_ON_MEMBERSHIP_GATE)
  },
  KEEP_BROWSING_ON_MEMBERSHIP_GATE: () => {
    window.mixpanel.track(EVENTS.KEEP_BROWSING_ON_MEMBERSHIP_GATE)
    dataLayerPush({
      'event': EVENTS.KEEP_BROWSING_ON_MEMBERSHIP_GATE
    })
    Leanplum.track(EVENTS.KEEP_BROWSING_ON_MEMBERSHIP_GATE)
  },
  VIEW_PLUS_ACCESS_REMINDER: () => {
    window.mixpanel.track(EVENTS.VIEW_PLUS_ACCESS_REMINDER)
    dataLayerPush({
      'event': EVENTS.VIEW_PLUS_ACCESS_REMINDER
    })
    Leanplum.track(EVENTS.VIEW_PLUS_ACCESS_REMINDER)
  },
  CLICKED_VIEW_PLUS_ON_ACCESS_REMINDER: () => {
    window.mixpanel.track(EVENTS.CLICKED_VIEW_PLUS_ON_ACCESS_REMINDER)
    dataLayerPush({
      'event': EVENTS.CLICKED_VIEW_PLUS_ON_ACCESS_REMINDER
    })
    Leanplum.track(EVENTS.CLICKED_VIEW_PLUS_ON_ACCESS_REMINDER)
  },
  CLICKED_REDEEM_ANYWAY_ON_ACCESS_REMINDER: () => {
    window.mixpanel.track(EVENTS.CLICKED_REDEEM_ANYWAY_ON_ACCESS_REMINDER)
    dataLayerPush({
      'event': EVENTS.CLICKED_REDEEM_ANYWAY_ON_ACCESS_REMINDER
    })
    Leanplum.track(EVENTS.CLICKED_REDEEM_ANYWAY_ON_ACCESS_REMINDER)
  },
  VIEW_AUTO_RENEWAL_GATE: () => {
    const properties = {
      'Modal Type': 'Auto Renew'
    }

    window.mixpanel.track(EVENTS.VIEW_AUTO_RENEWAL_GATE, properties)
    Leanplum.track(EVENTS.VIEW_AUTO_RENEWAL_GATE, properties)
  },
  ENABLE_AUTO_RENEW: (source) => {
    const properties = {
      'Source': source
    }

    dataLayerPush({
      'event': EVENTS.ENABLE_AUTO_RENEW,
      ...properties
    })

    // LP and MP
    Leanplum.track(EVENTS.ENABLE_AUTO_RENEW, properties)
    window.mixpanel.track(EVENTS.ENABLE_AUTO_RENEW, properties)
  },
  DISABLE_AUTO_RENEW: (source) => {
    const properties = {
      'source': source
    }

    dataLayerPush({
      'event': EVENTS.DISABLE_AUTO_RENEW,
      ...properties
    })
    // LP and MP
    Leanplum.track(EVENTS.DISABLE_AUTO_RENEW, properties)
    window.mixpanel.track(EVENTS.DISABLE_AUTO_RENEW, properties)

  },
  VIEW_BILLING_DETAILS: (isAutoRenew) => {
    const properties = {
      'Auto Renew': isAutoRenew ? isAutoRenew : false
    }

    window.mixpanel.people.set({
      'Auto Renew': isAutoRenew ? isAutoRenew : false
    })

    window.mixpanel.track(EVENTS.VIEW_BILLING_DETAILS, properties)
    Leanplum.track(EVENTS.VIEW_BILLING_DETAILS, properties)
    Leanplum.setUserAttributes(properties)
  },
  VIEW_BILLING_HISTORY: () => {
    window.mixpanel.track(EVENTS.VIEW_BILLING_HISTORY)
    Leanplum.track(EVENTS.VIEW_BILLING_HISTORY)
  },
  SELECT_WHAT_IS_AUTO_RENEW: () => {
    window.mixpanel.track(EVENTS.SELECT_WHAT_IS_AUTO_RENEW)
    Leanplum.track(EVENTS.SELECT_WHAT_IS_AUTO_RENEW)
  },
  SCHOOL_CODE_ENTERED: () => {
    window.mixpanel.track(EVENTS.SCHOOL_CODE_ENTERED)
    Leanplum.track(EVENTS.SCHOOL_CODE_ENTERED)
  },
  SCHOOL_CODE_APPLIED: (status) => {
    const properties = {
      'Status': status
    }

    dataLayerPush({
      'event': EVENTS.SCHOOL_CODE_APPLIED,
      ...properties
    })
    window.mixpanel.track(EVENTS.SCHOOL_CODE_APPLIED, properties)
    Leanplum.track(EVENTS.SCHOOL_CODE_APPLIED, properties)
  },
  PROMO_CODE_ENTERED: () => {
    window.mixpanel.track(EVENTS.PROMO_CODE_ENTERED)
    Leanplum.track(EVENTS.PROMO_CODE_ENTERED)
  },
  PROMO_CODE_APPLIED: (status, promo_type=null, school_name=null, applied_promo_code=null) => {
    const properties = {
      'Status': status,
      'Promo Type': promo_type,
      'School Name': school_name,
      'Applied Promo Code': applied_promo_code
    }

    dataLayerPush({
      'event': EVENTS.PROMO_CODE_APPLIED,
      ...properties
    })
    window.mixpanel.track(EVENTS.PROMO_CODE_APPLIED, properties)
    Leanplum.track(EVENTS.PROMO_CODE_APPLIED, properties)
  },
  PAYMENT_METHOD_CLICKED: () => {
    window.mixpanel.track(EVENTS.PAYMENT_METHOD_CLICKED)
    Leanplum.track(EVENTS.PAYMENT_METHOD_CLICKED)
  },
  PAYMENT_METHOD_NEXT_CLICKED: () => {
    window.mixpanel.track(EVENTS.PAYMENT_METHOD_NEXT_CLICKED)
    Leanplum.track(EVENTS.PAYMENT_METHOD_NEXT_CLICKED)
  },
  VIEWED_PURCHASE_SUMMARY: () => {
    window.mixpanel.track(EVENTS.VIEWED_PURCHASE_SUMMARY)
    Leanplum.track(EVENTS.VIEWED_PURCHASE_SUMMARY)
  },
  CLICKED_FEATURED_AD: (value) => {
    let properties = value
    window.mixpanel.track(EVENTS.CLICKED_FEATURED_AD, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_FEATURED_AD,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_FEATURED_AD, properties)
  },
  CLICKED_CATEGORY_BUBBLE: (value = null) => {
    let properties = value
    window.mixpanel.track(EVENTS.CLICKED_CATEGORY_BUBBLE, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_CATEGORY_BUBBLE,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_CATEGORY_BUBBLE, properties)
  },
  SUBSCRIBE_EMAIL: (email, source = 'Banner') => {
    let properties = {
      'email': email,
      'Newsletter': 'True'
    }

    window.mixpanel.track(EVENTS.SUBSCRIBE_EMAIL, {...properties, 'Source': source})
    Leanplum.setUserAttributes(properties)
    Leanplum.track(EVENTS.SUBSCRIBE_EMAIL, {...properties, 'Source': source})
  },
  /**
   * Add Mixpanel and Leanplum event
   * Generic Function for clicking Banner
   */
   CLICKED_BANNER: (bannerName) => {
    let event = 'Clicked ' + bannerName + ' Banner'
    window.mixpanel.track(event)
    Leanplum.track(event)
  },
  /**
   * Function to add the Mixpanel and Leanplum events for CIBC offers click
   */
  CLICKED_CIBC_OFFER: (title) => {
    let properties = {
      'Title': title
    }
    window.mixpanel.track(EVENTS.CLICKED_CIBC_OFFER, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_CIBC_OFFER,
      ...properties
    })
    Leanplum.track(EVENTS.CLICKED_CIBC_OFFER, properties)
  },
  CLICKED_VIEW_ALL_SPC_DEALS: () => {
    window.mixpanel.track(EVENTS.CLICKED_VIEW_ALL_SPC_DEALS)
    Leanplum.track(EVENTS.CLICKED_VIEW_ALL_SPC_DEALS)
  },
  VIEW_SAMPLES_PAGE: () => {
    window.mixpanel.track(EVENTS.VIEW_SAMPLES_PAGE)
    dataLayerPush({
      'event': EVENTS.VIEW_SAMPLES_PAGE
    })

    Leanplum.track(EVENTS.VIEW_SAMPLES_PAGE)
  },
  START_ADDITIONAL_QUESTIONS: () => {
    window.mixpanel.track(EVENTS.START_ADDITIONAL_QUESTIONS)
    dataLayerPush({
      'event': EVENTS.START_ADDITIONAL_QUESTIONS
    })

    Leanplum.track(EVENTS.START_ADDITIONAL_QUESTIONS)
  },
  COMPLETE_ADDITIONAL_QUESTIONS: () => {
    window.mixpanel.track(EVENTS.COMPLETE_ADDITIONAL_QUESTIONS)
    dataLayerPush({
      'event': EVENTS.COMPLETE_ADDITIONAL_QUESTIONS
    })

    Leanplum.track(EVENTS.COMPLETE_ADDITIONAL_QUESTIONS)
  },
  CLICKED_INSTAGRAM_POST: (post) => {
    const properties = {
      'Title': 'Seen on instagram',
      'Post': post
    }

    window.mixpanel.track(EVENTS.CLICKED_INSTAGRAM_POST, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_INSTAGRAM_POST,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_INSTAGRAM_POST, properties)
  },
  CLICKED_VALUE_PROP (title) {
    window.mixpanel.track(EVENTS.CLICKED_VALUE_PROP, { title })
    dataLayerPush({
      'event': EVENTS.CLICKED_VALUE_PROP,
      title
    })

    Leanplum.track(EVENTS.CLICKED_VALUE_PROP, { title })
  },
  CLICKED_TRENDING (title, partnerName) {
    const properties = {
      'Partner Name': partnerName,
      'Title': title,
    }
    window.mixpanel.track(EVENTS.CLICKED_TRENDING, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_TRENDING,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_TRENDING, properties)
  },
  CLICKED_PARTNER_LOGO (title) {
    window.mixpanel.track(EVENTS.CLICKED_PARTNER_LOGO, { title })
    dataLayerPush({
      'event': EVENTS.CLICKED_PARTNER_LOGO,
      title
    })

    Leanplum.track(EVENTS.CLICKED_PARTNER_LOGO, { title })
  },
  SHARE_CLICKED: (name, offerTitle, partnerName) => {
    const properties = {
      'Social Site': name,
      'Offer Title': offerTitle,
      'Partner Name': partnerName
     }
    window.mixpanel.track(EVENTS.SHARE_CLICKED, properties)
    dataLayerPush({
      'event': EVENTS.SHARE_CLICKED,
      ...properties
    })

    Leanplum.track(EVENTS.SHARE_CLICKED, properties)
  },
  FAVOURITE_THEME: (theme) => {
    const properties = {
      'Theme ID': theme.id,
      'Theme Name': theme.name
     }
    window.mixpanel.track(EVENTS.FAVOURITE_THEME, properties)
    window.mixpanel.register({ 'Theme ID': theme.id })
    dataLayerPush({
      'event': EVENTS.FAVOURITE_THEME,
      ...properties
    })

    Leanplum.track(EVENTS.FAVOURITE_THEME, properties)
  },
  THEME_CHANGED: (theme) => {
    const properties = {
      'Theme ID': theme.id,
      'Theme Name': theme.name
     }
    window.mixpanel.track(EVENTS.THEME_CHANGED, properties)
    dataLayerPush({
      'event': EVENTS.THEME_CHANGED,
      ...properties
    })

    Leanplum.track(EVENTS.THEME_CHANGED, properties)
  },
  BEGIN_ACTIVATION: () => {
    window.mixpanel.track(EVENTS.BEGIN_ACTIVATION)
    dataLayerPush({
      'event': EVENTS.BEGIN_ACTIVATION
    })

    Leanplum.track(EVENTS.BEGIN_ACTIVATION)
  },
  COMPLETE_ACTIVATION: (cardNumber, cardType, retailer = '') => {
    const registrationDate = (new Date()).toISOString().split('T')[0];
    const properties = {
      'Membership number': cardNumber,
      'Membership Type': cardType,
      'Registration Date': registrationDate,
      'Retailer': retailer
    }

    window.mixpanel.track(EVENTS.COMPLETE_ACTIVATION, properties)
    window.mixpanel.people.append({
      'Membership Numbers': cardNumber,
      'Retailer': retailer
    })
    window.mixpanel.people.set({
      'Registration Date': registrationDate,
      'Retailer': retailer
    })
    dataLayerPush({
      'event': EVENTS.COMPLETE_ACTIVATION,
      ...properties
    })

    const leanPlumProperties = {
      'Membership Number': cardNumber,
      'Membership Type': cardType,
      'Registration Date': registrationDate,
      'Retailer': retailer
    }
    Leanplum.track(EVENTS.COMPLETE_ACTIVATION, leanPlumProperties)
  },
  /**
   * Function to add the Mixpanel and Leanplum events for Join Now CTA
   */
  CLICKED_JOIN_NOW_QR_STUDENT_DISCOUNT: (title) => {
    let properties = { 'Title': title }
    window.mixpanel.track(EVENTS.CLICKED_JOIN_NOW_QR_STUDENT_DISCOUNT, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_JOIN_NOW_QR_STUDENT_DISCOUNT,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_JOIN_NOW_QR_STUDENT_DISCOUNT, properties)
  },
  /**
   * Function to add the Mixpanel and Leanplum events for Join Now CTA
   */
  CLICKED_JOIN_NOW_QR_WHY_SPC: (title) => {
    let properties = { 'Title': title }
    window.mixpanel.track(EVENTS.CLICKED_JOIN_NOW_QR_WHY_SPC, properties)
    dataLayerPush({
      'event': EVENTS.CLICKED_JOIN_NOW_QR_WHY_SPC,
      ...properties
    })

    Leanplum.track(EVENTS.CLICKED_JOIN_NOW_QR_WHY_SPC, properties)
  },

  /**
   * Function to add the mixpanel and Leanplum events when user clicks the Start Shopping CTA
   */
  CLICKED_START_SHOPPING: () => {
    window.mixpanel.track(EVENTS.CLICKED_START_SHOPPING)
    dataLayerPush({
      'event': EVENTS.CLICKED_START_SHOPPING
    })

    Leanplum.track(EVENTS.CLICKED_START_SHOPPING)
  },

  /**
   * Function to add the mixpanel and Leanplum events when user select the School
   */
   SCHOOL_PORTAL_SELECTED_SCHOOL: (schoolName) => {
    let properties = { 'School Name': schoolName }
    window.mixpanel.track(EVENTS.SCHOOL_PORTAL_SELECTED_SCHOOL, properties)
    dataLayerPush({
      'event': EVENTS.SCHOOL_PORTAL_SELECTED_SCHOOL,
      ...properties
    })

    Leanplum.track(EVENTS.SCHOOL_PORTAL_SELECTED_SCHOOL, properties)
  },

  /**
   * Function to add the mixpanel and Leanplum events when user select the School
   */
   SCHOOL_PORTAL_CLICKED_VERIFY_MY_STATUS: (schoolName, studentMail) => {
    let properties = { 'School Name': schoolName, 'Student Mail Id': studentMail }
    window.mixpanel.track(EVENTS.SCHOOL_PORTAL_CLICKED_VERIFY_MY_STATUS, properties)
    dataLayerPush({
      'event': EVENTS.SCHOOL_PORTAL_CLICKED_VERIFY_MY_STATUS,
      ...properties
    })

    Leanplum.track(EVENTS.SCHOOL_PORTAL_CLICKED_VERIFY_MY_STATUS, properties)
  },

  JOIN_NOW_DISCOUNT_SHOWN: discount => {
    window.mixpanel.track(EVENTS.JOIN_NOW_DISCOUNT_SHOWN, {
      Discount: discount
    })
    dataLayerPush({
      'event': EVENTS.JOIN_NOW_DISCOUNT_SHOWN
    })

    Leanplum.track(EVENTS.JOIN_NOW_DISCOUNT_SHOWN)
  },

  ADD_PAYMENT_METHOD: success => {
    window.mixpanel.track(EVENTS.ADD_PAYMENT_METHOD, {
      Success: success
    })
    dataLayerPush({
      'event': EVENTS.ADD_PAYMENT_METHOD
    })

    Leanplum.track(EVENTS.ADD_PAYMENT_METHOD)
  },

  CLICK_SOCIAL: (channel, section = '') => {
    let properties = { 'Channel': channel }
    if (section != '') {
      properties['Source Section'] = section
    }
    window.mixpanel.track(EVENTS.CLICK_SOCIAL, properties)
    dataLayerPush({
      'event': EVENTS.CLICK_SOCIAL,
      ...properties
    })
    Leanplum.track(EVENTS.CLICK_SOCIAL, properties)
  },
  VIEW_ACTIVATION_CONFIRMATION_MODAL: () => {
    // Event to track viewed activation completed modal from regular flow
    window.mixpanel.track(EVENTS.VIEW_ACTIVATION_CONFIRMATION_MODAL)
    dataLayerPush({
      'event': EVENTS.VIEW_ACTIVATION_CONFIRMATION_MODAL
    })

    Leanplum.track(EVENTS.VIEW_ACTIVATION_CONFIRMATION_MODAL)
  },
  CLICK_RENEW_NOW: () => {
    // Event to track clicked subscribe now from regular flow
    window.mixpanel.track(EVENTS.CLICK_RENEW_NOW)
    dataLayerPush({
      'event': EVENTS.CLICK_RENEW_NOW
    })

    Leanplum.track(EVENTS.CLICK_RENEW_NOW)
  },
  CLICK_START_SAVING: () => {
    // Event to track clicked start saving from regular flow
    window.mixpanel.track(EVENTS.CLICK_START_SAVING)
    dataLayerPush({
      'event': EVENTS.CLICK_START_SAVING
    })

    Leanplum.track(EVENTS.CLICK_START_SAVING)
  },
  SCHOOL_PORTAL_VIEW_ACTIVATION_CONFIRMATION_MODAL: () => {
    // Event to track view activation completed modal school portal flow
    window.mixpanel.track(EVENTS.SCHOOL_PORTAL_VIEW_ACTIVATION_CONFIRMATION_MODAL)
    dataLayerPush({
      'event': EVENTS.SCHOOL_PORTAL_VIEW_ACTIVATION_CONFIRMATION_MODAL
    })

    Leanplum.track(EVENTS.SCHOOL_PORTAL_VIEW_ACTIVATION_CONFIRMATION_MODAL)
  },
  SCHOOL_PORTAL_CLICK_START_SAVING: () => {
    // Event to track start saving from school portal flow
    window.mixpanel.track(EVENTS.SCHOOL_PORTAL_CLICK_START_SAVING)
    dataLayerPush({
      'event': EVENTS.SCHOOL_PORTAL_CLICK_START_SAVING
    })

    Leanplum.track(EVENTS.SCHOOL_PORTAL_CLICK_START_SAVING)
  },
  VIEW_MEMBERSHIP_EXPIRED_BANNER: () => {
    // Event to track view membership expired banner
    window.mixpanel.track(EVENTS.VIEW_MEMBERSHIP_EXPIRED_BANNER)
    dataLayerPush({
      'event': EVENTS.VIEW_MEMBERSHIP_EXPIRED_BANNER
    })

    Leanplum.track(EVENTS.VIEW_MEMBERSHIP_EXPIRED_BANNER)
  },
  CLICK_MEMBERSHIP_EXPIRED_BANNER: () => {
    // Event to track click membership expired banner
    window.mixpanel.track(EVENTS.CLICK_MEMBERSHIP_EXPIRED_BANNER)
    dataLayerPush({
      'event': EVENTS.CLICK_MEMBERSHIP_EXPIRED_BANNER
    })

    Leanplum.track(EVENTS.CLICK_MEMBERSHIP_EXPIRED_BANNER)
  },
  VIEW_PM_EXPIRING_BANNER: () => {
    // Event to track view payment method expiring banner
    window.mixpanel.track(EVENTS.VIEW_PM_EXPIRING_BANNER)
    dataLayerPush({
      'event': EVENTS.VIEW_PM_EXPIRING_BANNER
    })

    Leanplum.track(EVENTS.VIEW_PM_EXPIRING_BANNER)
  },
  CLICK_PM_EXPIRING_BANNER: () => {
    // Event to track click payment method expiring banner
    window.mixpanel.track(EVENTS.CLICK_PM_EXPIRING_BANNER)
    dataLayerPush({
      'event': EVENTS.CLICK_PM_EXPIRING_BANNER
    })

    Leanplum.track(EVENTS.CLICK_PM_EXPIRING_BANNER)
  },
  VIEW_PM_EXPIRED_BANNER: () => {
    // Event to track view payment method expired banner
    window.mixpanel.track(EVENTS.VIEW_PM_EXPIRED_BANNER)
    dataLayerPush({
      'event': EVENTS.VIEW_PM_EXPIRED_BANNER
    })

    Leanplum.track(EVENTS.VIEW_PM_EXPIRED_BANNER)
  },
  CLICK_PM_EXPIRED_BANNER: () => {
    // Event to track click payment method expired banner
    window.mixpanel.track(EVENTS.CLICK_PM_EXPIRED_BANNER)
    dataLayerPush({
      'event': EVENTS.CLICK_PM_EXPIRED_BANNER
    })

    Leanplum.track(EVENTS.CLICK_PM_EXPIRED_BANNER)
  },
  VIEW_MEMBERSHIP_EXPIRING_BANNER: () => {
    // Event to track view membership expiring banner
    window.mixpanel.track(EVENTS.VIEW_MEMBERSHIP_EXPIRING_BANNER)
    dataLayerPush({
      'event': EVENTS.VIEW_MEMBERSHIP_EXPIRING_BANNER
    })

    Leanplum.track(EVENTS.VIEW_MEMBERSHIP_EXPIRING_BANNER)
  },
  CLICK_MEMBERSHIP_EXPIRING_BANNER: () => {
    // Event to track click membership expiring banner
    window.mixpanel.track(EVENTS.CLICK_MEMBERSHIP_EXPIRING_BANNER)
    dataLayerPush({
      'event': EVENTS.CLICK_MEMBERSHIP_EXPIRING_BANNER
    })

    Leanplum.track(EVENTS.CLICK_MEMBERSHIP_EXPIRING_BANNER)
  },
  CLICK_SUBMIT_NOW: () => {
    window.mixpanel.track(EVENTS.CLICK_SUBMIT_NOW)
    dataLayerPush({
      'event': EVENTS.CLICK_SUBMIT_NOW
    })
    Leanplum.track(EVENTS.CLICK_SUBMIT_NOW)
  },
  CLICK_LEARN_MORE: loggedIn => {
    let properties = { 'Logged In': loggedIn }

    window.mixpanel.track(EVENTS.CLICK_LEARN_MORE, properties)
    dataLayerPush({
      'event': EVENTS.CLICK_LEARN_MORE,
      ...properties
    })
    Leanplum.track(EVENTS.CLICK_LEARN_MORE, properties)
  },
  // Function used track the event for photo contest form submission
  CLICK_FORM_SUBMISSION: () => {
    window.mixpanel.track(EVENTS.CLICK_FORM_SUBMISSION)
    dataLayerPush({
      'event' : EVENTS.CLICK_FORM_SUBMISSION
    })
    Leanplum.track(EVENTS.CLICK_FORM_SUBMISSION)
  },
  //Function used to track the event for membership details completed
  MEMBER_DETAILS_COMPLETED: () => {
    window.mixpanel.track(EVENTS.MEMBER_DETAILS_COMPLETED)
    dataLayerPush({
      'event' : EVENTS.MEMBER_DETAILS_COMPLETED
    })
    Leanplum.track(EVENTS.MEMBER_DETAILS_COMPLETED)
  },
  // Function used to track the event for subscription toggled on
  SUBSCRIPTION_TOGGLE_STATUS_ON: () => {
    window.mixpanel.track(EVENTS.SUBSCRIPTION_TOGGLE_STATUS_ON)
    dataLayerPush({
      'event' : EVENTS.SUBSCRIPTION_TOGGLE_STATUS_ON
    })
    Leanplum.track(EVENTS.SUBSCRIPTION_TOGGLE_STATUS_ON)
  },
  // Function used to track the event for subscription toggled off
  SUBSCRIPTION_TOGGLE_STATUS_OFF: () => {
    window.mixpanel.track(EVENTS.SUBSCRIPTION_TOGGLE_STATUS_OFF)
    dataLayerPush({
      'event' : EVENTS.SUBSCRIPTION_TOGGLE_STATUS_OFF
    })
    Leanplum.track(EVENTS.SUBSCRIPTION_TOGGLE_STATUS_OFF)
  },
  // Track what incentive has been shown
  INCENTIVE_SHOWN: (incentiveName) => {
    let properties = {
      'Incentive Discount': incentiveName
    }
    window.mixpanel.track(EVENTS.INCENTIVE_SHOWN, properties)
    dataLayerPush({
      'event' : EVENTS.INCENTIVE_SHOWN,
      ...properties
    })
    Leanplum.track(EVENTS.INCENTIVE_SHOWN, properties)
  },
  // function used to track the event for incentive accepted
  INCENTIVE_ACCEPTED: (incentive) => {
    let properties = {
      'Incentive Discount': incentive.promo_code_name,
      'Incentive Amount': incentive.discount
    }
    window.mixpanel.track(EVENTS.INCENTIVE_ACCEPTED, properties)
    dataLayerPush({
      'event' : EVENTS.INCENTIVE_ACCEPTED,
      ...properties
    })
    Leanplum.track(EVENTS.INCENTIVE_ACCEPTED, properties)
  },
  // function used to track the event for incentive denied
  INCENTIVE_DENIED: () => {
    window.mixpanel.track(EVENTS.INCENTIVE_DENIED)
    dataLayerPush({
      'event' : EVENTS.INCENTIVE_DENIED
    })
    Leanplum.track(EVENTS.INCENTIVE_DENIED)
  },
  // function used to track the event for activation completed
  ACTIVATION_COMPLETED: () => {
    window.mixpanel.track(EVENTS.ACTIVATION_COMPLETED)
    dataLayerPush({
      'event' : EVENTS.ACTIVATION_COMPLETED
    })
    Leanplum.track(EVENTS.ACTIVATION_COMPLETED)
  },
  // function used to track the event for activation incomplete
  ACTIVATION_INCOMPLETE: () => {
    window.mixpanel.track(EVENTS.ACTIVATION_INCOMPLETE)
    dataLayerPush({
      'event' : EVENTS.ACTIVATION_INCOMPLETE
    })
    Leanplum.track(EVENTS.ACTIVATION_INCOMPLETE)
  },
  //Function used to track the event for billing information completed
  BILLING_INFORMATION_COMPLETED: () => {
    window.mixpanel.track(EVENTS.BILLING_INFORMATION_COMPLETED)
    dataLayerPush({
      'event' : EVENTS.BILLING_INFORMATION_COMPLETED
      })
    Leanplum.track(EVENTS.BILLING_INFORMATION_COMPLETED)
  },
  //Function used to track the event for billing information incomplete
  BILLING_INFORMATION_INCOMPLETE: () => {
    window.mixpanel.track(EVENTS.BILLING_INFORMATION_INCOMPLETE)
    dataLayerPush({
      'event' : EVENTS.BILLING_INFORMATION_INCOMPLETE
    })
    Leanplum.track(EVENTS.BILLING_INFORMATION_INCOMPLETE)
  },
  //Function used to track the event for Verification Email Sent
  VERIFICATION_EMAIL_SENT: (flow) => {
    const event_name = EVENTS.VERIFICATION_EMAIL_SENT.replace('replaceFlowName', flow)
    window.mixpanel.track(event_name)
    dataLayerPush({
      'event' : event_name
      })
    Leanplum.track(event_name)
  },
  //Function used to track the event for Verified Email
  EMAIL_VERIFIED: (flow) => {
    const event_name = EVENTS.VERIFIED_EMAIL.replace('replaceFlowName', flow)
    window.mixpanel.track(event_name)
    dataLayerPush({
      'event' : event_name
    })
    Leanplum.track(event_name)
  },
  //Function used to track the event for purchase from impact UTM
  COMPLETE_PURCHASE_IMPACT: () => {
    window.mixpanel.track(EVENTS.COMPLETE_PURCHASE_IMPACT)
    dataLayerPush({
      'event' : EVENTS.COMPLETE_PURCHASE_IMPACT
    })
    Leanplum.track(EVENTS.COMPLETE_PURCHASE_IMPACT)
  },
   //Function used to track the event for purchase from Pinterest UTM
   COMPLETE_PURCHASE_PINTEREST: () => {
    window.mixpanel.track(EVENTS.COMPLETE_PURCHASE_PINTEREST)
    dataLayerPush({
      'event' : EVENTS.COMPLETE_PURCHASE_PINTEREST
    })
    Leanplum.track(EVENTS.COMPLETE_PURCHASE_PINTEREST)
  },
  //Function used to track the event for HBC Landing
  HBC_SPC_BEGIN_ACCOUNT_CREATION: () => {
    window.mixpanel.track(EVENTS.HBC_SPC_BEGIN_ACCOUNT_CREATION)
    dataLayerPush({
      'event' : EVENTS.HBC_SPC_BEGIN_ACCOUNT_CREATION
    })
    Leanplum.track(EVENTS.HBC_SPC_BEGIN_ACCOUNT_CREATION)
  },
  HBC_SPC_COMPLETE_ACCOUNT_CREATION: () => {
    window.mixpanel.track(EVENTS.HBC_SPC_COMPLETE_ACCOUNT_CREATION)
    dataLayerPush({
      'event' : EVENTS.HBC_SPC_COMPLETE_ACCOUNT_CREATION
    })
    Leanplum.track(EVENTS.HBC_SPC_COMPLETE_ACCOUNT_CREATION)
  },
  HBC_SPC_LOGIN_SUCCESSFUL: () => {
    window.mixpanel.track(EVENTS.HBC_SPC_LOGIN_SUCCESSFUL)
    dataLayerPush({
      'event' : EVENTS.HBC_SPC_LOGIN_SUCCESSFUL
    })
    Leanplum.track(EVENTS.HBC_SPC_LOGIN_SUCCESSFUL)
  },
  HBC_SPC_LINK: (result, loyaltyId) => {
    const event = EVENTS.HBC_SPC_LINK + result
    let properties = { 'Loyalty ID': loyaltyId }
    window.mixpanel.track(event, properties)
    dataLayerPush({
      'event' : event,
      ...properties
    })
    Leanplum.track(event, properties)
  },
  HBC_SPC_SHOP_NOW: () => {
    window.mixpanel.track(EVENTS.HBC_SPC_SHOP_NOW)
    dataLayerPush({
      'event' : EVENTS.HBC_SPC_SHOP_NOW
    })
    Leanplum.track(EVENTS.HBC_SPC_SHOP_NOW)
  },
  HBC_SPC_JOIN_HBC: () => {
    window.mixpanel.track(EVENTS.HBC_SPC_JOIN_HBC)
    dataLayerPush({
      'event' : EVENTS.HBC_SPC_JOIN_HBC
    })
    Leanplum.track(EVENTS.HBC_SPC_JOIN_HBC)
  },
  //Function used to track the event for purchase from impact UTM
  COMPLETE_PURCHASE_IMPACT_ERROR: (error = null) => {

    const properties = {
      'error': error
    }

    window.mixpanel.track(EVENTS.COMPLETE_PURCHASE_IMPACT_ERROR, properties)
    dataLayerPush({
      'event' : EVENTS.COMPLETE_PURCHASE_IMPACT_ERROR,
      ...properties
    })
    Leanplum.track(EVENTS.COMPLETE_PURCHASE_IMPACT_ERROR, properties)
  },//Function used to track the event for purchase from impact UTM
  COMPLETE_PURCHASE_PINTEREST_ERROR: (error = null) => {

    const properties = {
      'error': error
    }

    window.mixpanel.track(EVENTS.COMPLETE_PURCHASE_PINTEREST_ERROR, properties)
    dataLayerPush({
      'event' : EVENTS.COMPLETE_PURCHASE_PINTEREST_ERROR,
      ...properties
    })
    Leanplum.track(EVENTS.COMPLETE_PURCHASE_PINTEREST_ERROR, properties)
  }
}

export const ACTIONS = mapObject(ACTIONS_INTERNAL, (func) => {
  return (...args) => {
    try {
      func(...args)
    } catch (error) {
      console.error(error)
    }
  }
})

export function updateMemberType (type) {
  if (type) type = type.toUpperCase()
  try {
    window.mixpanel.register({
      'Membership Type': type
    })
  } catch (error) {
    console.error(error)
  }
}

export function getLPVariables (name) {
  let lpVar =  Leanplum.getVariables()
  return lpVar[name]
}

export async function getLPVariable (name) {
  return await Leanplum.getVariable(name)
}

/**
 * Added language as a super property.
 *
 * @param {String} language current choosen language.
 */
export function updateLanguage (language) {
  let properties = {
    Language: language
  }
  mixpanel.register(properties)
}



// WEBPACK FOOTER //
// ./src/service/analytics-service.js