if (!customElements.get('predictive-search')) {
  class PredictiveSearch extends HTMLElement {
    constructor() {
      super();

      this.selectors = {
        searchField: '.predictive-search__field',
        searchContent: '.predictive-search__content',
        toggleButton: '.js-toggle-search',
        predictiveSearchWrapper: '.predictive-search',
        productItem: '.product-item',

        productItemActiveClass: 'product-item--active',
      };

      this.classes = {
        active: 'predictive-search--active',
      };

      this.initEventListeners();
    }

    initEventListeners() {
      const searchField = this.querySelector(this.selectors.searchField);
      const toggleButton = document.querySelector(this.selectors.toggleButton);

      if (searchField) {
        searchField.addEventListener('input', this.handleSearchInput.bind(this));
        searchField.addEventListener('keydown', this.handleEnterKey.bind(this));
      }

      if (toggleButton) {
        toggleButton.addEventListener('click', this.toggleSearch.bind(this));
      }
    }

    toggleSearch(e) {
      e.preventDefault();

      const wrapper = document.querySelector(this.selectors.predictiveSearchWrapper);

      if (wrapper) {
        wrapper.classList.toggle(this.classes.active);

        const isActive = wrapper.classList.contains(this.classes.active);
        const searchField = this.querySelector(this.selectors.searchField);

        if (isActive && searchField) {
          searchField.focus();
        } else if (searchField) {
          searchField.blur();
        }
      }
    }

    async handleSearchInput(e) {
      const query = e.target.value.trim();

      try {
        const response = await fetch(`/search/suggest?q=${query}&resources[limit]=10&resources[type]=product&resources[options][unavailable_products]=hide&section_id=sections--23949019742494__header`);

        if (!response.ok) {
          throw new Error(`Error fetching search results: ${response.status}`);
        }

        const html = await response.text();
        this.renderSearchResults(html);
      } catch (error) {
        console.error('Search Error:', error);
      }
    }

    handleEnterKey(e) {
      if (e.key === 'Enter') {
        const query = e.target.value.trim();
        if (query) {
          window.location.href = `/search?q=${encodeURIComponent(query)}&type=product`;
        }
      }
    }

    renderSearchResults(html) {
      const parser = new DOMParser();
      const newDocument = parser.parseFromString(html, 'text/html');
      const newContent = newDocument.querySelector(this.selectors.searchContent);
      const searchContent = this.querySelector(this.selectors.searchContent);

      if (searchContent && newContent) {
        searchContent.innerHTML = newContent.innerHTML;

        const productItems = searchContent.querySelectorAll(this.selectors.productItem);

        if (productItems.length) {
          this.observeProductItems(productItems);
        }
      }
    }

    observeProductItems(productsList) {
      const observerOptions = {
        threshold: 0.4,
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting && !entry.target.classList.contains(this.selectors.productItemActiveClass)) {
            const visibleProduct = entry.target;
            visibleProduct.classList.add(this.selectors.productItemActiveClass);
            visibleProduct.style.transitionDelay = `${(i + 1) / 5}s`;
          }
        });
      }, observerOptions);

      productsList.forEach((product) => {
        observer.observe(product);
      });
    }
  }

  customElements.define('predictive-search', PredictiveSearch);
}
