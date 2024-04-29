var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"page"},[(_vm.showHeader && _vm.menu.header)?_c('SPCHeader',{staticClass:"navbar",attrs:{"includeFooterLinks":!_vm.showFooter,"menuHeader":_vm.menu.header}}):_vm._e(),_vm._v(" "),_c('div',{staticClass:"content-adjust",class:{'all-deals-page': this.$route.name === _vm.pageNames.DEALS}},[_c('TopBanner'),_vm._v(" "),(_vm.title != null)?_c('div',{staticClass:"title-header spc-center"},[_c('div',{staticClass:"spc-content-inner content-padded"},[_c('h1',[_vm._v(_vm._s(_vm.title))]),_vm._v(" "),_vm._t("pill")],2)]):_vm._e(),_vm._v(" "),_c('div',{staticClass:"page-content"},[_c('div',{staticClass:"content",style:(("display: " + _vm.displayOverride + ";"))},[_vm._t("default")],2),_vm._v(" "),(_vm.showFooter && _vm.menu.footer)?_c('SPCFooter',{attrs:{"menuFooter":_vm.menu.footer}}):_vm._e()],1)],1)],1)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3fc4fff0","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/SPCPage.vue
// module id = null
// module chunks = 