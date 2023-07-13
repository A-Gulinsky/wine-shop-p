// Loading animation after a certain action

export default class Loading {
  constructor() { }
  
  toggleLoading(filterBtn, isLoading) {
    const btn = document.querySelector(filterBtn);
    const text = btn.querySelector('.filter__btn-submit-text');
    const iconLoad = btn.querySelector('.filter__btn-submit-icon');

    text.style.display = isLoading ? 'none' : 'block';
    iconLoad.style.display = isLoading ? 'block' : 'none';
  }

  // main - filter panel btn load anim
  filterLoading(filterBtn, isLoading) {
    this.toggleLoading(filterBtn, isLoading);
  }

  // main - current card loading anim
  currentItemLoading(productItem, isLoading) {
    const currentLoadIcon = productItem.querySelector('.product__loading-icon')

    currentLoadIcon.style.display = isLoading ? 'block' : 'none'
  }

  // main - target/current btn add to cart
  productAddToCart(targetProductItem, isLoading) {
    const btn = targetProductItem.querySelector('.product__cart-btn')

    // <p> btn text
    const text = btn.children[0]
    // svg btn main icon
    const mainIcon = btn.children[1]
    // svg icon loading
    const loadingIcon = btn.children[2]

    text.style.display = isLoading ? 'none' : 'block'
    mainIcon.style.display = isLoading ? 'none' : 'block'

    loadingIcon.style.display = isLoading ? 'block' : 'none'
  }

  // currentAddToCart
  currentProductAddToCart(btnAddToCart, isLoading) {
    const btn = document.querySelector(btnAddToCart)

    // <p> btn text
    const text = btn.children[0]
    // svg btn main icon
    const mainIcon = btn.children[1]
    // svg icon loading
    const loadingIcon = btn.children[2]

    text.style.display = isLoading ? 'none' : 'block'
    mainIcon.style.display = isLoading ? 'none' : 'block'

    loadingIcon.style.display = isLoading ? 'block' : 'none'
  }

  // cart - btn order(if you choose reservation or delivery)
  // cart btn history load more
  // order btn history load more
  payOrcheckout(btnAnim, isLoading) {
    const btn = document.querySelector(btnAnim)
    const text = btn.children[0]
    const iconLoading = btn.children[1]

    text.style.display = isLoading ? 'none' : 'block';
    iconLoading.style.display = isLoading ? 'block' : 'none';
  }

  newsletterSubscribeBtn(btn, isLoading) {
    const formBtn = document.querySelector(btn)

    const text = formBtn.querySelector(`.footer__newsletter-text`)
    const icon = formBtn.querySelector(`.footer__newsletter-icon`)

    text.style.display = isLoading ? 'none' : 'block'
    icon.style.display = isLoading ? 'block' : 'none'
  }

  // btn load more

  btnLoadMore(btnLoadMore, isLoading) {
    const btn = document.querySelector(btnLoadMore)

    const text = btn.querySelector(`.product__btn-load-more-text`)
    const icon = btn.querySelector(`.product__btn-load-more-icon`)

    text.style.display = isLoading ? `none` : `block`
    icon.style.display = isLoading ? `block` : `none`
  }
}