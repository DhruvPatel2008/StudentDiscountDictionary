<template>
  <div>
    <div v-if="showCategoryList" class="category-list overflow-container fade-container hide-scrollbar">
      <div class="header-font" @mouseenter="showDropdown = true" @mouseleave="hideDropdown">
        <span>{{ $t('actions.all_deals') }}</span>
        <div ref="dropdownBox" v-show="showDropdown" class="dropdown-box" @mouseenter="cancelHide" @mouseleave="hideDropdown">
          <span @click="routeNavigation('DEALS')">{{ $t('actions.view_all_deals') }}</span>
          <span @click="routeNavigation('BRANDS')">{{ $t('actions.all_brands') }}</span>
        </div>
      </div>
      <span @click="routeNavigation('SPCPLUS')" class="header-font" :class="{'active-header': route.name == 'Spc-plus'}">
        SPC +
      </span>
      <span v-for="category in categories" @click="handleCategorySelect(category.name_en)" :key="category.id" class="header-font"
      :class="{'active-header': route.params.name == category.name_en}">
        {{category['name_' + language]}}
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Search from '@/components/Search'
import { ACTIONS } from '@/service/analytics-service'
import { PAGE_NAMES } from '@/router'

export default {
  data () {
    return {
      itemWidth: 100,
      scrollPosLeft: 0,
      scrollWidth: 0,
      scrollContainerWidth: 0,
      showCategoryList: false,
      showDropdown: false
    }
  },
  components: {
    Search
  },
  computed: {
    ...mapGetters([
      'language',
      'route'
    ]),
    ...mapGetters('offers', [
      'categories'
    ])
  },
  methods: {
    ...mapActions('location', [
      'refreshLocation'
    ]),
    ...mapActions('offers', [
      'loadCategories',
      'loadSummary'
    ]),
    async handleCategorySelect (category, section) {
      if (section === this.bubbles) {
        await ACTIONS.CLICKED_CATEGORY_BUBBLE()
      }
      this.$router.push({
        name: PAGE_NAMES.CATEGORY,
        params: {
          name: category
        },
        query: {
          source: section
        }
      })
    },
    routeNavigation (name) {
      this.$router.push({
        name: PAGE_NAMES[name]
      })
    },
    hideDropdown () {
      this.timeout = setTimeout(() => {
        this.showDropdown = false
      }, 100)
    },
    cancelHide () {
      clearTimeout(this.timeout)
    },
    updateDropdownPosition () {
      const dropdownBox = this.$refs.dropdownBox
      const container = this.$el.querySelector('.category-list.overflow-container.fade-container.hide-scrollbar')
      const containerRect = container.getBoundingClientRect()
      dropdownBox.style.top = containerRect.bottom + 'px'
      dropdownBox.style.left = containerRect.left - 10 + 'px'
    }
  },
  async mounted () {
    try {
      if (!this.categories.length) {
        await this.loadCategories()
      }
      this.showCategoryList = true
      setTimeout(() => {
        this.updateDropdownPosition()
      }, 1000)
      window.addEventListener('resize', this.updateDropdownPosition)
    } catch (error) {
      console.log(error)
    }
  },
  beforeUnmount () {
    window.removeEventListener('resize', this.updateDropdownPosition)
  }
}
</script>

<style lang="stylus">
@import '~@/assets/components/CategoryList'
</style>

<i18n src='Assets/i18n/actions'></i18n>



// WEBPACK FOOTER //
// src/components/CategoryList.vue