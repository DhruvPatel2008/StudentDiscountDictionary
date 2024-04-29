var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.show,"inverted":false},on:{"close":function($event){return _vm.$emit('close')}}},[_c('div',{staticClass:"login-container"},[_c('h1',[_vm._v(_vm._s(_vm.$t('title')))]),_vm._v(" "),_c('p',[_vm._v(_vm._s(_vm.$t('description')))]),_vm._v(" "),(_vm.loggedIn && !_vm.validMemberWithCard)?_c('router-link',{staticClass:"spc-button-v2",attrs:{"to":"/purchase","tag":"button"},nativeOn:{"click":function($event){return _vm.$emit('close')}}},[_vm._v(_vm._s(_vm.$t('purchase')))]):_vm._e(),_vm._v(" "),(_vm.loggedIn && !_vm.validMemberWithCard)?_c('router-link',{attrs:{"to":"/register","tag":"a","title":_vm.$t('register_description')},nativeOn:{"click":function($event){return _vm.$emit('close')}}},[_vm._v(_vm._s(_vm.$t('register_link')))]):_vm._e()],1)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-02de8912","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/CreateAccountLoginModal.vue
// module id = null
// module chunks = 