
export const domain = process.env.URL
export const domainURL = 'https://' + domain
export const country = process.env.COUNTRY
export const questionsEmail = 'questions@spccard.ca'

console.log('domain is', domain)
export const baseURLs = process.env.API_CONFIG

export const env = process.env.ENV

export const assetURLs = {
  images: baseURLs.images + '/'
}

export function getURL (image) {
  return `${assetURLs.images}${image}`
}

export function imageSwitch (string) {
  if (!string) return null
  return (string.match(/^http(s)?:\/\/(www\.)?.*/g) ? string : getURL(string))
}

export function internalImageCheck (image) {
  const url = getURL(image)
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = function () {
      resolve()
    }
    img.onerror = function (error) {
      reject(error)
    }
    img.src = url
  })
}

export const GOOGLE_API_KEY = 'AIzaSyA0OJTytwfnKxtuLJKsQ7Qpu7J3z2uv5-k'

export function getGoogleMapsAPICall (countryCode, postal) {
  postal = postal.trim().replace(/\s+/g, '+')
  countryCode = `${countryCode.trim()}`
  return `https://maps.googleapis.com/maps/api/geocode/json?address=${postal}&region=${countryCode}&key=${GOOGLE_API_KEY}`
}



// WEBPACK FOOTER //
// ./src/service/api-config.js