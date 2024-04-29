var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"spc-form-field-v2-edge",class:{ error: _vm.dirty && !_vm.aboveAgeLimit},attrs:{"id":"dob"}},[_c('div',{staticClass:"label-section"},[_c('label',{class:{ birthdayLabel: _vm.inStoreFlow && !_vm.isCIBCRegistration()},attrs:{"for":"birthday"}},[_vm._v(_vm._s(_vm.$t('birthday')))]),_vm._v(" "),(_vm.questionMark)?_c('QuestionMark'):_c('span',{staticClass:"age-restriction",class:{ 'error-label': _vm.dirty && !_vm.aboveAgeLimit }},[_vm._v(_vm._s(_vm.$t('age_restriction')))])],1),_vm._v(" "),(_vm.isMobileView)?_c('input',{directives:[{name:"model",rawName:"v-model",value:(_vm.birthdateValue),expression:"birthdateValue"}],staticClass:"mobile-date-picker",attrs:{"type":"date","placeholder":"YYYY-MM-DD"},domProps:{"value":(_vm.birthdateValue)},on:{"input":function($event){if($event.target.composing){ return; }_vm.birthdateValue=$event.target.value}}}):_c('birthday-select',{class:{ dateInput: _vm.inStoreFlow },attrs:{"startDate":_vm.startBirthdate},model:{value:(_vm.birthdateValue),callback:function ($$v) {_vm.birthdateValue=_vm._n($$v)},expression:"birthdateValue"}}),_vm._v(" "),(_vm.dirty && !_vm.aboveAgeLimit && !_vm.inStoreFlow)?_c('div',{staticClass:"error-label"},[_vm._v(_vm._s(_vm.$t('errors.age_limit')))]):_vm._e()],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-05d70624","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Signup/ReusableComponents/BirthdateField.vue
// module id = null
// module chunks = 