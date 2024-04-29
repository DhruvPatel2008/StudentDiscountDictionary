<template>
    <div class="sort-filter-dropdown">
      <div id="mobile-subcategory-filter-overlay"></div>
       <div class="wrap-all">
           <div id="mobile-subcategory-filter-heading-wrap" :class="filterDynamicClass">
               <div v-if="!this.isDropdownOpen"  id="sort-filter-dropdown-heading">
                 {{ $t('offer.subcategory_filter.subcategories') }} {{this.selectedFilter.length ? `(${this.selectedFilter.length})` : ''}}
               </div>
               <div v-if="!this.isDropdownOpen" id="image2"><img src="@/assets/images/icons/general/img/4.png" alt="image4" style="width: 10px;height: 6px"/></div>
           </div>
           <div id="mobile-subcategory-filter-dropdown-wrap">
             <div id="filter-dropdown-content">
               <div class="title">
                <div id="image3"><img src="@/assets/images/icons/general/img/1.png" alt="image1" /></div>
                {{ $t('offer.subcategory_filter.subcategories') }}
                <div class="clear"  @click="clear()">{{ $t('offer.sort_filter.clear') }}</div>
               </div>
               <div class="filter-button-wrap">
                 <div class="subcategory-container">
                   <div
                   class="subcategory-button"
                   :class="{ active: ((!selectedFilter.length)) }"
                    @click="updateOfferSubcategoryFilter(null)"
                  >
                  {{ $t('offer.filter.all') }}</div>
                  <div v-for="option in subcategories" :key="option.name_en"
                   class="subcategory-button"
                   :class="{ active: (option && selectedFilter.indexOf(option.id) >= 0) }"
                    @click="updateOfferSubcategoryFilter(option.id)"
                  >
                  {{ option[`name_${language}`] }}</div>
                 </div>
             </div>
             <button class="spc-button-v2 purple apply-button" @click="applySubcategoryFilter()"> {{ $t('offer.sort_filter.apply') }} </button>
             </div>
             </div>
           </div>
       </div>
</template>
<script>
import { ACTIONS } from '@/service/analytics-service'
import { mapGetters } from 'vuex'

export default {
  props: {
    subcategories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      selectedFilter: [],
      appliedFilter: [],
      isDropdownOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    filterDynamicClass () {
      let className = 'mobile-subcategory-filter-heading-wrap'
      if (this.selectedFilter.length) {
        className += ' hasFilter'
      }
      return className
    }
  },
  methods: {
    updateOfferSubcategoryFilter (filter) {
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
    filterCategory (event) {
      let filterDropDown = document.getElementById('mobile-subcategory-filter-dropdown-wrap')
      let overlay = document.getElementById('mobile-subcategory-filter-overlay')
      let heading = document.getElementById('mobile-subcategory-filter-heading-wrap')
      if (heading.contains(event.target) || (filterDropDown.contains(event.target) &&
      (!event.target.classList.contains('apply-button') && !event.target.classList.contains('clear')))) {
        filterDropDown.style.display = 'block'
        filterDropDown.classList.add('block')
        overlay.style.display = 'block'
        this.isDropdownOpen = true
      } else {
        document.getElementById('mobile-subcategory-filter-dropdown-wrap').style.display = 'none'
        filterDropDown.classList.remove('block')
        overlay.style.display = 'none'
        this.isDropdownOpen = false
      }
    },
    applySubcategoryFilter () {
      this.appliedFilter = this.selectedFilter.slice(0)
      if (this.selectedFilter) {
        this.$emit('mobilesubcategoryfilter', this.appliedFilter)
        ACTIONS.FILTER_SELECTED(this.selectedFilter)
      }
      this.closeDropDown()
    },
    clear () {
      this.selectedSort = 'most_redeemed'
      this.selectedFilter = []
      this.applySubcategoryFilter()
    },
    closeDropDown () {
      let filterDropDown = document.getElementById('mobile-subcategory-filter-dropdown-wrap')
      filterDropDown.style.display = 'none'
      filterDropDown.classList.remove('block')
      this.isDropdownOpen = false
    }
  },
  mounted () {
    try {
      document.addEventListener('click', this.filterCategory)
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
@import '~@/assets/components/MobileSubcategoryFilter'
</style>

<i18n src='Assets/i18n/offer'></i18n>



// WEBPACK FOOTER //
// src/components/MobileSubcategoryFilter.vue