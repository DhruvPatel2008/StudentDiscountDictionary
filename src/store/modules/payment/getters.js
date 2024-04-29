export default {
  payment: state => state.payment,
  paymentError: state => state.paymentError,
  product: state => state.product,
  postal: state => state.postal,
  order: state => state.order,
  loading: state => state.loading,
  referralData: state => state.referralData,
  showSchoolCodeField: state => state.showSchoolCodeField,
  showPromoCodeField: state => state.showPromoCodeField,
  newCard: state => state.newCard,
  taxRate: state => state.taxRate,
  total: state => state.total,
  promoSuccess: state => state.promoSuccess,
  promoFail: state => state.promoFail,
  schoolCodeSuccess: state => state.schoolCodeSuccess,
  schoolCodeFailed: state => state.schoolCodeFailed,
  showPromoDiscount: state => state.showPromoDiscount,
  promoDiscount: state => state.promoDiscount,
  appliedPromoCode: state => state.appliedPromoCode,
  appliedSchoolCode: state => state.appliedSchoolCode,
  expirationBanner: state => state.expirationBanner,
  showMembershipExpiringModal: state => state.showMembershipExpiringModal,
  membershipExpiringModalType: state => state.membershipExpiringModalType,
  paymentLoading: state => state.paymentLoading
}



// WEBPACK FOOTER //
// ./src/store/modules/payment/getters.js