export default class Counter {
  constructor() { }

  // Rendered cards counter
  renderProductCounter(e, targetProductItem , inputValue) {
    

    // ====
    let itemQuantity = parseInt(targetProductItem.getAttribute(`value`))
    
    const totalPrice = targetProductItem.querySelector(`.product__info-price`)
    const startedPrice = totalPrice.getAttribute(`item-price`)

    let productCurrentValue = inputValue.querySelector(`.product__value`)
    
    const min = parseInt(productCurrentValue.getAttribute(`min`))
    const max = parseInt(productCurrentValue.getAttribute(`max`))

    // decrement
    const decrement = e.target.closest(`.product__decrement`)
    if (decrement) {

      if (itemQuantity <= min) {
        return
      }

      
      itemQuantity -= 1
      
      targetProductItem.setAttribute(`value`, itemQuantity)
      productCurrentValue.setAttribute(`value`, itemQuantity)
      productCurrentValue.value = itemQuantity
      targetProductItem.value = itemQuantity
      
      totalPrice.textContent = Number(startedPrice) * itemQuantity

      return
    }
    
    // increment
    const increment = e.target.closest(`.product__increment`)
    if (increment) {

      if (itemQuantity >= max) {
        return
      }

      itemQuantity += 1
      
      targetProductItem.setAttribute(`value`, itemQuantity)
      productCurrentValue.setAttribute(`value`, itemQuantity)
      productCurrentValue.value = itemQuantity
      targetProductItem.value = itemQuantity
      totalPrice.textContent = Number(startedPrice) * itemQuantity

      return
    }

    // inputValue
    
    const productInput = e.target.closest(`.product__value`)

    if (!productInput) {
      return
    }

    productInput.addEventListener(`input`, () => {

      let value = parseInt(productInput.value)
      
      if (isNaN(value)) {
        productInput.value = ``
      }

      if (value <= min) {
        value = min
        productInput.value = min
      } else if (value >= max) {
        value = max
        productInput.value = max
      }
      
      if (isNaN(value)) {
        value = 1
      }

      targetProductItem.setAttribute(`value`, value)
      productCurrentValue.setAttribute(`value`, value)
      totalPrice.textContent = Number(startedPrice) * value
    
      return
    })
  }

  // Counter of the currently open product card
  getProductCurrentCounter() {
    const currentDecrement = document.querySelector(".current__product-decrement");
    const currentIncrement = document.querySelector(".current__product-increment");
    const currentCounterValue = document.querySelector(".current__product-value");
    const currentPrice = document.querySelector(`.current__price-text`)

    // decrement
    currentDecrement.addEventListener(`click`, () => {
    const min = parseInt(currentCounterValue.getAttribute(`min`))
    if (Number(currentCounterValue.value) <= min) {
      return
      }
    let startIndex = 1
    currentCounterValue.value = Number(currentCounterValue.value) - startIndex
      currentCounterValue.setAttribute(`value`, currentCounterValue.value)
      
      const valueOfPrice = Number(currentPrice.getAttribute(`price`))
      currentPrice.textContent = `${valueOfPrice * Number(currentCounterValue.value)}$`
    });

    // increment
    currentIncrement.addEventListener(`click`, () => {
    const max = parseInt(currentCounterValue.getAttribute(`max`))
    if (Number(currentCounterValue.value) >= max) {
      return
      }
    let startIndex = 1
    currentCounterValue.value = Number(currentCounterValue.value) + startIndex
      currentCounterValue.setAttribute(`value`, currentCounterValue.value)
      
      const valueOfPrice = Number(currentPrice.getAttribute(`price`))
      currentPrice.textContent = `${valueOfPrice * Number(currentCounterValue.value)}$`
    });
    
    // input
    currentCounterValue.addEventListener(`input`, () => {

    const valueOfPrice = currentPrice.getAttribute(`price`)

    let value = parseInt(currentCounterValue.value)

    const min = parseInt(currentCounterValue.getAttribute(`min`))
    const max = parseInt(currentCounterValue.getAttribute(`max`))

    if (isNaN(value)) {
      currentCounterValue.value = ''
    }

    if (value <= min) {
      currentCounterValue.value = min
    } else if (value >= max) {
      currentCounterValue.value = max
    }
    
      if (isNaN(value)) {
        value = 1
        currentCounterValue.setAttribute(`value`, value)
        currentPrice.textContent = `${valueOfPrice}$`
        return
      }
      
      currentCounterValue.setAttribute(`value`, currentCounterValue.value)
      currentPrice.textContent = `${Number(currentCounterValue.value * valueOfPrice)}$`
  })
  }

  // Cart cards counter
  getCartCounter(e, targetProductItem, inputValue) {
    
    let itemQuantity = parseInt(targetProductItem.getAttribute(`value`))
    const currentItemId = targetProductItem.getAttribute(`itemId`)
    
    let totalPriceQuantityValue = inputValue.querySelector(`.total__price-quantity-value`)
    let totalPrice = inputValue.querySelector(`.total__price-info`)
    const price = targetProductItem.querySelector(`.cart__info-unit-price`)

    const cartCurrentValue = inputValue.querySelector(`.cart__product-value`)
    const min = parseInt(cartCurrentValue.getAttribute(`min`))
    const max = parseInt(cartCurrentValue.getAttribute(`max`))


    const decrement = e.target.closest(`.cart__product-decrement`)
    // decrement
    if (decrement) {

      if (itemQuantity <= min) {
        return
      }

      itemQuantity -= 1
      targetProductItem.setAttribute(`value`, itemQuantity)
      cartCurrentValue.value = itemQuantity
      totalPriceQuantityValue.textContent = itemQuantity
      totalPrice.textContent = Number(price.textContent) * itemQuantity

      this.cartUpdateItem(itemQuantity,currentItemId)
      
      return
    }

    // increment
    const increment = e.target.closest(`.cart__product-increment`)
    if (increment) {

      if (itemQuantity >= max) {
        return
      }

      itemQuantity += 1
      targetProductItem.setAttribute(`value`, itemQuantity)
      cartCurrentValue.value = itemQuantity
      totalPriceQuantityValue.textContent = itemQuantity
      totalPrice.textContent = Number(price.textContent) * itemQuantity

      this.cartUpdateItem(itemQuantity,currentItemId)
      return
    }

    // inputVALUE
    const inputQuantity = e.target.closest(`.cart__product-value`)
    
    if (!inputQuantity) {
      return
    }

    inputQuantity.addEventListener(`input`, () => {
      
      let value = parseInt(inputQuantity.value)
      
      if (isNaN(value)) {
        inputQuantity.value = ''
      }

      if (value <= min) {
        value = min
        inputQuantity.value = min
      } else if (value >= max) {
        value = max
        inputQuantity.value = max
      }

      targetProductItem.setAttribute(`value`, value)
      inputQuantity.setAttribute(`value`, value)

      if (isNaN(value)) {
        value = 1
      }

      totalPriceQuantityValue.textContent = value
      totalPrice.textContent = Number(price.textContent) * value

      let totalQuantity = Number(targetProductItem.getAttribute(`value`))
      

      if (!totalQuantity) {
        totalQuantity = 1
      }

      itemQuantity = totalQuantity

      this.cartUpdateItem(itemQuantity,currentItemId)
      })
  }

  // cart update Item
  async cartUpdateItem(itemQuantity, currentItemId) {
      try {
        const response = await fetch('/update-item', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ itemQuantity, currentItemId })
      });
      
      if (!response.ok) {
      throw new Error('Error updating item');
      }

      const data = await response.json();

    } catch (err) {
      Notiflix.Notify.failure(`${err}`)
    }
  }

}