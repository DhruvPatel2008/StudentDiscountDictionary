import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'

export const SEABISCUIT_CAROUSEL_TYPE_KEY = 'SEABISCUIT_CAROUSEL'
export const SPC_PLUS_CAROUSEL_TYPE_KEY = 'spc_plus'
export const FEATURED_AD_TYPE_KEY = 'FEATURED_AD'
export const HOME_PAGE_VALUE_PROP = 'HOME_PAGE_VALUE_PROP'
export const HOME_PAGE_PARTNER_PRODUCT = 'HOME_PAGE_PARTNER_PRODUCT'
export const TOP_CAROUSEL_BANNER_TYPE_KEY = 'TOP_CAROUSEL_BANNER'
export const CIBC_OFFERS_TYPE_KEY = 'CIBC_OFFER'
export const TESTIMONIAL_TYPE_KEY = 'TESTIMONIAL'
export const CIBC_OFFER_CARDS_TYPE_KEY = 'CIBC_OFFER_CARDS'
export const CIBC_BANNERS_TYPE_KEY = 'CIBC_BANNER'
export const WHY_SPC_PRODUCTS_TYPE_KEY = 'WHY_SPC_PRODUCTS'
export const SPC_PLUS_OFFER_CARDS_TYPE_KEY = 'SPC_PLUS_OFFER_CARDS'

function getCategoryCarouselFunc (categoryName) {
  let options = {
    url: baseURLs.partners + '/category-carousel',
    method: 'get',
    headers: getHeaders(),
    params: { 'category_name': categoryName }
  }
  return axios(options)
}
export const getCategoryCarousel = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCategoryCarouselFunc)

function getCarouselItemsFunc (typeKey) {
  let options = {
    url: baseURLs.partners + '/getCarousel/' + typeKey,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getCarouselItemsFunc)

function getValuePropsFunc () {
  let options = {
    url: baseURLs.partners + '/getCarousel/' + HOME_PAGE_VALUE_PROP,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getValueProps = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getValuePropsFunc)

function getPartnerProductFunc () {
  let options = {
    url: baseURLs.partners + '/getCarousel/' + HOME_PAGE_PARTNER_PRODUCT,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getPartnerProduct = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getPartnerProductFunc)

function getWhySPCProductsFunc () {
  let options = {
    url: baseURLs.partners + '/getCarousel/' + WHY_SPC_PRODUCTS_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getWhySPCProducts = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getWhySPCProductsFunc)



// WEBPACK FOOTER //
// ./src/service/carousel-service.js