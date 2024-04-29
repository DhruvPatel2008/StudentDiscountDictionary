var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('transition-group',{staticClass:"notification-container",attrs:{"name":"notification-list","tag":"div"}},_vm._l((_vm.notificationsReversedAndTranslated),function(note){return _c('div',{key:note.id,ref:("note-" + (note.id)),refInFor:true,staticClass:"notification-list-item"},[_c('div',{staticClass:"marginated notification-inner"},[_c('span',{staticClass:"content",domProps:{"innerHTML":_vm._s(note.content)},on:{"click":function($event){return _vm.handleClick($event, note)}}}),_vm._v(" "),_c('span',{staticClass:"right"},[_c('img',{staticClass:"notification-close-icon",attrs:{"src":require('@/assets/images/icons/misc/close.svg'),"alt":_vm.$t('close'),"height":"20","tabindex":"0"},on:{"click":function($event){return _vm.remove(note)}}})])])])}),0)}
var staticRenderFns = []
var esExports = { render: render, staticRenderFns: staticRenderFns }
export default esExports


//////////////////
// WEBPACK FOOTER
// ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-099a8b21","hasScoped":true,"transformToRequire":{"video":["src","poster"],"source":"src","img":"src","image":"xlink:href"},"buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/components/NotificationManager.vue
// module id = null
// module chunks = 