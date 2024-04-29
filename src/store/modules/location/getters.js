export default {
  coordinates: state => ({ lat: state.lat, lon: state.lon }),
  hasCoords: state => state.lat && state.lon
}



// WEBPACK FOOTER //
// ./src/store/modules/location/getters.js