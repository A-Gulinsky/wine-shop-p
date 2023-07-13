import Counter from "../../../classes/counter-class.js";
import currentItem from "./product-current-card.js";
import addToCart from "./product-btn-add-to-cart.js";

import Loading from "../../../classes/loading-animation.js";


// classes
const load = new Loading()
const counter = new Counter();

const productList = document.querySelector(".product__list");
const filter = document.querySelector(`.filter__form`)


productList.addEventListener(`click`, async (e) => {
  e.preventDefault();

  const productCounter = e.target.closest(".product__counter");
  const isCartBtn = e.target.classList.contains("cart-btn");

  const targetProductItem = e.target.closest(`.product__item`)
  const isCartBox = e.target.closest(`.product__cart-box`);

  // box with counter
  if (isCartBox) {
    // div - product__counter
    if (productCounter) {
      //counter - renderProductCounter
      counter.renderProductCounter(e, targetProductItem, isCartBox);
      return;
    }

    // btn add to cart
    if (isCartBtn) {

      addToCart(targetProductItem);
      return;
    }
  }

  if (!targetProductItem) {
    return
  }

  

  filter.scrollIntoView({behavior: "smooth"})

  // start anim current cart
  load.currentItemLoading(targetProductItem, true)

  // render current item
  currentItem(e);

  // end anim current cart
  setTimeout(() => {
    load.currentItemLoading(targetProductItem, false)
  }, 1000)
  
});


