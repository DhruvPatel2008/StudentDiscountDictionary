import languageData from 'LocalizedAssets/i18n/language'
import profileData from 'LocalizedAssets/data/profile'
import { mapObject } from '@/utils'

export const languages = Object.keys(languageData)

export const hasMultipleLanguages = languages.length > 1

export const languageCodes = mapObject(languageData, value => value.code)

export const genders = profileData.genders

export const schoolTypes = profileData.school_types

export const schoolNames = profileData.school_names

export const countries = [
  'ca',
  'us'
]

export function constructLocalized (context, options, key) {
  return options.map(option => {
    return {
      value: option,
      text: context.$t(`${key}.${option}`)
    }
  })
}

export function constructLocalizedMulti (context, data) {
  return Object.assign(
    ...Object.keys(data).map(
      k => ({[k]: constructLocalized(context, data[k], k)})
    )
  )
}

export function isValidLanguage (language) {
  return languages.indexOf(language) !== -1
}

export function isValidGender (gender) {
  return genders.indexOf(gender) !== -1
}

export function isValidSchoolType (schoolType) {
  return schoolTypes.indexOf(schoolType) !== -1
}

export function isValidSchoolName (schoolName) {
  return schoolNames.indexOf(schoolName) !== -1
}

export const defaultLanguage = languages[0]

export function getLanguageCode (language) {
  let code = languageCodes[language]
  if (code) return code
  else return languageCodes[defaultLanguage]
}



// WEBPACK FOOTER //
// ./src/models/index.js