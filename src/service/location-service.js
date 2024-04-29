import store from '@/store'
import { getGoogleMapsAPICall } from '@/service/api-config'
import axios from 'axios'
import { pathFollow } from '@/utils'
import find from 'lodash/find'

export async function getGeocodeLocation (countryCode, postal) {
  if (postal == null) return Promise.reject(new Error('No Postal Code'))
  let options = {
    url: getGoogleMapsAPICall(countryCode, postal),
    method: 'get'
  }
  if (!postal) throw new Error('No postal code provided.')
  const response = await axios(options)
  const location = handleResponse(response, null)
  if (!location) throw new Error('Geocode not available.')
  await store.dispatch('updateLocation', location)
  return location
}

export function getLocationFromPostal (postal) {
  const countryCode = 'ca'
  return getGeocodeLocation(countryCode, postal)
}

export function handleResponse (response, fallback) {
  return pathFollow('data.results.0.geometry.location', response, fallback)
}

export function getLocationFromNavigator () {
  return new Promise((resolve, reject) => {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const location = {
            lat: position.coords.latitude,
            lon: position.coords.longitude
          }
          resolve(location)
        },
        error => {
          reject(error)
        },
        { timeout: 3000 }
      )
    } else {
      reject(new Error('Geolocation not available.'))
    }
  })
}

export function clearPostalLocation () {
  return store.dispatch('updateLocation', null)
}

export function getLocation () {
  try {
    return getLocationFromPostal(store.getters.localPostal) // first try using overriding postal code
  } catch (error) {}
  try {
    return getLocationFromNavigator() // second try using live location
  } catch (error) {}
  try {
    return getLocationFromPostal(store.getters.profilePostal)
  } catch (error) {}
  throw new Error('Could not resolve location')
}

export async function getAddressFromPostal (postal) {
  if (postal == null) return Promise.reject(new Error('No Postal Code'))
  let options = {
    url: getGoogleMapsAPICall('ca', postal),
    method: 'get'
  }
  if (!postal) throw new Error('No postal code provided.')
  const response = await axios(options)
  const location = pathFollow('data.results.0', response, null)
  if (!location) throw new Error('No location found.')
  else {
    const address = location.address_components
    const info = {}

    let city = find(address, level => {
      return level.types.includes('political') && level.types.includes('locality')
    })
    if (city) info.city = city.long_name

    let province = find(address, level => {
      return level.types.includes('political') && level.types.includes('administrative_area_level_1')
    })
    if (province) {
      info.province = province.long_name
      info.province_code = province.short_name
    }

    return info
  }
}



// WEBPACK FOOTER //
// ./src/service/location-service.js