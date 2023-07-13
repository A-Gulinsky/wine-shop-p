import signIn from "./sign-in.js"
import signUp from "./sign-up.js"

const register = document.querySelector('.entrance__sign-up')
const login = document.querySelector('.entrance__sign-in')

const exit = document.querySelector('.exit')

// if the exit button is visible, the exit function is active
// if not , the login and registration functions are active
if (exit) {
    logout()
} else {
  login.addEventListener('click', signIn)
  register.addEventListener('click',signUp)
}

// logout
function logout() {

  exit.addEventListener(`click`, () => {
   fetch('/logout', { method: 'POST' })
    .then(response => {
      if (response.ok) {
        window.location.href = '/';
        
      } else {
        throw new Error('Server Error');
      }
    })
    .catch(error => console.error(error));
})
}