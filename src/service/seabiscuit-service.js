import { associateCard } from '@/service/register-service'

const AFFILIATE_KEY = 'affiliate_registration'
export const AFFILIATE_VALUE_CIBC = 'cibc'

const TOKEN_KEY = 'cibc_token'

export function isCIBCRegistration () {
  if (!window.localStorage) return false
  const value = window.localStorage.getItem(AFFILIATE_KEY)
  return value === AFFILIATE_VALUE_CIBC
}

export function setCIBCValidation (affiliateToken) {
  if (!window.localStorage) throw new Error('Local storage unavailable')
  window.localStorage.setItem(AFFILIATE_KEY, AFFILIATE_VALUE_CIBC)
  window.localStorage.setItem(TOKEN_KEY, affiliateToken)
}

export function getCIBCValidation () {
  if (!window.localStorage) throw new Error('Local storage unavailable')
  const affiliate = window.localStorage.getItem(AFFILIATE_KEY)
  const token = window.localStorage.getItem(TOKEN_KEY)
  return {
    [AFFILIATE_KEY]: affiliate,
    [TOKEN_KEY]: token
  }
}

export function clearCIBCValidation () {
  if (!window.localStorage) throw new Error('Local storage unavailable')
  window.localStorage.removeItem(AFFILIATE_KEY)
  window.localStorage.removeItem(TOKEN_KEY)
}

export async function associateCIBC () {
  try {
    const response = await associateCard()
    clearCIBCValidation()
    console.log('CIBC Registration successful')
    return {
      AlreadyRegister: false,
      upgradeType: response && response.data ? response.data.upgradeType : null
    }
  } catch (error) {
    console.error(error)
    if (error.response && error.response.data.error && error.response.status === 400) {
      // Already registered
      console.log('CIBC Registration already associated')
      return {AlreadyRegister: true}
    } else {
      console.log('CIBC Registration failed')
      window.alert('CIBC Registration failed')
    }
  }
}

const offerings = [
  {
    id: 'bank_with_cibc',
    en: {
      title: 'Bank with CIBC?',
      description: 'Find out if you qualify for a free SPC membership.†',
      link: 'https://www.cibc.com/SPC',
      image: 'CIBCxSPC_BoxImage1.png'
    },
    fr: {
      title: 'Vous êtes client CIBC?',
      description: 'Découvrez si vous êtes éligible de recevoir une adhésion SPC gratuite. *',
      link: 'https://www.cibc.com/SPC-fr',
      image: 'CIBCxSPC_BoxImage1.png'
    }
  },
  {
    id: 'new_to_cibc',
    en: {
      title: 'Don’t bank with CIBC?',
      description: 'They have all your banking needs covered PLUS a free SPC.',
      link: 'https://www.cibc.com/en/student.html',
      image: 'CIBCxSPC_BoxImage3.jpg'
    },
    fr: {
      title: 'Vous n’êtes pas clients CIBC?',
      description: 'Ils couvrent tous vos besoins bancaires ET une SPC gratuite.',
      link: 'https://www.cibc.com/fr/student.html',
      image: 'CIBCxSPC_BoxImage3.jpg'
    },
    start_date: 1569902400000
  }
]

export const getOfferings = () => {
  return Promise.resolve(offerings)
}



// WEBPACK FOOTER //
// ./src/service/seabiscuit-service.js