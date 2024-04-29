<template>
  <div v-show="loading" :class="{ loader: true, inverted }"></div>
</template>


<script>
export default {
  props: {
    loading: {
      type: Boolean,
      default: true
    },
    inverted: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.loader {
  height: 4px;
  width: 100%;
  position: relative;
  overflow: hidden;
  background-color: transparent;
}
.loader:before{
  display: block;
  position: absolute;
  content: "";
  left: -200px;
  width: 200px;
  height: 4px;
  background-color: white;
  animation: loading 2s linear infinite;
}
.loader.inverted:before {
  background-color: black;
}

@keyframes loading {
  from {left: -200px; width: 30%;}
  50% {width: 30%;}
  70% {width: 70%;}
  80% { left: 50%;}
  95% {left: 120%;}
  to {left: 100%;}
}
</style>



// WEBPACK FOOTER //
// src/components/Utility/LineLoader.vue