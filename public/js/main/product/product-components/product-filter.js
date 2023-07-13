import renderTemplate from "./render-temp.js";
import Loading from "../../../classes/loading-animation.js";
import loadMoreBtn from '../../../classes/load-more-btn.js';

const load = new Loading()
const loadBtn = new loadMoreBtn()

const form = document.getElementById('filter-form');
const productList = document.querySelector('.product__list')

let currentPosition = 3; // current position for load additional items
const productsPerLoad = 3; // Number of items to download on each click

let currentFilters = {}

const btnLoadMore = document.querySelector(`.product__btn-load-more`)

let productListArray = []

// fetch by FILTER
export default async function fetchByFilter(event) {
  
  try {

    productList.innerHTML = '';
    event.preventDefault();
    productListArray = []

    currentPosition = 3

    const formData = new FormData(form);

    const body = {
      color: formData.getAll('color'),
      minPrice: formData.get('minPrice'),
      maxPrice: formData.get('maxPrice'),
      minYear: formData.get('minYear'),
      maxYear: formData.get('maxYear'),
      country: formData.getAll('country')
    };

    currentFilters = body;

    // anim btn loading start
    load.filterLoading(`.filter__btn-submit`, true)


    const response = await fetch('/wines', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });

    const wines = await response.json();
  
    if (!response.ok) {
      throw new Error(`Something wrong...`)  
    }
    
    // if wines array length is 0 
    if (!wines.length) {
      Notiflix.Notify.info(`We didn't find any wines for your search`)
      load.filterLoading(`.filter__btn-submit`, false)
      loadBtn.close()
      return
    }

    // if wines array length <= 2 - btn load more display none
    if (wines.length > 0 && wines.length <= 2) {
      productListArray.push(...wines)
      renderTemplate(wines)
      load.filterLoading(`.filter__btn-submit`, false)
      loadBtn.close()
      return
    }

    // push found item into an array
    productListArray.push(...wines)

    // render list
    renderTemplate(wines)

    // load btn display - flex
    loadBtn.open()

    // anim loading btn stop
    load.filterLoading(`.filter__btn-submit`, false)
  

  } catch (err) {
    Notiflix.Notify.failure(`${err}`)
  }

};

// btn load more
btnLoadMore.addEventListener(`click`, btnLoadMoreFunc)

async function btnLoadMoreFunc() {

  try {
    
    // anim loading btn start
    load.btnLoadMore('.product__btn-load-more', true)

    const formData = new FormData(form);

    const body = {
      currentPosition: currentPosition,
      productsPerLoad: productsPerLoad,
      color: formData.getAll('color'),
      minPrice: formData.get('minPrice'),
      maxPrice: formData.get('maxPrice'),
      minYear: formData.get('minYear'),
      maxYear: formData.get('maxYear'),
      country: formData.getAll('country')
    }
  
    const response = await fetch('/load-more', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
    
    if (!response.ok) {
      throw new Error(`Something wrong...`)
    }

    const wines = await response.json()  
      
    // push next items to array
    productListArray.push(...wines)

    // render 
    renderTemplate(productListArray)
    
    // update current position for next request
    currentPosition += productsPerLoad;
    
    // anim load btn stop
    load.btnLoadMore('.product__btn-load-more', false)
      
    // if the item you requested is no longer found
    if (wines.length <= 2) {
      Notiflix.Notify.info(`This is all we could find`)
      btnLoadMore.style.display = `none`
      return
    }
    
  } catch (err) {
    Notiflix.Notify.failure(`${err}`)
  }
}


