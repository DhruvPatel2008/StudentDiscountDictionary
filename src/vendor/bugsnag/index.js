import Vue from 'vue'
import bugsnag from '@bugsnag/js'
import bugsnagVue from '@bugsnag/plugin-vue'

const bugsnagClient = bugsnag('d5daf3e3ad9903dc1ca01f3895963468')
bugsnagClient.use(bugsnagVue, Vue)

export default bugsnagClient



// WEBPACK FOOTER //
// ./src/vendor/bugsnag/index.js