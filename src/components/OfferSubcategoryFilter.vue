<template>
    <div class="spc-dropdown">
       <div class="wrap-all">
           <div id="heading-wrap" :class="filterDynamicClass">
               <div id="subcategory-dropdown-heading">
                 {{ $t('offer.subcategory_filter.subcategories') }} {{this.selectedFilter.length ? `(${this.selectedFilter.length})` : ''}}
               </div>
               <div id="image2"><img src="@/assets/images/icons/general/img/4.png" alt="image4" /></div>
           </div>
           <div id="subcategory-dropdown-wrap">
             <div id="dropdown-content">
               <div class="title">{{ $t('offer.sort_filter.filter_heading') }}</div>
               <div class="filter-button-wrap">
               <div class="row1">
                  <div
                    class = "col "
                   :class="{ active: ((!selectedFilter.length)) }"
                    @click="updateOfferSubcategoryFilter(null)"
                  >
                  {{ $t('offer.filter.all') }}</div>
                  <div v-for="option in subcategories.slice(0,2)" :key="option.name_en"
                    class = "col "
                   :class="{ active: (option && selectedFilter.indexOf(option.id) >= 0) }"
                    @click="updateOfferSubcategoryFilter(option.id)"
                  >
                  {{ option[`name_${language}`] }}</div>
              </div>
              <div class="row2" v-for="(chunk, idx) in chunked" :key="idx">
                  <div v-for="option in chunk" :key="option.name_en"
                    class = "col"
                   :class="{ active: (option && selectedFilter.indexOf(option.id) >= 0) }"
                    @click="updateOfferSubcategoryFilter(option.id)"
                  >{{ option[`name_${language}`] }}</div>
              </div>
             </div>
             </div>
           </div>
       </div>
    </div>
</template>
<script>
import { ACTIONS } from '@/service/analytics-service'
import { mapGetters } from 'vuex'
import { arrayChunk } from '@/utils'

export default {
  props: {
    subcategories: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      filterOptions: [],
      subcategoryFilter: null,
      selectedFilter: [],
      isDropdownOpen: false
    }
  },
  computed: {
    ...mapGetters([
      'language'
    ]),
    chunked () {
      this.filterOptions = arrayChunk(3, this.subcategories.slice(2, this.subcategories.length))
      return this.filterOptions
    },
    filterDynamicClass () {
      let className = 'heading-wrap'
      if (this.selectedFilter.length) {
        className += ' hasFilter'
      }
      if (this.isDropdownOpen) {
        className += ' open'
      }
      return className
    }
  },
  methods: {
    arrayChunk,
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
      this.$emit('select', this.selectedFilter)
      ACTIONS.FILTER_SELECTED(this.selectedFilter)
    },
    filterCategory (event) {
      let filterDropDown = document.getElementById('subcategory-dropdown-wrap')
      if ((document.getElementById('subcategory-dropdown-heading').contains(event.target) && !filterDropDown.classList.contains('block')) ||
      filterDropDown.contains(event.target)) {
        filterDropDown.style.display = 'block'
        filterDropDown.classList.add('block')
        this.isDropdownOpen = true
      } else {
        document.getElementById('subcategory-dropdown-wrap').style.display = 'none'
        filterDropDown.classList.remove('block')
        this.isDropdownOpen = false
      }
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
@import '~@/assets/components/OfferSubcategoryFilter'
</style>

<i18n src='Assets/i18n/offer'></i18n>


// WEBPACK FOOTER //
// src/components/OfferSubcategoryFilter.vue