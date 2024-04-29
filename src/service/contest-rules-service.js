import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'

export function getContestRulesFunc (contestName) {
  return axios({
    url: baseURLs.partners + '/contestrules/' + contestName,
    method: 'get',
    headers: getHeaders()
  })
}
export const getContestRules = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getContestRulesFunc)



// WEBPACK FOOTER //
// ./src/service/contest-rules-service.js