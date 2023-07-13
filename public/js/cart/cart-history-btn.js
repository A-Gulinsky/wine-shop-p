import historyAnim from "../classes/history-animation.js"

// class historyAnim
const animation = new historyAnim('.cart__title', '.items', '.history__title', '.history', '.footer-container')

// check if user is Online
const sectionError = document.querySelector(`.cart__error`)

const cartHistoryBtn = document.querySelector(`.cart__btn-history`)

if (!sectionError) {
  cartHistoryBtn.addEventListener(`click`, cartHistory)
}


function cartHistory() {
  cartHistoryBtn.classList.toggle('cart-current')
  cartHistoryBtn.classList.toggle('cart-history')

  if (cartHistoryBtn.classList.contains(`cart-history`)) {
    
    cartHistoryBtn.textContent = `orders`

    animation.startAnim()

  } else if (cartHistoryBtn.classList.contains(`cart-current`)) {
    
    cartHistoryBtn.textContent = `history`

    animation.closeAnim()
  }
}
