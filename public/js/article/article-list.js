
const articleListInfo = document.querySelector(`.article__info-list`)
const currentArticle = document.querySelector(`.article__current-item`)


articleListInfo.addEventListener(`click`, articleList)

async function articleList(e) {

  // target article item of article list
  const targetItem = e.target.closest(`.article__info-box`)
  

  if (!targetItem) {
    return
  }

  // clear current article
  currentArticle.innerHTML = ''

  // number of article to json object
  const targetItemNumber = Number(targetItem.getAttribute(`number`))
  
  
  
  await fetch('./js/article/articles.json')
    .then(response => response.json())
    .then(data => {
      
      data.forEach(async (article) => {

        if (targetItemNumber === Number(article.id)) {
          

          const source = await fetch("/templates/current-article.hbs").then((response) =>
          response.text());
      
          const template = Handlebars.compile(source);


          currentArticle.innerHTML = template(article)
          
          articleCurrentItemOpenAnim()

          if (currentArticle) {
            const backBtn = currentArticle.querySelector(`.article__back-btn`)
            backBtn.addEventListener(`click`, articleCurrentItemCloseAnim)
          }

        }
      })
    })
}

// anim open current Item
function articleCurrentItemOpenAnim() {
  
  const articleList = document.querySelector(".article__info-list");
  const currentArticle = document.querySelector(".article__current-item");
  
  const footerContainer = document.querySelector(`.footer-container`)

  if (articleList.classList.contains('open-anim')) {
    articleList.classList.remove('open-anim')
    footerContainer.classList.remove(`open-anim`)
  }

  articleList.classList.add(`close-anim`)
  footerContainer.classList.add('close-anim')
  setTimeout(() => {
    articleList.style.display = `none`
    
    currentArticle.style.opacity = "0";
    
    footerContainer.style.opacity = `0`
    articleList.classList.remove(`close-anim`)
    
    footerContainer.classList.remove('close-anim')
  }, 1000)

  setTimeout(() => {
    currentArticle.classList.add(`open-anim`)
    footerContainer.classList.add('open-anim')
    currentArticle.style.display = `block`
        
  setTimeout(() => {
    currentArticle.style.opacity = `1`
    footerContainer.style.opacity = `1`
    }, 1200)
  },1200)
}

// anim close current Item
function articleCurrentItemCloseAnim() {
  
  const articleList = document.querySelector(".article__info-list");
  const currentArticle = document.querySelector(".article__current-item");
  const footerContainer = document.querySelector(`.footer-container`)

  if (currentArticle.classList.contains('open-anim')) {
    currentArticle.classList.remove('open-anim')
    footerContainer.classList.remove(`open-anim`)
    
  }

  currentArticle.classList.add(`close-anim`)
  footerContainer.classList.add('close-anim')
  setTimeout(() => {

    currentArticle.style.display = `none` 
    articleList.style.opacity = "0";
    
    footerContainer.style.opacity = `0`
    currentArticle.classList.remove(`close-anim`)
    
    footerContainer.classList.remove('close-anim')
  }, 1000)

  setTimeout(() => {
    articleList.classList.add(`open-anim`)
    footerContainer.classList.add('open-anim')
    articleList.style.display = `flex`
        
  setTimeout(() => {
    articleList.style.opacity = `1`
    footerContainer.style.opacity = `1`
    }, 1200)
  },1200)
}