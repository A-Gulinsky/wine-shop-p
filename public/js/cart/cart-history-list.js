import HbsHelper from "../classes/handlebars-helper.js"
import cartHistorySettings from "./cart-history-settings.js"

const hbs = new HbsHelper()

const sectionError = document.querySelector(`.cart__error`)

if (!sectionError) {
cartHistoryList()
}

const historyList = document.querySelector(`.history__list`)
const historyBtnLoadMore = document.querySelector(`.history__cart-btn-load-more`)
// export to cart-add-to-history-btn.js
let currentPosition = 5

// function page cart history
async function cartHistoryList() {

  try {

    
    
    // FETCH user history list 
    const response = await fetch(`/history-list`, {
      method: "POST",
      header: {'Content-Type':'application/json'}
    })

    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(`Server Error`)
    }

    // if data length 0 - return empty tamplate section
    if (!data.length) {
    
      const source = await fetch("/templates/empty-history-list.hbs").then((response) =>
      response.text());
    
      hbs.HBSorderListReservationOrDelivery()
    
      const template = Handlebars.compile(source);
      const renderedHtml = template()
      historyList.innerHTML = renderedHtml

      return
    }

    // render only 5 objects
    const partOfData = data.reverse().slice(0, currentPosition)
    
    // render cart history item (<li>)
    const template = await fetch("/templates/cart-history-item.hbs").then((response) =>
      response.text());
    
    // hbs helper check delivery or reservation
    hbs.HBSifHistoryCartIsDelivery()
    // total price
    hbs.HBShistoryTotalPrice()
    
    const historyItem = Handlebars.compile(template)
    historyList.innerHTML = historyItem(partOfData)

    // if data length < 5 - close btn load more
    if (partOfData.length < 5) {
      historyBtnLoadMore.style.display = `none`
      return
    }

    historyBtnLoadMore.style.display = `flex`

    // history items func for settings
    const historyListForSettings = [...historyList.children]
    cartHistorySettings(historyListForSettings)
    
  } catch (err) {
    console.log(err)
  }

}




