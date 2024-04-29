var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (!_vm.loading && _vm.showBanner && !_vm.closeModal)?_c('div',{staticClass:"banner-container",class:_vm.hasNotifications},[_c('div',{staticClass:"close-btn",on:{"click":_vm.closeBanner}},[_c('img',{attrs:{"src":require('@/assets/images/icons/general/close-icon-white.svg'),"alt":"Close icon"}})]),_vm._v(" "),_c('div',{staticClass:"banner-text"},[_vm._v(_vm._s(_vm.$t('banner_text')))]),_vm._v(" "),_c('button',{staticClass:"spc-button-v2 purple",on:{"click":_vm.openApp}},[_vm._v(_vm._s(_vm.$t('btn_text')))])]):_vm._e()}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3f6990ae","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/OpenAppBanner.vue
// module id = null
// module chunks = 