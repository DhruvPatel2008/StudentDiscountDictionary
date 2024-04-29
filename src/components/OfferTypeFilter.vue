<template>
    <div class="spc-dropdown">
       <div class="wrap-all">
           <div id="heading-wrap" :class="filterDynamicClass">
               <div id="image1">
                 <img v-if="!this.isDropdownOpen && !selectedFilter.length && !locationFilter" src="@/assets/images/icons/general/img/1.png" alt="image1" />
                 <img v-if="this.isDropdownOpen && !selectedFilter.length && !locationFilter" src="@/assets/images/icons/general/img/2.png"  alt="image2" />
                 <img v-if="selectedFilter.length || locationFilter" src="@/assets/images/icons/general/img/3.png"  alt="image3" />
               </div>
               <div id="dropdown-heading">{{ $t('offer.filter.title') }}</div>
               <div id="image2"><img src="@/assets/images/icons/general/img/4.png" alt="image4" /></div>
           </div>
           <div id="dropdown-wrap">
             <div id="dropdown-content">
               <div class="header-container">
                <div class="title">{{ $t('offer.sort_filter.filter_heading') }}</div>
                <div class="clear"  @click="clear()">{{ $t('offer.sort_filter.clear') }}</div>
               </div>
               <div class="filter-button-wrap">
               <div class="row1">
                  <div v-for="option in filterOptions.slice(0,3)" :key="option"
                    class = "col "
                   :class="{ active: ((!option && !selectedFilter.length) || (option && selectedFilter.indexOf(option) >= 0)) }"
                    @click="updateOfferFilter(option)"
                  >
                    {{ $t(option == null ? 'offer.filter.all' : `offer.types.${option}`) }}
                  </div>
              </div>
              <div class="row2">
                  <div v-for="option in filterOptions.slice(3,6)" :key="option"
                    class = "col"
                   :class="{ active: selectedFilter.indexOf(option) >= 0 }"
                    @click="updateOfferFilter(option)"
                  >
                    {{ $t(option == null ? 'offer.filter.all' : `offer.types.${option}`) }}
                  </div>
              </div>
             </div>
             </div>
            <div id="dropdown-content">
               <div class="title">{{ $t('offer.types.location') }}</div>
               <div class="filter-button-wrap">
               <div class="location-row1">
                 <label class="postal-code-label">{{ $t('offer.types.postal_code') }}</label>
                 <div class="postal-div">
                  <input
                    v-model="postal_code_entered"
                    id="postal-code"
                    type="input"
                    class="postal-code-input"
                    v-bind:class="postalFail ? 'error-border' : ''"
                    autocomplete="off"
                    placeholder="Any"
                  />
                  <div v-if="postalFail" class="invalid-code">{{ $t('invalid_postal_code') }}</div>
                 </div>
              </div>
              <div class="location-row2">
                 <label class="distance-label">{{ $t('offer.types.distance') }}</label>
                 <select name="distance" class="distance-dropdown" id="offer-distance">
                  <option
                    v-for="(option, index) in offerOptions.distances"
                    :key="index"
                    :value="option"
                    >{{ option }} Km</option>
                </select>
              </div>
             </div>
             </div>
             <button class="spc-button-v2 purple apply-button" @click="applyLocationFilter()"> {{ $t('offer.sort_filter.apply') }} </button>
           </div>
       </div>
    </div>
</template>
<script>
import { ACTIONS } from '@/service/analytics-service'
import offerOptions from 'LocalizedAssets/data/offer'
import { checkPostalValid } from '@/service/register-service'

export default {
  data () {
    return {
      selectedFilter: [],
      appliedFilter: [],
      filterOptions: [
        null,
        'online',
        'instore',
        'spc_plus',
        'new',
        'lto'
      ],
      offerOptions,
      isDropdownOpen: false,
      postalFail: false,
      postal_code_entered: null,
      locationFilter: false
    }
  },
  props: {
    applyFilter: {
      type: Array,
      required: false,
      default: null
    }
  },
  computed: {
    filterLabel () {
      if (!this.selectedFilter.length) return null
      let filterLabel = []
      this.selectedFilter.forEach(function (filter) {
        if (filter === 'online') filterLabel.push('Online')
        if (filter === 'instore') filterLabel.push('In Store')
        if (filter === 'spc_plus') filterLabel.push('SPC+')
        if (filter === 'new') filterLabel.push('New')
        if (filter === 'lto') filterLabel.push('Limited Time')
      })
      return filterLabel.join(', ')
    },
    filterDynamicClass () {
      let className = 'heading-wrap'
      if (this.selectedFilter.length || this.locationFilter) {
        className += ' hasFilter'
      }
      if (this.isDropdownOpen) {
        className += ' open'
      }
      return className
    }
  },
  methods: {
    updateOfferFilter (filter) {
      if (!filter) {
        this.selectedFilter = []
      } else {
        let filterPosition = this.selectedFilter.indexOf(filter)
        if (filterPosition < 0) {
          this.selectedFilter.push(filter)
        } else {
          this.selectedFilter.splice(filterPosition, 1)
        }
      }
    },
    filterCategory (event) {
      let filterDropDown = document.getElementById('dropdown-wrap')
      if (((document.getElementById('dropdown-heading').contains(event.target) && !filterDropDown.classList.contains('block')) ||
      filterDropDown.contains(event.target)) && !event.target.classList.contains('apply-button')) {
        filterDropDown.style.display = 'block'
        filterDropDown.classList.add('block')
        this.isDropdownOpen = true
      } else {
        if (!event.target.classList.contains('apply-button')) {
          this.closePopup()
        }
      }
    },
    async applyLocationFilter () {
      this.postalFail = false
      this.appliedFilter = this.selectedFilter.slice(0)
      if (this.selectedFilter) {
        this.$emit('select', this.appliedFilter, this.postal_code_entered !== null)
        ACTIONS.FILTER_SELECTED(this.filterLabel)
      }
      if (this.postal_code_entered && this.postal_code_entered !== '') {
        try {
          const response = await checkPostalValid(this.postal_code_entered)
          const isValid = response.data.is_valid
          var distance = document.getElementById('offer-distance').value
          if (!isValid) {
            this.postalFail = true
            return false
          } else {
            this.locationFilter = true
            this.$emit('updateLocationFilter', true, this.postal_code_entered, distance)
            ACTIONS.LOCATION_FILTER_SELECTED(this.postal_code_entered, distance)
          }
        } catch (error) {
          console.log(error)
          return false
        }
      }

      if (this.postal_code_entered == null || !this.postalFail) {
        this.closePopup()
      }
    },
    closePopup () {
      let filterDropDown = document.getElementById('dropdown-wrap')
      document.getElementById('dropdown-wrap').style.display = 'none'
      filterDropDown.classList.remove('block')
      this.isDropdownOpen = false
    },
    clear () {
      this.selectedFilter = []
      this.postal_code_entered = null
      this.postalFail = false
      this.locationFilter = false
      document.getElementById('offer-distance').value = '10'
      this.$emit('updateLocationFilter', false)
      this.$emit('select', [])
    }
  },
  mounted () {
    try {
      document.addEventListener('click', this.filterCategory)
      if (this.applyFilter) {
        this.selectedFilter.push(this.applyFilter)
      }
    } catch (error) {
      console.log(error)
    }
  },
  destroyed () {
    document.removeEventListener('click', this.filterCategory)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/OfferTypeFilter'
</style>

<i18n src='Assets/i18n/offer'></i18n>



// WEBPACK FOOTER //
// src/components/OfferTypeFilter.vue