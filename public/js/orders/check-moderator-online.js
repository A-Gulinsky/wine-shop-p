import renderOrderCard from "./order-list-render.js";

export let ordersData = []
export const orderPanel = document.querySelector(`.order__panel`)

// check if moderator is ONLINE
export default async function checkModeratorOnline() {
  try {
    const ordersMain = document.querySelector('.orders-main');

    // if user role is - user or not logged
    if (ordersMain.children[0].classList.contains('order__error')) {
      return;
    }

    const response = await fetch('/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok || data.error) {
      throw new Error(`Server Error`);
    }

    // render 
    ordersData.push(...data);
    renderOrderCard(data);
  } catch (err) {
    Notiflix.Notify.failure(`${err}`)
  }
}

checkModeratorOnline()