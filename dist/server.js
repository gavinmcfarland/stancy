"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _htmlEscape = _interopRequireDefault(require("html-escape"));

var _jsonata = _interopRequireDefault(require("jsonata"));

var _createDatabase = require("./create-database.js");

// server.js
// async function getContent(dataset, resource) {
//     let input = `*.${resource}[_id == 0]{_file}`
//     let tree = parse(input)
//     let value = await evaluate(tree, { dataset })
//     let result = await value.get()
//     return result
// }
function isObjectEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

function getContent(_x, _x2, _x3, _x4) {
  return _getContent.apply(this, arguments);
}

function _getContent() {
  _getContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataset, resource, resource2, query) {
    var expression, array, _i, _Object$entries, _Object$entries$_i, key, value, string, _array, _i2, _Object$entries2, _Object$entries2$_i, _key, _value, _string, _array2, _i3, _Object$entries3, _Object$entries3$_i, _key2, _value2, _string2;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            expression = (0, _jsonata["default"])("**[_type=\"".concat(resource, "\"]"));

            if (!(resource && !resource2)) {
              _context.next = 4;
              break;
            }

            if (query) {
              array = [];

              for (_i = 0, _Object$entries = Object.entries(query); _i < _Object$entries.length; _i++) {
                _Object$entries$_i = (0, _slicedToArray2["default"])(_Object$entries[_i], 2), key = _Object$entries$_i[0], value = _Object$entries$_i[1];
                string = "[".concat(key, "=").concat(value, "]");
                array.push(string);
              }

              expression = (0, _jsonata["default"])("**[_type=\"".concat(resource, "\"]").concat(array.toString()));
            }

            return _context.abrupt("return", expression.evaluate(dataset));

          case 4:
            if (!(resource && resource2)) {
              _context.next = 7;
              break;
            }

            if (query) {
              _array = [];

              for (_i2 = 0, _Object$entries2 = Object.entries(query); _i2 < _Object$entries2.length; _i2++) {
                _Object$entries2$_i = (0, _slicedToArray2["default"])(_Object$entries2[_i2], 2), _key = _Object$entries2$_i[0], _value = _Object$entries2$_i[1];
                _string = "[".concat(_key, "=").concat(_value, "]");

                _array.push(_string);
              }

              expression = (0, _jsonata["default"])("**[_type=\"".concat(resource, "\"][_name=\"").concat(resource2, "\"]").concat(_array.toString()));
            }

            return _context.abrupt("return", expression.evaluate(dataset));

          case 7:
            if (!(!resource || !resource2)) {
              _context.next = 15;
              break;
            }

            if (!query) {
              _context.next = 15;
              break;
            }

            if (!isObjectEmpty(query)) {
              _context.next = 11;
              break;
            }

            return _context.abrupt("return", dataset);

          case 11:
            _array2 = [];

            for (_i3 = 0, _Object$entries3 = Object.entries(query); _i3 < _Object$entries3.length; _i3++) {
              _Object$entries3$_i = (0, _slicedToArray2["default"])(_Object$entries3[_i3], 2), _key2 = _Object$entries3$_i[0], _value2 = _Object$entries3$_i[1];
              _string2 = "[".concat(_key2, "=").concat(_value2, "]");

              _array2.push(_string2);
            }

            expression = (0, _jsonata["default"])("**".concat(_array2.toString()));
            return _context.abrupt("return", expression.evaluate(dataset));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getContent.apply(this, arguments);
}

function serve(dir) {
  var db = (0, _createDatabase.database)(dir);
  var app = (0, _express["default"])();
  var port = 3000;
  app.get('/', function (req, res) {
    getContent(db, null, null, req.query).then(function (value) {
      res.send("<pre>".concat((0, _htmlEscape["default"])(JSON.stringify(value, null, '\t')), "</pre>"));
    });
  });
  app.get('/:resource', function (req, res) {
    getContent(db, req.params.resource, null, req.query).then(function (value) {
      res.send("<pre>".concat((0, _htmlEscape["default"])(JSON.stringify(value, null, '\t')), "</pre>"));
    });
  });
  app.get('/:resource/:resource2', function (req, res) {
    getContent(db, req.params.resource, req.params.resource2, req.query).then(function (value) {
      res.send("<pre>".concat((0, _htmlEscape["default"])(JSON.stringify(value, null, '\t')), "</pre>"));
    });
  });
  app.listen(port, function () {
    console.log("Server listening at http://localhost:".concat(port));
  });
}

var base = 'http://localhost:3000';

function send(_ref) {
  var method = _ref.method,
      path = _ref.path,
      data = _ref.data,
      token = _ref.token;
  var fetch = process.browser ? window.fetch : require('node-fetch')["default"];
  var opts = {
    method: method,
    headers: {}
  };

  if (data) {
    opts.headers['Content-Type'] = 'application/json';
    opts.body = JSON.stringify(data);
  }

  if (token) {
    opts.headers['Authorization'] = "Token ".concat(token);
  }

  return fetch("".concat(base, "/").concat(path), opts).then(function (r) {
    return r.text();
  }).then(function (json) {
    try {
      return JSON.parse(json);
    } catch (err) {
      return json;
    }
  });
}

function get(path, token) {
  return send({
    method: 'GET',
    path: path,
    token: token
  });
}

var _default = {
  database: _createDatabase.database,
  write: _createDatabase.write,
  serve: serve,
  get: get
};
exports["default"] = _default;
module.exports = exports.default;