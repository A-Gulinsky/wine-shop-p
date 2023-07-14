
const cartError = document.querySelector(`.cart__error`)

checkUserIsOnline()

// check if user is online
function checkUserIsOnline() {
  if (cartError) {
    return
  }

  updateCartInfo();
}

// A function that checks for the presence of a product in each category,
// if there is no product, hide the block
function updateCartInfo() {

  // get each cart item
  const infoProccesedItem = document.querySelector('.processed-item');
  const infoOrderedItem = document.querySelector('.ordered-item');
  const infoProductItem = document.querySelector('.queue-item');

  // in this item we get a list of render products
  const processedList = getListLength(infoProccesedItem)
  const orderedList = getListLength(infoOrderedItem)
  const productList = getListLength(infoProductItem)

  // check each list length , display - block
  checkListLength(processedList, infoProccesedItem)
  checkListLength(orderedList, infoOrderedItem)
  checkListLength(productList, infoProductItem)

  // if all the list length - 0 , return empty cart template
  emptyCart(processedList, orderedList, productList)
}

// This function finds lists and their length
function getListLength(infoItem) {

  return infoItem.children[1].children.length
}

// this function check each list length , if length = 0 , return display - none
function checkListLength(list, infoItem) {
  
  if (list) {

    infoItem.style.display = 'block';

  }

}

// this function check if all the lists is empty 
// - return template for empty cart
async function emptyCart(processedList,orderedList,productList) {

  const cartInfoList = document.querySelector('.cart__info-list');

  if (processedList === 0 && orderedList === 0 && productList === 0) {
      
    try {
      const source = await fetch('/templates/empty-cart.hbs').then((response) => response.text());
      const template = Handlebars.compile(source);
      cartInfoList.innerHTML = template();
    } catch (err) {
        console.log(`Somethings wrong...`, err)
    }
  }
}