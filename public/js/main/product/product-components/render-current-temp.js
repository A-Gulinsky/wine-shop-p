import Counter from "../../../classes/counter-class.js";
import LoadMoreBtn from "../../../classes/load-more-btn.js";
import Loading from "../../../classes/loading-animation.js";
import linkQuantity from "../../../header/header-cart-quantity.js";

// handlebars Helper
import HbsHelper from "../../../classes/handlebars-helper.js";

// classes
const load = new Loading()
const hbs = new HbsHelper()
const loadMoreBtn = new LoadMoreBtn()
const counter = new Counter()

const currentProduct = document.querySelector(".product__current-product");

// CURRENT TEMPLATE
export async function renderCurrentTemplate(data, e) {

  // render current product
  const source = await fetch("/templates/current-product.hbs").then(
    (response) => response.text()
  );
  const template = Handlebars.compile(source);

  // handlebars helper
  hbs.HBScurrentRenderTemp()
  
  // display none load more btn (product list)
  loadMoreBtn.close()

  // render current product
  currentProduct.innerHTML = template(data);

  // back btn
  const btn = currentProduct.querySelector(`.current__back-btn`)

  // back btn anim
  btn.addEventListener(`click`, animCurrentProduct);
  
  // COUNTER
  counter.getProductCurrentCounter(e)

  // if IOS - change btn style
  IOSsettings()

  // ADD TO CART
  addToCartFunction(data._id)
}


// FUNCTIONS of CURRENT TEMPLATE
function addToCartFunction(productId) {
  const currentCounterValue = document.querySelector(".current__product-value");

  // if value current card = 0 , return value 1
  const btnAddToCart = document.querySelector(`.current__add-to-cart`)
  btnAddToCart.addEventListener(`click`, async() => {
    
    try {

      
      let quantity = Number(currentCounterValue.value);
      
      if (quantity === 0) {
        quantity = 1
      }
    
      // start anim btn add to cart
      load.currentProductAddToCart('.current__add-to-cart', true)


      const response = await fetch("/add-to-cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ productId, quantity })
      })

      const data = await response.json()
      console.log(data)
      if (data.error || !response.ok) {
        throw new Error(data.error)
      }

      // btn anim load end
      load.currentProductAddToCart('.current__add-to-cart', false)

      // if add to cart -true , animDone
      animDone()
      Notiflix.Notify.success(`Product added to your cart`)
      linkQuantity()

    } catch (err) {
        // anim load btn add to cart end
        load.currentProductAddToCart('.current__add-to-cart', false)

        // if add to cart -false , animError
        animError()
        
        // notification
        Notiflix.Notify.failure(`${err}`)
    }
  })
}



// Smooth transition back btn
function animCurrentProduct() {
  const productList = document.querySelector(".product__list");
  const currentProduct = document.querySelector(".product__current-product");
  const sectionCountryList = document.querySelector(`.country-info`)
  const footerContainer = document.querySelector(`.footer-container`)


  
  productList.classList.remove(`open-anim-list`)
  currentProduct.classList.remove(`open-anim`)
  footerContainer.classList.remove(`open-anim`)
  currentProduct.classList.add(`close-anim`)
  footerContainer.classList.add(`close-anim`)
  setTimeout(() => {
    currentProduct.style.display = `none`
    productList.style.opacity = "0";
    footerContainer.style.opacity = `0`
    currentProduct.classList.remove(`close-anim`)
    footerContainer.classList.remove(`close-anim`)
    }, 1000)

  setTimeout(() => {
    productList.classList.add(`open-anim-list`)
    sectionCountryList.classList.add(`open-anim`)
    footerContainer.classList.add(`open-anim`)
    productList.style.display = `flex`
    sectionCountryList.style.display = `block`
    footerContainer.style.display = `flex`
        
  setTimeout(() => {
    productList.style.opacity = `1`
    sectionCountryList.style.opacity = `1`
    footerContainer.style.opacity = `1`
    loadMoreBtn.open()
    }, 1200)
  }, 1200)
  
  setTimeout(() => {
    productList.classList.remove(`open-anim-list`)
  }, 2400)
}

// anim Done add to cart
function animDone() {
  let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const btnAddToCart = document.querySelector(`.current__add-to-cart`)
  const btnText = btnAddToCart.querySelector(`.current__add-to-cart-text`)
  const btnIcon = btnAddToCart.querySelector(`.current__add-to-cart-icon`)
  const btnSvg = btnIcon.querySelector(`use`)

  btnAddToCart.setAttribute(`disabled`, '')

  if (isIOS) {
    btnText.style.fontSize = `10px`
  } else {
    btnText.style.fontSize = `14px`
  }

  btnText.style.color = `rgb(47, 255, 0)`
  btnIcon.style.fill = `rgb(47, 255, 0)`
  btnAddToCart.classList.add(`btn-anim-done`)
  btnIcon.classList.add(`btn-text-anim`)
        
  setTimeout(() => {
            
    btnAddToCart.classList.remove('btn-anim-done')
    btnIcon.classList.remove(`btn-text-anim`)
    btnText.classList.remove('btn-text-anim')
    btnAddToCart.removeAttribute(`disabled`)

  }, 1500)
  
  btnText.classList.add(`btn-text-anim`)

  setTimeout(() => {

    btnSvg.setAttribute(`href`, `../images/sprite.svg#icon-cart-add`)
    btnText.textContent = `Add`

     if (isIOS) {
      btnText.style.fontSize = `12px`
     } else {
      btnText.style.fontSize = `16px`
     }
      btnText.style.color = `rgba(255,68,0,0.839)`
      btnIcon.style.fill = `rgba(255,68,0,0.839)`
     },1400)

    setTimeout(() => {
      btnSvg.setAttribute(`href` , `../images/sprite.svg#icon-done-cart`)
      btnText.textContent = `Done`
    }, 100)
}

// anim error add to cart
function animError() {

  const btnAddToCart = document.querySelector(`.current__add-to-cart`)
  const btnText = btnAddToCart.querySelector(`.current__add-to-cart-text`)
  const btnIcon = btnAddToCart.querySelector(`.current__add-to-cart-icon`)

  btnAddToCart.setAttribute(`disabled`, '')

  btnText.style.color = `red`
  btnIcon.style.fill = `red`

  btnAddToCart.classList.add(`btn__anim-error`)
  btnText.classList.add(`btn__text-error`)

  setTimeout(() => {

    btnText.style.color = `rgba(255,68,0,0.839)`
    btnIcon.style.fill = `rgba(255,68,0,0.839)`
              
    btnAddToCart.classList.remove('btn__anim-error')
    btnAddToCart.removeAttribute(`disabled`)
    
  },300)
}

// IOS settings
function IOSsettings() {

  let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;

  const btnAddToCart = document.querySelector(`.current__add-to-cart`)
  const btnText = btnAddToCart.querySelector(`.current__add-to-cart-text`)

  if (isIOS) {
    btnAddToCart.style.gap = `5px`
    btnText.style.fontSize = `12px`
  } else {
    btnText.style.fontSize = `16px`
  }
}

