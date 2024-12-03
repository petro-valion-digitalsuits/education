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

/***/ "./styles/sections/cart-drawer.scss":
/*!******************************************!*\
  !*** ./styles/sections/cart-drawer.scss ***!
  \******************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./styles/sections/cart-drawer.scss?");

/***/ }),

/***/ "./scripts/sections/cart-drawer.js":
/*!*****************************************!*\
  !*** ./scripts/sections/cart-drawer.js ***!
  \*****************************************/
/***/ (function() {

eval("if (!customElements.get('cart-drawer')) {\n  class CartDrawer extends HTMLElement {\n    constructor() {\n      super();\n\n      this.selectors = {\n        drawerOpen: '.js-open-drawer',\n        drawerClose: '.js-close-drawer',\n        drawer: '.cart-drawer',\n        sectionContent: '.js-content',\n        body: 'body',\n\n        drawerActiveClass: 'cart-drawer--active',\n        bodyOverflowClass: 'body--overflow-hidden',\n      };\n\n      this.initEventListeners();\n    }\n\n    initEventListeners() {\n      this.handleDrawerState = this.handleDrawerState.bind(this);\n\n      document.querySelectorAll(this.selectors.drawerOpen).forEach((el) =>\n        el.addEventListener('click', (e) => this.handleDrawerState(e, true))\n      );\n\n      document.querySelectorAll(this.selectors.drawerClose).forEach((el) =>\n        el.addEventListener('click', (e) => this.handleDrawerState(e, false))\n      );\n    }\n\n    handleDrawerState(e, open) {\n      e.preventDefault();\n      e.stopPropagation();\n\n      const drawer = document.querySelector(this.selectors.drawer);\n      const body = document.querySelector(this.selectors.body);\n\n      if (drawer && body) {\n        drawer.classList.toggle(this.selectors.drawerActiveClass, open);\n        body.classList.toggle(this.selectors.bodyOverflowClass, open);\n      }\n    }\n\n    async updateCartDrawer() {\n      try {\n        const response = await fetch(`?section_id=cart-drawer`);\n        const responseLayout = new DOMParser().parseFromString(await response.text(), 'text/html');\n        const currentContent = document.querySelector(this.selectors.sectionContent);\n        const newContent = responseLayout.querySelector(this.selectors.sectionContent);\n\n        if (currentContent && newContent) {\n          currentContent.outerHTML = newContent.outerHTML;\n          this.initEventListeners();\n        }\n      } catch (error) {\n        console.error('Error updating cart drawer:', error);\n      }\n    }\n  }\n\n  customElements.define('cart-drawer', CartDrawer);\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/sections/cart-drawer.js?");

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
/******/ 	__webpack_modules__["./scripts/sections/cart-drawer.js"](0, {}, __webpack_require__);
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./styles/sections/cart-drawer.scss"](0, __webpack_exports__, __webpack_require__);
/******/ 	
/******/ })()
;