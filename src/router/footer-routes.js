import Careers from '@/components/Links/Careers'
import { baseURLs } from '@/service/api-config'

export default [
  {
    path: '/about',
    alias: [
      '/about-spc',
      '/%C3%A0-propos-de-spc'
    ],
    name: 'About',
    redirect: {
      name: 'Careers',
      query: {
        section: 'about'
      }
    }
  },
  {
    path: '/faq',
    name: 'FAQ',
    redirect: {
      name: 'FAQ-Help'
    }
  },
  {
    path: '/faq-help',
    name: 'FAQ-Help',
    component: () => import(/* webpackChunkName: "FAQ" */ '@/components/Links/FAQ')
  },
  {
    path: '/fundraising',
    name: 'fundraising',
    // redirecting users to School WordPress Instance
    // component: () => import(/* webpackChunkName: "Fundraising" */ '@/components/Links/Fundraising')
    beforeEnter (to, from, next) {
      window.location = baseURLs.school
    }
  },
  {
    path: '/contact',
    alias: [
      '/contact-us',
      '/contactez-nous'
    ],
    name: 'Contact',
    component: () => import(/* webpackChunkName: "Contact" */ '@/components/Links/Contact')
  },
  {
    path: '/terms',
    alias: [
      '/terms-of-use',
      '/terms-of-service',
      '/conditions-dutilisation'
    ],
    name: 'Terms',
    component: () => import(/* webpackChunkName: "Terms" */ '@/components/Links/Terms')
  },
  {
    path: '/privacy',
    alias: [
      '/privacy-policy',
      '/confidentialite'
    ],
    name: 'Privacy',
    component: () => import(/* webpackChunkName: "Privacy" */ '@/components/Links/Privacy')
  },
  {
    path: '/careers',
    alias: [
      '/jobs'
    ],
    name: 'Careers',
    component: Careers
  },
  {
    path: '/brands',
    name: 'Brands',
    component: () => import(/* webpackChunkName: "AllBrands" */ '@/components/Pages/AllBrands')
  },
  {
    path: '/blog',
    name: 'Blog',
    beforeEnter (to, from, next) {
      window.location = baseURLs.blog
    }
  }
]



// WEBPACK FOOTER //
// ./src/router/footer-routes.js