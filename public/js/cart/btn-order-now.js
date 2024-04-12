import Modal from "../modal/modal.js"
import Loading from "../classes/loading-animation.js"
import *as deliveryModule from './delivery.js'
import throttle from "../utils/throttle.js"

const load = new Loading()
// modal el
const modal = new Modal(".backdrop", ".modal", ".modal__button")
const modalWindow = document.querySelector(`.modal`)
const modalInfo = document.querySelector(`.modal__info`)


// cart item list
const cartList = document.querySelector('.cart__product-list')

// total price
const totalOrderPrice = document.querySelector(`.total__order`)

// btn order now
const btnOrderNow = document.querySelector(`.btn__order`)

// section error
const cartError = document.querySelector(`.cart__error`)

// check if user is Online
checkUserIsOnline()

function checkUserIsOnline() {
  if (cartError) {
    return
  }

  btnOrderNow.addEventListener(`click`, orderNow)
}

// if item has class Active - push here
let activeProductList = []

async function orderNow() {

  // push cartItem if class is Active
  pushCartItemIfClassIsActive(cartList)

  // if massive.length zero - return
  if (activeProductList.length === 0) {
    ifActiveProductListLengthZero(activeProductList)
    return
  }

  Notiflix.Notify.info(`Data from paypal and moderator account can be found in readme.md (GitHub)`)

  // modal open
  modalWindow.classList.add('modal__pay')
  modalInfo.innerHTML = '';

  const source = await fetch('/templates/cart-modal-order.hbs').then(resp => resp.text())
  modalInfo.innerHTML = source

  modal.open()

  // modal close
  modal.init(modalWindow, `modal__pay`)

  // if reservation checked , than the delivery is false
  reservationOrDelivery()

  // delivery settings
  const deliveryLabelCityValue = document.querySelector(`.order__delivery-input`)
  const deliveryPostNumber = document.querySelector(`.order__delivery-input-post-number`)
  const deliveryPaymentMethod = document.querySelector('.order__payment-method')
  const addressText = document.querySelector(`.order__address-text`)
  const deliveryCityLabelIcon = document.querySelector('.order__delivery-input-icon')
  const deliveryNumberPostIcon = document.querySelector(`.order__delivery-input-post-icon`)
  
  let city = null
  let warehouseNumber = null
  let cityDescription = null
  
  // city
  deliveryLabelCityValue.addEventListener('input', throttle(async () => {
    addressText.textContent = '';
    deliveryPostNumber.value = '';
    deliveryPostNumber.style.display = 'none';
    deliveryPaymentMethod.style.display = 'none';
    deliveryCityLabelIcon.style.display = `none`;
    deliveryNumberPostIcon.style.display = `none`;

    // get raw string from input
    let rawString = deliveryLabelCityValue.value.trim()
    
    // processed String
    const selectedCity = processedStringFunc(rawString)

    console.log('SELECTED CITY', selectedCity)

    // get from api cities
    const cities = await deliveryModule.getCities();
    
    console.log(`CITIES`, cities)

    // find the right city
    city = cities.find(city => city.Description === selectedCity);

    if (!city) {

      return;
    }

    
    // get description from this city
    cityDescription = city.Description; 

    // open the post office search input
    deliveryCityLabelIcon.style.display =`block`
    deliveryPostNumber.style.display = 'block';
  }, 2000));
  

  // post office number
  deliveryPostNumber.addEventListener(`input`, throttle(async () => {
    addressText.textContent = ''
    deliveryNumberPostIcon.style.display = `none`;
    deliveryPaymentMethod.style.display = `none`

    // get selected number
    const selectedNumber = deliveryPostNumber.value.trim()

    // get city post offices
    const cityRef = city.Ref
    
    // get warehouse
    const warehouse = await deliveryModule.getWarehouses(cityRef)

    // if the number of the post office from the input 
    // matches the number from the database - show
    warehouse.forEach(warehouse => {
      if (warehouse.Number === selectedNumber) {
        
        warehouseNumber = warehouse.Number
        deliveryPaymentMethod.style.display = `block`
        deliveryNumberPostIcon.style.display = `block`
        deliveryPaymentMethod.children[1].style.backgroundColor = `black`
        deliveryPaymentMethod.children[2].style.backgroundColor = `black`
        addressText.textContent = `Відділення №${warehouse.Number}, ${warehouse.ShortAddress}`
      }
    });
  }, 2000));

  // btn PAY
  const modalOrderBtn = document.querySelector('.modal__order-btn')

  modalOrderBtn.addEventListener(`click`, async (e) => {
  e.preventDefault()

    try {
    
    // delivery instructions
    const deliveryObject = {
      paid: deliveryPaymentMethod.value,
      city: cityDescription,
      postNumber: warehouseNumber
    }

    const total = Number(totalOrderPrice.textContent)
    let dataPayment = {}

    // if nothing is selected
    if (!reservation.checked && !delivery.checked) {
      
      modalBtnError(modalOrderBtn)
      return
      // if reservation
    } else if (reservation.checked) {
      dataPayment = { reservation: true }
      // if delivery
    } else if (delivery.checked) {

      if (deliveryPostNumber.value === '' || deliveryLabelCityValue.value === '' || deliveryObject.paid === ``) {
        
        modalBtnError(modalOrderBtn)
        return
      } else {
        dataPayment = { delivery: true }
      }

    }

    // anim loading btn start
    load.payOrcheckout('.modal__order-btn', true)

    // paypal fetch
    const response = await fetch(`/cart/order`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ activeProductList, dataPayment, total, deliveryObject })
    })

    if (!response.ok) {
      throw new Error('Ошибка при отправке запроса')
    }

    const data = await response.json()
      
    load.payOrcheckout('.modal__order-btn', false)
    
    
    window.location.href = data.redirectUrl || '/cart'
  } catch (error) {
    console.error('Error:', error);
    load.payOrcheckout('.modal__order-btn', false)
  }
})
}


// push cart item if class is Active
function pushCartItemIfClassIsActive(cartList) {
  Array.from(cartList.children).forEach((child) => {
    if (child.classList.contains('active')) {

      const itemId = child.getAttribute(`itemId`)
      const itemIndex = activeProductList.indexOf(itemId)
      if (itemIndex !== -1) {
        return
      }

      activeProductList.push(itemId)

    } else if (child.classList.contains(`disactive`)) {
      const itemId = child.getAttribute(`itemId`)
      const itemIndex = activeProductList.indexOf(itemId)
      
      if (itemIndex !== -1) {
        activeProductList.splice(itemIndex, 1);
      }
    }
  })
}
// if active product list length === 0
function ifActiveProductListLengthZero() {
    
    
    btnOrderNow.setAttribute(`disabled`, '')

    btnOrderNow.classList.add(`btn__anim-error`)
    btnOrderNow.style.color = `red`

    setTimeout(() => {
      btnOrderNow.removeAttribute(`disabled`)
      btnOrderNow.style.color = `white`
      btnOrderNow.classList.remove(`btn__anim-error`)
    },300)
}
// reservation/delivery
function reservationOrDelivery() {
  const reservation = document.getElementById(`reservation`)
  const delivery = document.getElementById(`delivery`)

  const orderDeliveryInput = document.querySelector(`.delivery__label-box`)
  
  const orderDeliveryInputCityValue = document.querySelector(`.order__delivery-input`)
  const orderPostNumber = document.querySelector(`.order__delivery-input-post-number`)
  const deliveryPaymentMethod = document.querySelector('.order__payment-method')
  const addressText = document.querySelector(`.order__address-text`)
  const deliveryTextBox = document.querySelector(`.delivery__text-box`)
  const deliveryCityLabelIcon = document.querySelector('.order__delivery-input-icon')
  const deliveryNumberPostIcon = document.querySelector(`.order__delivery-input-post-icon`)

  reservation.addEventListener(`change`, () => {
    if (reservation.checked) {
      delivery.checked = false
      
      addressText.textContent = ''
      orderDeliveryInputCityValue.value = ''
      orderPostNumber.value = ''
      orderDeliveryInput.style.display = `none`
      deliveryPaymentMethod.style.display = `none`
      deliveryTextBox.style.display = `none`
      deliveryCityLabelIcon.style.display = `none`
      deliveryNumberPostIcon.style.display = `none`
    }
  })
  // if delivery checked , than the reservation is false
  delivery.addEventListener(`change`, () => {
    if (delivery.checked) {

      
      reservation.checked = false
      addressText.textContent = ''
      orderDeliveryInputCityValue.value = ''
      orderPostNumber.value = ''
      orderPostNumber.style.display = `none`
      orderDeliveryInput.style.display = `block`
      deliveryTextBox.style.display = `flex`
      deliveryCityLabelIcon.style.display = `none`
      deliveryNumberPostIcon.style.display = `none`

    } else {

      addressText.textContent = ''
      orderDeliveryInput.style.display = `none`
      deliveryPaymentMethod.style.display = `none`
      deliveryTextBox.style.display = `none`
      deliveryCityLabelIcon.style.display = `none`
      deliveryNumberPostIcon.style.display = `none`
    }
  })
}

// modal btn if checkbox = null
function modalBtnError(modalOrderBtn) {
   
    
    modalOrderBtn.setAttribute(`disabled`, '')

    modalOrderBtn.classList.add(`btn__anim-error`)
    modalOrderBtn.style.color = `red`

    setTimeout(() => {
      modalOrderBtn.removeAttribute(`disabled`)
      modalOrderBtn.style.color = `white`
      modalOrderBtn.classList.remove(`btn__anim-error`)
    },300)
}

// a function that returns the processed value from the input for the database
function processedStringFunc(rawString) {

  // if we find " - " in the string, process two words
  if (rawString.includes(`-`)) {
      
      let minusIndex = null
      let firstName = null
      let lastName = null

      const array = rawString.split("")
      
      for (const value of array) {
        
        if (value === `-`) {
          minusIndex = array.indexOf(value)  
        }
      }

      firstName = array.slice(0, minusIndex)
      const firstNameCapitalLetter = firstName.slice(0, 1).join("").toUpperCase()
      const firstNameOtherLetter = firstName.slice(1).join("").toLowerCase()


      lastName = array.slice(minusIndex + 1)
      
      const lastNameCapitalLetter = lastName.slice(0,1).join("").toUpperCase()
      const lastNameOtherLetters = lastName.slice(1).join("").toLowerCase()
      
      const totalFirstName = `${firstNameCapitalLetter}${firstNameOtherLetter}`
      const totalLastName = `${lastNameCapitalLetter}${lastNameOtherLetters}`

      return `${totalFirstName}-${totalLastName}`

  // else one  
  } else {

      const capitalLetter = rawString.slice(0, 1).toUpperCase()
      const otherLetters = rawString.slice(1).toLowerCase()
    
      return `${capitalLetter}${otherLetters}`

    }
}