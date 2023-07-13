import Loading from "../classes/loading-animation.js"

const load = new Loading()


const orderHistoryList = document.querySelector(`.order__history-list`)

let currentPosition = 5

const orderBtnLoadMore = document.querySelector(`.history__order-btn-load-more`)
orderBtnLoadMore.addEventListener(`click`, orderBtnLoadMoreFunc)

async function orderBtnLoadMoreFunc() {

  try {

    currentPosition += 5

    load.payOrcheckout('.history__order-btn-load-more', true)

    const response = await fetch('/order-history', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    // part of data
    const partOfData = data.reverse().slice(0,currentPosition)

    const source = await fetch("/templates/orders-history.hbs").then((response) =>
    response.text()
    );

    if (!response.ok) {
      throw new Error(`Server Error`)
    }

    // render
    const template = Handlebars.compile(source);
    orderHistoryList.innerHTML = template(partOfData)
    
    // anim load btn stop
    load.payOrcheckout('.history__order-btn-load-more', false)

    // btn load more - flex
    orderBtnLoadMore.style.display = `flex`

    // if data length === part of Data length - load btn close
    if (data.length === partOfData.length) {

      Notiflix.Notify.info(`End of History Order List`)
      orderBtnLoadMore.style.display = `none`
      load.payOrcheckout('.history__order-btn-load-more', false)

      return
    }

  } catch (err) {
    Notiflix.Notify.failure(`${err}`)
  }

}