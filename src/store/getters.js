import { isValidLanguage, defaultLanguage } from '@/models'
import { cleaveOptions, isValidPostalFunc, pathFollow, isBirthday } from '@/utils'

export default {
  user: state => state.user,
  email: state => state.user ? state.user.email : null,
  uid: state => state.user ? state.user.uid : null,
  token: state => state.token,
  loggedIn: state => !!(state.user && state.token),
  providerId: state => state.user ? state.user.providerId : null,
  socialProviderList: state => state.socialProviderList,
  isSocialLogin: (state, getters) => state.socialProviderList.includes(getters.providerId),
  registered: state => state.registered,
  validMember: (state, getters) => getters.loggedIn && getters.registered,
  validMemberWithCard: (state, getters) => getters.validMember && getters.hasCard,
  hasCard: state => state.hasCard,
  emailVerificationSent: state => state.emailVerificationSent,
  firstName: state => state.profile ? state.profile.first_name : null,
  fullName: state => {
    let profileName = null
    if (state.profile) {
      profileName = state.profile.first_name
      if (state.profile.last_name) {
        profileName += ' ' + state.profile.last_name
      }
    }
    return profileName
  },
  isAutoRenew: state => state.profile ? state.profile.is_auto_renew : null,
  loading: state => state.loading,
  error: state => state.error,
  language: state => {
    if (state.country === 'us') {
      return defaultLanguage
    }
    if (state.profile &&
      state.profile.language &&
      isValidLanguage(state.profile.language)
    ) return state.profile.language
    else if (state.language &&
      isValidLanguage(state.language)
    ) return state.language
    else return defaultLanguage
  },
  profileLanguage: state => {
    return (state.profile && state.profile.language) ? state.profile.language : null
  },
  profilePostal: state => {
    return (state.profile && state.profile.postal) ? state.profile.postal : null
  },
  route: state => state.route,
  nextRouter: state => state.nextRoute,
  previousRoute: state => state.previousRoute,
  nextRouteIsHome: state => state.nextRoute ? state.nextRoute.name === 'Home' : false,
  nextRouteIs: state => name => state.nextRoute ? state.nextRoute.name === name : false,
  routeIntent: state => state.routeIntent,
  location: state => state.location,
  postal: state => {
    if (state.postal) return state.postal
    else if (state.profile && state.profile.postal) return state.profile.postal
    else return null
  },
  localLanguage: state => state.language,
  locale: state => state.language === 'fr' ? 'fr_CA' : 'en_US',
  currency: state => state.country === 'us' ? 'USD' : 'CAD',
  localPostal: state => state.postal,
  hasBMO: state => state.bmo,
  country: state => state.country,
  postalCleaveOptions: state => state.country === 'us' ? cleaveOptions.postalUS : cleaveOptions.postal,
  phoneCleaveOptions: state => state.country === 'us' ? cleaveOptions.phoneUS : cleaveOptions.phone,
  postalPlaceholder: state => state.country === 'us' ? '12345' : 'A1B 2C3',
  birthdatePlaceholder: state => 'YYYY-MM-DD',
  isValidPostal: state => postal => isValidPostalFunc(state.country)(postal),
  analyticsReady: state => state.analyticsReady,
  optimizeReady: state => state.optimizeReady,
  preferences: state => state.preferences,
  preference: state => (category, property) => pathFollow(
    [
      'preferences',
      ...[category, property].map(n => n.toString())
    ].join('.'),
    state,
    null
  ),
  referralCode: state => state.referrals.code,
  referralCount: state => state.referrals.count,
  referralRedemptionCount: state => state.referrals.redemptionCount,
  isBirthday: state => {
    if (state.profile && state.profile.birth_date) {
      return isBirthday(state.profile.birth_date)
    } else {
      return false
    }
  },
  hasActiveSubscription: state => state.hasActiveSubscription,
  cards: state => state.cards,
  spcCards: state => state.cards && state.cards.length > 0 ? state.cards.filter(card => card.cobrand.toLowerCase() === 'spc' && card.status === 'active') : null,
  notifyExpiresSoon: (state, getters) => getters.validMember && state.notifyExpiresSoon,
  isFreeTrial: state => state.isFreeTrial ? state.isFreeTrial : false,
  english: state => state.english,
  french: state => state.french,
  purchasePageNavigation: state => state.purchasePageNavigation,
  pageReNavigation: state => state.pageReNavigation,
  copiedSchoolCode: state => state.copiedSchoolCode,
  hasValidCard: state => state.hasValidCard,
  profile: state => state.profile,
  contestRulesEn: state => state.contestRulesEn,
  contestRulesFr: state => state.contestRulesFr,
  hasSubscriptedEmail: state => state.profile ? state.profile.email_opt_in : false,
  coordinates: state => state.coordinates,
  cibcOffer60: (state, getters) => state['cibcOffer60_' + getters.language],
  cibcOffer30: (state, getters) => state['cibcOffer30_' + getters.language],
  cibcOffer25: (state, getters) => state['cibcOffer25_' + getters.language],
  fromExtension: state => state.fromExtension,
  fromQRLanding: state => state.fromQRLanding,
  completedAdditionalQuestions: state => state.profile ? state.profile.postal && state.profile.school_type && state.profile.gender : false,
  themeImage: state => state.themeImage,
  offerId: state => state.offerId,
  spcPlusUpgradeType: state => state.spcPlusUpgradeType,
  provinces: state => state.provinces
}



// WEBPACK FOOTER //
// ./src/store/getters.js