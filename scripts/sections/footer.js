/* eslint-disable no-unused-expressions */
/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const selectors = {
  formButton: '.js-submit-footer-form',
  mainLink: '.js-toggle-footer-menu',
  form: 'form',
  checkbox: '.checkbox input',
  secondLevelMenu: '.footer__navigation-second',
  checkboxWrapper: '.checkbox',
  footerSelect: '.js-language-select',
  footerAbsoluteWindow: '.footer__bottom-absoulte-window',

  secondLevelMenuActive: 'footer__navigation-second--active',
  activeMenuLink: 'footer__navigation-link--active',
  checkboxErrorClass: 'checkbox__error--active',
};

function submitForm(e) {
  e.preventDefault();

  const currentForm = e.currentTarget.closest(selectors.form);
  const formCheckbox = currentForm.querySelector(selectors.checkbox);
  const checkboxWrapper = currentForm.querySelector(selectors.checkboxWrapper);

  if (formCheckbox.checked) {
    currentForm.submit();
  } else {
    checkboxWrapper.classList.add(selectors.checkboxErrorClass);

    setTimeout(() => {
      checkboxWrapper.classList.remove(selectors.checkboxErrorClass);
    }, 1500);
  }
}

function toggleMenuItem(e) {
  e.preventDefault();
  e.stopPropagation();

  const currentSubmenu = e.currentTarget.nextSibling;

  if (currentSubmenu) {
    currentSubmenu.classList.toggle(selectors.secondLevelMenuActive);
    currentSubmenu.classList.contains(selectors.secondLevelMenuActive)
      ? currentSubmenu.style.maxHeight = `${currentSubmenu.scrollHeight}px`
      : currentSubmenu.style.maxHeight = '0px';
    currentSubmenu.classList.contains(selectors.secondLevelMenuActive)
      ? e.currentTarget.closest('li').classList.add(selectors.activeMenuLink)
      : e.currentTarget.closest('li').classList.remove(selectors.activeMenuLink);
  }
}

function toggleLanguageForm(e) {
  const languageSelectWindow = e.currentTarget.querySelector(selectors.footerAbsoluteWindow);

  if (e.target.dataset.redirect) {
    return;
  }

  if (languageSelectWindow.dataset.opened) {
    languageSelectWindow.style.height = '';
    languageSelectWindow.removeAttribute('data-opened');
  } else {
    const languageLinks = languageSelectWindow.querySelectorAll('a[href]');
    let modalHeight = languageSelectWindow.clientHeight;

    languageLinks.forEach((links) => {
      modalHeight += links.clientHeight;
    });

    languageSelectWindow.style.height = `${modalHeight}px`;
    languageSelectWindow.dataset.opened = 'true';
  }
}

const load = () => {
  const mainLinks = document.querySelectorAll(selectors.mainLink);
  const formButton = document.querySelector(selectors.formButton);
  const languageSelect = document.querySelector(selectors.footerSelect);

  if (window.innerWidth <= 768) {
    mainLinks.forEach((link) => {
      link.addEventListener('click', toggleMenuItem);
    });
  }

  formButton?.addEventListener('click', submitForm);
  languageSelect?.addEventListener('click', toggleLanguageForm);
};

const unload = () => {};

register('footer', {
  async onLoad() {
    load();
  },
  onUnload() {
    unload();
  },
});
