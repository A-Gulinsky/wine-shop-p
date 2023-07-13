import { renderCurrentTemplate } from "./render-current-temp.js";

// Open currentItem
export default function currentItem(e) {
  const productItem = e.target.closest(".product__item");
  const isProductItem = productItem !== null;

  if (!isProductItem) {
    return;
  }

  // render current item
  renderCurrentProduct(productItem)
}

// render current product
 function renderCurrentProduct(productItem) {

  const currentProduct = document.querySelector(".product__current-product");

  const currentProductId = productItem.getAttribute("wineid");
  // fetch by ID current product
   fetch(`/wines/${currentProductId}`)
    .then((response) => response.json())
    .then((data) => {
      
      
      // render current template
      currentProduct.innerHTML = renderCurrentTemplate(data);
      
      // anim Smooth transition
      targetProductAnim()

    })
    .catch((error) => console.error(error));
}

// anim Smooth transition
function targetProductAnim() {
  const productList = document.querySelector(".product__list");
  const currentProduct = document.querySelector(".product__current-product");
  
  const sectionCountryList = document.querySelector(`.country-info`)
  const footerContainer = document.querySelector(`.footer-container`)

  if (productList.classList.contains('open-anim')) {
    productList.classList.remove('open-anim-list')
    footerContainer.classList.remove(`open-anim`)
    sectionCountryList.classList.remove (`open-anim`)
  }

  productList.classList.add(`close-anim`)
  sectionCountryList.classList.add('close-anim')
  footerContainer.classList.add('close-anim')
  setTimeout(() => {
    productList.style.display = `none`
    sectionCountryList.style.display = `none`
    
    currentProduct.style.opacity = "0";
    sectionCountryList.style.opacity = `0`
    footerContainer.style.opacity = `0`
    productList.classList.remove(`close-anim`)
    sectionCountryList.classList.remove('close-anim')
    footerContainer.classList.remove('close-anim')
  }, 1000)

  setTimeout(() => {
    currentProduct.classList.add(`open-anim`)
    footerContainer.classList.add('open-anim')
    currentProduct.style.display = `block`
        
  setTimeout(() => {
    currentProduct.style.opacity = `1`
    footerContainer.style.opacity = `1`
    }, 1200)
  },1200)
}