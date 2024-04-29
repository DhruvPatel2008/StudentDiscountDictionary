import cloneDeep from 'lodash/cloneDeep'
import partial from 'lodash/partial'
import merge from 'lodash/merge'
import { getCurrentID } from '@/service/user-service'

import {
  isValidRequired,
  isValidCreditCardNumber,
  isValidCreditCardExpiry,
  isValidCreditCardCVD,
  isValidEmail,
  generateValidation,
  mapKeysToValue
} from '@/utils'

import { country } from '@/service/api-config'
import membership from 'Assets/data/spc_membership_price'

const productDetails = {
  product: null,
  bonus: null,
  quantity: 1,
  recurring: false,
  price: membership.price
}

const addressModel = {
  first_name: null,
  last_name: null,
  company_name: null,
  address: null,
  suite_unit: null,
  city: null,
  province: null,
  postal_code: null,
  country: null,
  phone_number: null
}

export const addressProperties = Object.keys(addressModel)

const addressDefault = country => {
  return merge(cloneDeep(addressModel), {
    country: country === 'ca' ? 'Canada' : null
  })
}

const creditCardModel = {
  name: null,
  type: null,
  pan: null, // card number
  exp: null, // expiry date
  cvd: null // security code
}

export const creditCardProperties = Object.keys(creditCardModel)

const profileModel = {
  email: null
}

export const profileProperties = Object.keys(profileModel)

const guestDataModel = {
  first_name: null,
  last_name: null,
  email: null,
  special_msg: null
}

const guestFormValid = false

const orderModel = country => ({
  profile: Profile(),
  product: Product(),
  billing_address: AddressFunc(country),
  shipping_address: AddressFunc(country),
  credit_card: CreditCard(),
  different_address: false,
  referral_code: null,
  order_number: null,
  guest_data: guestDataModel,
  guest_form_valid: guestFormValid
})

const cardlessOrderModel = country => ({
  profile: Profile(),
  billing_address: AddressFunc(country),
  credit_card: CreditCard()
})

const cardModel = {
  card_number: null,
  csv: null
}

export function OrderFunc (country) {
  return cloneDeep(orderModel(country))
}

export const Order = partial(OrderFunc, country)

function CardlessOrderFunc (country) {
  return cloneDeep(cardlessOrderModel(country))
}

export const CardlessOrder = partial(CardlessOrderFunc, country)

export function Product () {
  return cloneDeep(productDetails)
}

function AddressFunc (country) {
  return cloneDeep(addressDefault(country))
}
export const Address = partial(AddressFunc, country)

export function CreditCard () {
  return cloneDeep(creditCardModel)
}

export function Profile () {
  return cloneDeep(profileModel)
}

export function Card () {
  return cloneDeep(cardModel)
}

export function validAddressFunc (country, address) {
  const validators = {
    ...mapKeysToValue([], isValidRequired)
  }
  return generateValidation(validators, address)
}
export const validAddress = partial(validAddressFunc, country)

function mergeAddressFields (address) {
  const merged = cloneDeep(address)
  if (merged.suite_unit) merged.address += ', ' + merged.suite_unit
  delete merged.suite_unit
  return merged
}

export function preprocessOrder (order, payment) {
  const processedOrder = {
    purchaser_data: order.billing_address,
    guest_data: order.guest_data,
    ...cloneDeep(order.profile),
    ...cloneDeep(order.product),
    payment_method: payment.type
  }
  const uid = getCurrentID()
  if (typeof uid !== 'undefined' && uid != null) {
    processedOrder.uid = uid
  }
  if (order.referral_code) {
    processedOrder.referral_code = order.referral_code
  }

  return processedOrder
}

export function preprocessCardlessOrder (order) {
  const billing = mergeAddressFields(order.billing_address)

  const processedOrder = {
    ...cloneDeep(order.profile),
    billing_address: billing,
    ...cloneDeep(order.credit_card)
  }
  const uid = getCurrentID()
  if (typeof uid !== 'undefined' && uid != null) {
    processedOrder.uid = uid
  }
  return processedOrder
}

export function validProduct (product) {
  const validators = {
    quantity: quantity => quantity > 0,
    product: product => product != null,
    bonus: bonus => true
  }
  return generateValidation(validators, product)
}

export function validCreditCard (creditCard) {
  const validators = {
    name: isValidRequired,
    pan: isValidCreditCardNumber,
    exp: isValidCreditCardExpiry,
    cvd: isValidCreditCardCVD
  }
  return generateValidation(validators, creditCard)
}

export function validProfile (profile) {
  const validators = {
    email: isValidEmail
  }
  return generateValidation(validators, profile)
}

const provinceNamesByCode = {
  AB: 'Alberta',
  BC: 'British Columbia',
  MB: 'Manitoba',
  NB: 'New Brunswick',
  NL: 'Newfoundland',
  NS: 'Nova Scotia',
  NT: 'Northwest Territories',
  NU: 'Nunavut',
  ON: 'Ontario',
  PE: 'Prince Edward Island',
  QC: 'Quebec',
  SK: 'Saskatchewan',
  YT: 'Yukon'
}

const stateNamesByCode = {
  'MI': 'Michigan'
}

const provinceCodesByName = {
  'Alberta': 'AB',
  'British Columbia': 'BC',
  'Manitoba': 'MB',
  'New Brunswick': 'NB',
  'Newfoundland': 'NL',
  'Newfoundland and Labrador': 'NL',
  'Nova Scotia': 'NS',
  'Northwest Territories': 'NT',
  'Nunavut': 'NU',
  'Ontario': 'ON',
  'Prince Edward Island': 'PE',
  'Quebec': 'QC',
  'Saskatchewan': 'SK',
  'Yukon': 'YT'
}

const stateCodesByName = {
  'Michigan': 'MI'
}

const taxByProvinceCode = {
  AB: 0.05,
  BC: 0.05,
  MB: 0.05,
  NB: 0.15,
  NL: 0.15,
  NS: 0.15,
  NT: 0.05,
  NU: 0.05,
  ON: 0.13,
  PE: 0.15,
  QC: 0.05,
  SK: 0.05,
  YT: 0.05
}

const taxByStateCode = {
  MI: 0.06
}

function provincesByCodeFunc (country) {
  return country === 'us' ? stateNamesByCode : provinceNamesByCode
}
export const provincesByCode = partial(provincesByCodeFunc, country)()

export function validProvinceByCode (provinceCode) {
  return Object.keys(provincesByCode).includes(provinceCode)
}

function provincesByNameFunc (country) {
  return country === 'us' ? stateCodesByName : provinceCodesByName
}
export const provincesByName = partial(provincesByNameFunc, country)()

function taxByProvinceFunc (country) {
  return country === 'us' ? taxByStateCode : taxByProvinceCode
}
export const taxByProvince = partial(taxByProvinceFunc, country)

export function calculateWithTax (tax) {
  return (value) => (1 + tax) * value
}

function taxPerProvinceFunc (country, provinceName) {
  return taxByProvinceFunc(country)[provincesByNameFunc(country)[provinceName]]
}
export const taxPerProvince = partial(taxPerProvinceFunc, country)

function taxPerProvinceCodeFunc (country, provinceCode) {
  return taxByProvinceFunc(country)[provinceCode]
}
export const taxPerProvinceCode = partial(taxPerProvinceCodeFunc, country)

function priceWithTaxPerProvinceFunc (country, price, provinceName) {
  return calculateWithTax(taxPerProvinceFunc(country, provinceName))(price)
}
export const priceWithTaxPerProvince = partial(priceWithTaxPerProvinceFunc, country)

export function maskedCreditCardNumber (lastFour, maskCharacter = '*') {
  return maskCharacter.repeat(16 - 4) + lastFour
}



// WEBPACK FOOTER //
// ./src/models/order.js