<template>
    <div class="sort-filter-dropdown">
      <div id="mobile-overlay"></div>
       <div class="wrap-all">
          <div id="mobile-filter-heading-wrap" :class="filterDynamicClass">
              <div id="image1">
                <img v-if="!this.isDropdownOpen" src="@/assets/images/icons/general/img/1.png" alt="image1" style="width: 11px;height: 11px"/>
              </div>
              <div v-if="!this.isDropdownOpen"  id="sort-filter-dropdown-heading">
                {{ $t('offer.sort_filter.title') }}
              </div>
              <div v-if="!this.isDropdownOpen" id="image2"><img src="@/assets/images/icons/general/img/4.png" alt="image4" style="width: 10px;height: 6px"/></div>
           </div>
           <div id="mobile-sort-filter-dropdown-wrap">
             <div id="sort-dropdown-content">
               <div class="title">
                <div id="image3"><img src="@/assets/images/icons/sorting/sort.png" alt="image1" style="width: 11px;height: 11px"/></div>
                {{ $t('offer.sort.title') }}
                <div class="clear"  @click="clear()">{{ $t('offer.sort_filter.clear') }}</div>
               </div>
              <label v-for="option in sortOptions" :key="option"
                class="container"
                :class="{ 'sort-active': selectedSort }"
                >{{ $t(`offer.sort.${option}`) }}
                <input
                  type="radio"
                  @click="updateOfferSorting(option)"
                  name="sortby-mobile"
                  :value="option"
                  v-model="selectedSort"
                  :class="`${option}-mobile`"
                />
                <span class="checkmark"></span>
              </label>
             </div>
             <div id="filter-dropdown-content">
               <div class="title">
                <div id="image3"><img src="@/assets/images/icons/general/img/1.png" alt="image1" /></div>
                {{ $t('offer.sort_filter.filter_heading') }}
               </div>
               <div class="filter-button-wrap">
               <div class="row1">
                  <div v-for="option in filterOptions.slice(0,3)" :key="option"
                    class = "col "
                   :class="{ active: ((!option && !selectedFilter.length) || (option && selectedFilter.indexOf(option) >= 0)) }"
                    @click="updateOfferFilter(option)"
                  >
                  {{ $t(option == null ? 'offer.filter.all' : `offer.types.${option}`) }}</div>
              </div>
              <div class="row2">
                  <div v-for="option in filterOptions.slice(3,6)" :key="option"
                    class = "col"
                   :class="{ active: selectedFilter.indexOf(option) >= 0 }"
                    @click="updateOfferFilter(option)"
                  >{{ $t(option == null ? 'offer.filter.all' : `offer.types.${option}`) }}</div>
              </div>
             </div>
             </div>
             <div id="location-dropdown-content">
               <div class="title">
                <div id="image3"><img class="location-img" src="@/assets/images/icons/general/img/location.png" alt="image1" /></div>
                {{ $t('offer.types.location') }}
               </div>
               <div class="filter-button-wrap">
               <div class="location-row1">
                <label class="postal-code-label">{{ $t('offer.types.postal_code') }}</label>
                <input
                  v-model="postal_code_entered"
                  v-bind:class="postalFail ? 'error-border' : ''"
                  type="input"
                  class="postal-code-input"
                  autocomplete="off"
                  placeholder="Any"
                />
                <div v-if="postalFail" class="invalid-code">{{ $t('invalid_postal_code') }}</div>
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
             <button class="spc-button-v2 purple apply-button" @click="applySortFilter()"> {{ $t('offer.sort_filter.apply') }} </button>
             </div>
             </div>
           </div>
       </div>
       </div>
</template>
<script>
import { ACTIONS } from '@/service/analytics-service'
import offerOptions from 'LocalizedAssets/data/offer'
import { mapGetters } from 'vuex'
import { checkPostalValid } from '@/service/register-service'

export default {
  data () {
    return {
      selectedFilter: [],
      appliedFilter: [],
      selectedSort: 'most_redeemed',
      filterOptions: [
        null,
        'online',
        'instore',
        'spc_plus',
        'new',
        'lto'
      ],
      sortOptions: [
        'most_redeemed',
        'highest_discount',
        'alphabetical',
        'new'
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
    ...mapGetters([
      'language'
    ]),
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
      let className = 'mobile-filter-heading-wrap'
      if (this.selectedFilter.length || this.locationFilter) {
        className += ' hasFilter'
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
    updateOfferSorting (sort) {
      if (!sort) {
        this.selectedSort = ''
      } else {
        this.selectedSort = sort
      }
    },
    async filterCategory (event) {
      let filterDropDown = document.getElementById('mobile-sort-filter-dropdown-wrap')
      let overlay = document.getElementById('mobile-overlay')
      let heading = document.getElementById('mobile-filter-heading-wrap')
      if (event.target.classList.contains('apply-button') && this.postal_code_entered) {
        try {
          let isValid = false
          const response = await checkPostalValid(this.postal_code_entered)
          isValid = response.data.is_valid
          var distance = document.getElementById('offer-distance').value
          if (!isValid) {
            this.postalFail = true
            filterDropDown.style.display = 'block'
            filterDropDown.classList.add('block')
            overlay.style.display = 'block'
          } else {
            this.postalFail = false
            this.locationFilter = true
            this.$emit('updateLocationFilter', true, this.postal_code_entered, distance)
            ACTIONS.LOCATION_FILTER_SELECTED(this.postal_code_entered, distance)
            this.closeDropDown()
          }
        } catch (error) {
          console.log(error)
        }
      } else if ((heading.contains(event.target) || (filterDropDown.contains(event.target) &&
      (!event.target.classList.contains('apply-button') && !event.target.classList.contains('clear'))))) {
        filterDropDown.style.display = 'block'
        filterDropDown.classList.add('block')
        overlay.style.display = 'block'
        this.isDropdownOpen = true
      } else {
        document.getElementById('mobile-sort-filter-dropdown-wrap').style.display = 'none'
        filterDropDown.classList.remove('block')
        overlay.style.display = 'none'
        this.isDropdownOpen = false
      }
    },
    applySortFilter () {
      this.appliedFilter = this.selectedFilter.slice(0)
      if (this.selectedFilter) {
        this.$emit('mobilefilter', this.appliedFilter)
        ACTIONS.FILTER_SELECTED(this.filterLabel)
      }
      if (this.selectedSort) {
        this.$emit('mobilesort', this.selectedSort, this.postal_code_entered)
        ACTIONS.FILTER_SELECTED(this.selectedSort)
      }
    },
    clear () {
      this.selectedSort = 'most_redeemed'
      this.selectedFilter = []
      this.postal_code_entered = null
      this.postalFail = false
      this.locationFilter = false
      document.getElementById('offer-distance').value = '10'
      this.$emit('updateLocationFilter', false)
      this.applySortFilter()
    },
    closeDropDown () {
      let filterDropDown = document.getElementById('mobile-sort-filter-dropdown-wrap')
      let overlay = document.getElementById('mobile-overlay')
      document.getElementById('mobile-sort-filter-dropdown-wrap').style.display = 'none'
      filterDropDown.classList.remove('block')
      overlay.style.display = 'none'
      this.isDropdownOpen = false
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

    // Check radio button of selected sort
    document.querySelector(`input.${this.selectedSort}-mobile`).checked = true
  },
  destroyed () {
    document.removeEventListener('click', this.filterCategory)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/MobileSortFilter'
</style>

<i18n src='Assets/i18n/offer'></i18n>



// WEBPACK FOOTER //
// src/components/MobileSortFilter.vue