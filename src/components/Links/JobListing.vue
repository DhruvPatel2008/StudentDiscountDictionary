<template>
  <div class="listing-container">
    <div id="HumiJobBoard" data-company="studentpricecard"></div>
  </div>
</template>

<script>
export default {
  mounted () {
    // Add humi script once component is mounted
    const humiScript = document.createElement('script')
    humiScript.setAttribute(
      'src',
      'https://studentpricecard.applytojobs.ca/embed.js'
    )
    document.head.appendChild(humiScript)

    // Wait till elements are loaded
    function waitForElm (selector) {
      return new Promise(resolve => {
        if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector))
        }

        const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
            resolve(document.querySelector(selector))
            observer.disconnect()
          }
        })

        observer.observe(document.body, {
          childList: true,
          subtree: true
        })
      })
    }
    waitForElm('.humi-job-board-category').then(elm => {
      const categoryItems = document.querySelectorAll(
        '.humi-job-board-category'
      )
      categoryItems.forEach(categoryItem => {
        categoryItem.addEventListener('click', event => {
          categoryItem.classList.toggle('active')
          const postings = categoryItem.querySelector(
            ':scope > .humi-job-board-postings'
          )
          if (categoryItem.classList.contains('active')) {
            postings.style.maxHeight = postings.scrollHeight + 'px'
            postings.style.opacity = '1'
          } else {
            postings.style.maxHeight = 0
          }
        })
      })
    })
  }
}
</script>

<style lang="stylus" scoped>
@import '~@/assets/components/Links/JobListing'
</style>



// WEBPACK FOOTER //
// src/components/Links/JobListing.vue