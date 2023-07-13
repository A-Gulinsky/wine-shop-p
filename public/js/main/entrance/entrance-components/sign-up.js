import Modal from "../../../modal/modal.js";
import { sendFormDataSignUp } from "./send-form-data.js";

const modal = new Modal(".backdrop", ".modal", ".modal__button");
const modalText = document.querySelector('.modal__info')
const modalWindow = document.querySelector('.modal')

// signUp
export default async function signUp() {

  // modal class sign up
  modalWindow.classList.add(`modal__sign-up`)
  modalText.innerHTML = ''

  // fetch template
  const source = await fetch('/templates/modal-signup.hbs').then(resp => resp.text())
  modalText.innerHTML = source

  // modal
  modal.open()
  modal.init(modalWindow, 'modal__sign-up')

  // send form data sign up
  entiresSignUp()
}

// function entries signUp
function entiresSignUp() {

  const form = document.getElementById('signup-form')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formDataOne = new FormData(form);
    const formData = Object.fromEntries(formDataOne.entries());

    formData['username'] = username.value;

    formData['password'] = password.value;

    await sendFormDataSignUp(formData)
  })
}