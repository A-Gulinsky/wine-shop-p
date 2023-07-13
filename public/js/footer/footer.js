

import Loading from "../classes/loading-animation.js"

// load animation
const load = new Loading()

const form = document.querySelector(`.footer__newsletter-form`)
const input = form.querySelector(`.footer__newsletter-input`)

// subscribe to newsletter
form.addEventListener(`click`, footerForm)

function footerForm(e) {
  e.preventDefault()

  const btn = e.target.closest(`.footer__newsletter-btn`)
  
  if (!btn) {
    return
  }

  if (!input.value.includes(`@`)) {
    return
  }

  const inputValue = input.value

  load.newsletterSubscribeBtn(`.footer__newsletter-btn`, true)

  fetch("/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ inputValue }),
  }).then(resp => resp.json())
    .then(data => {

      Notiflix.Notify.success(`${data}`)
      input.value = ''
      load.newsletterSubscribeBtn(`.footer__newsletter-btn`, false)
    }).catch(err => {
      
      Notiflix.Notify.failure(`Something goes wrong...`)
      load.newsletterSubscribeBtn(`.footer__newsletter-btn`, false)
    })
  
  
}