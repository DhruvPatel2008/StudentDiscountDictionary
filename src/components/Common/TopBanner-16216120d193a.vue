var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.showTopBanner)?_c('div',{staticClass:"banner-container"},[(_vm.showExpirationBanner)?_c('div',[(_vm.expirationBannerType === 'auto-renew')?_c('span',{on:{"click":_vm.handleBannerClick}},[_vm._v(_vm._s(_vm.$t('auto_renew')))]):_vm._e(),_vm._v(" "),(_vm.expirationBannerType === 'payment')?_c('span',{on:{"click":_vm.handleBannerClick}},[(_vm.expirationDays === '7')?_c('span',[_vm._v(_vm._s(_vm.$t('payment_expired.7')))]):(_vm.expirationDays === '0')?_c('span',[_vm._v(_vm._s(_vm.$t('payment_expired.0')))]):(_vm.expirationDays === '60' || _vm.expirationDays === '30')?_c('span',[_vm._v(_vm._s(_vm.$t('payment_expired.30')))]):(_vm.expirationDays === '14' || _vm.expirationDays === '2')?_c('span',[_vm._v(_vm._s(_vm.$t('payment_expired.14')))]):_vm._e()]):_vm._e(),_vm._v(" "),(_vm.expirationBannerType === 'subscription')?_c('span',{on:{"click":_vm.handleBannerClick}},[_vm._v(_vm._s(_vm.$t('subscription_expired')))]):_vm._e()]):(_vm.showAdditionalQuestionsAlert)?_c('div',{on:{"click":_vm.navigateProfile}},[_c('p',[_vm._v(_vm._s(_vm.$t('invalid_profile')))])]):_vm._e()]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-4066c323","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Common/TopBanner.vue
// module id = null
// module chunks = 