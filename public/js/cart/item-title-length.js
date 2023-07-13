// if title length >= 40 - font style -px

function itemTitleLength() {
  const titleElements = document.querySelectorAll(`.cart__item-title`)

  const titleElOfMassive = [...titleElements]

  titleElOfMassive.forEach(title => {
  if (title.textContent.length >= 40) {
    title.style.fontSize = `14px`
    title.style.height = `41px`
    }
    
  })
}

itemTitleLength()