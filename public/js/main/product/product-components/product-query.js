import renderTemplate from "./render-temp.js";
import LoadMoreBtn from "../../../classes/load-more-btn.js";

const loadMoreBtn = new LoadMoreBtn()

const productList = document.querySelector('.product__list')

const filter = document.querySelector(`.filter__form`)


export default async function searchFetch(e) {
  
  e.preventDefault();

  productList.innerHTML = ''

  const query = e.target.search.value.trim();
  
  if (!query) {
    
    Notiflix.Notify.warning('The field cannot be empty')
    return
  }

  
  const response = await fetch('/search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ search: query })
  });

  const wines = await response.json();
  
  // if wines length 0 - return notification
  if (!wines.length) {
    Notiflix.Notify.warning('No results found for your search')
    return
  }
  
  // btn load more in search query not use
  loadMoreBtn.close()

  // when loading via query, scroll to the section with the product list
  filter.scrollIntoView({ behavior: "smooth" })
  
  // render
  renderTemplate(wines)
  
  // anim
  animList()
  
  // clear request
  e.target.search.value = ''
}


function animList() {
  const productList = document.querySelector('.product__list')
  

  productList.classList.add(`open-anim-list`)
  

  setTimeout(() => {
    productList.classList.remove(`open-anim-list`)
    
    
    setTimeout(() => {
      productList.style.opacity = `1`
      
    }, 1200)
  }, 1200)
}