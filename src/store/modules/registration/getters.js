export default {
  card: state => state.card,
  hasCardCached: state => !!state.card.card_number && !!state.card.csv
}



// WEBPACK FOOTER //
// ./src/store/modules/registration/getters.js