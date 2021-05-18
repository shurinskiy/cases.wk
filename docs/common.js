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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/common.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/common.js":
/*!**************************!*\
  !*** ./src/js/common.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("// import \"../blocks/someblock/someblock.js\";\n// import \"../blocks/someblock2/someblock2.js\";\n\n/* Polyfills */\n(function (e) {\n  e.matches = e.matches || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector || e.webkitMatchesSelector;\n\n  e.closest = e.closest || function closest(selector) {\n    if (!this) return null;\n    if (this.matches(selector)) return this;\n\n    if (!this.parentElement) {\n      return null;\n    } else return this.parentElement.closest(selector);\n  };\n})(Element.prototype);\n\n(function (e) {\n  var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;\n  !matches ? e.matches = e.matchesSelector = function matches(selector) {\n    var matches = document.querySelectorAll(selector);\n    var th = this;\n    return Array.prototype.some.call(matches, function (e) {\n      return e === th;\n    });\n  } : e.matches = e.matchesSelector = matches;\n})(Element.prototype);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvanMvY29tbW9uLmpzPzQ0MGEiXSwibmFtZXMiOlsiZSIsIm1hdGNoZXMiLCJtb3pNYXRjaGVzU2VsZWN0b3IiLCJtc01hdGNoZXNTZWxlY3RvciIsIm9NYXRjaGVzU2VsZWN0b3IiLCJ3ZWJraXRNYXRjaGVzU2VsZWN0b3IiLCJjbG9zZXN0Iiwic2VsZWN0b3IiLCJwYXJlbnRFbGVtZW50IiwiRWxlbWVudCIsInByb3RvdHlwZSIsIm1hdGNoZXNTZWxlY3RvciIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsInRoIiwiQXJyYXkiLCJzb21lIiwiY2FsbCJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTs7QUFJQTtBQUNDLFdBQVNBLENBQVQsRUFBWTtBQUNaQSxHQUFDLENBQUNDLE9BQUYsR0FBWUQsQ0FBQyxDQUFDQyxPQUFGLElBQWFELENBQUMsQ0FBQ0Usa0JBQWYsSUFBcUNGLENBQUMsQ0FBQ0csaUJBQXZDLElBQTRESCxDQUFDLENBQUNJLGdCQUE5RCxJQUFrRkosQ0FBQyxDQUFDSyxxQkFBaEc7O0FBQ0FMLEdBQUMsQ0FBQ00sT0FBRixHQUFZTixDQUFDLENBQUNNLE9BQUYsSUFBYSxTQUFTQSxPQUFULENBQWlCQyxRQUFqQixFQUEyQjtBQUNuRCxRQUFJLENBQUMsSUFBTCxFQUFXLE9BQU8sSUFBUDtBQUNYLFFBQUksS0FBS04sT0FBTCxDQUFhTSxRQUFiLENBQUosRUFBNEIsT0FBTyxJQUFQOztBQUM1QixRQUFJLENBQUMsS0FBS0MsYUFBVixFQUF5QjtBQUFDLGFBQU8sSUFBUDtBQUFZLEtBQXRDLE1BQ00sT0FBTyxLQUFLQSxhQUFMLENBQW1CRixPQUFuQixDQUEyQkMsUUFBM0IsQ0FBUDtBQUNMLEdBTEY7QUFNQSxDQVJBLEVBUUNFLE9BQU8sQ0FBQ0MsU0FSVCxDQUFEOztBQVVBLENBQUMsVUFBU1YsQ0FBVCxFQUFZO0FBQ1osTUFBSUMsT0FBTyxHQUFHRCxDQUFDLENBQUNDLE9BQUYsSUFBYUQsQ0FBQyxDQUFDVyxlQUFmLElBQWtDWCxDQUFDLENBQUNLLHFCQUFwQyxJQUE2REwsQ0FBQyxDQUFDRSxrQkFBL0QsSUFBcUZGLENBQUMsQ0FBQ0csaUJBQXZGLElBQTRHSCxDQUFDLENBQUNJLGdCQUE1SDtBQUNBLEdBQUNILE9BQUQsR0FBWUQsQ0FBQyxDQUFDQyxPQUFGLEdBQVlELENBQUMsQ0FBQ1csZUFBRixHQUFvQixTQUFTVixPQUFULENBQWlCTSxRQUFqQixFQUEyQjtBQUN0RSxRQUFJTixPQUFPLEdBQUdXLFFBQVEsQ0FBQ0MsZ0JBQVQsQ0FBMEJOLFFBQTFCLENBQWQ7QUFDQSxRQUFJTyxFQUFFLEdBQUcsSUFBVDtBQUNBLFdBQU9DLEtBQUssQ0FBQ0wsU0FBTixDQUFnQk0sSUFBaEIsQ0FBcUJDLElBQXJCLENBQTBCaEIsT0FBMUIsRUFBbUMsVUFBU0QsQ0FBVCxFQUFZO0FBQ3JELGFBQU9BLENBQUMsS0FBS2MsRUFBYjtBQUNBLEtBRk0sQ0FBUDtBQUdBLEdBTkQsR0FNTWQsQ0FBQyxDQUFDQyxPQUFGLEdBQVlELENBQUMsQ0FBQ1csZUFBRixHQUFvQlYsT0FOdEM7QUFPQSxDQVRELEVBU0dRLE9BQU8sQ0FBQ0MsU0FUWCIsImZpbGUiOiIuL3NyYy9qcy9jb21tb24uanMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBpbXBvcnQgXCIuLi9ibG9ja3Mvc29tZWJsb2NrL3NvbWVibG9jay5qc1wiO1xyXG4vLyBpbXBvcnQgXCIuLi9ibG9ja3Mvc29tZWJsb2NrMi9zb21lYmxvY2syLmpzXCI7XHJcblxyXG5cclxuXHJcbi8qIFBvbHlmaWxscyAqL1xyXG4oZnVuY3Rpb24oZSkge1xyXG5cdGUubWF0Y2hlcyA9IGUubWF0Y2hlcyB8fCBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGUub01hdGNoZXNTZWxlY3RvciB8fCBlLndlYmtpdE1hdGNoZXNTZWxlY3RvcjtcclxuXHRlLmNsb3Nlc3QgPSBlLmNsb3Nlc3QgfHwgZnVuY3Rpb24gY2xvc2VzdChzZWxlY3Rvcikge1xyXG5cdFx0aWYgKCF0aGlzKSByZXR1cm4gbnVsbDtcclxuXHRcdGlmICh0aGlzLm1hdGNoZXMoc2VsZWN0b3IpKSByZXR1cm4gdGhpcztcclxuXHRcdGlmICghdGhpcy5wYXJlbnRFbGVtZW50KSB7cmV0dXJuIG51bGx9XHJcblx0XHRcdGVsc2UgcmV0dXJuIHRoaXMucGFyZW50RWxlbWVudC5jbG9zZXN0KHNlbGVjdG9yKVxyXG5cdFx0fTtcclxufShFbGVtZW50LnByb3RvdHlwZSkpO1xyXG5cclxuKGZ1bmN0aW9uKGUpIHtcclxuXHR2YXIgbWF0Y2hlcyA9IGUubWF0Y2hlcyB8fCBlLm1hdGNoZXNTZWxlY3RvciB8fCBlLndlYmtpdE1hdGNoZXNTZWxlY3RvciB8fCBlLm1vek1hdGNoZXNTZWxlY3RvciB8fCBlLm1zTWF0Y2hlc1NlbGVjdG9yIHx8IGUub01hdGNoZXNTZWxlY3RvcjtcclxuXHQhbWF0Y2hlcyA/IChlLm1hdGNoZXMgPSBlLm1hdGNoZXNTZWxlY3RvciA9IGZ1bmN0aW9uIG1hdGNoZXMoc2VsZWN0b3IpIHtcclxuXHRcdHZhciBtYXRjaGVzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChzZWxlY3Rvcik7XHJcblx0XHR2YXIgdGggPSB0aGlzO1xyXG5cdFx0cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zb21lLmNhbGwobWF0Y2hlcywgZnVuY3Rpb24oZSkge1xyXG5cdFx0XHRyZXR1cm4gZSA9PT0gdGg7XHJcblx0XHR9KTtcclxuXHR9KSA6IChlLm1hdGNoZXMgPSBlLm1hdGNoZXNTZWxlY3RvciA9IG1hdGNoZXMpO1xyXG59KShFbGVtZW50LnByb3RvdHlwZSk7Il0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./src/js/common.js\n");

/***/ })

/******/ });