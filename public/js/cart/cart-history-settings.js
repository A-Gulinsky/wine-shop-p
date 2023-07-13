
// cart history settings functions
export default function cartHistorySettings(e) {
  e.forEach(item => {

    cartHisotryWineTitleFontSize(item)
    cartHistoryColor(item)
})
}

// font size wine title of cart history items
function cartHisotryWineTitleFontSize(item) {
  const wineTitle = item.querySelector(`.history__main-element--first-child`)
  const length = wineTitle.textContent.length

  if (length >= 39) {
    wineTitle.style.fontSize = `12px`
  }
}

// history change color
function cartHistoryColor(item) {
  const historyItemColor = item.querySelector(`.history__main-element--last-child`)
  const itemColorMean = historyItemColor.textContent

  if (itemColorMean === `red`) {
    historyItemColor.style.color = `rgba(243, 32, 32, 0.938)`
  } else if (itemColorMean === `white`) {
    historyItemColor.style.color = `rgba(249, 239, 199, 0.938)`
  } else if (itemColorMean === `rose`) {
    historyItemColor.style.color = `rgba(245, 106, 215, 0.905)`
  }

}