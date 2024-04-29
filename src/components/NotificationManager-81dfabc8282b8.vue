<template>
  <transition-group name="notification-list" tag="div" class="notification-container">
    <div v-for="note in notificationsReversedAndTranslated" :key="note.id" class="notification-list-item" :ref="`note-${note.id}`">
      <div class="marginated notification-inner">
        <span class="content" v-html="note.content" @click="handleClick($event, note)"></span>
        <span class="right">
          <img 
            class="notification-close-icon"
            :src="require('@/assets/images/icons/misc/close.svg')"
            :alt="$t('close')"
            @click="remove(note)"
            height="20"
            tabindex="0">
        </span>
      </div>
    </div>
  </transition-group>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import { translateWithDefaultRelaxed } from '@/service/user-service'
import cloneDeep from 'lodash/cloneDeep'

export default {
  computed: {
    ...mapGetters('notifications', [
      'notifications'
    ]),
    notificationsReversedAndTranslated () {
      return this.notifications.slice().reverse().map(notification => {
        const note = cloneDeep(notification)
        note.content = translateWithDefaultRelaxed(note.content)
        return note
      })
    }
  },
  methods: {
    ...mapActions('notifications', [
      'popNotification'
    ]),
    remove (note) {
      const noteRef = this.$refs[`note-${note.id}`][0]
      if (noteRef) {
        noteRef.style.top = noteRef.getBoundingClientRect().top
      }
      this.popNotification(note)
    },
    handleClick (event, note) {
      if (event.target.nodeName === 'A') {
        this.remove(note)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/NotificationManager'
</style>

<i18n>
{
  "en": {
    "close": "close"
  },
  "fr": {
    "close": "fermer"
  }
}
</i18n>



// WEBPACK FOOTER //
// src/components/NotificationManager.vue