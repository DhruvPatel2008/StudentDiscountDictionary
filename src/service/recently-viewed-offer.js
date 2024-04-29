let viewedOfferKey = 'recently_viewed'

/**
 * Set the offer object to the local storage.
 * @param {Object} offers.
 */
export function setDeals (offers) {
  localStorage.setItem(viewedOfferKey, JSON.stringify(offers))
}

/**
 * Get the recently viewed list from local storage.
 * @returns {Array}
 */
export function getDeals () {
  let offers = localStorage.getItem(viewedOfferKey)
  if (offers !== null) {
    let parseData = JSON.parse(offers)
    return parseData
  }
  return null
}

/**
 * Insert a deal at the biggining of an array.
 * if the array is greater than 5 then remove the last element and
 * add the new deal.
 * @param {Array} offer
 */
export function insertDeal (offer) {
  let offers = getDeals()
  if (offers) {
    for (let key in offers) {
      //  Remove if already exist
      if (offer.id === offers[key].id) {
        offers.splice(key, 1)
      }
    }
    //  Remove last element if length is 5
    if (offers.length === 5) {
      offers.pop()
    }
    offers.splice(0, 0, offer) // Insert at beginning
    setDeals(offers) // Update localstorage
  } else {
    setDeals([offer]) //  Update localstorage
  }
}

/**
* Delete recently_viewed local storage.
*/
export function clearDeals (offers) {
  localStorage.removeItem('recently_viewed')
}



// WEBPACK FOOTER //
// ./src/service/recently-viewed-offer.js