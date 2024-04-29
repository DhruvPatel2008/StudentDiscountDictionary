<template>
  <SPCPage>
    <div class="error404-top-banner">
      <div class="error404-inner">
        <div class="image-wrapper">
           <img :src="require('@/assets/images/404/Error404_Artwork.png')" alt="$t('title')">
        </div>
        <div class="error404-text-container">
          <h1 class="error404-title">{{ $t('title') }}</h1>
          <p class="error404-text fakt" v-html="$t('description')"></p>
          <button @click="$router.push('/deals')" class="spc-button-v2 clear error404-button">{{ $t('action') }}</button>
        </div>
      </div>
    </div>
  </SPCPage>
</template>

<script>
import SPCPage from '@/components/SPCPage'
import { mapGetters } from 'vuex'

export default {
  metaInfo () {
    return {
      title: this.language === 'en' ? 'Error 404' : 'Erreur 404',
      meta: [
        {
          description: 'Error 404'
        }
      ]
    }
  },
  components: {
    SPCPage
  },
  computed: {
    ...mapGetters(['language'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Pages/FourOhFour'
</style>

<i18n>
{
  "en": {
    "title": "Uh oh…",
    "description": "Looks like this page is ghosting you.<br>Let us get you back on track.",
    "action": "BACK TO SPC"
  },
  "fr": {
    "title": "Oups…",
    "description": "Il paraît que cette page n’existe pas.<br>Permettez-nous de vous aider à trouver ce que vous cherchez.",
    "action": "Retournez au site SPC"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/Pages/FourOhFour.vue