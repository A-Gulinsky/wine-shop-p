
// this function shows the number of unpaid items in the cart
export default async function linkQuantity() {
  
  try {

    const headerCartItemsQuantity = document.querySelector(`.account__header-link-quantity`)
  
    const response = await fetch('/cart-quantity', {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
    })

    const quantity = await response.json()
    
    if (!response.ok) {
      throw new Error(`Server Error`)
    }

    if (quantity > 9) {
      headerCartItemsQuantity.textContent = `9+`
    } else {
      headerCartItemsQuantity.textContent = quantity
    }
    

  } catch (err) {
    console.log(err)
  }

}
