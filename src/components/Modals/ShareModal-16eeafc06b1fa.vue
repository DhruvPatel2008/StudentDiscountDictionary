var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.show,"inverted":false,"containerPadding":"30px 0 0"},on:{"close":function($event){return _vm.$emit('close')}}},[_c('div',{staticClass:"login-container"},[_c('div',{staticClass:"share-div"},[_c('span',{staticClass:"share"},[_vm._v(_vm._s(_vm.$t('title')))])]),_vm._v(" "),_c('div',{staticClass:"discount-div"},[_c('span',{staticClass:"send-this-discount"},[_vm._v(_vm._s(_vm.$t('sub-title')))])]),_vm._v(" "),_c('div',{staticClass:"row"},_vm._l((_vm.socialSiteList),function(list){return _c('div',{key:list.name,staticClass:"column"},[_c('img',{staticClass:"social-icon",attrs:{"src":require(("@/assets/images/icons/general/" + (list.url))),"alt":"Snow"},on:{"click":function($event){return _vm.shareOfferURL(list.name, list.apiURL)}}})])}),0),_vm._v(" "),_c('div',{staticClass:"Rectangle-Copy-4"},[_c('div',{staticClass:"offer-url",class:_vm.linkCopied ? 'highlighted' : ''},[_vm._v(_vm._s(_vm.currentOfferURL))])]),_vm._v(" "),_c('button',{staticClass:"clipboard-btn spc-button-v2 purple"},[(_vm.linkCopied)?_c('span',{on:{"click":function($event){return _vm.copyShareURL()}}},[_vm._v(_vm._s(_vm.$t('link-copied')))]):_c('span',{on:{"click":function($event){return _vm.copyShareURL()}}},[_vm._v(_vm._s(_vm.$t('copy-link')))])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-2137ff20","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/ShareModal.vue
// module id = null
// module chunks = 