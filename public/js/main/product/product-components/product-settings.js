import fetchByFilter from "./product-filter.js";
import searchFetch from "./product-query.js";

const form = document.getElementById('filter-form');
const search = document.querySelector('.search')

// filter form
form.addEventListener('submit', fetchByFilter)
// search form
search.addEventListener(`submit`, searchFetch)