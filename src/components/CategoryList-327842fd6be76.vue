var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',[(_vm.showCategoryList)?_c('div',{staticClass:"category-list overflow-container fade-container hide-scrollbar"},[_c('div',{staticClass:"header-font",on:{"mouseenter":function($event){_vm.showDropdown = true},"mouseleave":_vm.hideDropdown}},[_c('span',[_vm._v(_vm._s(_vm.$t('actions.all_deals')))]),_vm._v(" "),_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.showDropdown),expression:"showDropdown"}],ref:"dropdownBox",staticClass:"dropdown-box",on:{"mouseenter":_vm.cancelHide,"mouseleave":_vm.hideDropdown}},[_c('span',{on:{"click":function($event){return _vm.routeNavigation('DEALS')}}},[_vm._v(_vm._s(_vm.$t('actions.view_all_deals')))]),_vm._v(" "),_c('span',{on:{"click":function($event){return _vm.routeNavigation('BRANDS')}}},[_vm._v(_vm._s(_vm.$t('actions.all_brands')))])])]),_vm._v(" "),_c('span',{staticClass:"header-font",class:{'active-header': _vm.route.name == 'Spc-plus'},on:{"click":function($event){return _vm.routeNavigation('SPCPLUS')}}},[_vm._v("\n      SPC +\n    ")]),_vm._v(" "),_vm._l((_vm.categories),function(category){return _c('span',{key:category.id,staticClass:"header-font",class:{'active-header': _vm.route.params.name == category.name_en},on:{"click":function($event){return _vm.handleCategorySelect(category.name_en)}}},[_vm._v("\n      "+_vm._s(category['name_' + _vm.language])+"\n    ")])})],2):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-37caf8ac","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/CategoryList.vue
// module id = null
// module chunks = 