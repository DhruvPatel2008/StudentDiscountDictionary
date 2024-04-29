var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spc-form-field-v2-edge lowercase",class:{ error: _vm.dirty && !_vm.isEmailValid}},[_c('label',{class:{ emailLabel: _vm.inStoreFlow && !_vm.isCIBCRegistration() },attrs:{"for":"email"}},[_vm._v(_vm._s(_vm.$t('email')))]),_vm._v(" "),_c('input',{directives:[{name:"model",rawName:"v-model.trim",value:(_vm.emailValue),expression:"emailValue",modifiers:{"trim":true}}],class:{ emailInput: _vm.inStoreFlow },attrs:{"type":"email","name":"email","autocomplete":"email","disabled":_vm.isSchoolPortalFlow()},domProps:{"value":(_vm.emailValue)},on:{"blur":[function($event){return _vm.updateEmailValue()},function($event){return _vm.$forceUpdate()}],"input":function($event){if($event.target.composing){ return; }_vm.emailValue=$event.target.value.trim()}}})])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-5e98fa48","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Signup/ReusableComponents/EmailField.vue
// module id = null
// module chunks = 