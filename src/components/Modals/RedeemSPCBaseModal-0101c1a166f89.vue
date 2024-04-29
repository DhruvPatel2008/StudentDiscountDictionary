var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition',{attrs:{"name":"modal"}},[_c('div',{directives:[{name:"show",rawName:"v-show",value:(_vm.show),expression:"show"}],staticClass:"modal-mask",on:{"click":_vm.close,"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"esc",27,$event.key,["Esc","Escape"])){ return null; }return _vm.close($event)}}},[_c('div',{staticClass:"modal-container-cibc-outer"},[_c('div',{ref:"modal",staticClass:"modal-container-cibc",class:{ inverted: _vm.inverted, fullscreen: _vm.fullscreen, contained: _vm.contained, purple: _vm.purple, noSPCBorder: _vm.noSPCBorder},style:(("width: " + _vm.optimumWidth + ";" + _vm.backgroundStyle)),on:{"click":function($event){$event.stopPropagation();}}},[_c('div',{staticClass:"modal-container-inner",class:{inverted: _vm.inverted},style:(("padding: " + _vm.containerPadding))},[_vm._t("default")],2),_vm._v(" "),_c('div',{staticClass:"modal-close-special",on:{"click":_vm.close}},[_c('img',{ref:"close",staticClass:"modal-close-icon-special",attrs:{"src":require('@/assets/images/icons/general/close-icon-black.svg'),"alt":_vm.$t('close'),"tabindex":"0"}})])])])])])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-32e7cd28","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Modals/RedeemSPCBaseModal.vue
// module id = null
// module chunks = 