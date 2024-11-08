/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const selectors = {
  body: 'body',
  buttonMenu: '.js-toggle-mobile-menu',
  menuWrapper: '.header__wrapper',
  submenuLink: '.js-toggle-submenu',
  predictiveSearch: '.predictive-search',
  searchField: '.predictive-search__field',
  searchTitleEmpty: '.predictive-search__title-empty',
  searchContent: '.predictive-search__content',
  slider: '.js-init-search-slider',
  searchContentNotEmpty: '.predictive-search__content:not(.predictive-search__content--empty)',
  productItem: '.product-item',
  searchIcon: '.js-toggle-search',
  stampdeProducts: '.stamped__json',
  productReview: '.product-item__reviews',

  bodyOverflow: 'body--overflow-hidden',
  activeMenu: 'header__menu--active',
  activeMenuButton: 'header__menu-button--active',
  activeSubmenuLink: 'header__menu-submenu-item--active',
  searchContentEmpty: 'predictive-search__content--empty',
  searchContentFill: 'predictive-search__content--fill',
  productItemActive: 'product-item--active',
  predictiveSearchActive: 'predictive-search--active',
};

const headerSectionId = document.querySelector(selectors.menuWrapper).dataset.sectionId;

document.documentElement.style.setProperty('--window-height', `${window.innerHeight}px`);

function toggleMobileMenu(e) {
  const buttonMenu = e.currentTarget;
  const body = document.querySelector(selectors.body);
  const menuWrappers = document.querySelectorAll(selectors.menuWrapper);

  body.classList.toggle(selectors.bodyOverflow);
  buttonMenu.classList.toggle(selectors.activeMenuButton);

  menuWrappers.forEach((menu) => {
    menu.classList.toggle(selectors.activeMenu);
  });
}

function toggleSubmenu(e) {
  e.preventDefault();

  const currenLink = e.currentTarget;

  currenLink.classList.toggle(selectors.activeSubmenuLink);
}

function debounce(fn, wait) {
  let t;

  return (...args) => {
    clearTimeout(t);

    t = setTimeout(() => fn.apply(this, args), wait);
  };
}

async function reinitStamped(productsList) {
  const stampdeProducts = productsList.querySelector(selectors.stampdeProducts);

  const stampedData = await fetch('https://stamped.io/api/widget/badges', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      apiKey: 'pubkey-2cXsxv7981btLY2Uethwj310D169G1',
      productIds: JSON.parse(`[${stampdeProducts.innerHTML}]`),
      storeUrl: `${Shopify.shop}`,
    }),
  });

  const responseDataObject = await stampedData.json();

  responseDataObject.forEach((review) => {
    const currentReview = document.querySelector(`${selectors.productReview}[data-id="${review.productId}"]`);

    currentReview.innerHTML = review.badge;
  });
}

async function searchProducts(e, value) {
  try {
    const searchResponse = await fetch(`/search/suggest?q=${value}&resources[limit]=10&resources[type]=product&resources[options][unavailable_products]=hide&section_id=${headerSectionId}`);
    const responseContent = new DOMParser().parseFromString(await searchResponse.text(), 'text/html');

    if (!searchResponse.ok) {
      const errorObject = await searchResponse.json();

      throw new Error(errorObject.description);
    }

    if (e.key === 'Enter' || e.code === 'Enter') {
      window.location.href = `/search?q=${value}&type=product`;

      return;
    }

    const searchTitleEmpty = responseContent.querySelector(selectors.searchTitleEmpty);
    const searchContentResponse = responseContent.querySelector(selectors.searchContent);
    const searchContent = document.querySelector(selectors.searchContent);
    const body = document.querySelector(selectors.body);

    body.classList.add(selectors.bodyOverflow);
    searchContent.innerHTML = searchContentResponse.innerHTML;

    if (searchTitleEmpty) {
      searchContent.classList.add(selectors.searchContentEmpty);
      searchContent.classList.remove(selectors.searchContentFill);

      const swiper = new Swiper(selectors.slider, {
        slidesPerView: 'auto',
        navigation: {
          nextEl: '.swiper-button__next',
          prevEl: '.swiper-button__prev',
        },
        breakpoints: {
          768: {
            enabled: true,
          },
          320: {
            enabled: false,
          },
        },
      });
    } else {
      searchContent.classList.remove(selectors.searchContentEmpty);
      searchContent.classList.add(selectors.searchContentFill);

      const searchContentNotEmpty = document.querySelector(selectors.searchContentNotEmpty);
      const productsList = searchContentNotEmpty.querySelectorAll(selectors.productItem);
      const observerOptions = {
        threshold: 0.4,
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entire, i) => {
          if (
            entire.isIntersecting
            && !entire.target.classList.contains(selectors.productItemActive)
          ) {
            const visibleProduct = entire.target;

            visibleProduct.classList.add(selectors.productItemActive);
            visibleProduct.style.transitionDelay = `${(i + 1) / 5}s`;
          }
        });
      }, observerOptions);

      productsList.forEach((product) => {
        observer.observe(product);
      });
    }

    await reinitStamped(searchContent);
  } catch (error) {
    console.log(error);
  }
}

function toggleSearch(e) {
  e.preventDefault();

  const predictiveSearch = document.querySelector(selectors.predictiveSearch);

  if (window.location.pathname !== '/search') {
    const searchField = document.querySelector(selectors.searchField);

    predictiveSearch.classList.toggle(selectors.predictiveSearchActive);

    const searchToggleActive = document.querySelector(`.${selectors.predictiveSearchActive}`);

    if (searchToggleActive) {
      searchField.focus();
    } else {
      searchField.blur();
    }
  }
}

const load = () => {
  const buttonMenu = document.querySelector(selectors.buttonMenu);
  const submenuLinks = document.querySelectorAll(selectors.submenuLink);
  const searchField = document.querySelector(selectors.searchField);
  const searchIcons = document.querySelectorAll(selectors.searchIcon);

  const handleSearchInputKeyup = debounce((e, value) => {
    if (value.length !== 0) {
      searchProducts(e, value);
    }
  }, 1000);

  buttonMenu.addEventListener('click', toggleMobileMenu);
  searchField.addEventListener('keyup', (e) => {
    handleSearchInputKeyup(e, e.target.value);
  });

  submenuLinks.forEach((link) => {
    link.addEventListener('click', toggleSubmenu);
  });

  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--window-height', `${window.innerHeight}px`);
  });

  searchIcons.forEach((icon) => {
    icon.addEventListener('click', toggleSearch);
  });
};

const unload = () => {};

register('header', {
  async onLoad() {
    load();
  },
  onUnload() {
    unload();
  },
});
