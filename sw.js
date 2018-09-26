/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./ts/sw.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./ts/NotificationManager.ts":
/*!***********************************!*\
  !*** ./ts/NotificationManager.ts ***!
  \***********************************/
/*! exports provided: NOTIFICATION_TITLE, NOTIFICATION_TAG, DESTINATION_URL, NotificationManager */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NOTIFICATION_TITLE\", function() { return NOTIFICATION_TITLE; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NOTIFICATION_TAG\", function() { return NOTIFICATION_TAG; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DESTINATION_URL\", function() { return DESTINATION_URL; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"NotificationManager\", function() { return notificationManager; });\nconst NOTIFICATION_TITLE = 'Notification Test';\nconst NOTIFICATION_TAG = 'notification-test';\nconst DESTINATION_URL = 'https://www.google.com/';\nclass NotificationManager {\n    get bodyText() {\n        return 'Hi';\n    }\n    // Create a set of options to pass in to showNotification()\n    get options() {\n        return {\n            tag: NOTIFICATION_TAG,\n            body: this.bodyText,\n        };\n    }\n    showNotification(registration) {\n        registration.showNotification(NOTIFICATION_TITLE, this.options);\n    }\n    handleClick(event, clients) {\n        clients.openWindow(DESTINATION_URL);\n        event.notification.close();\n    }\n}\nconst notificationManager = new NotificationManager();\n\n\n\n//# sourceURL=webpack:///./ts/NotificationManager.ts?");

/***/ }),

/***/ "./ts/sw.ts":
/*!******************!*\
  !*** ./ts/sw.ts ***!
  \******************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _NotificationManager__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./NotificationManager */ \"./ts/NotificationManager.ts\");\n\n// Lifecycle event listeners\nself.addEventListener('install', () => console.log('Installed'));\nself.addEventListener('activate', () => console.log('Activated'));\n// Notification-related event listeners\nself.addEventListener('push', (event) => {\n    console.log('Push notification received!');\n    if (event.data) {\n        _NotificationManager__WEBPACK_IMPORTED_MODULE_0__[\"NotificationManager\"].showNotification(self.registration);\n    }\n});\nself.addEventListener('notificationclick', (event) => {\n    _NotificationManager__WEBPACK_IMPORTED_MODULE_0__[\"NotificationManager\"].handleClick(event, clients);\n});\n\n\n//# sourceURL=webpack:///./ts/sw.ts?");

/***/ })

/******/ });