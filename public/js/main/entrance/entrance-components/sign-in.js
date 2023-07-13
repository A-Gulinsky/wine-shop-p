import Modal from "../../../modal/modal.js";
import { sendFormDataSignIn } from "./send-form-data.js";
const modal = new Modal(".backdrop", ".modal", ".modal__button");

const modalWindow = document.querySelector(`.modal`)
const modalText = document.querySelector('.modal__info')

export default async function signIn() {

  // modal css class
  modalWindow.classList.add('modal__sign-in')
  modalText.innerHTML = '';

  // fetch modal-signin.hbs template
  const source = await fetch('/templates/modal-signin.hbs').then(resp => resp.text())
  modalText.innerHTML = source

  // open modal
  modal.open()
  modal.init(modalWindow, 'modal__sign-in')

  // function send data sign in
  entriesSignIn() 
}

// function sign in 
function entriesSignIn() {

  const form = document.getElementById('signin-form')

  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formDataOne = new FormData(form);
    const formData = Object.fromEntries(formDataOne.entries());

    formData['username'] = username.value;

    formData['password'] = password.value;

    await sendFormDataSignIn(formData)
  })
}