
const btnAddtoStory = document.querySelector(`.cart__processed-btn-story`)

// if the user is not logged in
const errorSection = document.querySelector(`.cart__error`)

if (!errorSection) {
  btnAddtoStory.addEventListener(`click`, btnHistory)
}

// 
function btnHistory(e) {
  e.preventDefault()

  fetch("/cart/story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      })
    .then((response) => response.json())
    .then(data => {
      window.location.href = '/cart'
    })  
}