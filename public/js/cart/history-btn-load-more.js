import cartHistorySettings from "./cart-history-settings.js";
import Loading from "../classes/loading-animation.js";

const load = new Loading()

const historyList = document.querySelector(`.history__list`)
const cartHistoryBtnLoadMore = document.querySelector(`.history__cart-btn-load-more`)
cartHistoryBtnLoadMore.addEventListener(`click`, cartHistoryBtnLoadMoreFunc)


let currentPosition = 5

async function cartHistoryBtnLoadMoreFunc() {

  try {
    
    // add 5 object to current position
    currentPosition += 5
    
    // anim btn load start
    load.payOrcheckout('.history__cart-btn-load-more', true)

    // fetch history list
    const response = await fetch(`/history-list`, {
      method: "POST",
      header: {'Content-Type':'application/json'}
    })

    const data = await response.json()
  
    if (!response.ok) {
      throw new Error(`Server Error`)
    }

    // render only current objects and next 5 objects
    const partOfData = data.reverse().slice(0, currentPosition)

    const template = await fetch("/templates/cart-history-item.hbs").then((response) =>
    response.text());
    
    // render
    const historyItem = Handlebars.compile(template)
    historyList.innerHTML = historyItem(partOfData)

    // history items func for settings
    const historyListForSettings = [...historyList.children]
    cartHistorySettings(historyListForSettings)

    // anim btn load stop
    load.payOrcheckout('.history__cart-btn-load-more', false)

    // if data length = partOfData length , that's end of history list
    if (data.length === partOfData.length) {
      Notiflix.Notify.info(`End of cart history`)
      cartHistoryBtnLoadMore.style.display = `none`
      return
    }

  } catch (err) {
    Notiflix.Notify.failure(`${err}`)
  }

}
