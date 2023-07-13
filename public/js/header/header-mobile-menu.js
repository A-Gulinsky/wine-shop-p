import signIn from "../main/entrance/entrance-components/sign-in.js"
import signUp from "../main/entrance/entrance-components/sign-up.js"

const mobileBtn = document.querySelector('.navbar__btn')
const navBarMenu = document.querySelector('.navbar_menu')

// open mobile menu
mobileBtn.addEventListener(`click`, mobileMenu)

function mobileMenu() {
  mobileBtn.classList.add(`menu-open`)

  if (mobileBtn.classList.contains('menu-open')) {
    navBarMenu.style.transform = `translateX(0)`
  }
}

// mobile menu close button
const btnClose = document.querySelector('.navbar__btn-close')

btnClose.addEventListener(`click`, () => {
  mobileBtn.classList.remove(`menu-open`)
  navBarMenu.style.transform = `translateX(100%)`
})

const mobileSignIn = document.querySelector('.mobile-entrance__sign-in')
const mobileSignUp = document.querySelector('.mobile-entrance__sign-up')
const mobileExit = document.querySelector('.mobile-entrance__exit')
const mobileUserBox = document.querySelector('.mobile__user-box')

const mobileNavItemFirstChild = document.querySelector('.mobile__nav-item--first-child')

if (mobileUserBox) {
    
  mobileNavItemFirstChild.style.justifyContent = 'center'


     mobileExit.addEventListener(`click`, () => {
      fetch('/logout', { method: 'POST' })
       .then(response => {
         if (response.ok) {
           window.location.href = '/';
           
         } else {
           throw new Error('Ошибка запроса на сервер');
         }
       })
       .catch(error => console.error(error));
     }) 
} else {
  
    mobileSignIn.addEventListener(`click`, () => {
      navBarMenu.style.transform = `translateX(100%)`
      signIn()
    })
      
    mobileSignUp.addEventListener(`click`, () => {
      navBarMenu.style.transform = `translateX(100%)`
      signUp()
    })
  }
