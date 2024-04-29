/* eslint-disable camelcase */

/**
 * order_items [
 *  {
 *    id: String,
 *    price: String,
 *    quantity: Number
 *  }
 * ]
 */

import { getPepperjamClickIds, setPepperjamClickID } from '@/service/storage'
import uniqBy from 'lodash/uniqBy'
import moment from 'moment'

const PEPPERJAM_PROGRAM_ID = 8854

export function generatePepperjamPixel (
  order_id,
  order_items,
  new_to_file = 0,
  coupons = ''
) {
  const ids = getPepperjamClickIds()
  const clickIds = ids != null ? ids : []

  const limitTimestamp = moment().subtract(30, 'd').toDate().getTime()

  const clickIdsCurrent = uniqBy(
    clickIds
      .filter(e => typeof e === 'object' && typeof e.timestamp !== 'undefined')
      .filter(e => e.timestamp > limitTimestamp)
  , 'id')
  setPepperjamClickID(clickIdsCurrent)

  const cids = clickIdsCurrent.map(e => e.id)

  const integration = 'DYNAMIC'
  const program_id = PEPPERJAM_PROGRAM_ID

  const items_string = order_items.map((item, index) => {
    const i = index + 1
    return '&' + 'ITEM_ID' + i + '=' + item.id +
           '&' + 'ITEM_PRICE' + i + '=' + item.price +
           '&' + 'QUANTITY' + i + '=' + item.quantity
  }).join()

  const pixel_string = '<iframe src="https://t.pepperjamnetwork.com/track?' +
    'INT=' + integration +
    '&' + 'PROGRAM_ID' + '=' + program_id +
    '&' + 'ORDER_ID' + '=' + order_id +
    '&' + 'COUPON' + '=' + coupons +
    '&' + 'NEW_TO_FILE' + '=' + new_to_file +
    '&' + 'CLICK_ID' + '=' + (cids.join(',')) +
    items_string +
    '" width="1" height="1" frameborder="0"></iframe>'

  return pixel_string
}



// WEBPACK FOOTER //
// ./src/service/pepperjam.js