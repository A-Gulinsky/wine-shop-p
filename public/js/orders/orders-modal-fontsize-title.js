// fontsize title settings

export default function modalProductTitleFontSize(modalInfo) {
  const modalWineTitleFontSize = modalInfo.querySelector(`.modal__wine-el-description`)
    const wineTitle = modalWineTitleFontSize.textContent

    if (wineTitle.length >= 38) {
      modalWineTitleFontSize.style.fontSize = `12px`
    }
}