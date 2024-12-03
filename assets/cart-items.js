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

/***/ "./scripts/cart-items.js":
/*!*******************************!*\
  !*** ./scripts/cart-items.js ***!
  \*******************************/
/***/ (function() {

eval("if (!customElements.get('cart-items')) {\n  class CartItems extends HTMLElement {\n    constructor() {\n      super();\n\n      this.selectors = {\n        updateHandler: '.js-update-item',\n        submitFormHandler: '.js-submit-form',\n        updateBlurHandler: '.js-update-item-blur',\n        cartDrawer: 'cart-drawer',\n        form: 'form',\n        cartList: '.cart-list'\n      };\n\n      this.cartDrawer = document.querySelector(this.selectors.cartDrawer);\n\n      this.initEventListeners();\n    }\n\n    initEventListeners() {\n      this.updateHandlers = document.querySelectorAll(this.selectors.updateHandler);\n      this.submitFormHandlers = document.querySelectorAll(this.selectors.submitFormHandler);\n      this.updateBlurHandlers = document.querySelectorAll(this.selectors.updateBlurHandler);\n\n      this.updateHandlers.forEach((handler) =>\n        handler.addEventListener('click', (e) => this.updateItem(e))\n      );\n\n      this.submitFormHandlers.forEach((handler) =>\n        handler.addEventListener('submit', (e) => this.updateItem(e))\n      );\n\n      this.updateBlurHandlers.forEach((handler) =>\n        handler.addEventListener('blur', (e) => this.triggerFormSubmit(e))\n      );\n    }\n\n    triggerFormSubmit(e) {\n      e.preventDefault();\n\n      const form = e.target.closest(this.selectors.form);\n      if (form) {\n        const submitEvent = new Event('submit', { bubbles: true, cancelable: true });\n        form.dispatchEvent(submitEvent);\n      }\n    }\n\n    async updateItem(e) {\n      e.preventDefault();\n\n      const target = e.currentTarget;\n      const quantityInput = target.querySelector('input');\n      const quantity = quantityInput ? quantityInput.value : +target.dataset.quantity;\n      const id = +target.dataset.id;\n      const updates = { [id]: quantity };\n\n      try {\n        const response = await fetch(`${window.Shopify.routes.root}cart/update.js`, {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          body: JSON.stringify({ updates }),\n        });\n\n        if (!response.ok) {\n          throw new Error(`HTTP error! status: ${response.status}`);\n        }\n\n        if (this.cartDrawer?.updateCartDrawer) {\n          await this.cartDrawer.updateCartDrawer();\n        }\n      } catch (error) {\n        console.error('Error updating cart:', error);\n      }\n    }\n  }\n\n  customElements.define('cart-items', CartItems);\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/cart-items.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/cart-items.js"]();
/******/ 	
/******/ })()
;