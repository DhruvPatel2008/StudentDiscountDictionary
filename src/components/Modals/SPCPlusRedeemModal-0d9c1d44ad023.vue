var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.show,"inverted":true},on:{"close":function($event){return _vm.$emit('close')}}},[_c('div',{staticClass:"login-container"},[_c('div',{staticClass:"spc-pill"},[_c('img',{staticClass:"spc-pill-image",attrs:{"src":require('@/assets/images/cibc/pill-spc@3x.png')}}),_vm._v(" "),_c('p',{staticClass:"exclusive"},[_vm._v(_vm._s(_vm.$t('exclusive')))])]),_vm._v(" "),_c('h1',{staticClass:"header"},[_vm._v(_vm._s(_vm.$t('title')))]),_vm._v(" "),_c('p',{staticClass:"description"},[_vm._v(_vm._s(_vm.$t('description')))]),_vm._v(" "),_c('router-link',{staticClass:"spc-button-v2 purple",attrs:{"to":_vm.plusOfferId != null ? _vm.plusOfferId : '',"tag":"button","title":_vm.$t('register_description')},nativeOn:{"click":function($event){return _vm.handleViewBetterOffer($event)}}},[_vm._v(_vm._s(_vm.$t("view_spc_plus")))]),_vm._v(" "),_c('button',{directives:[{name:"clipboard",rawName:"v-clipboard",value:(_vm.code),expression:"code"}],staticClass:"spc-button-v2 secondary",on:{"click":_vm.handleRedeemAnyway}},[_vm._v(_vm._s(_vm.$t("redeem_anyways")))])],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1641eeb7","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/SPCPlusRedeemModal.vue
// module id = null
// module chunks = 