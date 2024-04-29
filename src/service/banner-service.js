import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'

function getBannersFunc (name) {
  let options = {
    url: `${baseURLs.partners}/banners/${name}/active`,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}

export const getBanners = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getBannersFunc)

/**
 * getBannerByUrlFunc is to get banner based on URL-Field from backend
 * @param {String} url URL which needs to be the banner url
 * @param {String} type Banner type to fetch
 * @return {Object} Returns the data of banner
 */
function getBannerByUrlFunc (type, url) {
  let options = {
    url: `${baseURLs.partners}/banner/${type}/${url}`,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}

export const getBannerByUrl = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getBannerByUrlFunc)



// WEBPACK FOOTER //
// ./src/service/banner-service.js