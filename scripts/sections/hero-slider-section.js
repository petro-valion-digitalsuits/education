if (!customElements.get('hero-slider')) {
  class HeroSlider extends HTMLElement {
    constructor() {
      super();

      this.selectors = {
        swiper: '.swiper',
        title: '.heroSlide__content .h1',
      };

      const swiper = this.initSlider();
      const titles = this.querySelectorAll(this.selectors.title);

      swiper.on('slideChange', this.onSlideChange.bind(this)); // If you need to use other functions you can bind this(you still can use event object in this function)
      titles.forEach((title) => {
        title.addEventListener('click', this.onTitleClick); // If you just need to oparate with event without touching any other functions
      });
    }

    initSlider() {
      return new window.Swiper(this.querySelector(this.selectors.swiper), {
        speed: 1000,
        loop: true,
      });
    }

    onSlideChange() {
      console.log(this); // This will be reflecting to the whole Class function
    }

    onTitleClick(e) {
      console.log(e); // Here you will get the whole event object
      console.log(this); // Here you will get current element(like e.currentTarget)
    }
  }

  customElements.define('hero-slider', HeroSlider);
}
