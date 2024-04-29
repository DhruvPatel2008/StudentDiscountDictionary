<template>
  <div ref="search-container" class="search-container" :class="{'footer-search': fromFooter, 'header-adjust': fromHeader, 'no-vertical-margin': this.$route.name === pageNames.DEALS}" @click="focusText">
    <img @click="handleSearch()" v-if="validateDeviceWidth('Desktop', screenWidth)" :src="require(`@/assets/images/icons/general/search-icon-inactive.svg`)" class="search-icon"/>
    <img @click="handleSearch()" v-if="!validateDeviceWidth('Desktop', screenWidth)" :src="require(`@/assets/images/icons/general/search-icon.svg`)" class="search-icon"/>
    <input
      @input="$emit('input', fixQuotes($event.target.value)), inputValue = $event.target.value"
      :value="value"
      @keyup.enter="handleSearch()"
      @keyup.esc="$emit('input', ''), inputValue = ''"
      @focus="onFocus"
      @blur="onBlur"
      type="search"
      class="search-box"
      :placeholder="showPlaceholder"
      :disabled="disabled"
      id="searchField"
      autocomplete="off"
      ref="searchText"
      />
      <div :class="[fromFooter ? 'suggestionsFooter' : 'suggestions' ]" v-show="searchFocused">
        <SpinnerLoading v-show="displayLoader" class="loading-margin"/>
        <ul class="list-reset" v-if="this.inputValue">
          <li v-for="suggestion in uniqueSuggestions" :key="suggestion"
            @click="handleSearch(suggestion)"
          >
            {{ (typeof suggestion === 'object')? suggestion[displayKey]: suggestion  }}
          </li>
        </ul>
      </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { fixQuotes, isDescendant, validateDeviceWidth } from '@/utils'
import uniqBy from 'lodash/uniqBy'
import SpinnerLoading from '@/components/Utility/SpinnerLoading'
import { SearchSuggestions } from '@/models/offer'
import { PAGE_NAMES } from '@/router'
export default {
  components: {
    SpinnerLoading
  },
  props: {
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    suggestions: {
      type: Array,
      required: true
    },
    value: {
      type: String,
      required: true
    },
    displayKey: {
      type: String,
      default: ''
    },
    currentPage: {
      type: String,
      default: ''
    },
    showLoader: {
      type: Boolean,
      default: false
    },
    fromFooter: {
      type: Boolean,
      default: false
    },
    fromFundraising: {
      type: Boolean,
      default: false
    },
    fromHeader: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      searchFocused: false,
      error: null,
      inputValue: '',
      currentSuggestion: SearchSuggestions.suggestion[0],
      suggestionInterval: null,
      suggestionTimeout: null,
      suggestionCount: 0,
      screenWidth: window.innerWidth,
      pageNames: PAGE_NAMES
    }
  },
  computed: {
    ...mapGetters([
      'language',
      'french'
    ]),
    uniqueSuggestions () {
      return uniqBy(this.suggestions)
    },
    displayLoader () {
      return this.showLoader
    },
    showPlaceholder () {
      return this.fromFundraising ? '' : this.currentSuggestion
    }
  },
  watch: {
    inputValue: () => {
      // Fix search results going underneath categories bar
      const categoryList = document.querySelector('.category-list')
      categoryList.style.overflow = 'hidden'
    }
  },
  methods: {
    validateDeviceWidth,
    fixQuotes,
    focusText () {
      this.$refs.searchText.focus()
    },
    handleSearch (value) {
      this.$emit('search', { value, currentSuggestion: this.currentSuggestion })
      this.searchFocused = false
    },
    closeMenuOnClickOutside (event) {
      let target = event.target
      let searchContainer = this.$refs['search-container']
      if (!isDescendant(searchContainer, target)) {
        this.searchFocused = false
      }
      event.stopPropagation()
    },
    /**
     * It will update the search suggestions for every 5 sec.
     */
    SearchSuggestion () {
      this.suggestionInterval = setInterval(() => {
        if (this.inputValue.length) {
          return
        }
        if (this.language === this.french) {
          this.currentSuggestion = this.placeholder
          return
        }
        this.suggestionCount++
        this.suggestionCount = (this.suggestionCount >= SearchSuggestions.suggestion.length) ? 0 : this.suggestionCount

        const searchFields = document.querySelectorAll('#searchField')
        for (const searchField of searchFields) {
          searchField.className = 'fadeOutUp'
        }
        setTimeout(() => {
          this.currentSuggestion = SearchSuggestions.suggestion[this.suggestionCount]

          const elements = document.querySelectorAll('#searchField')
          for (const element of elements) {
            element.classList.remove('fadeOutUp')
          }

          const searchFields = document.querySelectorAll('#searchField')
          for (const searchField of searchFields) {
            searchField.className = 'fadeInDown'
          }
        }, 500)
      }, 5000)
    },
    onFocus () {
      this.searchFocused = true
      clearTimeout(this.suggestionTimeout)
      clearInterval(this.suggestionInterval)
    },
    onBlur () {
      if (!this.fromFundraising) {
        this.SearchSuggestion()
      }
    }
  },
  created () {
    if (!this.fromFundraising) {
      this.SearchSuggestion()
    }
  },
  mounted () {
    document.addEventListener('click', this.closeMenuOnClickOutside)
    this.currentSuggestion = (this.language === this.french) ? this.placeholder : SearchSuggestions.suggestion[0]
  },
  beforeDestroy () {
    document.removeEventListener('click', this.closeMenuOnClickOutside)
    clearInterval(this.suggestionInterval)
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/SearchInput'
</style>



// WEBPACK FOOTER //
// src/components/SearchInput.vue