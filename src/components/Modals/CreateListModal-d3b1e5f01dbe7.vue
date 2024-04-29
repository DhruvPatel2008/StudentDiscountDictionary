var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('Modal',{attrs:{"show":_vm.show,"inverted":false,"containerPadding":'32px 25px'},on:{"close":_vm.close}},[_c('div',{staticClass:"login-container"},[_c('div',[_c('span',{staticClass:"create-a-new-List"},[_vm._v(_vm._s(_vm.$t('create-new-list')))])]),_vm._v(" "),_c('div',{staticClass:"lists-are-the-best-w break-text"},[_vm._v("\n      "+_vm._s(_vm.$t('sub-title'))+"\n    ")]),_vm._v(" "),_c('div',{staticClass:"list-name-section"},[_c('span',{staticClass:"list-name"},[_vm._v(_vm._s(_vm.$t('list-name')))])]),_vm._v(" "),_c('div',{staticClass:"create-input-section"},[_c('input',{staticClass:"input-box",attrs:{"type":"input","autocomplete":"off","placeholder":_vm.$t('list-name-example'),"id":"input-list"},domProps:{"value":_vm.listName}}),_vm._v(" "),(_vm.isAlreadyExist)?_c('span',{staticClass:"already-exist"},[_vm._v(_vm._s(_vm.listName)+" "+_vm._s(_vm.$t('already-exist')))]):(!_vm.vaildList)?_c('span',{staticClass:"already-exist"},[_vm._v(_vm._s(_vm.$t('valid-list')))]):_vm._e()]),_vm._v(" "),_c('div',[_c('button',{staticClass:"clipboard-btn spc-button-v2 purple",on:{"click":function($event){return _vm.createNewList()}}},[_c('span',[_vm._v(_vm._s(_vm.$t('create-list')))])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-8b2a16d0","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/CreateListModal.vue
// module id = null
// module chunks = 