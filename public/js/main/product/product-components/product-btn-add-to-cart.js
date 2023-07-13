import Loading from "../../../classes/loading-animation.js";
import linkQuantity from "../../../header/header-cart-quantity.js";

const load = new Loading()


// function add to cart
export default async function addToCart(targetProductItem) {
  
  try {

    // get product Id
    const productId = targetProductItem.getAttribute("wineId");

    // if value of current item select - 0 , return - 1
    let quantity = Number(targetProductItem.getAttribute(`value`));
    
    if (quantity === 0) {
      quantity = 1;
    }

    // start btn anim load
    load.productAddToCart(targetProductItem ,true)

    const response = await fetch("/add-to-cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId, quantity }),
    })
    
    const data = await response.json()

    if (data.error || !response.ok) {
      throw new Error(`${data.error}` || `Something wrong`)
    }

    // btn anim load end
    load.productAddToCart(targetProductItem, false)

    // anim done
    animDone(targetProductItem)
    Notiflix.Notify.success(`Product added to your cart`)
    linkQuantity()

  } catch (err) {
      load.productAddToCart(targetProductItem, false)
      // anim error
      animError(targetProductItem)
      Notiflix.Notify.failure(`${err}`)
  }

}

// if done
function animDone(targetProductItem) {

  let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const btnAddToCart = targetProductItem.querySelector(`.product__cart-btn`);
  const btnText = targetProductItem.querySelector(`.product__cart-btn-text`);
  const btnIcon = targetProductItem.querySelector(`.product__cart-btn-icon`);
  const btnSvgUse = btnIcon.querySelector(`use`);

  btnAddToCart.setAttribute(`disabled`, "");
  if (isIOS) {
    btnText.style.fontSize = `10px`;
  } else {
    btnText.style.fontSize = `14px`;
  }
  btnText.style.color = `rgb(47, 255, 0)`;
  btnIcon.style.fill = `rgb(47, 255, 0)`;
  btnAddToCart.classList.add(`btn-anim-done`);
  btnIcon.classList.add(`btn-text-anim`);

  setTimeout(() => {
    btnAddToCart.classList.remove("btn-anim-done");
    btnIcon.classList.remove(`btn-text-anim`);
    btnText.classList.remove("btn-text-anim");
    btnAddToCart.removeAttribute(`disabled`);
  }, 1500);

  btnText.classList.add(`btn-text-anim`);

  setTimeout(() => {
    btnSvgUse.setAttribute(`href`, `../images/sprite.svg#icon-cart-add`);
    btnText.textContent = `Add`;
    if (isIOS) {
      btnText.style.fontSize = `12px`;
    } else {
      btnText.style.fontSize = `16px`;
    }
    btnText.style.color = `rgba(255,68,0,0.839)`;
    btnIcon.style.fill = `rgba(255,68,0,0.839)`;
  }, 1400);

  setTimeout(() => {
    btnSvgUse.setAttribute(`href`, `../images/sprite.svg#icon-done-cart`);
    btnText.textContent = `Done`;
  }, 100);
}

// if error
function animError(targetProductItem) {

  const btnAddToCart = targetProductItem.querySelector(`.product__cart-btn`);
  const btnText = targetProductItem.querySelector(`.product__cart-btn-text`);
  const btnIcon = targetProductItem.querySelector(`.product__cart-btn-icon`);
  

  btnAddToCart.setAttribute(`disabled`, "");
  btnText.style.color = `red`;
  btnIcon.style.fill = `red`;

  btnAddToCart.classList.add(`btn__anim-error`);
  btnText.classList.add(`btn__text-error`);
  
  setTimeout(() => {
    btnText.style.color = `rgba(255,68,0,0.839)`;
    btnIcon.style.fill = `rgba(255,68,0,0.839)`;

    btnAddToCart.classList.remove("btn__anim-error");
    btnAddToCart.removeAttribute(`disabled`);
  }, 300);
}