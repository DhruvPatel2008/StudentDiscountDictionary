<template>
  <div>
    <div ref="dropin"></div>
    <slot :submit="submit" v-if="instance && showAddPaymentButton"/>
  </div>
</template>

<script>
import dropIn from 'braintree-web-drop-in'
import { getLanguage } from '@/service/user-service'
import { ACTIONS } from '@/service/analytics-service'
import { mapActions, mapGetters } from 'vuex'
import { verifyAttempt } from '@/service/profile-service'

const CURRENCY_CODE = 'CAD'
const STORE_NAME = 'SPC'

export default {
  props: {
    price: {
      required: true,
      type: Number
    },
    onPaymentResponse: {
      required: true,
      type: Function
    },
    onPaymentError: {
      required: true,
      type: Function
    },
    onPaymentUpdate: {
      required: true,
      type: Function
    },
    onPaymentCheckout: {
      type: Function
    },
    token: {
      required: true,
      type: String
    },
    nextPage: {
      type: Boolean,
      default: false
    },
    incentivePopUp: {
      type: Boolean,
      default: false
    }
  },

  data: () => ({
    instance: null,
    locale: 'en',
    currentRoute: '',
    showAddPaymentButton: true
  }),
  computed: {
    ...mapGetters([
      'email',
      'postal'
    ])
  },
  watch: {
    token: {
      handler (value) {
        this.instance.teardown()
        this.dropinRequestPaymentMethod()
      }
    }
  },
  mounted () {
    this.currentRoute = this.$route.path
    if (this.currentRoute === '/signup/purchase' || this.currentRoute === '/giftspc' || this.incentivePopUp) {
      this.showAddPaymentButton = false
    }
    this.init()
  },
  methods: {
    ...mapActions([
      'updateIsAutoRenew',
      'updateIsAutoRenewBraintreeBased'
    ]),
    ...mapActions('payment', [
      'updatePaymentLoading'
    ]),
    async handleCancelAutoRenew () {
      await this.updateIsAutoRenewBraintreeBased()
      .catch(err => console.error(err))
    },
    init () {
      this.locale = getLanguage()
      const config = {
        locale: this.locale,
        vaultManager: true,
        authorization: this.token,
        container: this.$refs.dropin,
        card: {
          cardholderName: {
            required: true
          },
          overrides: {
            fields: {
              number: {
                maskInput: {
                  showLastFour: true
                }
              },
              postalCode: {
                prefill: this.postal
              }
            }
          }
        },
        paypal: {
          flow: 'vault',
          currency: CURRENCY_CODE
        },
        applePay: {
          displayName: STORE_NAME,
          paymentRequest: {
            total: {
              label: STORE_NAME,
              amount: String(this.price),
              type: 'final'
            }
          }
        },
        googlePay: {
          googlePayVersion: 2,
          merchantId: process.env.GOOGLE_MERCHANT_ID,
          transactionInfo: {
            totalPriceStatus: 'FINAL',
            totalPrice: String(this.price),
            currencyCode: CURRENCY_CODE
          }
        }
      }

      dropIn.create(config, (createErr, instance) => {
        if (createErr) {
          this.onPaymentError(createErr.message)
          console.error(createErr)
          return
        }
        this.instance = instance
        this.dropinRequestPaymentMethod()
        this.instance.on('changeActiveView', event => {
          if (event.previousViewId === 'delete-confirmation') {
            this.handleCancelAutoRenew()
          }
        })
        this.instance.on('paymentOptionSelected', (err, res) => {
          if (err) {
            this.onPaymentError(err)
          }
          ACTIONS.PAYMENT_METHOD_CLICKED()
        })
      })
    },
    dropinRequestPaymentMethod (checkout = false) {
      this.instance.on('noPaymentMethodRequestable', this.onPaymentUpdate)
      this.instance.requestPaymentMethod((requestPaymentMethodErr, payload) => {
        if (requestPaymentMethodErr) {
          this.onPaymentError(requestPaymentMethodErr.message)
          console.error(requestPaymentMethodErr)
          if (requestPaymentMethodErr._braintreeWebError) {
            ACTIONS.ADD_PAYMENT_METHOD(false)
            verifyAttempt({'email': this.email})
          }
          this.updatePaymentLoading(false)
          return
        }
        this.onPaymentResponse(payload)
        if (this.nextPage && checkout) {
          this.onPaymentCheckout()
        }
      })
    },
    submit (event) {
      if (event) {
        event.preventDefault()
      }
      this.dropinRequestPaymentMethod()
    },
    // Method to validate card when user click the Complete Purchase
    paymentVerification () {
      if (!this.showAddPaymentButton) {
        this.dropinRequestPaymentMethod(true)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Payment'
</style>



// WEBPACK FOOTER //
// src/components/Payment.vue