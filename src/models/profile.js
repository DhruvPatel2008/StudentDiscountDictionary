import cloneDeep from 'lodash/cloneDeep'
import partial from 'lodash/partial'
import {
  isValidPostalFunc,
  isValidEmail,
  generateValidation,
  generateValidationsTowardSingeValue,
  isValidPwdLength,
  isValidContainsNumber,
  isValidContainsUppercaseLetter,
  isValidContainsLowercaseLetter,
  or,
  isDigits,
  unixToDateLocale,
  isValidName
} from '@/utils'
import {
  isValidGender,
  isValidLanguage,
  isValidSchoolType,
  isValidSchoolName
} from '@/models'
import { country } from '@/service/api-config'
import moment from 'moment'

export const AGE_RESTRICTION_MIN = 13

export const CARD_NUMBER_LENGTH = 16
export const CARD_NUMBER_SECTION_LENGTH = 4
export const CSV_LENGTH = 3
export const CARD_NUMBER_PREFIX = '6018'
export const DEFAULT_SIGNUP_METHOD = 'Email'

export const CARD_NUMBER_CLEAVE_OPTIONS = {
  numericOnly: true,
  delimiter: '-',
  blocks: [
    CARD_NUMBER_SECTION_LENGTH,
    CARD_NUMBER_SECTION_LENGTH,
    CARD_NUMBER_SECTION_LENGTH,
    CARD_NUMBER_SECTION_LENGTH]
}

export const CSV_CLEAVE_OPTIONS = {
  numericOnly: true,
  delimiter: ' ',
  blocks: [CSV_LENGTH]
}

const cardModel = {
  card_number: null,
  csv: null
}

export function Card () {
  return cloneDeep(cardModel)
}
export const MIN_FAVOURITE_CATEGORIES = 3
export const MAX_FAVOURITE_CATEGORIES = 5

export function isBMOMC (cardNumber) {
  const BMOMC_STARTS = ['60186016', '60186013', '601860195']
  if (!cardNumber) return false
  else return BMOMC_STARTS.map(start => cardNumber.startsWith(start)).reduce(or)
}

export const MIN_PASSWORD_LENGTH = 6

const profileModel = {
  email: null,
  first_name: null,
  last_name: null,
  gender: null,
  language: null,
  postal: null,
  school_type: null,
  school_name: null,
  email_opt_in: false,
  is_auto_renew: false,
  international: false
}

export function Profile () {
  return cloneDeep(profileModel)
}

const signupModel = {
  email: null,
  first_name: null,
  last_name: null,
  gender: null,
  language: null,
  postal: null,
  birth_date: null,
  school_type: null,
  school_name: null,
  referred_by: null,
  email_opt_in: false,
  international: false
}

export function Signup () {
  return cloneDeep(signupModel)
}

function validProfileFunc (country, profile) {
  const validators = {
    first_name: isValidName,
    last_name: isValidName,
    email: isValidEmail,
    gender: isValidGender,
    language: isValidLanguage,
    postal: partial(isValidPostalFunc, country)(),
    ...(country === 'us'
      ? {
        school_type: () => true,
        school_name: isValidSchoolName
      }
      : {
        school_type: isValidSchoolType,
        school_name: () => true
      }
    ),
    email_opt_in: () => true
  }
  return generateValidation(validators, profile)
}
export const validProfile = partial(validProfileFunc, country)

export function validSignupFunc (country, signup) {
  const validators = {
    email: isValidEmail,
    first_name: isValidName,
    last_name: isValidName,
    language: isValidLanguage,
    birth_date: date => date != null,
    email_opt_in: () => true
  }
  return generateValidation(validators, signup)
}
export const validSignup = partial(validSignupFunc, country)

export function validContestSignUpFunc (country, signup) {
  const validators = {
    email: isValidEmail,
    first_name: isValidName,
    last_name: isValidName,
    language: isValidLanguage,
    birth_date: date => date != null,
    email_opt_in: () => true,
    postal: partial(isValidPostalFunc, country)(),
    password: isValidPassword,
    gender: isValidGender
  }
  return generateValidation(validators, signup)
}
export const validContestSignUp = partial(validContestSignUpFunc, country)

export function validCIBCSignupFunc (country, signup) {
  const validators = {
    email: isValidEmail,
    first_name: isValidName,
    last_name: isValidName,
    language: isValidLanguage,
    birth_date: date => date != null,
    email_opt_in: () => true,
    postal: partial(isValidPostalFunc, country)(),
    gender: isValidGender,
    school_type: isValidSchoolType
  }
  return generateValidation(validators, signup)
}
export const validCIBCSignup = partial(validCIBCSignupFunc, country)

export function isValidCardNumber (cardNumber) {
  return cardNumber ? (cardNumber.length === CARD_NUMBER_LENGTH && isDigits(cardNumber)) : false
}

export function isValidCSV (csv) {
  return csv ? (csv.length === CSV_LENGTH && isDigits(csv)) : false
}

export function validCardFunc (card) {
  const validators = {
    card_number: isValidCardNumber,
    csv: isValidCSV
  }
  return generateValidation(validators, card)
}
export const validCard = validCardFunc

export function expiryToCardYear (expiryTimestamp) {
  if (!expiryTimestamp) return null
  const date = unixToDateLocale(expiryTimestamp)
  const yearFrom = moment(date).subtract(1, 'year').format('YYYY')
  const yearTo = moment(date).format('YY')
  return `${yearFrom}/${yearTo}`
}

export function isValidPassword (password) {
  const validator = validPasswordRules(password)
  return validator.valid
}

export function validPasswordRules (password) {
  const validators = {
    length: isValidPwdLength,
    cantainsNumber: isValidContainsNumber,
    cantainsUppercaseLetter: isValidContainsUppercaseLetter,
    cantainsLowercaseLetter: isValidContainsLowercaseLetter
  }

  return generateValidationsTowardSingeValue(validators, password)
}



// WEBPACK FOOTER //
// ./src/models/profile.js