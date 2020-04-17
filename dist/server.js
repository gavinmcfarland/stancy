"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _jsonServer = _interopRequireDefault(require("json-server"));

var _singular = _interopRequireDefault(require("./singular.js"));

var _field = _interopRequireDefault(require("./field.js"));

var _createDatabase = require("./create-database.js");

// server.js
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
} // let testDatabase = {
// 	"site": {
// 		"name": "MySite"
// 	},
// 	"users": [
// 		{
// 			"type": "item",
// 			"jeffery": {
// 				"name": "Jeffery",
// 				"age": 24
// 			}
// 		},
// 		{
// 			"type": "item",
// 			"hannah": {
// 				"name": "Hannah",
// 				"age": 28
// 			}
// 		},
// 		{
// 			"type": "collection",
// 			"repos": [
// 				{
// 					"type": "item",
// 					"karamel": {
// 						"name": "karamel",
// 						"images": []
// 					}
// 				}
// 			]
// 		}
// 	]
// }


function start(dir) {
  var server = _jsonServer["default"].create();

  var router = _jsonServer["default"].router((0, _createDatabase.database)(dir));

  var middlewares = _jsonServer["default"].defaults();

  server.use(middlewares);
  server.use(_singular["default"]);
  server.use(_field["default"]);
  server.use(_jsonServer["default"].rewriter({
    "/:folder/:page": "/:folder?slug=:page&singular=1",
    "/:folder/:page/children": "/:folder?slug=:page&singular=1&_field=children",
    "/:folder/:page/images": "/images?pageId=:page"
  }));
  server.use(router);
  server.listen(3000, function () {
    console.log("Folder API started on http://localhost:3000");
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
  start: start,
  get: get
};
exports["default"] = _default;
module.exports = exports.default;