import historyAnim from "../classes/history-animation.js"

// animation class
const animation = new historyAnim('.orders__title-section', '.orders', '.order__history-title', '.order__history-list-section', '.footer-container')

const orderHistoryList = document.querySelector(`.order__history-list`)
const orderHistoryBtn = document.querySelector(`.order__history-btn-swith`)

//error box
const orderErrorBox = document.querySelector(`.order__error-box`)

// btn load more
const orderBtnLoadMore = document.querySelector(`.history__order-btn-load-more`)

// if error box is visible , return
if (!orderErrorBox) {
  orderHistoryBtn.addEventListener(`click`, orderHistory)
}

// export to order history-list.js
export let historyData = []

async function orderHistory() {
  
  // switch between current orders and - shop history
  orderHistoryBtn.classList.toggle('order-current')
  orderHistoryBtn.classList.toggle('order-history')

  // IF OPEN HISTORY
  if (orderHistoryBtn.classList.contains(`order-history`)) {
    
    // change btn text
    orderHistoryBtn.textContent = `orders`

    // settings
    orderHistoryList.innerHTML = ''

    // List switching animation 
    animation.startAnim()

    const response = await fetch('/order-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();



    const partOfData = data.reverse().slice(0,5)

    // let Array = this data
    historyData = data
    
    // fetch template 
    const source = await fetch("/templates/orders-history.hbs").then((response) =>
    response.text()
    );
    const template = Handlebars.compile(source);

    orderHistoryList.innerHTML = template(partOfData)

    orderBtnLoadMore.style.display = `flex`

    // if data length < 5 , btn load more close
    if (partOfData.length < 5) {
      orderBtnLoadMore.style.display = `none`
    }

    return 
    // IF CURRENT ORDERS
  } else if (orderHistoryBtn.classList.contains(`order-current`)) {
    
    // change btn text
    orderHistoryBtn.textContent = `history`

    // anim
    animation.closeAnim()
    
  }

}


