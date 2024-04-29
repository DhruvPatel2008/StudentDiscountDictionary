var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.show,"inverted":true},on:{"close":function($event){return _vm.$emit('close')}}},[_c('div',{staticClass:"modal-container"},[_c('img',{staticClass:"banner-image purchase-modified-image",attrs:{"src":require(("@/assets/images/modals/" + _vm.language + "/already-have-membership.jpg"))}}),_vm._v(" "),_c('h1',{staticClass:"header slider"},[_vm._v(_vm._s(_vm.$t('title_1')))]),_vm._v(" "),_c('p',{staticClass:"description slider"},[_vm._v(_vm._s(_vm.$t('description')))]),_vm._v(" "),_c('button',{staticClass:"spc-button-v2 secondary small slider",on:{"click":function($event){return _vm.$emit('buyspc')}}},[_vm._v(_vm._s(_vm.$t('buy_spc')))])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-0de1a2cc","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/PaymentModifiedModal.vue
// module id = null
// module chunks = 