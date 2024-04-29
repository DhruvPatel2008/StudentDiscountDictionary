var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"slider-container"},[(_vm.showArrows)?_c('div',{staticClass:"nav arrow-nav",class:{ hidden: !_vm.showLeftArrow },on:{"click":function($event){return _vm.scrollLeft()}}},[_c('img',{attrs:{"src":require('@/assets/images/icons/general/SPC_UI_ArrowLeft_Black.svg')}})]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"overflow-container fade-container"},[_c('ul',{ref:"scroll-container",staticClass:"list-reset-horizontal padded-list hide-scrollbar"},_vm._l((_vm.partnerProducts),function(product){return _c('li',{key:product['Priorirty']},[_c('ProductTile',{attrs:{"product":product}})],1)}),0)]),_vm._v(" "),(_vm.showArrows)?_c('div',{staticClass:"nav arrow-nav",class:{ hidden: !_vm.showRightArrow },on:{"click":function($event){return _vm.scrollRight()}}},[_c('img',{attrs:{"src":require('@/assets/images/icons/general/SPC_UI_ArrowRight_Black.svg')}})]):_vm._e()])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-43a92bd0","hasScoped":false,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/ProductsRow.vue
// module id = null
// module chunks = 