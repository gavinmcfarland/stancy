"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

var _express = _interopRequireDefault(require("express"));

var _createDatabase = require("./create-database.js");

var _getContent = _interopRequireDefault(require("./get-content.js"));

var _cors = _interopRequireDefault(require("cors"));

// server.js
var chokidar = require('chokidar');

var http = require('http');

var watcher = chokidar.watch('content/', {
  ignored: /(^|[/\\])\../,
  // ignore dotfiles
  persistent: true
});

function _serve(dir, port, base) {
  port = port || 3000;

  if (!base) {
    base = '/';
  }

  var server = '';
  var db;

  function createApp() {
    var app = (0, _express["default"])();
    db = (0, _createDatabase.database)(dir);
    var corsOptions = {
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      preflightContinue: false,
      optionsSuccessStatus: 204
    };
    app.use((0, _cors["default"])(corsOptions)); // Format repsonse to have spaces and indentation

    app.set('json spaces', 4);
    app.get(base, function (req, res) {
      (0, _getContent["default"])(db, {
        resource1: null,
        resource2: null,
        query: req.query
      }).then(function (value) {
        if (value) {
          res.json(value);
          console.log('0');
        } else {
          res.send("No value that matches query \n ".concat(req.url));
        }
      });
    });
    app.get(base + ':resource1', function (req, res) {
      (0, _getContent["default"])(db, {
        resource1: req.params.resource1,
        resource2: null,
        query: req.query
      }).then(function (value) {
        if (value) {
          res.json(value);
          console.log('1');
        } else {
          res.send("No value that matches query \n ".concat(req.url));
        }
      });
    });
    app.get(base + ':resource1/:resource2', function (req, res) {
      (0, _getContent["default"])(db, {
        resource1: req.params.resource1,
        resource2: req.params.resource2,
        query: req.query
      }).then(function (value) {
        if (value) {
          res.json(value); // console.log(value);
        } else {
          res.send("No value that matches query \n ".concat(req.url));
        }
      });
    });
    return app;
  }

  function start() {
    server = http.createServer(createApp());
    server.listen(port, function () {
      console.log("Server listening at http://localhost:".concat(port).concat(base));
    }); // app.listen(port, () => {
    // 	console.log(`Server listening at http://localhost:${port}${base}`);
    // });
  }

  function restart() {
    console.log('restart');
    server.close();
    console.log('start');
    start();
  }

  start();
  watcher.on('change', function () {
    restart();
  });
}

function send(_ref) {
  var base = _ref.base,
      method = _ref.method,
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
      console.log("".concat(base, "/").concat(path));
      return json;
    }
  });
}

function _get(base, path, token) {
  return send({
    method: 'GET',
    path: path,
    token: token,
    base: base
  });
}

function _default(source) {
  return {
    serve: function serve(port, base) {
      return _serve(source, port, base);
    },
    get: function get(path, token) {
      return _get(path, token);
    },
    database: function database() {
      return (0, _createDatabase.database)(source);
    }
  };
} // export default {
// 	grab: getContent,
// 	database,
// 	write,
// 	serve,
// 	get
// }


module.exports = exports.default;