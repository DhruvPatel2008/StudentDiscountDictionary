import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'
import { getCurrentID } from '@/service/user-service'

function getReferralsFunc () {
  let options = {
    url: baseURLs.users + '/register',
    method: 'get',
    headers: {
      ...getHeaders(true),
      firebase_uid: getCurrentID()
    }
  }
  return axios(options)
}
export const getReferrals = compose(
  promiseInterceptor(r => {
    const data = r.data
    return {
      code: data.referral_code,
      count: data.referral_count,
      redemptionCount: data.referral_redemption_count
    }
  }),
  createRefreshed
)(getReferralsFunc)

function redeemReferralsFunc () {
  let options = {
    url: baseURLs.users + '/redeemReferral',
    method: 'get',
    headers: getHeaders(false)
  }
  return axios(options)
}
export const redeemReferrals = compose(
  promiseInterceptor(r => r.data.success),
  createRefreshed
)(redeemReferralsFunc)

function getReferralCodeMappingFunc () {
  let options = {
    url: baseURLs.store + '/v2/referrals_codes',
    method: 'get',
    headers: getHeaders(false)
  }
  return axios(options)
}
export const getReferralCodeMapping = compose(
  promiseInterceptor(r => r.data)
)(getReferralCodeMappingFunc)



// WEBPACK FOOTER //
// ./src/service/referral-service.js