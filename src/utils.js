import { typeCheck } from 'type-check'
import partial from 'lodash/partial'
import values from 'lodash/values'
import zipObject from 'lodash/zipObject'
import times from 'lodash/times'
import moment from 'moment'
import { country } from '@/service/api-config'
import router from '@/router'
import store from '@/store'
import { userAccessToken, updateResendRatelimit } from '@/service/register-service'
import { loginEmail, sendUserEmailVerification } from '@/vendor/firebase/firebase-actions'
import { resendcountdownTimer } from '@/service/storage'
import { logout } from '@/service/user-service'
const CryptoJS = require('crypto-js')

const protocols = ['http', 'https']

export const screenDetails = {
  'Desktop': {
    'minWidth': 768
  },
  'Tablet': {
    'minWidth': 500,
    'maxWidth': 768
  },
  'TabletIpad': {
    'minWidth': 500,
    'maxWidth': 820
  },
  'Mobile': {
    'maxWidth': 500
  }
}

export const desktopWidth = 1200

export function updatePurchaseNavigation (value) {
  store.dispatch('updatePurchaseNavigation', value)
}

export function updateReNavigation (value) {
  store.dispatch('updateReNavigation', value)
}

export function updateSchoolCode (code) {
  store.dispatch('updateSchoolCode', code)
}

export function assert (x, typeString) {
  if (!typeCheck(typeString, x)) throw new Error(`${x} must be a ${typeString}`)
}

export function isDescendant (parent, child) {
  if (child == null) return false
  var node = child.parentNode
  while (node != null) {
    if (node === parent) {
      return true
    }
    node = node.parentNode
  }
  return false
}

export function keyToTitle (key) {
  return key
  .replace(/(^[a-z])|[/| ]([a-z])/g, str => str.toUpperCase())
}

// map object with value and key
export function mapObject (obj, func) {
  let res = {}
  Object.keys(obj).forEach(key => {
    let value = obj[key]
    res[key] = func(value, key)
  })
  return res
}

export function filterObject (obj, keys) {
  let res = {}
  keys.forEach(key => {
    let value = obj[key]
    res[key] = value
  })
  return res
}

export function reverseMap (obj) {
  let res = {}
  Object.keys(obj).forEach(key => {
    const value = obj[key]
    res[value] = key
  })
  return res
}

export function empty (map) {
  for (var key in map) {
    return !map.hasOwnProperty(key)
  }
  return true
}

export function findSubstringMatchesMulti (strings, substrings) {
  return strings.filter(string => {
    const str = string.toLowerCase()
    for (let index = 0; index < substrings.length; index++) {
      const sub = substrings[index].toLowerCase()
      if (str.includes(sub)) return true
    }
    return false
  })
}

export function findSubstringMatches (strings, substring) {
  if (substring.length <= 0) return []
  return strings.filter(string => {
    const str = string.replace(' ', '').toLowerCase()
    const sub = substring.replace(' ', '').toLowerCase()
    if (str.includes(sub)) return true
    else return false
  })
}

export function objectTimestampFilter (
  objects, currentTimestamp = null,
  startPropName = 'start_date', endPropName = 'end_date'
) {
  if (currentTimestamp == null) {
    currentTimestamp = unixNow()
  }
  return objects.filter(object => {
    const startTimestamp = object[startPropName]
    const endTimestamp = object[endPropName]
    return (
      (!startTimestamp || startTimestamp <= currentTimestamp) &&
      (!endTimestamp || currentTimestamp < endTimestamp)
    )
  })
}

export const regexes = {
  required: /^[\s\S]+?$/g,
  postal: /^[A-Z][0-9][A-Z]\s?[0-9][A-Z][0-9]$/g,
  postalUS: /^[0-9]{5}$/g,
  iso_date: /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/g,
  email_simple: /^(("[\w\s-]+")|([\w+-]+(?:\.[\w-]+)*)|("[\w\s-]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/g,
  credit_card_number: /^[0-9]{13,16}$/g,
  credit_card_expiry: /^[0-9]{4}$/g,
  credit_card_cvd: /^[0-9]{3,4}$/g,
  phone: /([0-9]-)?[0-9]{3}-[0-9]{3}-[0-9]{4}/g,
  pwdMinLength: /.{8,}/g,
  pwdContainsNumber: /\d/g,
  pwdContainsUppercaseLetter: /[A-Z]/g,
  pwdContainsLowercaseLetter: /[a-z]/g,
  loyaltyNumber: /[0-9]{15}/g,
  // eslint-disable-next-line
  containsSpecialCharacterExceptSpace: /[`!@#$%^&*()_+\=\[\]{};':"\\|,.<>\/?~]/g
}

export function isValid (regex, string) {
  if (string == null) return false
  return !!string.toString().match(regex)
}

export function isNotValid (regex, string) {
  if (string == null || string.trim() === '') return false
  return !string.toString().match(regex)
}

export function isValidOptional (regex, string) {
  return string ? isValid(regex, string) : true
}

export const isValidRequired = partial(isValid, regexes.required)
export const isValidPostalFunc = country => country === 'us' ? partial(isValid, regexes.postalUS) : partial(isValid, regexes.postal)
export const isValidPostal = partial(isValidPostalFunc, country)()()
export const isValidDate = partial(isValid, regexes.iso_date)
export const isValidEmail = partial(isValid, regexes.email_simple)
export const isValidCreditCardNumber = partial(isValid, regexes.credit_card_number)
export const isValidCreditCardExpiry = partial(isValid, regexes.credit_card_expiry)
export const isValidCreditCardCVD = partial(isValid, regexes.credit_card_cvd)
export const isValidPhoneOptional = partial(isValidOptional, regexes.phone)
export const isValidPwdLength = partial(isValid, regexes.pwdMinLength)
export const isValidContainsNumber = partial(isValid, regexes.pwdContainsNumber)
export const isValidContainsUppercaseLetter = partial(isValid, regexes.pwdContainsUppercaseLetter)
export const isValidContainsLowercaseLetter = partial(isValid, regexes.pwdContainsLowercaseLetter)
export const isValidName = partial(isNotValid, regexes.containsSpecialCharacterExceptSpace)
export const isLoyaltyValidId = partial(isValid, regexes.loyaltyNumber)

export function acceptOnlyNumber (evt) {
  var charCode = (evt.which) ? evt.which : evt.keyCode
  if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
    evt.preventDefault()
  } else {
    return true
  }
}

/**
 * Update URL that will be redirected from Travel Photo Share Modal.
 *
 * @return {String} Instagram POST URL
 */
export function travelPhotoInstaURL () {
  return 'https://www.instagram.com/s/aGlnaGxpZ2h0OjE4MTk4Mjc5NDM2MjQ2NTc3?story_media_id=3049050415207942638&igshid=MjkzY2Y1YTY='
}

/**
 * URL to Insta SPC page for Vote Now from Travel Photo Contest.
 *
 * @return {String} Instagram SPC Page URL
 */
export function spcInstaProfilePageURL () {
  return 'https://www.instagram.com/spccard/'
}

export function isDigits (string) {
  return string.match(/^[0-9]*$/g)
}

export const cleaveOptions = {
  postal: {
    delimiter: ' ',
    blocks: [3, 3],
    uppercase: true
  },
  postalUS: {
    blocks: [5],
    numericOnly: true
  },
  date: {
    delimiter: '-',
    date: true,
    datePattern: ['Y', 'm', 'd']
  },
  phone: {
    phone: true,
    phoneRegionCode: 'CA',
    delimiter: '-'
  },
  phoneUS: {
    phone: true,
    phoneRegionCode: 'US',
    delimiter: '-'
  }
}

export const and = (a, b) => a && b
export const or = (a, b) => a || b

export const not = a => !a
export const is = a => !!a

export const LT = (a, b) => a < b
export const GT = (a, b) => a > b

export function stringReverse (string) {
  return [...string].reverse().join('')
}

export function asCurrency (number, language, showSign = true) {
  if (language === 'fr') {
    return `${number.toFixed(2).replace('.', ',')}${showSign ? '$' : ''}`
  }
  return `${showSign ? '$' : ''}${number.toFixed(2)}`
}

export function chunkReverse (chunkSize, string) {
  if (string == null) return null
  if (string === '') return string

  const headChunk = string.slice(0, chunkSize)
  const tail = string.slice(chunkSize)
  return chunkReverse(chunkSize, tail) + headChunk
}

export function chunkReverseFromEnd (chunkSize, string) {
  if (string == null) return null
  if (string === '') return string

  const tailChunk = string.slice(-chunkSize)
  const head = string.slice(0, -chunkSize)
  return tailChunk + chunkReverseFromEnd(chunkSize, head)
}

export function arrayRange (length) {
  return [...Array(length).keys()]
}

export function arrayChunk (chunkSize, array) {
  return array.reduce(
    (accumulator, current) => {
      let chunk = []
      if (
        accumulator.length === 0 ||
        accumulator[accumulator.length - 1].length === chunkSize
      ) {
        accumulator.push(chunk)
      } else {
        chunk = accumulator[accumulator.length - 1]
      }
      chunk.push(current)
      return accumulator
    },
    []
  )
}

export function stringChunk (chunkSize, str) {
  return str.match(new RegExp('.{1,' + chunkSize + '}', 'g'))
}

export function mergeFields (fields, source, destination) {
  typeCheck('[String]', fields)
  typeCheck('Object', source)
  typeCheck('Object', destination)

  fields.forEach(field => {
    destination[field] = source[field]
  })
}

export function unixNow () {
  return (new Date()).getTime()
}

// WARNING: This ignores the locale
export function dateToUnix (date) {
  let year = date.getFullYear()
  let month = date.getMonth()
  let day = date.getDate()
  return Date.UTC(year, month, day)
}

// WARNING: This ignores the locale
export function unixToDate (unix) {
  return unix ? new Date(moment(unix).utc().format('MM/DD/YYYY')) : null
}

export function dateToUnixLocale (date) {
  if (!(date instanceof Date)) return null
  else return date.getTime()
}

export function dateToUnixLocaleStartCorrected (date) {
  if (!(date instanceof Date)) return null
  else {
    const correctedDate = new Date(`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`)
    return correctedDate.getTime()
  }
}

export function unixToDateLocale (unix) {
  if (!unix) return null
  const date = new Date(unix)
  return date != null ? date : null
}

export function formattedTimestamp (unix) {
  const date = unixToDateLocale(unix)
  if (date == null) return date
  return moment(date).format('MM/DD/YY')
}

export function getDaysPerMonth (year, month) {
  if (month === 2) {
    const normal = 28
    const leap = 29

    const divBy4 = year % 4 === 0
    const divBy100 = year % 100 === 0
    const divBy400 = year % 400 === 0

    return (divBy4 && ((divBy100 && divBy400) || !divBy100)) ? leap : normal
  } else {
    return month % 2 === 0 ? 30 : 31
  }
}

export function compareIgnoreOverflow (comparator, string1, string2) {
  const minLength = Math.min(string1.length, string2.length)
  return comparator(string1.slice(0, minLength), string2.slice(0, minLength))
}

export const lessThanIgnoreOverflow = partial(compareIgnoreOverflow, LT)

export const greaterThanIgnoreOverflow = partial(compareIgnoreOverflow, GT)

export function hasExpired (expiryUnix) {
  if (!expiryUnix) return false
  const currentUnix = unixNow()
  return currentUnix > expiryUnix
}

export function isEmpty (value) {
  return value == null || typeof value === 'undefined'
}

export function isWithinExpiry (startTimestamp, endTimestamp, currentTimestamp) {
  if (!currentTimestamp) currentTimestamp = unixNow()
  let startNotExpired = true
  let endNotExpired = true
  if (!isEmpty(startTimestamp)) startNotExpired = startTimestamp <= currentTimestamp
  if (!isEmpty(endTimestamp)) endNotExpired = currentTimestamp < endTimestamp
  return startNotExpired && endNotExpired
}

export function mod (a, b) {
  return ((a % b) + b) % b
}

export function pathCheck (path, start) {
  if (path.length <= 0) return typeof start !== 'undefined'

  if (typeCheck('String', path)) {
    path = path.split('.')
  } else if (!typeCheck('[String]', path)) {
    throw new Error('Path must be a String or String Array.')
  }

  let [head, ...tail] = path
  let next = start[head]

  if (typeof next === 'undefined') return false
  else return pathCheck(tail, next)
}

export function pathFollow (path, start, fallback) {
  if (path.length <= 0) return fallback

  if (typeCheck('String', path)) {
    path = path.split('.')
  } else if (!typeCheck('[String]', path)) {
    throw new Error('Path must be a String or String Array.')
  }

  let [head, ...tail] = path
  let next = start[head]

  if (typeof next === 'undefined') return fallback
  else if (next == null) return null
  else if (tail.length === 0) return next
  else return pathFollow(tail, next, fallback)
}

export function getErrorCode (error, fallback) {
  return pathFollow('response.status', error, typeof fallback !== 'undefined' ? fallback : null)
}

export function buildMeta ({
  title,
  description,
  keywords,
  image,
  url
}) {
  return {
    title,
    meta: [
      {
        name: 'description',
        content: description
      },
      {
        name: 'keywords',
        content: keywords
      },
      {
        property: 'og:title',
        content: title
      },
      {
        property: 'og:description',
        content: description
      },
      {
        property: 'og:image',
        content: image
      },
      {
        property: 'og:url',
        content: url
      }
    ],
    link: [
      {
        rel: 'canonical',
        href: url
      }
    ]
  }
}

export function inRangeInclusive (lower, upper, value) {
  return lower <= value && value <= upper
}

export function compose (...funcs) {
  if (funcs.length <= 0) return null
  if (funcs.length === 1) return funcs[0]
  let [toe, ...body] = funcs.reverse()
  return function (...args) {
    return compose(...body.reverse())(toe(...args))
  }
}

export function generateValidation (validators, object) {
  const fields = mapObject(validators, (value, key) => {
    return value(object[key])
  })
  const valid = values(fields).reduce(and, true)
  return {
    fields,
    valid,
    validLens (lens) {
      const filteredValidators = filterObject(validators, lens)
      const fields = mapObject(filteredValidators, (value, key) => {
        return value(object[key])
      })
      return values(fields).reduce(and, true)
    }
  }
}
// apply all validators toward provided value
export function generateValidationsTowardSingeValue (validators, value) {
  let mapValueObj = {}

  Object.keys(validators).forEach(key => {
    mapValueObj[key] = value
    return mapValueObj
  })
  return generateValidation(validators, mapValueObj)
}

export function mapKeysToValue (keysArray, value) {
  return zipObject(keysArray, times(keysArray.length, () => value))
}

export function sortBySubstringIndex (substring, array) {
  const sub = substring.toLowerCase()
  array.sort((a, b) => {
    const aIndex = a.toLowerCase().indexOf(sub)
    const bIndex = b.toLowerCase().indexOf(sub)
    if (aIndex < bIndex) return -1
    else if (aIndex > bIndex) return 1
    else {
      if (a.length < b.length) return -1
      else if (a.length > b.length) return 1
      else return 0
    }
  })
}

export function sortArrayObjectsBySortOrder (arrayName, fieldName, sorting = 0) {
  function compare (a, b) {
    let sortOrder = 0
    if (sorting === 'desc') {
      sortOrder = -1
    }
    const currentObj = a[fieldName]
    const nextObj = b[fieldName]
    if (currentObj > nextObj) {
      // currentObj should come before nextObj in the sorted order
      sortOrder = 1 * sortOrder
    } else if (currentObj < nextObj) {
      // currentObj should come after nextObj in the sorted order
      sortOrder = -1 * sortOrder
    } else {
      // currentObj and nextObj are the same
      sortOrder = 0 * sortOrder
    }
    return sortOrder
  }
  return arrayName.sort(compare)
}

export function depluralize (string) {
  typeCheck('String', string)

  if (string.length <= 1) return string
  else if (string.length === 2) {
    if (string[1].toLowerCase() === 's') return string.slice(0, 1)
    else return string
  } else {
    if (string.slice(-2).toLowerCase() === 'es') return string.slice(0, string.length - 2)
    else if (string.slice(-1).toLowerCase() === 's') return string.slice(0, string.length - 1)
    else return string
  }
}

export function stringsUnion (...arrays) {
  let index = {}
  arrays.forEach(array => {
    array.forEach(item => {
      if (!index[item]) {
        index[item] = true
      }
    })
  })
  return Object.keys(index)
}

export function extractFirstName (displayName) {
  if (!displayName) return ''
  let array = displayName.split(' ')
  return array.length > 0 ? array[0] : ''
}

export function extractLastName (displayName) {
  if (!displayName) return ''
  let array = displayName.split(' ')
  return array.length > 0 ? array[array.length - 1] : ''
}

export function calculateAge (birthdate) {
  if (!Number.isInteger(birthdate)) return null
  let now = moment()
  let birth = moment.unix(birthdate / 1000)
  return now.diff(birth, 'years')
}

export function arrayEqual (a, b) {
  return a.length === b.length &&
    a.every((element, index) => {
      return element === b[index]
    })
}

export function hasProperties (properties, object) {
  if (!object) return false
  if (typeof object !== 'object') {
    throw new Error('Not an object.')
  }

  if (!Array.isArray(properties)) {
    throw new Error('Properties is not an array.')
  }
  if (properties.length === 0) return true

  return properties.every(property => {
    if (typeof property !== 'string') {
      throw new Error('Property is not a string.')
    }

    return Object.hasOwnProperty(property)
  })
}

export function setCaretPosition (input, pos) {
  // Modern browsers
  if (input.setSelectionRange) {
    input.focus()
    input.setSelectionRange(pos, pos)

  // IE8 and below
  } else if (input.createTextRange) {
    var range = input.createTextRange()
    range.collapse(true)
    range.moveEnd('character', pos)
    range.moveStart('character', pos)
    range.select()
  }
}

export function leftPad (character, length, string) {
  return character.repeat(Math.max(0, length - string.length)) + string
}

export const leftPadZero = partial(leftPad, '0')

export function cleanBOM (string) {
  return window.decodeURI(window.encodeURI(string).replace(/%EF%BB%BF/g, ''))
}

export function isBirthday (timestamp) {
  const date = unixToDateLocale(timestamp)
  if (date) {
    const today = new Date()
    const todayMonth = today.getMonth()
    const todayDay = today.getDate()
    const birthdayMonth = date.getMonth()
    const birthdayDay = date.getDate()
    return todayMonth === birthdayMonth && todayDay === birthdayDay
  } else {
    return null
  }
}

const GOLDEN_RATIO_CONJUGATE = 0.618033988749895

export function isSafari () {
  return /^((?!chrome|android).)*safari/i.test(navigator.userAgent)
}

function hsv_to_rgb (h, s, v) { // eslint-disable-line camelcase
  /* eslint-disable camelcase */
  const h_i = Math.round(h * 6)
  var f = h * 6 - h_i
  var p = v * (1 - s)
  var q = v * (1 - f * s)
  var t = v * (1 - (1 - f) * s)
  const matrix = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q]
  ]
  var r, g, b
  [r, g, b] = matrix[h_i]
  return {
    r: Math.round(r * 256),
    g: Math.round(g * 256),
    b: Math.round(b * 256)
  }
}

function rgb_to_css ({ r, g, b }) {
  return `rgb(${r}, ${g}, ${b})`
}

export function konami (callback) {
  const code = [
    'ArrowUp',
    'ArrowUp',
    'ArrowDown',
    'ArrowDown',
    'ArrowLeft',
    'ArrowRight',
    'ArrowLeft',
    'ArrowRight',
    'b',
    'a'
  ]
  const codeMobile = [
    'u',
    'u',
    'd',
    'd',
    'l',
    'r',
    'l',
    'r',
    'b',
    'a'
  ]
  const isKonami = array => arrayEqual(array, code) || arrayEqual(array, codeMobile)
  let array = []
  const event = 'keyup'
  const func = event => {
    array.push(event.key)
    array = array.slice(0 - code.length)
    if (isKonami(array)) callback()
  }
  document.addEventListener(event, func)
  return () => {
    document.removeEventListener(event, func)
  }
}

export function fire (root) {
  let elem = document.createElement('DIV')
  elem.classList.add('konami')
  const count = 200
  if (elem) {
    elem.innerHTML = ''
    for (let index = 0; index < count; index++) {
      let comet = document.createElement('DIV')
      comet.classList.add('comet')
      comet.style.left = Math.round(Math.random() * 100) + '%'
      comet.style.background = compose(rgb_to_css, hsv_to_rgb)(Math.random() * GOLDEN_RATIO_CONJUGATE, 0.99, 0.99) // randomColourCSS(200)
      let cometWrapper = document.createElement('DIV')
      cometWrapper.classList.add('comet-wrapper')
      cometWrapper.style.animationDelay = Math.round(Math.random() * 500) + 'ms'
      cometWrapper.style.animationDuration = Math.round(Math.random() * 1000 + 500) + 'ms'
      cometWrapper.appendChild(comet)
      comet = null
      elem.appendChild(cometWrapper)
      cometWrapper = null
    }
    root.appendChild(elem)
    setTimeout(() => {
      root.removeChild(elem)
      root = null
      elem = null
    }, 3000)
  }
}

export function randomColourCSS (lower = 0, upper = 256) {
  const generator = () => Math.round(Math.random() * (upper - lower) + lower)
  const r = generator()
  const g = generator()
  const b = generator()
  return `rgb(${r}, ${g}, ${b})`
}

export function safeOpen (url, setFocus = false) {
  try {
    if (isSafari()) {
      window.location.assign(url)
      return
    }
    const newWindow = window.open(url, '_blank')
    if (setFocus) newWindow.focus()
  } catch (error) {
    console.error(error)
  }
}

export function openInSameTab (url) {
  try {
    if (isSafari()) {
      window.location.assign(url)
      return
    }
    window.location.href = url
  } catch (error) {
    console.error(error)
  }
}

export function promiseInterceptor (
  success = response => response.data
) {
  return func => {
    return async (...args) => {
      const response = await func(...args)
      return success(response)
    }
  }
}

export function timePromise (milliseconds) {
  return new Promise(resolve => window.setTimeout(resolve, milliseconds))
}

export function requestAnimationFramePromise () {
  return new Promise(resolve => window.requestAnimationFrame(resolve))
}

export function fixQuotes (badQuotes) {
  return badQuotes
  .replace(/[\u2018\u2019]/g, "'")
  .replace(/[\u201C\u201D]/g, '"')
}

export function shuffleArray (array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export const Window = {
  alert: window.alert,
  scrollTo: window.scrollTo
}

export const mobileBreakPoint = 500

export function deviceWidth () {
  return window.innerWidth
}

/**
 * Store the utm values to the local storage with startDate and endDate.
 *
 * @param {Object} utm UTM values in object format.
 */
export function setUTM (utm) {
  let utmDetails = {
    utm,
    startDate: moment(),
    expireDate: moment().add(7, 'days')
  }
  localStorage.setItem('UTM', JSON.stringify(utmDetails))
}

/**
 * Will check either it's a URL or route and navigate accordingly.
 *
 * @param {String} url URL which needs to be open
 * @param {Boolean} sameTab Open in new tab or same tab
 */
export function siteNavigation (url, sameTab = true) {
  if (url[0] === '/') {
    handleRoute(url)
  }
  if (validateURL(url)) {
    handleSiteNavigation(url, sameTab)
  }
}
/**
 * Will navigate to the given route
 *
 * @param {String} route route which needs to be open
 */
function handleRoute (route) {
  router.push(route)
}
/**
 * Will open the URL either in same tab or new tab based on params
 *
 * @param {String} url URL which needs to be open
 * @param {Boolean} sameTab Open in new tab or same tab
 */
function handleSiteNavigation (link, sameTab) {
  if (sameTab) {
    openInSameTab(link)
    return
  }
  safeOpen(link)
}
/**
 * Returns boolean by checking the url is valid .
 *
 * @param url
 * @return {Boolean} check wether the link have the protocols.
 */
export function validateURL (url) {
  return protocols.includes(url.split(':')[0])
}

/**
 * Will validate the device category lies within the current device width.
 * @param {String} deviceCategory (Desktop, Tablet, Mobile).
 * @param {Number} screenWidth
 * @returns {Boolean}
 */
export function validateDeviceWidth (deviceCategory, screenWidth) {
  if (!screenDetails[deviceCategory] && Number.isInteger(screenWidth)) {
    return false
  }
  switch (deviceCategory) {
    case 'Desktop':
      return (screenWidth > screenDetails.Desktop.minWidth)
    case 'Tablet':
      return (screenWidth > screenDetails.Tablet.minWidth && screenWidth <= screenDetails.Tablet.maxWidth)
    case 'TabletIpad':
      return (screenWidth > screenDetails.TabletIpad.minWidth && screenWidth <= screenDetails.TabletIpad.maxWidth)
    case 'Mobile':
      return (screenWidth <= screenDetails.Mobile.maxWidth)
  }
}
/**
 * To find the next closest value to the given array.
 * @param {Array} sortedArray
 * @param {String} value
 * @returns {String} Closest value.
 */
export function nextClosestValue (sortedArray, value) {
  for (const res of sortedArray) {
    if (res > value) {
      return res
    }
  }
}

export const art = `
..............................................
:O00000000000000000000000000000000000000000000x'
:000000000000000000000000000000000000000000000x'
 ..............................................
     ...                                ...
  ,ok000Od;.      :kkkkkkkxoc.      .;dO000ko,
.cXMMX0KWMWx.     oMMMNXNNWMWK:    .dNMWX0XMMXl.
,KMM0,..xWMNc     oWMWo..'cKMM0'   :XMMk'.;0MM0'
;XMMd.  cNMWl     oWMNc   .xMMK,   cNMWo  .kMMK,
'0MMK,  ,dxd,     oWMNc   .xMMK,   cNMWo  .:xxl.
 :XMMXl.          oWMNc   .kMMK,   cNMWo
  ,xNMW0c.        oWMWx;;;oXMMO.   cNMWo
   .;kNMWO:.      oWMMMWWMMMWO;    cNMWo
     .:0WMNd.     oWMWOdoooc;.     cNMWo
,odo,  .xWMNc     oWMNc            cNMWo  .:ddl.
lWMWl   :XMMd.    oWMNc            cNMWo  .kMMK,
:NMWk. .dWMWl     oWMNc            :XMMk. ,0MM0'
.xWMWKOKWMWx.     oWMNc            .dWMWKOXWMNl.
 .;dO0K0Od;.      :OOk,             .:dO0K0Od,..
    ....                               ....
`

export const notes = `
This website was carefully crafted,
from home-made artisinal EcmaScript,
with a layer of Babel Transpilation,
dipped in a VueJS template glaze,
and sprinkled with a Stylus-infused topping.
Enjoy.
`

export function getMobileOperatingSystem () {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera

  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'ios'
  }

  if (/android/i.test(userAgent) && !/windows phone/i.test(userAgent)) {
    return 'android'
  }

  return null
}

/**
 * To split array into groups the length of size.
 * @param {Array} inputArray
 * @param {Interger} size
 * @returns {Array} arrayOfArrays
 */

export function chunkArray (inputArray, size) {
  var arrayOfArrays = []
  for (var i = 0; i < inputArray.length; i = i + size) {
    arrayOfArrays.push(inputArray.slice(i, i + size))
  }
  return arrayOfArrays
}

export const bannerNames = {
  'why_spc': 'Why SPC',
  'why_spc_hm': 'Why SPC HM',
  'buy_spc': 'Buy SPC',
  'create_account': 'Create Account',
  'login_page': 'Login Page',
  'cibc': 'CIBC',
  'purchase_page': 'Purchase Page',
  'landing_contest': 'Landing Contest',
  'category': 'Category',
  'spc_plus': 'SPC Plus',
  'activation': 'Activation',
  'instore_purchase': 'Instore Purchase',
  'collection': 'Collection',
  'all_deals': 'All Deals',
  'spc_plus_page': 'SPC+ Page'
}

/**
 * Check whether UTM sign up
 * All required UTM params should be present in URL
 *
 * @param {Object} query queryparams
 * @returns Boolean
 */
export function validUtmUrl (query, validateCode = false) {
  if (query === null) {
    return false
  }
  let valid = true
  const UTMRequired = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'utm_code']
  // utm_code is optional for backward compatibility
  UTMRequired.forEach((utm, index) => {
    if (!(utm in query)) {
      if (validateCode) valid = false
      else if (utm !== 'utm_code') valid = false
    }
  })
  return valid
}

export const registrationAttemptLimit = 5

/**
 * Get the Current baseUrl website is running
 *
 * @returns String
 */
export function getCurrentBaseUrl () {
  const baseUrl = window.location.origin
  return baseUrl
}

/**
 * Set meta Description
 *
 * @param {String} description
 */
export function setMetaDescription (description) {
  document.querySelector('meta[name="description"]').setAttribute('content', description)
}

/**
 *
 * @param {Object} obj offer
 * @param {String} lang en/fr
 * @returns [title, description]
 */
export function checkReturnMetaInfo (obj, lang) {
  const meta = ['meta_title_en', 'meta_title_fr', 'meta_description_en', 'meta_description_fr']
  const notValid = meta.map(key => obj[key] !== null)
  if (notValid.includes(false)) {
    return [null, null]
  } else {
    return [obj[`meta_title_${lang}`], obj[`meta_description_${lang}`]]
  }
}

export function getQueryParams (url) {
  // Get the part of the URL that contains the query parameters
  const queryString = url.split('?')[1]
  if (!queryString) {
    return {}
  }
  const queryParamsArray = queryString.split('&')
  const queryParams = {}
  // Iterate through the key-value pairs and store them in the object
  queryParamsArray.forEach((param) => {
    const [key, value] = param.split('=')
    queryParams[key] = decodeURIComponent(value)
  })
  return queryParams
}

export async function resendVerificationEmail (emailPassword) {
  try {
    store.dispatch('accountCreation/updateMockLoginStatus', true)
    await loginEmail(emailPassword.email, emailPassword.password)
    const response = await userAccessToken(null, null, null, true)
    await sendUserEmailVerification(response.token)
    const rateLimitResponse = await updateResendRatelimit()
    this.$refs.emailVerificationModal.isRateLimitExceeds = rateLimitResponse.is_resend_rate_limit_exceeds
    resendcountdownTimer(Date.now())
    this.$refs.emailVerificationModal.startCountdown()
  } catch (error) {
    if (error.code === 'auth/too-many-requests') {
      this.$refs.emailVerificationModal.isFirebaseError = true
    }
    this.$refs.emailVerificationModal.resendDisabled = false
  } finally {
    await logout()
    store.dispatch('accountCreation/updateMockLoginStatus', false)
  }
}

export const POSTAL_CODE_MAX_LENGTH = 7
export const HTTP_429_TOO_MANY_REQUESTS = 429
export const OPEN_CLOSE_RULES_EN = '12_Days_of_Giveaways_Rules_and_Regulations_2023.pdf'
export const OPEN_CLOSE_RULES_FR = 'Re%CC%80gles_et_re%CC%81glementations_pour_les_12_jours_de_cadeaux_2023.pdf'

export function decryptText (data) {
  const iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTOGRAPHY_FIX_IV)
  let key = process.env.CRYPTOGRAPHY_KEY
  key = CryptoJS.enc.Utf8.parse(key)
  data = data.replace(/_/g, '/').replace(/-/g, '+')
  let decrypted = CryptoJS.AES.decrypt(data, key, {iv: iv, mode: CryptoJS.mode.CBC})
  decrypted = decrypted.toString(CryptoJS.enc.Utf8)
  return decrypted
}

/**
 *
 * @param {String} data
 * @returns encrypted string
 */
export function encryptText (data) {
  const iv = CryptoJS.enc.Utf8.parse(process.env.CRYPTOGRAPHY_FIX_IV)
  let key = process.env.CRYPTOGRAPHY_KEY
  key = CryptoJS.enc.Utf8.parse(key)
  let encrypted = CryptoJS.AES.encrypt(data, key, {iv: iv, mode: CryptoJS.mode.CBC})
  encrypted = encrypted.toString()
  return encrypted
}

/**
 *
 * @param {number} future
 * @returns string
 */
export function setExpireDate (future = 30000) {
  const currentTimestamp = new Date().getTime()
  const newTimestamp = currentTimestamp + future
  return newTimestamp.toString()
}

export const CAROUSEL_DESKTOP_SCREEN_WIDTH = 989
export const CAROUSEL_TABLET_IPAD_SCREEN_WIDTH = 750
export const CAROUSEL_MOBILE_SCREEN_WIDTH = 505
export const CAROUSEL_DESKTOP_VIEW = 4
export const CAROUSEL_TABLET_IPAD_VIEW = 3
export const CAROUSEL_TABLET_VIEW = 2
export const CAROUSEL_MOBILE_VIEW = 1

export const startIndex = (screenWidth) => splitIndex(screenWidth)
export const endIndex = (screenWidth) => splitIndex(screenWidth)

function splitIndex (screenWidth) {
  if (screenWidth <= CAROUSEL_DESKTOP_SCREEN_WIDTH && screenWidth >= CAROUSEL_TABLET_IPAD_SCREEN_WIDTH) {
    return CAROUSEL_TABLET_IPAD_VIEW
  } else if (screenWidth <= CAROUSEL_TABLET_IPAD_SCREEN_WIDTH && screenWidth >= CAROUSEL_MOBILE_SCREEN_WIDTH) {
    return CAROUSEL_TABLET_VIEW
  } else if (screenWidth <= CAROUSEL_MOBILE_SCREEN_WIDTH) {
    return CAROUSEL_MOBILE_VIEW
  }
  return CAROUSEL_DESKTOP_VIEW
}



// WEBPACK FOOTER //
// ./src/utils.js