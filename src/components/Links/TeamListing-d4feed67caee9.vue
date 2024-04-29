var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"member-list-container"},[_c('ul',{ref:"memberList",staticClass:"member-list hide-scrollbar"},_vm._l((_vm.teamItems),function(member,index){
var _obj;
return _c('li',{key:member.id,staticClass:"member-item",style:(''/*`max-width: ${itemWidth}px;`*/)},[_c('span',{staticClass:"member-profile"},[_c('div',{staticClass:"image-container",attrs:{"tabindex":"0"}},[_c('div',{staticClass:"picture",style:(("background-image: url(" + (_vm.getURL(member.image_en)) + ")"))}),_vm._v(" "),_c('div',{staticClass:"overlay",class:( _obj = {}, _obj[_vm.randColourRange[index]] = true, _obj )},[_c('div',{staticClass:"text",domProps:{"innerHTML":_vm._s(member.description_en ? _vm.marked(member.description_en) : '')}})])]),_vm._v(" "),_c('h2',{staticClass:"name single-line-description"},[_vm._v(_vm._s(member.text_en))]),_vm._v(" "),_c('p',{staticClass:"role multi-line-description"},[_vm._v(_vm._s(member.subtext_en))])])])}),0)])}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-1fc1a96c","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/Links/TeamListing.vue
// module id = null
// module chunks = 