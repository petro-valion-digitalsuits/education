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

/***/ "./scripts/product-form.js":
/*!*********************************!*\
  !*** ./scripts/product-form.js ***!
  \*********************************/
/***/ (function() {

eval("if (!customElements.get('product-form')) {\n  customElements.define(\n    'product-form',\n    class ProductForm extends HTMLElement {\n      constructor() {\n        super();\n\n        this.selectors = {\n          form: 'form',\n          submitButton: 'button[type=\"submit\"]',\n          buttonText: '.button__text',\n          input: 'input[name=\"id\"]',\n          section: '.shopify-section',\n          cartIcon: '#icon-cart',\n          spinner: '.loading-spinner',\n          cartDrawer: 'cart-drawer'\n        };\n\n        this.form = this.querySelector(this.selectors.form);\n        this.submitButton = this.querySelector(this.selectors.submitButton);\n        this.buttonText = this.submitButton.querySelector(this.selectors.buttonText);\n        this.spinner = this.submitButton.querySelector(this.selectors.spinner);\n        this.cartDrawer = document.querySelector(this.selectors.cartDrawer);\n\n        this.form.addEventListener('submit', this.addToCart.bind(this));\n      }\n\n      async addToCart(event) {\n        event.preventDefault();\n\n        this.toggleLoading(true);\n\n        let config = {\n          method: 'POST',\n          headers: { 'Content-Type': 'application/json' },\n          items: [],\n        };\n\n        const itemId = this.form.querySelector(this.selectors.input).value;\n\n        config.items.push({\n          id: itemId,\n          quantity: 1,\n        });\n\n        config.body = JSON.stringify({ items: config.items });\n\n        try {\n          const response = await fetch('/cart/add.js', config);\n\n          if (!response.ok) {\n            throw new Error('Failed to add product');\n          }\n\n          await this.updateCartIcon();\n          await this.cartDrawer.updateCartDrawer();\n        } catch (error) {\n          console.error(error);\n        } finally {\n          this.toggleLoading(false);\n        }\n      }\n\n      async updateCartIcon() {\n        try {\n          const response = await fetch('/?section_id=cart-icon-bubble');\n          const html = await response.text();\n          const parser = new DOMParser();\n          const doc = parser.parseFromString(html, 'text/html');\n          const newContent = doc.querySelector(this.selectors.section);\n          const cartIcon = document.querySelector(this.selectors.cartIcon);\n\n          cartIcon.innerHTML = newContent.innerHTML;\n        } catch (error) {\n          console.error('Error updating cart icon:', error);\n        }\n      }\n\n      toggleLoading(isLoading) {\n        if (isLoading) {\n          this.spinner.style.display = 'inline-block';\n          this.buttonText.style.display = 'none';\n          this.submitButton.disabled = true;\n        } else {\n          this.spinner.style.display = 'none';\n          this.buttonText.style.display = 'inline-block';\n          this.submitButton.disabled = false;\n        }\n      }\n    }\n  );\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/product-form.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/product-form.js"]();
/******/ 	
/******/ })()
;