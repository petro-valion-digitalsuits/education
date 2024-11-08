/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@shopify/theme-sections/section.js":
/*!*********************************************************!*\
  !*** ./node_modules/@shopify/theme-sections/section.js ***!
  \*********************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": function() { return /* binding */ Section; }\n/* harmony export */ });\nvar SECTION_ID_ATTR = 'data-section-id';\n\nfunction Section(container, properties) {\n  this.container = validateContainerElement(container);\n  this.id = container.getAttribute(SECTION_ID_ATTR);\n  this.extensions = [];\n\n  // eslint-disable-next-line es5/no-es6-static-methods\n  Object.assign(this, validatePropertiesObject(properties));\n\n  this.onLoad();\n}\n\nSection.prototype = {\n  onLoad: Function.prototype,\n  onUnload: Function.prototype,\n  onSelect: Function.prototype,\n  onDeselect: Function.prototype,\n  onBlockSelect: Function.prototype,\n  onBlockDeselect: Function.prototype,\n\n  extend: function extend(extension) {\n    this.extensions.push(extension); // Save original extension\n\n    // eslint-disable-next-line es5/no-es6-static-methods\n    var extensionClone = Object.assign({}, extension);\n    delete extensionClone.init; // Remove init function before assigning extension properties\n\n    // eslint-disable-next-line es5/no-es6-static-methods\n    Object.assign(this, extensionClone);\n\n    if (typeof extension.init === 'function') {\n      extension.init.apply(this);\n    }\n  }\n};\n\nfunction validateContainerElement(container) {\n  if (!(container instanceof Element)) {\n    throw new TypeError(\n      'Theme Sections: Attempted to load section. The section container provided is not a DOM element.'\n    );\n  }\n  if (container.getAttribute(SECTION_ID_ATTR) === null) {\n    throw new Error(\n      'Theme Sections: The section container provided does not have an id assigned to the ' +\n        SECTION_ID_ATTR +\n        ' attribute.'\n    );\n  }\n\n  return container;\n}\n\nfunction validatePropertiesObject(value) {\n  if (\n    (typeof value !== 'undefined' && typeof value !== 'object') ||\n    value === null\n  ) {\n    throw new TypeError(\n      'Theme Sections: The properties object provided is not a valid'\n    );\n  }\n\n  return value;\n}\n\n// Object.assign() polyfill from https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign#Polyfill\nif (typeof Object.assign != 'function') {\n  // Must be writable: true, enumerable: false, configurable: true\n  Object.defineProperty(Object, 'assign', {\n    value: function assign(target) {\n      // .length of function is 2\n      'use strict';\n      if (target == null) {\n        // TypeError if undefined or null\n        throw new TypeError('Cannot convert undefined or null to object');\n      }\n\n      var to = Object(target);\n\n      for (var index = 1; index < arguments.length; index++) {\n        var nextSource = arguments[index];\n\n        if (nextSource != null) {\n          // Skip over if undefined or null\n          for (var nextKey in nextSource) {\n            // Avoid bugs when hasOwnProperty is shadowed\n            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {\n              to[nextKey] = nextSource[nextKey];\n            }\n          }\n        }\n      }\n      return to;\n    },\n    writable: true,\n    configurable: true\n  });\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./node_modules/@shopify/theme-sections/section.js?");

/***/ }),

/***/ "./node_modules/@shopify/theme-sections/theme-sections.js":
/*!****************************************************************!*\
  !*** ./node_modules/@shopify/theme-sections/theme-sections.js ***!
  \****************************************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   extend: function() { return /* binding */ extend; },\n/* harmony export */   getInstanceById: function() { return /* binding */ getInstanceById; },\n/* harmony export */   getInstances: function() { return /* binding */ getInstances; },\n/* harmony export */   instances: function() { return /* binding */ instances; },\n/* harmony export */   isInstance: function() { return /* binding */ isInstance; },\n/* harmony export */   load: function() { return /* binding */ load; },\n/* harmony export */   register: function() { return /* binding */ register; },\n/* harmony export */   registered: function() { return /* binding */ registered; },\n/* harmony export */   unload: function() { return /* binding */ unload; },\n/* harmony export */   unregister: function() { return /* binding */ unregister; }\n/* harmony export */ });\n/* harmony import */ var _section__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./section */ \"./node_modules/@shopify/theme-sections/section.js\");\n/*\n * @shopify/theme-sections\n * -----------------------------------------------------------------------------\n *\n * A framework to provide structure to your Shopify sections and a load and unload\n * lifecycle. The lifecycle is automatically connected to theme editor events so\n * that your sections load and unload as the editor changes the content and\n * settings of your sections.\n */\n\n\n\nvar SECTION_TYPE_ATTR = 'data-section-type';\nvar SECTION_ID_ATTR = 'data-section-id';\n\nwindow.Shopify = window.Shopify || {};\nwindow.Shopify.theme = window.Shopify.theme || {};\nwindow.Shopify.theme.sections = window.Shopify.theme.sections || {};\n\nvar registered = (window.Shopify.theme.sections.registered =\n  window.Shopify.theme.sections.registered || {});\nvar instances = (window.Shopify.theme.sections.instances =\n  window.Shopify.theme.sections.instances || []);\n\nfunction register(type, properties) {\n  if (typeof type !== 'string') {\n    throw new TypeError(\n      'Theme Sections: The first argument for .register must be a string that specifies the type of the section being registered'\n    );\n  }\n\n  if (typeof registered[type] !== 'undefined') {\n    throw new Error(\n      'Theme Sections: A section of type \"' +\n        type +\n        '\" has already been registered. You cannot register the same section type twice'\n    );\n  }\n\n  function TypedSection(container) {\n    _section__WEBPACK_IMPORTED_MODULE_0__[\"default\"].call(this, container, properties);\n  }\n\n  TypedSection.constructor = _section__WEBPACK_IMPORTED_MODULE_0__[\"default\"];\n  TypedSection.prototype = Object.create(_section__WEBPACK_IMPORTED_MODULE_0__[\"default\"].prototype);\n  TypedSection.prototype.type = type;\n\n  return (registered[type] = TypedSection);\n}\n\nfunction unregister(types) {\n  types = normalizeType(types);\n\n  types.forEach(function(type) {\n    delete registered[type];\n  });\n}\n\nfunction load(types, containers) {\n  types = normalizeType(types);\n\n  if (typeof containers === 'undefined') {\n    containers = document.querySelectorAll('[' + SECTION_TYPE_ATTR + ']');\n  }\n\n  containers = normalizeContainers(containers);\n\n  types.forEach(function(type) {\n    var TypedSection = registered[type];\n\n    if (typeof TypedSection === 'undefined') {\n      return;\n    }\n\n    containers = containers.filter(function(container) {\n      // Filter from list of containers because container already has an instance loaded\n      if (isInstance(container)) {\n        return false;\n      }\n\n      // Filter from list of containers because container doesn't have data-section-type attribute\n      if (container.getAttribute(SECTION_TYPE_ATTR) === null) {\n        return false;\n      }\n\n      // Keep in list of containers because current type doesn't match\n      if (container.getAttribute(SECTION_TYPE_ATTR) !== type) {\n        return true;\n      }\n\n      instances.push(new TypedSection(container));\n\n      // Filter from list of containers because container now has an instance loaded\n      return false;\n    });\n  });\n}\n\nfunction unload(selector) {\n  var instancesToUnload = getInstances(selector);\n\n  instancesToUnload.forEach(function(instance) {\n    var index = instances\n      .map(function(e) {\n        return e.id;\n      })\n      .indexOf(instance.id);\n    instances.splice(index, 1);\n    instance.onUnload();\n  });\n}\n\nfunction extend(selector, extension) {\n  var instancesToExtend = getInstances(selector);\n\n  instancesToExtend.forEach(function(instance) {\n    instance.extend(extension);\n  });\n}\n\nfunction getInstances(selector) {\n  var filteredInstances = [];\n\n  // Fetch first element if its an array\n  if (NodeList.prototype.isPrototypeOf(selector) || Array.isArray(selector)) {\n    var firstElement = selector[0];\n  }\n\n  // If selector element is DOM element\n  if (selector instanceof Element || firstElement instanceof Element) {\n    var containers = normalizeContainers(selector);\n\n    containers.forEach(function(container) {\n      filteredInstances = filteredInstances.concat(\n        instances.filter(function(instance) {\n          return instance.container === container;\n        })\n      );\n    });\n\n    // If select is type string\n  } else if (typeof selector === 'string' || typeof firstElement === 'string') {\n    var types = normalizeType(selector);\n\n    types.forEach(function(type) {\n      filteredInstances = filteredInstances.concat(\n        instances.filter(function(instance) {\n          return instance.type === type;\n        })\n      );\n    });\n  }\n\n  return filteredInstances;\n}\n\nfunction getInstanceById(id) {\n  var instance;\n\n  for (var i = 0; i < instances.length; i++) {\n    if (instances[i].id === id) {\n      instance = instances[i];\n      break;\n    }\n  }\n  return instance;\n}\n\nfunction isInstance(selector) {\n  return getInstances(selector).length > 0;\n}\n\nfunction normalizeType(types) {\n  // If '*' then fetch all registered section types\n  if (types === '*') {\n    types = Object.keys(registered);\n\n    // If a single section type string is passed, put it in an array\n  } else if (typeof types === 'string') {\n    types = [types];\n\n    // If single section constructor is passed, transform to array with section\n    // type string\n  } else if (types.constructor === _section__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n    types = [types.prototype.type];\n\n    // If array of typed section constructors is passed, transform the array to\n    // type strings\n  } else if (Array.isArray(types) && types[0].constructor === _section__WEBPACK_IMPORTED_MODULE_0__[\"default\"]) {\n    types = types.map(function(TypedSection) {\n      return TypedSection.prototype.type;\n    });\n  }\n\n  types = types.map(function(type) {\n    return type.toLowerCase();\n  });\n\n  return types;\n}\n\nfunction normalizeContainers(containers) {\n  // Nodelist with entries\n  if (NodeList.prototype.isPrototypeOf(containers) && containers.length > 0) {\n    containers = Array.prototype.slice.call(containers);\n\n    // Empty Nodelist\n  } else if (\n    NodeList.prototype.isPrototypeOf(containers) &&\n    containers.length === 0\n  ) {\n    containers = [];\n\n    // Handle null (document.querySelector() returns null with no match)\n  } else if (containers === null) {\n    containers = [];\n\n    // Single DOM element\n  } else if (!Array.isArray(containers) && containers instanceof Element) {\n    containers = [containers];\n  }\n\n  return containers;\n}\n\nif (window.Shopify.designMode) {\n  document.addEventListener('shopify:section:load', function(event) {\n    var id = event.detail.sectionId;\n    var container = event.target.querySelector(\n      '[' + SECTION_ID_ATTR + '=\"' + id + '\"]'\n    );\n\n    if (container !== null) {\n      load(container.getAttribute(SECTION_TYPE_ATTR), container);\n    }\n  });\n\n  document.addEventListener('shopify:section:unload', function(event) {\n    var id = event.detail.sectionId;\n    var container = event.target.querySelector(\n      '[' + SECTION_ID_ATTR + '=\"' + id + '\"]'\n    );\n    var instance = getInstances(container)[0];\n\n    if (typeof instance === 'object') {\n      unload(container);\n    }\n  });\n\n  document.addEventListener('shopify:section:select', function(event) {\n    var instance = getInstanceById(event.detail.sectionId);\n\n    if (typeof instance === 'object') {\n      instance.onSelect(event);\n    }\n  });\n\n  document.addEventListener('shopify:section:deselect', function(event) {\n    var instance = getInstanceById(event.detail.sectionId);\n\n    if (typeof instance === 'object') {\n      instance.onDeselect(event);\n    }\n  });\n\n  document.addEventListener('shopify:block:select', function(event) {\n    var instance = getInstanceById(event.detail.sectionId);\n\n    if (typeof instance === 'object') {\n      instance.onBlockSelect(event);\n    }\n  });\n\n  document.addEventListener('shopify:block:deselect', function(event) {\n    var instance = getInstanceById(event.detail.sectionId);\n\n    if (typeof instance === 'object') {\n      instance.onBlockDeselect(event);\n    }\n  });\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./node_modules/@shopify/theme-sections/theme-sections.js?");

/***/ }),

/***/ "./styles/sections/announcement-bar.scss":
/*!***********************************************!*\
  !*** ./styles/sections/announcement-bar.scss ***!
  \***********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./styles/sections/announcement-bar.scss?");

/***/ }),

/***/ "./scripts/sections/announcement-bar.js":
/*!**********************************************!*\
  !*** ./scripts/sections/announcement-bar.js ***!
  \**********************************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _shopify_theme_sections__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @shopify/theme-sections */ \"./node_modules/@shopify/theme-sections/theme-sections.js\");\n/* eslint-disable no-inner-declarations */\n/* eslint-disable no-undef */\n\n\nconst sectionName = 'announcement-bar';\n\nif (sectionName in Shopify.theme.sections.registered) {\n  const sections = document.querySelectorAll(`[data-section-type=${sectionName}]`);\n  sections.forEach((section, index) => {\n    const linkTag = section.querySelector('link');\n    const scriptTag = section.querySelector('script');\n\n    if (index !== 0) {\n      linkTag?.remove();\n      scriptTag?.remove();\n    }\n  });\n} else {\n  const selectors = {\n    announcement: '.announcement-bar__wrapper',\n    announcementTags: '.p--tag',\n    timerWrapper: '[data-timer]',\n  };\n\n  function replaceTimerPlaceholder() {\n    const announcementBars = document.querySelectorAll(selectors.announcement);\n\n    announcementBars.forEach((bar) => {\n      bar.innerHTML = bar.innerHTML.replaceAll('${timer}', '<span data-timer></span>');\n\n      const tags = bar.querySelectorAll(selectors.announcementTags);\n\n      tags.forEach((tag) => {\n        if (bar.dataset.time && tag.dataset.timerText) {\n          tag.innerHTML = tag.dataset.timerText;\n        }\n      });\n    });\n  }\n\n  function calculateTimer(bar, countDownDate, interval) {\n    const now = new Date().getTime();\n    const distance = countDownDate - now;\n    const days = Math.floor(distance / (1000 * 60 * 60 * 24));\n    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));\n    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));\n    const seconds = Math.floor((distance % (1000 * 60)) / 1000);\n    const timerWrapper = bar.querySelectorAll(selectors.timerWrapper);\n\n    timerWrapper.forEach((time) => {\n      if (distance > 0) {\n        time.innerHTML = `${days}D ${hours}H ${minutes}M ${seconds}S`;\n      } else {\n        const closestTag = time.closest(selectors.announcementTags);\n\n        closestTag.innerHTML = closestTag.dataset.default;\n        clearInterval(interval);\n      }\n    });\n  }\n\n  const load = () => {\n    if (Shopify.theme.sections.registered[sectionName].isCalled) return;\n\n    const announcementBars = document.querySelectorAll(selectors.announcement);\n\n    replaceTimerPlaceholder();\n    announcementBars.forEach((bar) => {\n      if (bar.dataset.time) {\n        const countDownDate = new Date(bar.dataset.time).getTime();\n\n        const interval = setInterval(() => {\n          calculateTimer(bar, countDownDate, interval);\n        }, 1000);\n      }\n    });\n\n    Shopify.theme.sections.registered[sectionName].isCalled = true;\n  };\n\n  const unload = () => {};\n\n  (0,_shopify_theme_sections__WEBPACK_IMPORTED_MODULE_0__.register)(sectionName, {\n    async onLoad() {\n      load();\n    },\n    onUnload() {\n      unload();\n    },\n  });\n}\n\n\n//# sourceURL=webpack://ds-shopify-boilerplate/./scripts/sections/announcement-bar.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
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
/******/ 	__webpack_require__("./scripts/sections/announcement-bar.js");
/******/ 	var __webpack_exports__ = __webpack_require__("./styles/sections/announcement-bar.scss");
/******/ 	
/******/ })()
;