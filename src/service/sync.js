
import * as storage from '@/service/storage'

import store from '@/store'
import { isValidLanguage } from '@/models'

export async function syncLanguage (i18n) {
  const language = storage.getLanguage()
  if (language && isValidLanguage(language)) {
    await store.dispatch('updateLanguage', language)
  }
  store.watch(
    () => store.getters.language,
    language => {
      i18n.locale = language
      storage.setLanguage(language)
    }, {
      immediate: true
    }
  )
}

export async function syncLocation () {
  const location = storage.getLocation()
  if (location) {
    await store.dispatch('updateLocation', location)
  }
  store.watch(
    () => store.getters.location,
    location => {
      storage.setLocation(location)
    }, {
      immediate: true,
      deep: true
    }
  )
}

export async function syncPostal () {
  const postal = storage.getPostal()
  if (postal) {
    await store.dispatch('updatePostal', postal)
  }
  store.watch(
    () => store.getters.localPostal,
    postal => {
      storage.setPostal(postal)
    }, {
      immediate: true
    }
  )
}

export async function syncPreferences () {
  const preferences = storage.getPreferences()
  if (preferences) {
    await store.dispatch('updatePreferences', preferences)
  }
  store.watch(
    () => store.getters.preferences,
    preferences => {
      storage.setPreferences(preferences)
    }, {
      immediate: true,
      deep: true
    }
  )
}



// WEBPACK FOOTER //
// ./src/service/sync.js