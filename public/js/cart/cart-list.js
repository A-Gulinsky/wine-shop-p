import Counter from "../classes/counter-class.js";

// class counter
const counter = new Counter()

const cartList = document.querySelector('.cart__product-list')

const totalOrderPrice = document.querySelector(`.total__order`)

// check if User is online
const cartError = document.querySelector(`.cart__error`)

checkUserIsOnline()

function checkUserIsOnline() {

  if (cartError) {
    return
  } 

  cartList.addEventListener('click', cartListFunc)
}

async function cartListFunc(e) {

  try {
    
    e.preventDefault()

    const removeBtn = e.target.closest('.cart__remove-btn')
    const isProductItem = removeBtn !== null;

    const targetProductItem = e.target.closest(`.cart__item`)

    if (!targetProductItem) {
      return
    }

    // input VALUE/ cart Count
    const inputValue = e.target.closest('.cart__box')
    if (inputValue) {

      counter.getCartCounter(e, targetProductItem, inputValue)
      return
    }

    targetProductItem.classList.toggle(`active`)
    if (targetProductItem.classList.contains('active')) {
      targetProductItem.classList.remove(`disactive`)
    } else {
      targetProductItem.classList.add(`disactive`)
    }
  
    // system TOTAL PRICE FOR BUTTON
    const totalPrice = []

    totalItemPrice(totalPrice)
    // ==============================

    // text of totalBTNPRICE

    totalOrderPriceText(totalPrice, totalOrderPrice)
    // ===================

    // REMOVE BTN
    if (!isProductItem) {
      return
    }

    const idOfCart = e.target.getAttribute('data-id')
  
    const response = await fetch(`/remove-to-cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ idOfCart })
    })

    const data = await response.json()

    if (!response.ok) {
      throw new Error(`Server Error`)
    }

    window.location.reload()

  } catch (err) {
      console.log(err)
  }
}

// totalPrice
function totalItemPrice(totalPrice) {
  const cartItems = document.querySelectorAll(`.cart__item`)
  const cartItemsContainer = [...cartItems]

  cartItemsContainer.forEach(item => {
    const currentItemInput = item.querySelector('.cart__counter-box')
    currentItemInput.style.pointerEvents = `all`

    if (item.classList.contains('active')) {
      currentItemInput.style.pointerEvents = `none`
      const price = parseInt(item.querySelector(`.total__price-info`).textContent)
      totalPrice.push(price)
    } else {
    }
  })
}

// totalOrderPrice textContent
function totalOrderPriceText(totalPrice, totalOrderPrice) {
  const sum = totalPrice.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
  
  totalOrderPrice.textContent = sum
}