if (!customElements.get('cart-drawer')) {
  class CartDrawer extends HTMLElement {
    constructor() {
      super();

      this.selectors = {
        drawerOpen: '.js-open-drawer',
        drawerClose: '.js-close-drawer',
        drawer: '.cart-drawer',
        sectionContent: '.js-content',
        body: 'body',

        drawerActiveClass: 'cart-drawer--active',
        bodyOverflowClass: 'body--overflow-hidden',
      };

      this.initEventListeners();
    }

    initEventListeners() {
      this.handleDrawerState = this.handleDrawerState.bind(this);

      document.querySelectorAll(this.selectors.drawerOpen).forEach((el) =>
        el.addEventListener('click', (e) => this.handleDrawerState(e, true))
      );

      document.querySelectorAll(this.selectors.drawerClose).forEach((el) =>
        el.addEventListener('click', (e) => this.handleDrawerState(e, false))
      );
    }

    handleDrawerState(e, open) {
      e.preventDefault();
      e.stopPropagation();

      const drawer = document.querySelector(this.selectors.drawer);
      const body = document.querySelector(this.selectors.body);

      if (drawer && body) {
        drawer.classList.toggle(this.selectors.drawerActiveClass, open);
        body.classList.toggle(this.selectors.bodyOverflowClass, open);
      }
    }

    async updateCartDrawer() {
      try {
        const response = await fetch(`?section_id=cart-drawer`);
        const responseLayout = new DOMParser().parseFromString(await response.text(), 'text/html');
        const currentContent = document.querySelector(this.selectors.sectionContent);
        const newContent = responseLayout.querySelector(this.selectors.sectionContent);

        if (currentContent && newContent) {
          currentContent.outerHTML = newContent.outerHTML;
          this.initEventListeners();
        }
      } catch (error) {
        console.error('Error updating cart drawer:', error);
      }
    }
  }

  customElements.define('cart-drawer', CartDrawer);
}
