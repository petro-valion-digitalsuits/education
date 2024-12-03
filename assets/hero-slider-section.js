/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./styles/sections/hero-slider-section.scss":
/*!**************************************************!*\
  !*** ./styles/sections/hero-slider-section.scss ***!
  \**************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./styles/sections/hero-slider-section.scss?");

/***/ }),

/***/ "./scripts/sections/hero-slider-section.js":
/*!*************************************************!*\
  !*** ./scripts/sections/hero-slider-section.js ***!
  \*************************************************/
/***/ (function() {

eval("if (!customElements.get('hero-slider')) {\n  class HeroSlider extends HTMLElement {\n    constructor() {\n      super();\n\n      this.selectors = {\n        swiper: '.swiper',\n        title: '.heroSlide__content .h1',\n      };\n\n      const swiper = this.initSlider();\n      const titles = this.querySelectorAll(this.selectors.title);\n\n      swiper.on('slideChange', this.onSlideChange.bind(this)); // If you need to use other functions you can bind this(you still can use event object in this function)\n      titles.forEach((title) => {\n        title.addEventListener('click', this.onTitleClick); // If you just need to oparate with event without touching any other functions\n      });\n    }\n\n    initSlider() {\n      return new window.Swiper(this.querySelector(this.selectors.swiper), {\n        speed: 1000,\n        loop: true,\n      });\n    }\n\n    onSlideChange() {\n      console.log(this); // This will be reflecting to the whole Class function\n    }\n\n    onTitleClick(e) {\n      console.log(e); // Here you will get the whole event object\n      console.log(this); // Here you will get current element(like e.currentTarget)\n    }\n  }\n\n  customElements.define('hero-slider', HeroSlider);\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/sections/hero-slider-section.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	__webpack_modules__["./scripts/sections/hero-slider-section.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./styles/sections/hero-slider-section.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;