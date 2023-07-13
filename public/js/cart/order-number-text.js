// order text
function abbreviatedOrderNumberNameOnMobileScreen() {
  const orderNumberText = document.querySelectorAll(`.order__number-text`)

  const orderElOfMassive = [...orderNumberText]

  orderElOfMassive.forEach(el => {
    if (window.innerWidth <= 600) {
      el.textContent = `Ord. №`
    } else if (window.innerWidth > 600) {
      el.textContent = `Order №`
    }
  })
}

abbreviatedOrderNumberNameOnMobileScreen()