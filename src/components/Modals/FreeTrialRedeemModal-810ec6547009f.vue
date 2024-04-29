var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.show,"inverted":true},on:{"close":function($event){return _vm.$emit('close')}}},[_c('div',{staticClass:"login-container"},[_c('img',{directives:[{name:"lazy",rawName:"v-lazy",value:(require('@/assets/images/modals/welcome-back-image.png')),expression:"require('@/assets/images/modals/welcome-back-image.png')"}],staticClass:"banner-image free-trial-image"}),_vm._v(" "),_c('h1',{staticClass:"header slider"},[_vm._v(_vm._s(_vm.$t('title')))]),_vm._v(" "),_c('p',{staticClass:"description slider"},[_vm._v(_vm._s(_vm.$t('description')))]),_vm._v(" "),_c('button',{staticClass:"spc-button-v2 small slider",attrs:{"to":"/deals","tag":"button","disabled":_vm.activating},on:{"click":function($event){return _vm.startFreeTrial()}}},[_vm._v(_vm._s(_vm.$t('learn_more')))])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2150683e","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/FreeTrialRedeemModal.vue
// module id = null
// module chunks = 