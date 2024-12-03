if (!customElements.get('cart-items')) {
  class CartItems extends HTMLElement {
    constructor() {
      super();

      this.selectors = {
        updateHandler: '.js-update-item',
        submitFormHandler: '.js-submit-form',
        updateBlurHandler: '.js-update-item-blur',
        cartDrawer: 'cart-drawer',
        form: 'form',
        cartList: '.cart-list'
      };

      this.cartDrawer = document.querySelector(this.selectors.cartDrawer);

      this.initEventListeners();
    }

    initEventListeners() {
      this.updateHandlers = document.querySelectorAll(this.selectors.updateHandler);
      this.submitFormHandlers = document.querySelectorAll(this.selectors.submitFormHandler);
      this.updateBlurHandlers = document.querySelectorAll(this.selectors.updateBlurHandler);

      this.updateHandlers.forEach((handler) =>
        handler.addEventListener('click', (e) => this.updateItem(e))
      );

      this.submitFormHandlers.forEach((handler) =>
        handler.addEventListener('submit', (e) => this.updateItem(e))
      );

      this.updateBlurHandlers.forEach((handler) =>
        handler.addEventListener('blur', (e) => this.triggerFormSubmit(e))
      );
    }

    triggerFormSubmit(e) {
      e.preventDefault();

      const form = e.target.closest(this.selectors.form);
      if (form) {
        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });
        form.dispatchEvent(submitEvent);
      }
    }

    async updateItem(e) {
      e.preventDefault();

      const target = e.currentTarget;
      const quantityInput = target.querySelector('input');
      const quantity = quantityInput ? quantityInput.value : +target.dataset.quantity;
      const id = +target.dataset.id;
      const updates = { [id]: quantity };

      try {
        const response = await fetch(`${window.Shopify.routes.root}cart/update.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ updates }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        if (this.cartDrawer?.updateCartDrawer) {
          await this.cartDrawer.updateCartDrawer();
        }
      } catch (error) {
        console.error('Error updating cart:', error);
      }
    }
  }

  customElements.define('cart-items', CartItems);
}
