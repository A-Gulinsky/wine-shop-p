// array ordersData
import { ordersData } from "./check-moderator-online.js"

// modal
import Modal from "../modal/modal.js"

// hbs helper
import HbsHelper from "../classes/handlebars-helper.js"

// orders list settings
import productColorChoice from "./order-modal-settings.js"
import modalProductTitleFontSize from "./orders-modal-fontsize-title.js"

// function BTN CHECKOUT
import btnCheckout from "./order-list-item-btn-checkout.js"

// class modal
const modal = new Modal(".backdrop", ".modal", ".modal__button")
const modalWindow = document.querySelector(`.modal`)
const modalInfo = document.querySelector(`.modal__info`)

// class hbs
const hbs = new HbsHelper()

const orderPanel = document.querySelector(`.order__panel`)

// if error box is visible - return
const orderErrorBox = document.querySelector(`.order__error-box`)


export let currentOrder = null

if (!orderErrorBox) {
  orderPanel.addEventListener(`click`, panelCard)
} 


async function panelCard(e) {

  const targetCard = e.target.closest(`.order__card`)
  
  if (!targetCard) {
    return
  }

  // take order id
  const uniqueOrderId = targetCard.getAttribute('orderId')

  // find this id on data base
  const order = ordersData.find(item => item.uniqueId === uniqueOrderId)
  currentOrder = order

  try {

    // hbs handlebars
    hbs.HBSorderListReservationOrDelivery()
    hbs.HBSorderHistoryTotalPrice()
    hbs.HBSifDelivery()

    // fetch template modal
    const source = await fetch("/templates/order-modal.hbs").then((response) =>
    response.text()
  );
  const template = Handlebars.compile(source);
  
  modalWindow.classList.add('modal__order-window')
  modal.open()
  modal.init(modalWindow, 'modal__order-window')

  modalInfo.innerHTML = template(order)
  
  // Functions responsible for the color and font size of the item ,
  //  the checkout function is responsible for accepting an application
  modalProductTitleFontSize(modalInfo)
  productColorChoice(modalInfo, order)
  btnCheckout(modalInfo)
  
  }
  catch (error) {
    console.error(error)
  }
}