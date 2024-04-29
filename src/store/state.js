const country = process.env.COUNTRY

export default {
  user: null,
  bmo: false,
  token: null,
  emailVerificationSent: false,
  loading: true,
  error: null,
  language: 'en',
  postal: null,
  location: null,
  registered: false,
  hasCard: false,
  notifyExpiresSoon: false,
  profile: null,
  nextRoute: null,
  previousRoute: null,
  routeIntent: null,
  country,
  analyticsReady: false,
  optimizeReady: false,
  preferences: null,
  referrals: {
    code: null,
    count: null,
    redemptionCount: null
  },
  hasActiveSubscription: false,
  cards: null,
  isFreeTrial: null,
  english: 'en',
  french: 'fr',
  purchasePageNavigation: false,
  pageReNavigation: '',
  copiedSchoolCode: null,
  hasValidCard: true,
  contestRulesEn: '',
  contestRulesFr: '',
  socialProviderList: ['google.com', 'facebook.com', 'apple.com'],
  languageList: {
    'en': 'English',
    'fr': 'French'
  },
  coordinates: {
    x: 0,
    y: 0
  },
  cibcOffer60_en: 'https://www.cibc.com/en/student/bank-accounts.html?utrc=A149:3&',
  cibcOffer60_fr: 'https://www.cibc.com/fr/student/bank-accounts.html?utrc=A149:4&',
  cibcOffer30_en: 'https://www.cibc.com/en/special-offers/student-cashback-offer.html?mktgSourceCode=962&treatmentID=2014292&utrc=A149:1&',
  cibcOffer30_fr: 'https://www.cibc.com/fr/special-offers/student-cashback-offer.html?mktgSourceCode=962&treatmentID=2014292&utrc=A149:2&',
  cibcOffer25_en: 'https://www.cibc.com/en/personal-banking/bank-accounts/youth-banking-offers.html?utrc=A149:5&',
  cibcOffer25_fr: 'https://www.cibc.com/fr/personal-banking/bank-accounts/youth-banking-offers.html?utrc=A149:6&',
  fromExtension: false,
  fromQRLanding: false,
  themeImage: null,
  offerId: null,
  spcPlusUpgradeType: null,
  provinces: null
}



// WEBPACK FOOTER //
// ./src/store/state.js