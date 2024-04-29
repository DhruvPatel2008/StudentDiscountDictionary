
import { domainURL } from '@/service/api-config'

export default {
  cookie_usage: {
    en: `We use cookies. Learn more <a href='/privacy#cookies' target='_blank'>${domainURL.substring(8)}/privacy</a>.`,
    fr: `Nous utilisons des cookies. Pour en apprendre plus, visitez <a href='/privacy#cookies' target='_blank'>${domainURL.substring(8)}/privacy</a>.`
  },
  policy_update: {
    en: "Our <a href='/terms' target='_blank'>Terms of Use</a> and <a href='/privacy' target='_blank'>Privacy Policy</a> have been updated. Please review them and continue using SPC.",
    fr: "Nos <a href='/terms' target='_blank'>conditions d'utilisation</a> et <a href='/privacy' target='_blank'>politique de confidentialité</a> ont été mises à jour.  Veuillez les consulter avant de continuer au programme SPC."
  }
}



// WEBPACK FOOTER //
// ./src/data/notifications.js