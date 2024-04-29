<template>
  <div class="spc-dropdown">
    <div class="wrap-all">
      <div id="sort-heading-wrap" :class="filterDynamicClass">
        <div id="image1">
          <img v-if="!this.isDropdownOpen && !this.userSelectedSort" src="@/assets/images/icons/sorting/sort.png" alt="image1" />
          <img v-if="this.isDropdownOpen" src="@/assets/images/icons/sorting/inactive-sort.png"  alt="image2" />
          <img v-if="!this.isDropdownOpen && this.userSelectedSort" src="@/assets/images/icons/sorting/active-sort.png"  alt="image3" />
        </div>
        <div id="sort-dropdown-heading">
          {{ $t((this.selectedFilter == null || this.isDropdownOpen || !this.userSelectedSort) ? 'offer.sort.title' : `offer.sort.${this.selectedFilter}`) }}
        </div>
        <div id="image2"><img src="@/assets/images/icons/sorting/down-arrow.png" alt="image4" /></div>
      </div>
      <div id="sort-dropdown-wrap">
        <div id="dropdown-content">
          <label v-for="option in sortOptions" :key="option"
            class="container"
            :class="{ active: selectedFilter }"
            >{{ $t(`offer.sort.${option}`) }}
            <input
              type="radio"
              @click="updateOfferSorting(option)"
              name="sortby"
              :value="option"
              v-model="selectedFilter"
              :class="option"
            />
            <span class="checkmark"></span>
          </label>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { ACTIONS } from '@/service/analytics-service'

export default {
  data () {
    return {
      filter: null,
      selectedFilter: 'most_redeemed',
      sortOptions: [
        'most_redeemed',
        'highest_discount',
        'alphabetical',
        'new'
      ],
      isDropdownOpen: false,
      userSelectedSort: false
    }
  },
  computed: {
    filterLabel () {
      if (this.filter === 'most_redeemed') return 'Most Redeemed'
      if (this.filter === 'highest_discount') return 'Highest Discount'
      if (this.filter === 'alphabetical') return 'Alphabetical'
      if (this.filter === 'new') return 'Newest'
      return null
    },
    filterDynamicClass () {
      let className = 'sort-heading-wrap'
      if (this.selectedFilter && this.userSelectedSort) {
        className += ' hasFilter'
      }
      if (this.isDropdownOpen) {
        className += ' open'
      }
      return className
    }
  },
  methods: {
    updateOfferSorting (filter) {
      this.userSelectedSort = true
      if (!filter) {
        this.selectedFilter = ''
      } else {
        this.selectedFilter = filter
      }
      if (this.sortOptions.includes(filter)) {
        this.filter = filter
        this.$emit('select', this.selectedFilter)
        ACTIONS.FILTER_SELECTED(this.filterLabel)
      }
    },
    sortCategory (event) {
      let sortDropDown = document.getElementById('sort-dropdown-wrap')
      if (document.getElementById('sort-dropdown-heading').contains(event.target) && !sortDropDown.classList.contains('block')) {
        sortDropDown.style.display = 'block'
        sortDropDown.classList.add('block')
        this.isDropdownOpen = true
      } else {
        sortDropDown.style.display = 'none'
        sortDropDown.classList.remove('block')
        this.isDropdownOpen = false
      }
    }
  },
  mounted () {
    try {
      document.addEventListener('click', this.sortCategory)
    } catch (error) {
      console.log(error)
    }

    // Check radio button of selected filter
    document.querySelector(`input.${this.selectedFilter}`).checked = true
  },
  destroyed () {
    document.removeEventListener('click', this.sortCategory)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/OfferSort'
</style>

<i18n src='Assets/i18n/offer'></i18n>



// WEBPACK FOOTER //
// src/components/OfferSort.vue