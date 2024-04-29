var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.show,"inverted":false,"containerPadding":"50px 25px 15px"},on:{"close":function($event){return _vm.$emit('close')}}},[_c('div',{staticClass:"modal-container"},[(_vm.membershipExpiringModalType === 'auto-renew')?_c('div',[_vm._v(_vm._s(_vm.$t('auto-renew')))]):(_vm.membershipExpiringModalType === 'payment')?_c('div',[_vm._v(_vm._s(_vm.$t('payment')))]):_c('div',[_vm._v(_vm._s(_vm.$t('subscription')))]),_vm._v(" "),_c('button',{staticClass:"spc-button-v2 purple",on:{"click":_vm.handleButtonClick}},[(_vm.membershipExpiringModalType === 'auto-renew')?_c('span',[_vm._v(_vm._s(_vm.$t('turn_on_auto_renew')))]):(_vm.membershipExpiringModalType === 'payment')?_c('span',[_vm._v(_vm._s(_vm.$t('update_pm')))]):_c('span',[_vm._v(_vm._s(_vm.$t('resubscribe')))])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-00e02a21","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/MembershipExpiringModal.vue
// module id = null
// module chunks = 