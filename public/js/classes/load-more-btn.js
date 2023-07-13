// btn load more class 
export default class LoadMoreBtn {
  constructor() { 
    
  }
  
  getRefs() {
    const refs = {}
    refs.button = document.querySelector('.product__btn-load-more')
    return refs
  }

  open() {
    const {button} = this.getRefs()
    button.style.display = 'flex'
  }
  close() {
    const {button} = this.getRefs()
    button.style.display = 'none'
  }
}