import membership from 'Assets/data/spc_membership_price'

export default {
  payment: null,
  paymentError: null,
  product: {
    id: '1_year_card',
    description_en: '2019/20 Membership',
    price: membership.price
  },
  postal: null,
  order: null,
  loading: {
    initial: true,
    creditCard: false,
    confirming: false,
    paymentMethod: false
  },
  referralData: null,
  showSchoolCodeField: false,
  showPromoCodeField: false,
  newCard: null,
  taxRate: 0,
  total: membership.price,
  promoSuccess: false,
  promoFail: false,
  schoolCodeSuccess: false,
  schoolCodeFailed: false,
  showPromoDiscount: false,
  promoDiscount: 0,
  appliedPromoCode: '',
  appliedSchoolCode: '',
  expirationBanner: null,
  showMembershipExpiringModal: null,
  membershipExpiringModalType: 'auto-renew',
  paymentLoading: false
}



// WEBPACK FOOTER //
// ./src/store/modules/payment/state.js