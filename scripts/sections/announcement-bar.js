/* eslint-disable no-inner-declarations */
/* eslint-disable no-undef */
import { register } from '@shopify/theme-sections';

const sectionName = 'announcement-bar';

if (sectionName in Shopify.theme.sections.registered) {
  const sections = document.querySelectorAll(`[data-section-type=${sectionName}]`);
  sections.forEach((section, index) => {
    const linkTag = section.querySelector('link');
    const scriptTag = section.querySelector('script');

    if (index !== 0) {
      linkTag?.remove();
      scriptTag?.remove();
    }
  });
} else {
  const selectors = {
    announcement: '.announcement-bar__wrapper',
    announcementTags: '.p--tag',
    timerWrapper: '[data-timer]',
  };

  function replaceTimerPlaceholder() {
    const announcementBars = document.querySelectorAll(selectors.announcement);

    announcementBars.forEach((bar) => {
      bar.innerHTML = bar.innerHTML.replaceAll('${timer}', '<span data-timer></span>');

      const tags = bar.querySelectorAll(selectors.announcementTags);

      tags.forEach((tag) => {
        if (bar.dataset.time && tag.dataset.timerText) {
          tag.innerHTML = tag.dataset.timerText;
        }
      });
    });
  }

  function calculateTimer(bar, countDownDate, interval) {
    const now = new Date().getTime();
    const distance = countDownDate - now;
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);
    const timerWrapper = bar.querySelectorAll(selectors.timerWrapper);

    timerWrapper.forEach((time) => {
      if (distance > 0) {
        time.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;
      } else {
        const closestTag = time.closest(selectors.announcementTags);

        closestTag.innerHTML = closestTag.dataset.default;
        clearInterval(interval);
      }
    });
  }

  const load = () => {
    if (Shopify.theme.sections.registered[sectionName].isCalled) return;

    const announcementBars = document.querySelectorAll(selectors.announcement);

    replaceTimerPlaceholder();
    announcementBars.forEach((bar) => {
      if (bar.dataset.time) {
        const countDownDate = new Date(bar.dataset.time).getTime();

        const interval = setInterval(() => {
          calculateTimer(bar, countDownDate, interval);
        }, 1000);
      }
    });

    Shopify.theme.sections.registered[sectionName].isCalled = true;
  };

  const unload = () => {};

  register(sectionName, {
    async onLoad() {
      load();
    },
    onUnload() {
      unload();
    },
  });
}
