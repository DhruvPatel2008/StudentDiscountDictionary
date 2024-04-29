import Vue from 'vue'

export function setGeolocation (location) {
  Vue.cookie.set('geolocation', JSON.stringify(location), { expires: '10m' })
}

export function getGeolocation () {
  return JSON.parse(Vue.cookie.get('geolocation'))
}

export function setCard (card) {
  Vue.cookie.set('card', JSON.stringify(card), { expires: '30m' })
}

export function getCard () {
  return JSON.parse(Vue.cookie.get('card'))
}

export function updateVIP (vip) {
  Vue.cookie.set('vip', JSON.stringify(vip), { expires: '1h' })
}

export function getVIP () {
  return JSON.parse(Vue.cookie.get('vip'))
}

export function setFired () {
  Vue.cookie.set('fired', JSON.stringify(true), '1D')
}

export function getFired () {
  try {
    return JSON.parse(Vue.cookie.get('fired'))
  } catch (e) {
    return false
  }
}

export function setExtensionToken (token) {
  Vue.cookie.set('extension_token', token, { expires: '1h' })
}

export function deleteExtensionToken () {
  Vue.cookie.delete('extension_token')
}

export function setExtensionOfferDomain (domain) {
  Vue.cookie.set('extension_offer_domain', domain, { expires: '10s' })
}

export function setExtensionOfferId (id) {
  Vue.cookie.set('extension_offer_id', id, { expires: '10s' })
}

export function setExpiredCardPromoCode (promoCode) {
  Vue.cookie.set('expired_card_promo_code', promoCode, { expires: '2D' })
}

export function getExpiredCardPromoCode () {
  return Vue.cookie.get('expired_card_promo_code')
}

export function setMembershipExpiringModalShown (expires = false) {
  if (expires) {
    const today = new Date()
    today.setHours(23, 59, 59, 999) // end of day
    Vue.cookie.set('membership_expiring_modal_shown', true, { expires: today })
  } else {
    Vue.cookie.set('membership_expiring_modal_shown', true, { expires: '1Y' })
  }
}

export function getMembershipExpiringModalShown () {
  return Vue.cookie.get('membership_expiring_modal_shown')
}

export function setIsModalAlreadyOpen () {
  Vue.cookie.set('isModalAlreadyOpen', true, { expires: '1D' })
}

export function getIsModalAlreadyOpen () {
  return Vue.cookie.get('isModalAlreadyOpen') === 'true'
}



// WEBPACK FOOTER //
// ./src/service/cookie-service.js