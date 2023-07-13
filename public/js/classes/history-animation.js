// page cart/order history animtaions
export default class historyAnim {
  constructor(title, list, historyTitle, historyList,footer) {
    this.title = document.querySelector(title);
    this.list = document.querySelector(list);
    this.historyTitle = document.querySelector(historyTitle);
    this.historyList = document.querySelector(historyList);
    this.footer = document.querySelector(footer)
  }

  startAnim() {
    if (this.title.classList.contains('open-anim')) {
      this.title.classList.remove('open-anim');
      this.list.classList.remove('open-anim');
      this.footer.classList.remove('open-anim')
    }

    this.title.classList.add('close-anim');
    this.list.classList.add('close-anim');
    this.footer.classList.add(`close-anim`);

    setTimeout(() => {
      this.title.style.display = 'none';
      this.list.style.display = 'none';
      this.footer.style.display = `none`;
      this.historyTitle.style.opacity = '0';
      this.historyList.style.opacity = '0';
      this.footer.style.opacity = `0`;
      this.title.classList.remove('close-anim');
      this.list.classList.remove('close-anim');
      this.footer.classList.remove(`close-anim`)
    }, 1050);

    setTimeout(() => {
      this.historyTitle.classList.add('open-anim');
      this.historyList.classList.add('open-anim');
      this.footer.classList.add(`open-anim`)
      this.historyTitle.style.display = 'block';
      this.historyList.style.display = 'block';
      this.footer.style.display = `flex`;

      setTimeout(() => {
        this.historyTitle.style.opacity = '1';
        this.historyList.style.opacity = '1';
        this.footer.style.opacity = `1`;
      }, 1200);
    }, 1200);
  }

  closeAnim() {
    this.historyTitle.classList.remove('open-anim');
    this.historyList.classList.remove('open-anim');
    this.footer.classList.remove('open-anim')
    this.historyTitle.classList.add('close-anim');
    this.historyList.classList.add('close-anim');
    this.footer.classList.add('close-anim');

    setTimeout(() => {
      this.historyTitle.style.display = 'none';
      this.historyList.style.display = 'none';
      this.footer.style.display = `none`
      this.title.style.opacity = '0';
      this.list.style.opacity = '0';
      this.footer.style.opacity = `0`;
      this.historyTitle.classList.remove('close-anim');
      this.historyList.classList.remove('close-anim');
      this.footer.classList.remove('close-anim');
    }, 1050);

    setTimeout(() => {
      this.footer.classList.add('open-anim');
      this.title.classList.add('open-anim');
      this.list.classList.add('open-anim');
      this.title.style.display = 'block';
      this.list.style.display = 'block';
      this.footer.style.display = `flex`;

      setTimeout(() => {
        this.title.style.opacity = '1';
        this.list.style.opacity = '1';
        this.footer.style.opacity = `1`;
      }, 1200);
    }, 1200);
  }

}