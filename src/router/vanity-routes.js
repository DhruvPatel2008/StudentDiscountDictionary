import externals from 'LocalizedAssets/data/vanity_urls'

/*
 * {
 *   "path": <relative vanity path>,
 *   "url": <redirect external path>
 * }
 */
export default externals.map(external => ({
  path: external.path,
  beforeEnter (to, from, next) {
    window.location = external.url
  }
}))



// WEBPACK FOOTER //
// ./src/router/vanity-routes.js