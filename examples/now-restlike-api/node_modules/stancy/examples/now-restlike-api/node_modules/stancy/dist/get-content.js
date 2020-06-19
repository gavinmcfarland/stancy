"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = getContent;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _jsonata = _interopRequireDefault(require("jsonata"));

function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function getContent(_x, _x2) {
  return _getContent.apply(this, arguments);
}

function _getContent() {
  _getContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(database, _ref) {
    var resource1, resource2, query, expression, array, _i, _Object$entries, _Object$entries$_i, key, value, string, _array, _i2, _Object$entries2, _Object$entries2$_i, _key, _value, _string, _array2, _i3, _Object$entries3, _Object$entries3$_i, _key2, _value2, _string2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            resource1 = _ref.resource1, resource2 = _ref.resource2, query = _ref.query;
            expression = (0, _jsonata["default"])("**[_type=\"".concat(resource1, "\"]"));

            if (!(resource1 && !resource2)) {
              _context.next = 5;
              break;
            }

            if (query) {
              array = [];

              for (_i = 0, _Object$entries = Object.entries(query); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                string = "[".concat(key, "=").concat(value, "]");
                array.push(string);
              }

              expression = (0, _jsonata["default"])("**[_type=\"".concat(resource1, "\"]").concat(array.toString()));
            }

            return _context.abrupt("return", expression.evaluate(database));

          case 5:
            if (!(resource1 && resource2)) {
              _context.next = 8;
              break;
            }

            if (query) {
              _array = [];

              for (_i2 = 0, _Object$entries2 = Object.entries(query); _i2 < _Object$entries2.length; _i2++) {
                _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2), _key = _Object$entries2$_i[0], _value = _Object$entries2$_i[1];
                _string = "[".concat(_key, "=").concat(_value, "]");

                _array.push(_string);
              }

              expression = (0, _jsonata["default"])("**[_type=\"".concat(resource1, "\"][_name=\"").concat(resource2, "\"]").concat(_array.toString()));
            }

            return _context.abrupt("return", expression.evaluate(database));

          case 8:
            if (!(!resource1 || !resource2)) {
              _context.next = 16;
              break;
            }

            if (!query) {
              _context.next = 16;
              break;
            }

            if (!isObjectEmpty(query)) {
              _context.next = 12;
              break;
            }

            return _context.abrupt("return", database);

          case 12:
            _array2 = [];

            for (_i3 = 0, _Object$entries3 = Object.entries(query); _i3 < _Object$entries3.length; _i3++) {
              _Object$entries3$_i = (0, _slicedToArray2["default"])(_Object$entries3[_i3], 2), _key2 = _Object$entries3$_i[0], _value2 = _Object$entries3$_i[1];
              _string2 = "[".concat(_key2, "=").concat(_value2, "]");

              _array2.push(_string2);
            }

            expression = (0, _jsonata["default"])("**".concat(_array2.toString()));
            return _context.abrupt("return", expression.evaluate(database));

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getContent.apply(this, arguments);
}

module.exports = exports.default;