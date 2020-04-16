"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _express = _interopRequireDefault(require("express"));

var _groqJs = require("groq-js");

var _htmlEscape = _interopRequireDefault(require("html-escape"));

var _jsonata = _interopRequireDefault(require("jsonata"));

var _database = require("./database.js");

// server.js
// async function getContent(dataset, resource) {
//     let input = `*.${resource}[_id == 0]{_file}`
//     let tree = parse(input)
//     let value = await evaluate(tree, { dataset })
//     let result = await value.get()
//     return result
// }
function getContent(_x, _x2) {
  return _getContent.apply(this, arguments);
}

function _getContent() {
  _getContent = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(dataset, resource) {
    var expression, result;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!resource) {
              _context.next = 6;
              break;
            }

            expression = (0, _jsonata["default"])("".concat(resource));
            result = expression.evaluate(dataset);
            return _context.abrupt("return", result);

          case 6:
            return _context.abrupt("return", dataset);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _getContent.apply(this, arguments);
}

function start(dir) {
  var db = (0, _database.database)(dir);
  var app = (0, _express["default"])();
  var port = 3000;
  app.get('/', function (req, res) {
    var resource = req.params.resource;
    getContent(db).then(function (value) {
      // console.log(value)
      // console.log(req.query)
      res.send("<pre>".concat((0, _htmlEscape["default"])(JSON.stringify(value, null, '\t')), "</pre>"));
    });
  });
  app.get('/:resource', function (req, res) {
    var resource = req.params.resource;
    getContent(db, resource).then(function (value) {
      // console.log(value)
      // console.log(req.query)
      res.send("<pre>".concat((0, _htmlEscape["default"])(JSON.stringify(value, null, '\t')), "</pre>"));
    });
  });
  app.listen(port, function () {
    console.log("Server listening at http://localhost:".concat(port));
  });
}

var _default = {
  database: _database.database,
  write: _database.write,
  start: start
};
exports["default"] = _default;
module.exports = exports.default;