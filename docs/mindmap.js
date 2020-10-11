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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css":
/*!********************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/styles/index.css ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".mindmap * {\n\tbox-sizing: border-box;\n}\n\n.mindmap {\n\tbackground-color: #1d1a17;\n\toverflow: hidden;\n\tposition: absolute;\n\twidth: 100%;\n\theight: 100%;\n}\n\n.mindmap-board {\n\tposition: absolute;\n\tleft: 0;\n\ttop: 0;\n\twidth: 100%;\n\theight: 100%;\n\toverflow: auto;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/topic/styles/topic.css":
/*!**************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/topic/styles/topic.css ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".topic-container {\n\tposition: absolute;\n}\n\n.topic {\n\tposition: absolute;\n\tcolor: #8f8d7d;\n\tborder: 3px solid #8f8d7d;\n\tborder-radius: 5px;\n\tbackground-color: #1d1a17;\n\tpadding: 5px 10px;\n\tmax-width: 200px;\n\tz-index: 9;\n\tuser-select: none;\n\tword-break: break-word;\n}\n\n.topic:hover {\n\tborder-color: #e8e390;\n\tcursor: pointer;\n}\n\n.topic.selected {\n\tborder-color: #d2cb07;\n}\n\n.topic.editing {\n\tcursor: text;\n}\n\n.topic-children-container {\n\tposition: absolute;\n}\n\n.topic-text {\n\toutline: none;\n}\n\n.branch-connections {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tpointer-events: none;\n}\n", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : undefined;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && btoa) {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js":
/*!***********************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/bytesToUuid.js ***!
  \***********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];

for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex; // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4

  return [bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], '-', bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]], bth[buf[i++]]].join('');
}

/* harmony default export */ __webpack_exports__["default"] = (bytesToUuid);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/index.js":
/*!*****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/index.js ***!
  \*****************************************************/
/*! exports provided: v1, v3, v4, v5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v1_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v1.js */ "./node_modules/uuid/dist/esm-browser/v1.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v1", function() { return _v1_js__WEBPACK_IMPORTED_MODULE_0__["default"]; });

/* harmony import */ var _v3_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./v3.js */ "./node_modules/uuid/dist/esm-browser/v3.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v3", function() { return _v3_js__WEBPACK_IMPORTED_MODULE_1__["default"]; });

/* harmony import */ var _v4_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./v4.js */ "./node_modules/uuid/dist/esm-browser/v4.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v4", function() { return _v4_js__WEBPACK_IMPORTED_MODULE_2__["default"]; });

/* harmony import */ var _v5_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./v5.js */ "./node_modules/uuid/dist/esm-browser/v5.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "v5", function() { return _v5_js__WEBPACK_IMPORTED_MODULE_3__["default"]; });






/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/md5.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/md5.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/*
 * Browser-compatible JavaScript MD5
 *
 * Modification of JavaScript MD5
 * https://github.com/blueimp/JavaScript-MD5
 *
 * Copyright 2011, Sebastian Tschan
 * https://blueimp.net
 *
 * Licensed under the MIT license:
 * https://opensource.org/licenses/MIT
 *
 * Based on
 * A JavaScript implementation of the RSA Data Security, Inc. MD5 Message
 * Digest Algorithm, as defined in RFC 1321.
 * Version 2.2 Copyright (C) Paul Johnston 1999 - 2009
 * Other contributors: Greg Holt, Andrew Kepert, Ydnar, Lostinet
 * Distributed under the BSD License
 * See http://pajhome.org.uk/crypt/md5 for more info.
 */
function md5(bytes) {
  if (typeof bytes == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Array(msg.length);

    for (var i = 0; i < msg.length; i++) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  return md5ToHexEncodedArray(wordsToMd5(bytesToWords(bytes), bytes.length * 8));
}
/*
 * Convert an array of little-endian words to an array of bytes
 */


function md5ToHexEncodedArray(input) {
  var i;
  var x;
  var output = [];
  var length32 = input.length * 32;
  var hexTab = '0123456789abcdef';
  var hex;

  for (i = 0; i < length32; i += 8) {
    x = input[i >> 5] >>> i % 32 & 0xff;
    hex = parseInt(hexTab.charAt(x >>> 4 & 0x0f) + hexTab.charAt(x & 0x0f), 16);
    output.push(hex);
  }

  return output;
}
/*
 * Calculate the MD5 of an array of little-endian words, and a bit length.
 */


function wordsToMd5(x, len) {
  /* append padding */
  x[len >> 5] |= 0x80 << len % 32;
  x[(len + 64 >>> 9 << 4) + 14] = len;
  var i;
  var olda;
  var oldb;
  var oldc;
  var oldd;
  var a = 1732584193;
  var b = -271733879;
  var c = -1732584194;
  var d = 271733878;

  for (i = 0; i < x.length; i += 16) {
    olda = a;
    oldb = b;
    oldc = c;
    oldd = d;
    a = md5ff(a, b, c, d, x[i], 7, -680876936);
    d = md5ff(d, a, b, c, x[i + 1], 12, -389564586);
    c = md5ff(c, d, a, b, x[i + 2], 17, 606105819);
    b = md5ff(b, c, d, a, x[i + 3], 22, -1044525330);
    a = md5ff(a, b, c, d, x[i + 4], 7, -176418897);
    d = md5ff(d, a, b, c, x[i + 5], 12, 1200080426);
    c = md5ff(c, d, a, b, x[i + 6], 17, -1473231341);
    b = md5ff(b, c, d, a, x[i + 7], 22, -45705983);
    a = md5ff(a, b, c, d, x[i + 8], 7, 1770035416);
    d = md5ff(d, a, b, c, x[i + 9], 12, -1958414417);
    c = md5ff(c, d, a, b, x[i + 10], 17, -42063);
    b = md5ff(b, c, d, a, x[i + 11], 22, -1990404162);
    a = md5ff(a, b, c, d, x[i + 12], 7, 1804603682);
    d = md5ff(d, a, b, c, x[i + 13], 12, -40341101);
    c = md5ff(c, d, a, b, x[i + 14], 17, -1502002290);
    b = md5ff(b, c, d, a, x[i + 15], 22, 1236535329);
    a = md5gg(a, b, c, d, x[i + 1], 5, -165796510);
    d = md5gg(d, a, b, c, x[i + 6], 9, -1069501632);
    c = md5gg(c, d, a, b, x[i + 11], 14, 643717713);
    b = md5gg(b, c, d, a, x[i], 20, -373897302);
    a = md5gg(a, b, c, d, x[i + 5], 5, -701558691);
    d = md5gg(d, a, b, c, x[i + 10], 9, 38016083);
    c = md5gg(c, d, a, b, x[i + 15], 14, -660478335);
    b = md5gg(b, c, d, a, x[i + 4], 20, -405537848);
    a = md5gg(a, b, c, d, x[i + 9], 5, 568446438);
    d = md5gg(d, a, b, c, x[i + 14], 9, -1019803690);
    c = md5gg(c, d, a, b, x[i + 3], 14, -187363961);
    b = md5gg(b, c, d, a, x[i + 8], 20, 1163531501);
    a = md5gg(a, b, c, d, x[i + 13], 5, -1444681467);
    d = md5gg(d, a, b, c, x[i + 2], 9, -51403784);
    c = md5gg(c, d, a, b, x[i + 7], 14, 1735328473);
    b = md5gg(b, c, d, a, x[i + 12], 20, -1926607734);
    a = md5hh(a, b, c, d, x[i + 5], 4, -378558);
    d = md5hh(d, a, b, c, x[i + 8], 11, -2022574463);
    c = md5hh(c, d, a, b, x[i + 11], 16, 1839030562);
    b = md5hh(b, c, d, a, x[i + 14], 23, -35309556);
    a = md5hh(a, b, c, d, x[i + 1], 4, -1530992060);
    d = md5hh(d, a, b, c, x[i + 4], 11, 1272893353);
    c = md5hh(c, d, a, b, x[i + 7], 16, -155497632);
    b = md5hh(b, c, d, a, x[i + 10], 23, -1094730640);
    a = md5hh(a, b, c, d, x[i + 13], 4, 681279174);
    d = md5hh(d, a, b, c, x[i], 11, -358537222);
    c = md5hh(c, d, a, b, x[i + 3], 16, -722521979);
    b = md5hh(b, c, d, a, x[i + 6], 23, 76029189);
    a = md5hh(a, b, c, d, x[i + 9], 4, -640364487);
    d = md5hh(d, a, b, c, x[i + 12], 11, -421815835);
    c = md5hh(c, d, a, b, x[i + 15], 16, 530742520);
    b = md5hh(b, c, d, a, x[i + 2], 23, -995338651);
    a = md5ii(a, b, c, d, x[i], 6, -198630844);
    d = md5ii(d, a, b, c, x[i + 7], 10, 1126891415);
    c = md5ii(c, d, a, b, x[i + 14], 15, -1416354905);
    b = md5ii(b, c, d, a, x[i + 5], 21, -57434055);
    a = md5ii(a, b, c, d, x[i + 12], 6, 1700485571);
    d = md5ii(d, a, b, c, x[i + 3], 10, -1894986606);
    c = md5ii(c, d, a, b, x[i + 10], 15, -1051523);
    b = md5ii(b, c, d, a, x[i + 1], 21, -2054922799);
    a = md5ii(a, b, c, d, x[i + 8], 6, 1873313359);
    d = md5ii(d, a, b, c, x[i + 15], 10, -30611744);
    c = md5ii(c, d, a, b, x[i + 6], 15, -1560198380);
    b = md5ii(b, c, d, a, x[i + 13], 21, 1309151649);
    a = md5ii(a, b, c, d, x[i + 4], 6, -145523070);
    d = md5ii(d, a, b, c, x[i + 11], 10, -1120210379);
    c = md5ii(c, d, a, b, x[i + 2], 15, 718787259);
    b = md5ii(b, c, d, a, x[i + 9], 21, -343485551);
    a = safeAdd(a, olda);
    b = safeAdd(b, oldb);
    c = safeAdd(c, oldc);
    d = safeAdd(d, oldd);
  }

  return [a, b, c, d];
}
/*
 * Convert an array bytes to an array of little-endian words
 * Characters >255 have their high-byte silently ignored.
 */


function bytesToWords(input) {
  var i;
  var output = [];
  output[(input.length >> 2) - 1] = undefined;

  for (i = 0; i < output.length; i += 1) {
    output[i] = 0;
  }

  var length8 = input.length * 8;

  for (i = 0; i < length8; i += 8) {
    output[i >> 5] |= (input[i / 8] & 0xff) << i % 32;
  }

  return output;
}
/*
 * Add integers, wrapping at 2^32. This uses 16-bit operations internally
 * to work around bugs in some JS interpreters.
 */


function safeAdd(x, y) {
  var lsw = (x & 0xffff) + (y & 0xffff);
  var msw = (x >> 16) + (y >> 16) + (lsw >> 16);
  return msw << 16 | lsw & 0xffff;
}
/*
 * Bitwise rotate a 32-bit number to the left.
 */


function bitRotateLeft(num, cnt) {
  return num << cnt | num >>> 32 - cnt;
}
/*
 * These functions implement the four basic operations the algorithm uses.
 */


function md5cmn(q, a, b, x, s, t) {
  return safeAdd(bitRotateLeft(safeAdd(safeAdd(a, q), safeAdd(x, t)), s), b);
}

function md5ff(a, b, c, d, x, s, t) {
  return md5cmn(b & c | ~b & d, a, b, x, s, t);
}

function md5gg(a, b, c, d, x, s, t) {
  return md5cmn(b & d | c & ~d, a, b, x, s, t);
}

function md5hh(a, b, c, d, x, s, t) {
  return md5cmn(b ^ c ^ d, a, b, x, s, t);
}

function md5ii(a, b, c, d, x, s, t) {
  return md5cmn(c ^ (b | ~d), a, b, x, s, t);
}

/* harmony default export */ __webpack_exports__["default"] = (md5);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/rng.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/rng.js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return rng; });
// Unique ID creation requires a high quality random # generator. In the browser we therefore
// require the crypto API and do not support built-in fallback to lower quality random number
// generators (like Math.random()).
// getRandomValues needs to be invoked in a context where "this" is a Crypto implementation. Also,
// find the complete implementation of crypto (msCrypto) on IE11.
var getRandomValues = typeof crypto != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto) || typeof msCrypto != 'undefined' && typeof msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto);
var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

function rng() {
  if (!getRandomValues) {
    throw new Error('crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported');
  }

  return getRandomValues(rnds8);
}

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/sha1.js":
/*!****************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/sha1.js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// Adapted from Chris Veness' SHA1 code at
// http://www.movable-type.co.uk/scripts/sha1.html
function f(s, x, y, z) {
  switch (s) {
    case 0:
      return x & y ^ ~x & z;

    case 1:
      return x ^ y ^ z;

    case 2:
      return x & y ^ x & z ^ y & z;

    case 3:
      return x ^ y ^ z;
  }
}

function ROTL(x, n) {
  return x << n | x >>> 32 - n;
}

function sha1(bytes) {
  var K = [0x5a827999, 0x6ed9eba1, 0x8f1bbcdc, 0xca62c1d6];
  var H = [0x67452301, 0xefcdab89, 0x98badcfe, 0x10325476, 0xc3d2e1f0];

  if (typeof bytes == 'string') {
    var msg = unescape(encodeURIComponent(bytes)); // UTF8 escape

    bytes = new Array(msg.length);

    for (var i = 0; i < msg.length; i++) {
      bytes[i] = msg.charCodeAt(i);
    }
  }

  bytes.push(0x80);
  var l = bytes.length / 4 + 2;
  var N = Math.ceil(l / 16);
  var M = new Array(N);

  for (var i = 0; i < N; i++) {
    M[i] = new Array(16);

    for (var j = 0; j < 16; j++) {
      M[i][j] = bytes[i * 64 + j * 4] << 24 | bytes[i * 64 + j * 4 + 1] << 16 | bytes[i * 64 + j * 4 + 2] << 8 | bytes[i * 64 + j * 4 + 3];
    }
  }

  M[N - 1][14] = (bytes.length - 1) * 8 / Math.pow(2, 32);
  M[N - 1][14] = Math.floor(M[N - 1][14]);
  M[N - 1][15] = (bytes.length - 1) * 8 & 0xffffffff;

  for (var i = 0; i < N; i++) {
    var W = new Array(80);

    for (var t = 0; t < 16; t++) {
      W[t] = M[i][t];
    }

    for (var t = 16; t < 80; t++) {
      W[t] = ROTL(W[t - 3] ^ W[t - 8] ^ W[t - 14] ^ W[t - 16], 1);
    }

    var a = H[0];
    var b = H[1];
    var c = H[2];
    var d = H[3];
    var e = H[4];

    for (var t = 0; t < 80; t++) {
      var s = Math.floor(t / 20);
      var T = ROTL(a, 5) + f(s, b, c, d) + e + K[s] + W[t] >>> 0;
      e = d;
      d = c;
      c = ROTL(b, 30) >>> 0;
      b = a;
      a = T;
    }

    H[0] = H[0] + a >>> 0;
    H[1] = H[1] + b >>> 0;
    H[2] = H[2] + c >>> 0;
    H[3] = H[3] + d >>> 0;
    H[4] = H[4] + e >>> 0;
  }

  return [H[0] >> 24 & 0xff, H[0] >> 16 & 0xff, H[0] >> 8 & 0xff, H[0] & 0xff, H[1] >> 24 & 0xff, H[1] >> 16 & 0xff, H[1] >> 8 & 0xff, H[1] & 0xff, H[2] >> 24 & 0xff, H[2] >> 16 & 0xff, H[2] >> 8 & 0xff, H[2] & 0xff, H[3] >> 24 & 0xff, H[3] >> 16 & 0xff, H[3] >> 8 & 0xff, H[3] & 0xff, H[4] >> 24 & 0xff, H[4] >> 16 & 0xff, H[4] >> 8 & 0xff, H[4] & 0xff];
}

/* harmony default export */ __webpack_exports__["default"] = (sha1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v1.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v1.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");

 // **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;

var _clockseq; // Previous uuid creation time


var _lastMSecs = 0;
var _lastNSecs = 0; // See https://github.com/uuidjs/uuid for API details

function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];
  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq; // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189

  if (node == null || clockseq == null) {
    var seedBytes = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [seedBytes[0] | 0x01, seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]];
    }

    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  } // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.


  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime(); // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock

  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1; // Time since last uuid creation (in msecs)

  var dt = msecs - _lastMSecs + (nsecs - _lastNSecs) / 10000; // Per 4.2.1.2, Bump clockseq on clock regression

  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  } // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval


  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  } // Per 4.2.1.2 Throw error if too many uuids are requested


  if (nsecs >= 10000) {
    throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq; // Per 4.1.4 - Convert from unix epoch to Gregorian epoch

  msecs += 12219292800000; // `time_low`

  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff; // `time_mid`

  var tmh = msecs / 0x100000000 * 10000 & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff; // `time_high_and_version`

  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version

  b[i++] = tmh >>> 16 & 0xff; // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)

  b[i++] = clockseq >>> 8 | 0x80; // `clock_seq_low`

  b[i++] = clockseq & 0xff; // `node`

  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(b);
}

/* harmony default export */ __webpack_exports__["default"] = (v1);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v3.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v3.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _md5_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./md5.js */ "./node_modules/uuid/dist/esm-browser/md5.js");


var v3 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v3', 0x30, _md5_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v3);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v35.js":
/*!***************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v35.js ***!
  \***************************************************/
/*! exports provided: DNS, URL, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DNS", function() { return DNS; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "URL", function() { return URL; });
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");


function uuidToBytes(uuid) {
  // Note: We assume we're being passed a valid uuid string
  var bytes = [];
  uuid.replace(/[a-fA-F0-9]{2}/g, function (hex) {
    bytes.push(parseInt(hex, 16));
  });
  return bytes;
}

function stringToBytes(str) {
  str = unescape(encodeURIComponent(str)); // UTF8 escape

  var bytes = new Array(str.length);

  for (var i = 0; i < str.length; i++) {
    bytes[i] = str.charCodeAt(i);
  }

  return bytes;
}

var DNS = '6ba7b810-9dad-11d1-80b4-00c04fd430c8';
var URL = '6ba7b811-9dad-11d1-80b4-00c04fd430c8';
/* harmony default export */ __webpack_exports__["default"] = (function (name, version, hashfunc) {
  var generateUUID = function generateUUID(value, namespace, buf, offset) {
    var off = buf && offset || 0;
    if (typeof value == 'string') value = stringToBytes(value);
    if (typeof namespace == 'string') namespace = uuidToBytes(namespace);
    if (!Array.isArray(value)) throw TypeError('value must be an array of bytes');
    if (!Array.isArray(namespace) || namespace.length !== 16) throw TypeError('namespace must be uuid string or an Array of 16 byte values'); // Per 4.3

    var bytes = hashfunc(namespace.concat(value));
    bytes[6] = bytes[6] & 0x0f | version;
    bytes[8] = bytes[8] & 0x3f | 0x80;

    if (buf) {
      for (var idx = 0; idx < 16; ++idx) {
        buf[off + idx] = bytes[idx];
      }
    }

    return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_0__["default"])(bytes);
  }; // Function#name is not settable on some platforms (#270)


  try {
    generateUUID.name = name;
  } catch (err) {} // For CommonJS default export support


  generateUUID.DNS = DNS;
  generateUUID.URL = URL;
  return generateUUID;
});

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v4.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v4.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _rng_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rng.js */ "./node_modules/uuid/dist/esm-browser/rng.js");
/* harmony import */ var _bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bytesToUuid.js */ "./node_modules/uuid/dist/esm-browser/bytesToUuid.js");



function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof options == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }

  options = options || {};
  var rnds = options.random || (options.rng || _rng_js__WEBPACK_IMPORTED_MODULE_0__["default"])(); // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`

  rnds[6] = rnds[6] & 0x0f | 0x40;
  rnds[8] = rnds[8] & 0x3f | 0x80; // Copy bytes to buffer, if provided

  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || Object(_bytesToUuid_js__WEBPACK_IMPORTED_MODULE_1__["default"])(rnds);
}

/* harmony default export */ __webpack_exports__["default"] = (v4);

/***/ }),

/***/ "./node_modules/uuid/dist/esm-browser/v5.js":
/*!**************************************************!*\
  !*** ./node_modules/uuid/dist/esm-browser/v5.js ***!
  \**************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _v35_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./v35.js */ "./node_modules/uuid/dist/esm-browser/v35.js");
/* harmony import */ var _sha1_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./sha1.js */ "./node_modules/uuid/dist/esm-browser/sha1.js");


var v5 = Object(_v35_js__WEBPACK_IMPORTED_MODULE_0__["default"])('v5', 0x50, _sha1_js__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (v5);

/***/ }),

/***/ "./src/commands/command_service.ts":
/*!*****************************************!*\
  !*** ./src/commands/command_service.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class CommandService {
    constructor(commands) {
        this.delegate = null;
        this.commands = commands || {};
    }
    updateCommands(commands) {
        this.commands = commands;
    }
    exec(command, data) {
        if (!this.delegate || this.delegate.exec(command, data)) {
            if (this.commands[command]) {
                return this.commands[command](data) === true;
            }
            else {
                return true; // bubble up
            }
        }
    }
    setDelegate(delegate) {
        this.delegate = delegate;
    }
    clearDelegate() {
        this.delegate = null;
    }
}
exports.default = CommandService;


/***/ }),

/***/ "./src/commands/mindmap_commands.ts":
/*!******************************************!*\
  !*** ./src/commands/mindmap_commands.ts ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_service_1 = __importDefault(__webpack_require__(/*! ./command_service */ "./src/commands/command_service.ts"));
function mindmapCommands(mindmap) {
    return new command_service_1.default({
        ['addChild']() {
            for (const topicId of mindmap.selection.selection) {
                mindmap.eventBus.dispatch({
                    topicId,
                    type: 'addChild',
                });
            }
        },
        ['deleteSelection']() {
            for (const topicId of mindmap.selection.selection) {
                mindmap.eventBus.dispatch({
                    topicId,
                    type: 'delete',
                });
            }
        },
        ['addSibling']() {
            for (const topicId of mindmap.selection.selection) {
                mindmap.eventBus.dispatch({
                    topicId,
                    type: 'addSibling',
                });
            }
        },
        ['editTopic']({ topicId }) {
            mindmap.selection.makeSelection([topicId]);
            mindmap.eventBus.dispatch({
                topicId,
                type: 'edit',
            });
        },
    });
}
exports.default = mindmapCommands;


/***/ }),

/***/ "./src/eventbus/index.ts":
/*!*******************************!*\
  !*** ./src/eventbus/index.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! utils */ "./src/utils/index.ts");
class EventBus {
    constructor(mindmap) {
        this.topics = {};
        this.listeners = {};
        this.mindmap = mindmap;
    }
    on(event, cb) {
        if (this.listeners[event]) {
            this.listeners[event].push(cb);
        }
        else {
            this.listeners[event] = [cb];
        }
    }
    off(event, cb) {
        const i = this.listeners[event].indexOf(cb);
        if (i >= 0)
            this.listeners[event].splice(i, 1);
    }
    emit(event, data) {
        const events = this.listeners[event];
        if (events) {
            events.forEach((listener) => {
                listener(data);
            });
        }
    }
    register(topic) {
        this.topics[topic.id] = topic;
    }
    unregister(topic) {
        delete this.topics[topic.id];
    }
    dispatch(action) {
        if (this.topics[action.topicId]) {
            this.topics[action.topicId].onAction(action);
        }
    }
    initEvents() {
        this.mindmap.dom.addEventListener('mousedown', (event) => {
            const topicId = utils_1.findTopicId(event.target);
            if (topicId) {
                this.emit('mousedown:topic', { event, topicId });
            }
            else {
                this.emit('mousedown:mindmap', { event });
            }
        });
        document.addEventListener('keydown', (event) => {
            this.emit(`keydown:${event.key}`, { event });
        });
        this.mindmap.dom.addEventListener('dblclick', (event) => {
            const topicId = utils_1.findTopicId(event.target);
            if (topicId) {
                this.emit('dblclick:topic', { event, topicId });
            }
            else {
                this.emit('dblclick:mindmap', { event });
            }
        });
    }
}
exports.default = EventBus;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./styles/index.css */ "./src/styles/index.css");
const mindmap_1 = __importDefault(__webpack_require__(/*! ./mindmap */ "./src/mindmap.ts"));
window.MindMap = mindmap_1.default;


/***/ }),

/***/ "./src/layout/layout-map.ts":
/*!**********************************!*\
  !*** ./src/layout/layout-map.ts ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const layout_1 = __importDefault(__webpack_require__(/*! ./layout */ "./src/layout/layout.ts"));
class MapLayout extends layout_1.default {
    update(root) {
        console.log('update');
        this.layoutRoot(root);
        this.drawConnections(root);
        this.centerMap();
    }
    layoutRoot(root) {
        const LRSplitIndex = Math.floor(root.children.length / 2);
        const rightChildren = root.children.slice(0, LRSplitIndex);
        const leftChildren = root.children.slice(LRSplitIndex, root.children.length);
        let RWidth = 0, RHeight = 0;
        const RBBoxes = [];
        for (let i = 0; i < rightChildren.length; i++) {
            const verticalGap = i == 0 ? 0 : this.verticalGap;
            const bbox = this.layoutTopic(rightChildren[i], 'right');
            RWidth = Math.max(RWidth, bbox[0]);
            RHeight += verticalGap + bbox[1]; // need to add vertical
            RBBoxes.push(bbox);
        }
        let LHeight = 0, LWidth = 0;
        const LBBoxes = [];
        for (let i = 0; i < leftChildren.length; i++) {
            const verticalGap = i == 0 ? 0 : this.verticalGap;
            const bbox = this.layoutTopic(leftChildren[i], 'left');
            LWidth = Math.max(LWidth, bbox[0]);
            LHeight += verticalGap + bbox[1]; // need to add vertical
            LBBoxes.push(bbox);
        }
        const topicBox = root.getBox();
        const RhorizontalGap = RWidth ? this.horizontalGap : 0;
        const LhorizontalGap = LWidth ? this.horizontalGap : 0;
        // calculate bbox
        const bboxWidth = topicBox[0] + LWidth + RWidth + RhorizontalGap + LhorizontalGap;
        const bboxHeight = Math.max(topicBox[1], RHeight, LHeight);
        // update bbox cache
        this.bBoxes[root.id] = [bboxWidth, bboxHeight];
        // position topicEl
        root.topicEl.style.left =
            LWidth + (LWidth ? this.horizontalGap : 0) + 'px';
        root.topicEl.style.top = bboxHeight / 2 - topicBox[1] / 2 + 'px';
        // position right children
        let offsetTop = (bboxHeight - RHeight) / 2;
        for (let i = 0; i < rightChildren.length; i++) {
            const verticalGap = i == 0 ? 0 : this.verticalGap;
            const child = rightChildren[i];
            child.dom.style.left =
                LWidth + RhorizontalGap + LhorizontalGap + topicBox[0] + 'px';
            child.dom.style.top = verticalGap + offsetTop + 'px';
            offsetTop += verticalGap + RBBoxes[i][1];
        }
        // position left children
        offsetTop = (bboxHeight - LHeight) / 2;
        for (let i = 0; i < leftChildren.length; i++) {
            const verticalGap = i == 0 ? 0 : this.verticalGap;
            const child = leftChildren[i];
            child.dom.style.right =
                RWidth + RhorizontalGap + LhorizontalGap + topicBox[0] + 'px';
            +'px';
            child.dom.style.top = verticalGap + offsetTop + 'px';
            offsetTop += verticalGap + LBBoxes[i][1];
        }
        // set dimensions
        root.dom.style.width = bboxWidth + 'px';
        root.dom.style.height = bboxHeight + 'px';
        root.childrenContainer.style.width = bboxWidth + 'px';
        root.childrenContainer.style.height = bboxHeight + 'px';
        return [bboxWidth, bboxHeight];
    }
}
exports.default = MapLayout;


/***/ }),

/***/ "./src/layout/layout.ts":
/*!******************************!*\
  !*** ./src/layout/layout.ts ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = __webpack_require__(/*! utils */ "./src/utils/index.ts");
class Layout {
    constructor(mindmap) {
        this.horizontalGap = 25; // Topic Horizontal Gap
        this.verticalGap = 15; // Topic Vertical Gap
        /* Topic's width and height with all it's children included */
        this.bBoxes = {}; // {id: [width, height]}
        this.mindmap = mindmap;
        mindmap.eventBus.on('update', () => {
            this.update(mindmap.root);
        });
    }
    update(topic) {
        // this.updateBBoxes(topic);
        // let mapCenter = [600, 300];
        // // this.layout(topic, mapCenter, 'right');
        // this.layoutRoot(topic, mapCenter);
        // this.drawConnections(topic);
    }
    layoutRoot(topic, pos) {
        throw new Error('"layoutRoot" method should implement in subclass');
    }
    // @return: bounding box of layouted topic
    layoutTopic(topic, direction) {
        // Reset styles
        for (const property of ['left', 'right']) {
            topic.dom.style.removeProperty(property);
            topic.topicEl.style.removeProperty(property);
            topic.childrenContainer.style.removeProperty(property);
        }
        let topicBox = topic.getBox();
        let dirToCssKey = {
            right: 'left',
            left: 'right',
        };
        // layout children and get children dimension context
        let childrenMaxWidth = 0;
        let childrenTotalHeight = 0;
        let bBoxes = [];
        for (let i = 0; i < topic.children.length; i++) {
            const child = topic.children[i];
            const verticalGap = i == 0 ? 0 : this.verticalGap;
            const bbox = this.layoutTopic(child, direction);
            childrenTotalHeight += bbox[1] + verticalGap;
            childrenMaxWidth = Math.max(childrenMaxWidth, bbox[0]);
            bBoxes.push(bbox);
        }
        // position children
        let offsetTop = 0;
        for (let i = 0; i < topic.children.length; i++) {
            const child = topic.children[i];
            const verticalGap = i == 0 ? 0 : this.verticalGap;
            // set container position
            child.dom.style[dirToCssKey[direction]] = 0 + 'px';
            child.dom.style.top = verticalGap + offsetTop + 'px';
            offsetTop += bBoxes[i][1] + verticalGap;
        }
        // calculate bbox
        let bboxWidth = topicBox[0] +
            (childrenMaxWidth ? childrenMaxWidth + this.horizontalGap : 0);
        let bboxHeight = Math.max(topicBox[1], childrenTotalHeight);
        // update bbox cache
        this.bBoxes[topic.id] = [bboxWidth, bboxHeight];
        // position topicEl
        topic.topicEl.style.top = bboxHeight / 2 - topicBox[1] / 2 + 'px';
        topic.topicEl.style[dirToCssKey[direction]] = 0 + 'px';
        // set container dimension
        topic.dom.style.width = bboxWidth + 'px';
        topic.dom.style.height = bboxHeight + 'px';
        topic.childrenContainer.style.top =
            (bboxHeight - childrenTotalHeight) / 2 + 'px';
        topic.childrenContainer.style[dirToCssKey[direction]] =
            topicBox[0] + this.horizontalGap + 'px';
        topic.childrenContainer.style.width = childrenMaxWidth + 'px';
        topic.childrenContainer.style.height = childrenTotalHeight + 'px';
        return [bboxWidth, bboxHeight]; // width and height
    }
    centerMap() {
        const port = this.mindmap.board;
        const portBox = port.getBoundingClientRect();
        if (parseInt(this.mindmap.root.dom.style.height) < portBox.height) {
            this.mindmap.root.dom.style.top = port.offsetHeight / 2 -
                this.bBoxes[this.mindmap.root.id][1] / 2 +
                'px';
        }
        else {
            this.mindmap.root.dom.style.top = '0px';
        }
        if (parseInt(this.mindmap.root.dom.style.width) < portBox.width) {
            this.mindmap.root.dom.style.left = port.offsetWidth / 2 -
                this.bBoxes[this.mindmap.root.id][0] / 2 +
                'px';
        }
        else {
            this.mindmap.root.dom.style.left = '0px';
        }
    }
    anchorCanvas(topic) {
        let bbox = this.bBoxes[topic.id];
        topic.canvas.width = bbox[0];
        topic.canvas.height = bbox[1];
        topic.canvas.style.left = '0px';
        topic.canvas.style.top = '0px';
    }
    drawConnections(topic) {
        this.anchorCanvas(topic);
        const ctx = topic.canvas.getContext('2d');
        if (!ctx) {
            console.error('Can not get context');
            return;
        }
        ctx.strokeStyle = 'rgba(143, 141, 125, 1)';
        const canvasRect = utils_1.getOffset(topic.canvas, this.mindmap.dom);
        const topicRect = utils_1.getOffset(topic.topicEl, this.mindmap.dom);
        const topicPos = [
            topicRect.left - canvasRect.left + topic.topicEl.offsetWidth / 2,
            topicRect.top - canvasRect.top + topic.topicEl.offsetHeight / 2,
        ];
        for (let child of topic.children) {
            this.drawConnections(child);
            const childRect = utils_1.getOffset(child.topicEl, this.mindmap.dom);
            const childPos = [
                childRect.left - canvasRect.left,
                childRect.top - canvasRect.top + child.topicEl.offsetHeight / 2,
            ];
            ctx.beginPath();
            if (childPos[0] > topicPos[0]) {
                // right
                ctx.moveTo(topicPos[0], topicPos[1]); // topic center
                ctx.lineTo(childPos[0], childPos[1]); // child center
            }
            else {
                // left
                ctx.moveTo(topicPos[0], topicPos[1]); // topic center
                ctx.lineTo(childPos[0] + child.topicEl.offsetWidth, childPos[1]); // child center
            }
            ctx.stroke();
        }
    }
}
exports.default = Layout;


/***/ }),

/***/ "./src/mindmap.ts":
/*!************************!*\
  !*** ./src/mindmap.ts ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const topic_1 = __importDefault(__webpack_require__(/*! ./topic */ "./src/topic/index.ts"));
const layout_map_1 = __importDefault(__webpack_require__(/*! layout/layout-map */ "./src/layout/layout-map.ts"));
const selection_1 = __importDefault(__webpack_require__(/*! selection */ "./src/selection/index.ts"));
const eventbus_1 = __importDefault(__webpack_require__(/*! eventbus */ "./src/eventbus/index.ts"));
const command_service_1 = __importDefault(__webpack_require__(/*! commands/command_service */ "./src/commands/command_service.ts"));
const mindmap_commands_1 = __importDefault(__webpack_require__(/*! commands/mindmap_commands */ "./src/commands/mindmap_commands.ts"));
class MindMap {
    constructor(config) {
        const { data } = config;
        this.eventBus = new eventbus_1.default(this);
        this.layout = new layout_map_1.default(this);
        this.root = topic_1.default.fromJSON(data, { mindmap: this, parent: null });
        this.initDom();
        this.selection = new selection_1.default(this);
        this.commandService = new command_service_1.default();
        this.mindmapCommands = mindmap_commands_1.default(this);
        this.commandService.setDelegate(this.mindmapCommands);
        this.eventBus.initEvents();
        this.initEvents();
    }
    update() {
        /**
         * this.renderer.update(this)
         * update self
         */
    }
    initDom() {
        this.dom = document.createElement('div');
        this.dom.classList.add('mindmap');
        this.board = document.createElement('div');
        this.board.classList.add('mindmap-board');
        this.connections = document.createElement('div');
        this.connections.classList.add('mindmap_connections');
        for (const e of [this.board, this.connections]) {
            this.dom.appendChild(e);
        }
        this.board.appendChild(this.root.initDom());
        return this.dom;
    }
    mount(port) {
        // mount
        port.appendChild(this.dom);
        // TODO: emit mount event
        this.eventBus.emit('mounted');
        // layout map
        this.layout.update(this.root);
        // position map
        this.layout.centerMap();
    }
    initEvents() {
        this.eventBus.on('keydown:Tab', ({ event }) => {
            event.preventDefault();
            event.stopPropagation();
            this.commandService.exec('addChild');
        });
        this.eventBus.on('keydown:Backspace', ({ event }) => {
            event.preventDefault();
            event.stopPropagation();
            this.commandService.exec('deleteSelection');
        });
        this.eventBus.on('keydown:Enter', ({ event }) => {
            event.preventDefault();
            event.stopPropagation();
            this.commandService.exec('addSibling');
        });
        this.eventBus.on('dblclick:topic', ({ event, topicId }) => {
            event.preventDefault();
            event.stopPropagation();
            this.commandService.exec('editTopic', { topicId: topicId });
        });
    }
    setCommandDelegate(delegate) {
        this.commandService.setDelegate(delegate);
    }
    restoreCommandDelegate() {
        this.commandService.setDelegate(this.mindmapCommands);
    }
}
exports.default = MindMap;


/***/ }),

/***/ "./src/selection/index.ts":
/*!********************************!*\
  !*** ./src/selection/index.ts ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Selections {
    constructor(mindmap) {
        this.mindmap = mindmap;
        this.selection = new Set();
        this.initEvents();
    }
    initEvents() {
        this.mindmap.eventBus.on('mousedown:topic', ({ topicId }) => {
            this.makeSelection([topicId]);
        });
        this.mindmap.eventBus.on('mousedown:mindmap', ({}) => {
            this.clearSelection();
        });
        this.mindmap.eventBus.on('new:topic', (topic) => {
            this.makeSelection([topic.id]);
        });
    }
    clearSelection() {
        for (const topicId of this.selection) {
            this.mindmap.eventBus.dispatch({ topicId, type: 'deselect' });
        }
        this.selection = new Set();
    }
    clearSelectionExcept(topicIds) {
        const selection = new Set(this.selection);
        for (const topicId of selection) {
            if (!topicIds.has(topicId)) {
                this.mindmap.eventBus.dispatch({ topicId, type: 'deselect' });
                selection.delete(topicId);
            }
        }
        this.selection = selection;
    }
    makeSelection(topicIds) {
        this.clearSelectionExcept(new Set(topicIds));
        const selection = new Set(this.selection);
        for (const topicId of new Set(topicIds)) {
            if (!selection.has(topicId)) {
                this.mindmap.eventBus.dispatch({ topicId, type: 'select' });
                selection.add(topicId);
            }
        }
        this.selection = selection;
    }
}
exports.default = Selections;


/***/ }),

/***/ "./src/styles/index.css":
/*!******************************!*\
  !*** ./src/styles/index.css ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./src/styles/index.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./src/topic/index.ts":
/*!****************************!*\
  !*** ./src/topic/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
__webpack_require__(/*! ./styles/topic.css */ "./src/topic/styles/topic.css");
var topic_1 = __webpack_require__(/*! ./topic */ "./src/topic/topic.ts");
exports.default = topic_1.default;


/***/ }),

/***/ "./src/topic/styles/topic.css":
/*!************************************!*\
  !*** ./src/topic/styles/topic.css ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var api = __webpack_require__(/*! ../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
            var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js!./topic.css */ "./node_modules/css-loader/dist/cjs.js!./src/topic/styles/topic.css");

            content = content.__esModule ? content.default : content;

            if (typeof content === 'string') {
              content = [[module.i, content, '']];
            }

var options = {};

options.insert = "head";
options.singleton = false;

var update = api(content, options);

var exported = content.locals ? content.locals : {};



module.exports = exported;

/***/ }),

/***/ "./src/topic/topic.ts":
/*!****************************!*\
  !*** ./src/topic/topic.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/dist/esm-browser/index.js");
class Topic {
    constructor(topicData, context) {
        this.editing = false;
        this.id = topicData.id ? topicData.id : uuid_1.v4();
        this.title = topicData.title;
        this.children = topicData.children;
        this.parent = context.parent;
        this.mindmap = context.mindmap;
        this.mindmap.eventBus.register(this);
        this.DOMEventHandlers = this.getDOMEventHandlers();
    }
    static fromJSON(topicJSON, context) {
        const title = topicJSON.title;
        let children = [];
        const topic = new Topic({ title, children }, context);
        const childrenArr = topicJSON.children;
        if (childrenArr && childrenArr.length) {
            children = childrenArr
                .map((v) => Topic.fromJSON(Object.assign(Object.assign({}, v), { parent: this }), { mindmap: context.mindmap, parent: topic }))
                .filter((v) => v != null);
        }
        topic.children = children;
        return topic;
    }
    printTitle() {
        console.log(this.title);
    }
    getBox() {
        // TODO: put in layout mode, then exit layout mode
        const rect = this.topicEl.getBoundingClientRect();
        return [rect.width, rect.height];
    }
    // Only remove from memory, to fully remove, call destroy method
    removeChild(child) {
        const idx = this.children.indexOf(child);
        if (idx >= 0) {
            this.children.splice(idx, 1);
        }
    }
    initDom() {
        this.dom = document.createElement('div');
        this.topicEl = document.createElement('div');
        this.text = document.createElement('div');
        this.canvas = document.createElement('canvas');
        this.childrenContainer = document.createElement('div');
        this.editingWrapper = document.createElement('div');
        this.dom.classList.add('topic-container');
        this.topicEl.classList.add('topic');
        this.topicEl.id = this.id;
        this.canvas.classList.add('branch-connections');
        this.childrenContainer.classList.add('topic-children-container');
        this.text.classList.add('topic-text');
        this.text.innerText = this.title;
        // make sure child have enough space to grow, the max-width is 200px
        this.dom.style.width = '200px';
        this.editingWrapper.appendChild(this.topicEl);
        this.dom.appendChild(this.canvas);
        this.dom.appendChild(this.childrenContainer);
        this.topicEl.appendChild(this.text);
        this.dom.appendChild(this.editingWrapper);
        for (const child of this.children) {
            this.childrenContainer.appendChild(child.initDom());
        }
        return this.dom;
    }
    destroy(emit = true) {
        if (this.parent) {
            for (const child of [...this.children]) {
                child.destroy(false);
            }
            this.mindmap.eventBus.unregister(this);
            this.parent.removeChild(this);
            this.dom.remove();
            if (emit) {
                this.mindmap.eventBus.emit('update');
                this.mindmap.eventBus.emit('destroyed:topic', this);
            }
        }
    }
    onAction(action) {
        switch (action.type) {
            case 'select':
                this.topicEl.classList.add('selected');
                break;
            case 'deselect':
                this.topicEl.classList.remove('selected');
                this.exitEditMode();
                break;
            case 'addChild':
                this.addChild();
                break;
            case 'addSibling':
                this.addSibling();
                break;
            case 'delete':
                this.destroy();
                break;
            case 'edit':
                this.enterEditMode();
                break;
            default:
                console.log('Unhandled action: ', action);
                break;
        }
    }
    addChild() {
        const newChild = new Topic({
            title: 'New Topic',
            children: [],
        }, { mindmap: this.mindmap, parent: this });
        this.children.push(newChild);
        this.childrenContainer.appendChild(newChild.initDom());
        this.mindmap.eventBus.emit('update');
        this.mindmap.eventBus.emit('new:topic', newChild);
    }
    addSibling() {
        const newSibling = new Topic({
            title: 'New Topic',
            children: [],
        }, { mindmap: this.mindmap, parent: this.parent });
        if (this.parent) {
            this.parent.children.splice(this.parent.children.indexOf(this) + 1, 0, newSibling);
            this.parent.childrenContainer.appendChild(newSibling.initDom());
            this.mindmap.eventBus.emit('update');
            this.mindmap.eventBus.emit('new:topic', newSibling);
        }
    }
    enterEditMode() {
        var _a;
        if (this.editing)
            return;
        this.editing = true;
        this.text.setAttribute('contenteditable', 'true');
        this.text.focus();
        this.topicEl.style.zIndex = '999';
        this.topicEl.classList.add('editing');
        // move cursor to last
        document.execCommand('selectAll', false);
        (_a = document.getSelection()) === null || _a === void 0 ? void 0 : _a.collapseToEnd();
        this.attachEvents();
        this.enterFreeFlowMode();
    }
    exitEditMode() {
        if (!this.editing)
            return;
        this.editing = false;
        this.title = this.text.textContent || '';
        this.text.removeAttribute('contenteditable');
        this.topicEl.style.removeProperty('z-index');
        this.topicEl.classList.remove('editing');
        this.mindmap.eventBus.emit('update');
        this.exitFreeFlowMode();
        this.detachEvents();
    }
    enterFreeFlowMode() {
        this.editingWrapper.style.position = 'absolute';
        this.editingWrapper.style.width = '200px';
        for (const p of ['top', 'right', 'bottom', 'left']) {
            if (this.topicEl.style[p]) {
                this.editingWrapper.style[p] = '0px';
            }
        }
        this.editingWrapper.style.width =
            parseInt(this.dom.style.width) > 200
                ? this.dom.style.width
                : '200px';
    }
    exitFreeFlowMode() {
        for (const property of [
            'top',
            'right',
            'bottom',
            'left',
            'position',
            'width',
        ]) {
            this.editingWrapper.style.removeProperty(property);
        }
    }
    getDOMEventHandlers() {
        return {
            ['keydown']: (e) => {
                e.stopPropagation();
                if (e.key === 'Enter') {
                    e.preventDefault();
                    this.exitEditMode();
                }
            },
        };
    }
    attachEvents() {
        for (const eventName in this.DOMEventHandlers) {
            this.dom.addEventListener(eventName, this.DOMEventHandlers[eventName]);
        }
    }
    detachEvents() {
        for (const eventName in this.DOMEventHandlers) {
            this.dom.removeEventListener(eventName, this.DOMEventHandlers[eventName]);
        }
    }
}
exports.default = Topic;


/***/ }),

/***/ "./src/utils/index.ts":
/*!****************************!*\
  !*** ./src/utils/index.ts ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function findTopicId(el) {
    let curr = el;
    while (curr) {
        if (curr.classList.contains('topic')) {
            return curr.id;
        }
        curr = curr.parentElement;
    }
    return null;
}
exports.findTopicId = findTopicId;
function getOffset(el, ref) {
    let offsetTop = 0;
    let offsetLeft = 0;
    while (el != ref) {
        if (!isNaN(el.offsetLeft)) {
            offsetLeft += el.offsetLeft;
            offsetTop += el.offsetTop;
        }
        el = el.offsetParent;
    }
    return { top: offsetTop, left: offsetLeft };
}
exports.getOffset = getOffset;


/***/ })

/******/ });
//# sourceMappingURL=mindmap.js.map