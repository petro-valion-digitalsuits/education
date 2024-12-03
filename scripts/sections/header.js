/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const selectors = {
  body: 'body',
  buttonMenu: '.js-toggle-mobile-menu',
  menuWrapper: '.header__wrapper',
  submenuLink: '.js-toggle-submenu',

  bodyOverflow: 'body--overflow-hidden',
  activeMenu: 'header__menu--active',
  activeMenuButton: 'header__menu-button--active',
  activeSubmenuLink: 'header__menu-submenu-item--active',
};

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

  const currentLink = e.currentTarget;

  currentLink.classList.toggle(selectors.activeSubmenuLink);
}

const load = () => {
  const buttonMenu = document.querySelector(selectors.buttonMenu);
  const submenuLinks = document.querySelectorAll(selectors.submenuLink);

  buttonMenu?.addEventListener('click', toggleMobileMenu);

  submenuLinks.forEach((link) => {
    link.addEventListener('click', toggleSubmenu);
  });

  window.addEventListener('resize', () => {
    document.documentElement.style.setProperty('--window-height', `${window.innerHeight}px`);
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
