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

/***/ "./scripts/predictive-search.js":
/*!**************************************!*\
  !*** ./scripts/predictive-search.js ***!
  \**************************************/
/***/ (function() {

eval("if (!customElements.get('predictive-search')) {\n  class PredictiveSearch extends HTMLElement {\n    constructor() {\n      super();\n\n      this.selectors = {\n        searchField: '.predictive-search__field',\n        searchContent: '.predictive-search__content',\n        toggleButton: '.js-toggle-search',\n        predictiveSearchWrapper: '.predictive-search',\n        productItem: '.product-item',\n\n        productItemActiveClass: 'product-item--active',\n      };\n\n      this.classes = {\n        active: 'predictive-search--active',\n      };\n\n      this.initEventListeners();\n    }\n\n    initEventListeners() {\n      const searchField = this.querySelector(this.selectors.searchField);\n      const toggleButton = document.querySelector(this.selectors.toggleButton);\n\n      if (searchField) {\n        searchField.addEventListener('input', this.handleSearchInput.bind(this));\n        searchField.addEventListener('keydown', this.handleEnterKey.bind(this));\n      }\n\n      if (toggleButton) {\n        toggleButton.addEventListener('click', this.toggleSearch.bind(this));\n      }\n    }\n\n    toggleSearch(e) {\n      e.preventDefault();\n\n      const wrapper = document.querySelector(this.selectors.predictiveSearchWrapper);\n\n      if (wrapper) {\n        wrapper.classList.toggle(this.classes.active);\n\n        const isActive = wrapper.classList.contains(this.classes.active);\n        const searchField = this.querySelector(this.selectors.searchField);\n\n        if (isActive && searchField) {\n          searchField.focus();\n        } else if (searchField) {\n          searchField.blur();\n        }\n      }\n    }\n\n    async handleSearchInput(e) {\n      const query = e.target.value.trim();\n\n      try {\n        const response = await fetch(`/search/suggest?q=${query}&resources[limit]=10&resources[type]=product&resources[options][unavailable_products]=hide&section_id=sections--23949019742494__header`);\n\n        if (!response.ok) {\n          throw new Error(`Error fetching search results: ${response.status}`);\n        }\n\n        const html = await response.text();\n        this.renderSearchResults(html);\n      } catch (error) {\n        console.error('Search Error:', error);\n      }\n    }\n\n    handleEnterKey(e) {\n      if (e.key === 'Enter') {\n        const query = e.target.value.trim();\n        if (query) {\n          window.location.href = `/search?q=${encodeURIComponent(query)}&type=product`;\n        }\n      }\n    }\n\n    renderSearchResults(html) {\n      const parser = new DOMParser();\n      const newDocument = parser.parseFromString(html, 'text/html');\n      const newContent = newDocument.querySelector(this.selectors.searchContent);\n      const searchContent = this.querySelector(this.selectors.searchContent);\n\n      if (searchContent && newContent) {\n        searchContent.innerHTML = newContent.innerHTML;\n\n        const productItems = searchContent.querySelectorAll(this.selectors.productItem);\n\n        if (productItems.length) {\n          this.observeProductItems(productItems);\n        }\n      }\n    }\n\n    observeProductItems(productsList) {\n      const observerOptions = {\n        threshold: 0.4,\n      };\n\n      const observer = new IntersectionObserver((entries) => {\n        entries.forEach((entry, i) => {\n          if (entry.isIntersecting && !entry.target.classList.contains(this.selectors.productItemActiveClass)) {\n            const visibleProduct = entry.target;\n            visibleProduct.classList.add(this.selectors.productItemActiveClass);\n            visibleProduct.style.transitionDelay = `${(i + 1) / 5}s`;\n          }\n        });\n      }, observerOptions);\n\n      productsList.forEach((product) => {\n        observer.observe(product);\n      });\n    }\n  }\n\n  customElements.define('predictive-search', PredictiveSearch);\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/predictive-search.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./scripts/predictive-search.js"]();
/******/ 	
/******/ })()
;