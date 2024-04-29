<template>
  <div>
    <SearchInput
      v-model="query"
      @search="handleSearch"
      :disabled="false"
      :suggestions="suggestions"
      :showLoader="searchTagsLoading"
      :fromFooter="fromFooter"
      :fromHeader="fromHeader"
      :placeholder="$t('search.input.placeholder')"
      />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import SearchInput from '@/components/SearchInput'

export default {
  components: {
    SearchInput
  },
  data () {
    return {
      query: '',
      error: null,
      currentSuggestion: ''
    }
  },
  props: {
    fromFooter: {
      type: Boolean,
      default: false
    },
    fromHeader: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters('offers', [
      'searchTags',
      'searchTagsLoading',
      'searchTagSuggestions'
    ]),
    suggestions () {
      return this.searchTagSuggestions(this.query)
    }
  },
  methods: {
    ...mapActions('offers', [
      'loadTags'
    ]),
    async handleSearch ({ value, currentSuggestion }) {
      if (value) this.query = value
      let query = this.query
      if (!query) {
        this.currentSuggestion = currentSuggestion
        const match = this.currentSuggestion.match(/Search "(.*?)"/)
        query = match ? match[1] : this.currentSuggestion
      }
      await this.$nextTick()
      this.$emit('search', {
        query
      })
    }
  },
  created () {
    this.loadTags()
  }
}
</script>

<i18n src='Assets/i18n/search'></i18n>



// WEBPACK FOOTER //
// src/components/Search.vue