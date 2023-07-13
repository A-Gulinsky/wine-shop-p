import Modal from "../modal/modal.js"

import productColorChoice from "./order-modal-settings.js"
import modalProductTitleFontSize from "./orders-modal-fontsize-title.js"
import HbsHelper from "../classes/handlebars-helper.js"
import { historyData } from "./order-switch-btn.js"

// class Modal
const modal = new Modal(`.backdrop`, '.modal', '.modal__button')
const modalWindow = document.querySelector(`.modal`)
const modalInfo = document.querySelector(`.modal__info`)

// class hbs helpers
const hbs = new HbsHelper()

const orderHistoryList = document.querySelector(`.order__history-list`)

// if error box is visible , return
const orderErrorBox = document.querySelector(`.order__error-box`)


// HISTORY LIST

if (!orderErrorBox) {
  orderHistoryList.addEventListener(`click`, orderHistoryItem)
}

async function orderHistoryItem(e) {
  
  // the current element in the list
  const historyItem = e.target.closest(`.order__history-card`)
  
  if (!historyItem) {
    return
  }

  // get the id of the current item
  const itemUniqueId = Number(historyItem.getAttribute(`orderId`))

  // here, thanks to history data, we see a list of all store 
  // sales and find the right one by id
  const historyOrder = historyData.find(item => item.uniqueId === itemUniqueId)
  

  // hbs helpers
  hbs.HBSorderListReservationOrDelivery()
  hbs.HBSorderHistoryTotalPrice()
  hbs.HBSifDelivery()

   
  // when you click on the current element, open a modal window with its information
  const source = await fetch("/templates/order-history-modal.hbs").then((response) =>
    response.text()
  );
  const template = Handlebars.compile(source);

  modalWindow.classList.add(`modal__order-window`)
  modal.open()
  modal.init(modalWindow, `modal__order-window`)
  
  modalInfo.innerHTML = template(historyOrder)

  // These functions are responsible for the color of the wine
  // (changing the color of the text), 
  // and for the font size of the title, if it is too long - reduce the font size
  productColorChoice(modalInfo, historyOrder)
  modalProductTitleFontSize(modalInfo)
}