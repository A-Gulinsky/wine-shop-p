// handlebars Helper
import HbsHelper from "../../../classes/handlebars-helper.js";

// classes
const hbs = new HbsHelper()

const productList = document.querySelector(".product__list");
const currentProduct = document.querySelector(".product__current-product");

// render card template
export default async function renderTemplate(e) {
  const source = await fetch("/templates/product-card.hbs").then((response) =>
    response.text()
  );
  const template = Handlebars.compile(source);

  hbs.HBSrenderTemp()

  currentProduct.style.display = `none`
  productList.style.display = `flex`

  productList.innerHTML = template(e)
  productSettings(productList)
}


// settings productList
function productSettings(productList) {
  const productItemsArray = [...productList.children]

  productItemsArray.forEach(item => {
    wineTitleFontSize(item)
    wineBtnTextFontSize(item)
  })
}

// if wine title length is long
function wineTitleFontSize(item) {
  const wineTitle = item.querySelector(`.product__info-name`)
    const length = wineTitle.textContent.length
    if (length > 39) {
      wineTitle.style.fontSize = '16px'
    }
}

// change BTN font size (IOS settings)
function wineBtnTextFontSize(item) {
  let isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
  const productBtnFontSize = item.querySelector(`.product__cart-btn`)

    if (isIOS) {
      productBtnFontSize.style.fontSize = `12px`
    } else {
      productBtnFontSize.style.fontSize = `16px`
    }
}



