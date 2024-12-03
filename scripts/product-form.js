if (!customElements.get('product-form')) {
  customElements.define(
    'product-form',
    class ProductForm extends HTMLElement {
      constructor() {
        super();

        this.selectors = {
          form: 'form',
          submitButton: 'button[type="submit"]',
          buttonText: '.button__text',
          input: 'input[name="id"]',
          section: '.shopify-section',
          cartIcon: '#icon-cart',
          spinner: '.loading-spinner',
          cartDrawer: 'cart-drawer'
        };

        this.form = this.querySelector(this.selectors.form);
        this.submitButton = this.querySelector(this.selectors.submitButton);
        this.buttonText = this.submitButton.querySelector(this.selectors.buttonText);
        this.spinner = this.submitButton.querySelector(this.selectors.spinner);
        this.cartDrawer = document.querySelector(this.selectors.cartDrawer);

        this.form.addEventListener('submit', this.addToCart.bind(this));
      }

      async addToCart(event) {
        event.preventDefault();

        this.toggleLoading(true);

        let config = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          items: [],
        };

        const itemId = this.form.querySelector(this.selectors.input).value;

        config.items.push({
          id: itemId,
          quantity: 1,
        });

        config.body = JSON.stringify({ items: config.items });

        try {
          const response = await fetch('/cart/add.js', config);

          if (!response.ok) {
            throw new Error('Failed to add product');
          }

          await this.updateCartIcon();
          await this.cartDrawer.updateCartDrawer();
        } catch (error) {
          console.error(error);
        } finally {
          this.toggleLoading(false);
        }
      }

      async updateCartIcon() {
        try {
          const response = await fetch('/?section_id=cart-icon-bubble');
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const newContent = doc.querySelector(this.selectors.section);
          const cartIcon = document.querySelector(this.selectors.cartIcon);

          cartIcon.innerHTML = newContent.innerHTML;
        } catch (error) {
          console.error('Error updating cart icon:', error);
        }
      }

      toggleLoading(isLoading) {
        if (isLoading) {
          this.spinner.style.display = 'inline-block';
          this.buttonText.style.display = 'none';
          this.submitButton.disabled = true;
        } else {
          this.spinner.style.display = 'none';
          this.buttonText.style.display = 'inline-block';
          this.submitButton.disabled = false;
        }
      }
    }
  );
}
