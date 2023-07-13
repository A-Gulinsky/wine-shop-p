import { currentOrder } from "./order-list-item.js";

import Loading from "../classes/loading-animation.js";

const load = new Loading()
// function btn checkout
export default function btnCheckout(modalInfo) {
  const btnCheckout = modalInfo.querySelector(`.modal__order-btn-checkout`)

  btnCheckout.addEventListener(`click`, updateOrder)
}

// updateOrder - currentOrder
async function updateOrder() {

  try {

    load.payOrcheckout('.modal__order-btn-checkout', true)

    const response = await fetch("/update-order", {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
        },
      body: JSON.stringify({ currentOrder }),
    })

    const checkout = await response.json()
      
    if (!response.ok || checkout.error) {
      throw new Error(`Server Error`)
    }  

    load.payOrcheckout('.modal__order-btn-checkout', true)
    Notiflix.Notify.success(`Order has been processed`)
          
    setTimeout(() => {
      window.location.href = `/orders`  
    },2000)

  } catch (err) {
    load.payOrcheckout('.modal__order-btn-checkout', true)
    Notiflix.Notify.failure(`${err}`)
  }
  
}
