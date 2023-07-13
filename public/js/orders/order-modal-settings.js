// color settings (reservation or delivery)

export default function productColorChoice(modalInfo, order) {
  orderNumberColor(modalInfo, order)
  orderStatusReservationOrDeliveryColor(modalInfo, order)
  orderStatusIsPaidColor(modalInfo, order)
  orderWineColor(modalInfo, order)
}

function orderNumberColor(modalInfo, order) {
  const orderNumberColor = modalInfo.querySelector(`.modal__order-number-info`)

  if (order.el.orderStatus.reservation) {
    orderNumberColor.style.color = `rgba(51, 113, 246, 0.938)`
  } else if (order.el.orderStatus.delivery) {
    orderNumberColor.style.color = `rgba(243, 32, 32, 0.938)`
  }
}

function orderStatusReservationOrDeliveryColor(modalInfo, order) {
  const modalStatusReservationOrDelivery = modalInfo.querySelector(`.modal__status-info-text--second-child`)

  if (order.el.orderStatus.reservation) {
    modalStatusReservationOrDelivery.style.color = `rgba(51, 113, 246, 0.938)`
  } else if (order.el.orderStatus.delivery) {
    modalStatusReservationOrDelivery.style.color = `rgba(243, 32, 32, 0.938)`
  }
}

function orderStatusIsPaidColor(modalInfo, order) {
  const modalStatusIsPaidColor = modalInfo.querySelector(`.modal__status-info-text--last-child`)

  if (order.el.orderStatus.paid) {
    modalStatusIsPaidColor.style.color = `rgba(14,171,250,0.843)`
  } else if (order.el.orderStatus.delivery) {
    modalStatusIsPaidColor.style.color = `red`
  }
}

function orderWineColor(modalInfo, order) {
  const modalWineElColor = modalInfo.querySelector(`.modal__wine-el-description--color`)

  if (order.el.data.color === `red`) {
    modalWineElColor.style.color = `rgba(243, 32, 32, 0.938)`
  } else if (order.el.data.color === `white`) {
    modalWineElColor.style.color = `rgba(249, 239, 199, 0.938)`
  } else if (order.el.data.color === `rose`) {
    modalWineElColor.style.color = `rgba(245, 106, 215, 0.905)`
  }
}