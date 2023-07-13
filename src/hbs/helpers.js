
// HBS Helpers

export function eq(a, b) {
  return a === b
}

export function comp(user) {
  return user.cart.waiting.length > 9
}

export function reservation(orderStatus) {
  return orderStatus.reservation
}
    
export function totalItems() {
  return this.value * this.data.price
}
    
export function empty() {
  return user.history_cart
}