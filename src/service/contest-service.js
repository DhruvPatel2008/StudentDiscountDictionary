import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { getCurrentID } from '@/service/user-service'
import { createServiceAnalyzed } from '@/service/analytics-service'
import partial from 'lodash/partial'
import { compose } from '@/utils'

function getContestsFunc () {
  let options = {
    url: baseURLs.partners + '/contest',
    method: 'get',
    headers: getHeaders(false)
  }
  return axios(options)
}
export const getContests = createRefreshed(getContestsFunc)

function enterContestFunc (contestID) {
  let options = {
    url: baseURLs.partners + '/contestRegister',
    method: 'post',
    headers: getHeaders(true),
    data: {
      contest_id: contestID
    }
  }
  return axios(options)
}
export const enterContest = compose(partial(createServiceAnalyzed, 'contest_register'), createRefreshed)(enterContestFunc)

export function getContestPage (contestID) {
  let options = {
    url: baseURLs.partners + '/contestPage',
    method: 'get',
    headers: {
      ...getHeaders(false),
      id: getCurrentID(),
      contest_id: contestID
    }
  }
  return axios(options)
}

function getBtsContestsFunc () {
  let options = {
    url: `${baseURLs.partners}/contest/bts/order`,
    method: 'get',
    headers: getHeaders(false),
    params: {
      firebase_uid: getCurrentID()
    }
  }
  return axios(options)
}
export const getBtsContests = createRefreshed(getBtsContestsFunc)



// WEBPACK FOOTER //
// ./src/service/contest-service.js