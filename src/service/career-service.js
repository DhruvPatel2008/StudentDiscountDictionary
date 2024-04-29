import axios from 'axios'
import { getHeaders, createRefreshed } from '@/service/auth-service'
import { baseURLs } from '@/service/api-config'
import { compose, promiseInterceptor } from '@/utils'

const HERO_CAROUSEL_TYPE_KEY = 'HERO_CAROUSEL'
const TIMELINE_CAROUSEL_TYPE_KEY = 'TIMELINE_CAROUSEL'
const TEAM_CAROUSEL_TYPE_KEY = 'TEAM_CAROUSEL'
const PERK_CAROUSEL_TYPE_KEY = 'PERK_CAROUSEL'
const VALUE_CAROUSEL_TYPE_KEY = 'VALUE_CAROUSEL'
const PRINCIPLE_CAROUSEL_TYPE_KEY = 'PRINCIPLE_CAROUSEL'
const PARTNER_CAROUSEL_TYPE_KEY = 'PARTNER_CAROUSEL'

function getHeroCarouselItemsFunc () {
  let options = {
    url: baseURLs.careers + '/getCarousel/' + HERO_CAROUSEL_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getHeroCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getHeroCarouselItemsFunc)

function getTimelineCarouselItemsFunc () {
  let options = {
    url: baseURLs.careers + '/getCarousel/' + TIMELINE_CAROUSEL_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getTimelineCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getTimelineCarouselItemsFunc)

function getTeamCarouselItemsFunc () {
  let options = {
    url: baseURLs.careers + '/getCarousel/' + TEAM_CAROUSEL_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getTeamCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getTeamCarouselItemsFunc)

function getPerkCarouselItemsFunc () {
  let options = {
    url: baseURLs.careers + '/getCarousel/' + PERK_CAROUSEL_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getPerkCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getPerkCarouselItemsFunc)

function getValueCarouselItemsFunc () {
  let options = {
    url: baseURLs.careers + '/getCarousel/' + VALUE_CAROUSEL_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getValueCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getValueCarouselItemsFunc)

function getPrincipleCarouselItemsFunc () {
  let options = {
    url: baseURLs.careers + '/getCarousel/' + PRINCIPLE_CAROUSEL_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getPrincipleCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getPrincipleCarouselItemsFunc)

function getPartnerCarouselItemsFunc () {
  let options = {
    url: baseURLs.careers + '/getCarousel/' + PARTNER_CAROUSEL_TYPE_KEY,
    method: 'get',
    headers: getHeaders()
  }
  return axios(options)
}
export const getPartnerCarouselItems = compose(
  promiseInterceptor(r => r.data),
  createRefreshed
)(getPartnerCarouselItemsFunc)



// WEBPACK FOOTER //
// ./src/service/career-service.js