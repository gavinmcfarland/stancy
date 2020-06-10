"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseContent;

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var fs = require('fs');

var path = require('path');

var smarkt = require('smarkt');

var YAML = require('yaml');

var JSON5 = require('json5');

var matter = require('gray-matter');

function getFileExt(item) {
  if (item.match(/\.([0-9a-z]+)(?:[?#]|$)/i)) return item.match(/\.([0-9a-z]+)(?:[?#]|$)/i)[1];
}

function parseJson(dir, item) {
  if (getFileExt(item) === 'json') {
    var content = fs.readFileSync(path.join(dir, item), 'utf8');
    return JSON.parse(content);
  }
}

function parseJson5(dir, item) {
  if (getFileExt(item) === 'json5') {
    var content = fs.readFileSync(path.join(dir, item), 'utf8');
    return JSON5.parse(content);
  }
}

function parseMarkdown(dir, item) {
  // Removed automatic parsing of markdown, so that this can be done per domain
  if (getFileExt(item) === 'md') {
    var file = fs.readFileSync(path.join(dir, item), 'utf8');

    var _matter = matter(file),
        data = _matter.data,
        content = _matter.content;

    var object = _objectSpread(_objectSpread({}, data), {}, {
      content: content
    });

    return object;
  }
}

function parseText(dir, item) {
  if (getFileExt(item) === 'txt') {
    var object = smarkt.parse(fs.readFileSync(path.join(dir, item), 'utf8'));
    return object;
  }
}

function parseYaml(dir, item) {
  if (getFileExt(item) === 'yml' || getFileExt(item) === 'yaml') {
    var object = YAML.parse(fs.readFileSync(path.join(dir, item), 'utf8'));
    return object;
  }
} // function parseCsson(dir, item) {
// 	if (getFileExt(item) === 'csson') {
// 		let object = csson(fs.readFileSync(path.join(dir, item), 'utf8'));
// 		return object;
// 	}
// }


function parseContent(dir, item) {
  var result = parseJson(dir, item) || parseMarkdown(dir, item) || parseText(dir, item) || parseYaml(dir, item) || parseJson5(dir, item); // parseCsson(dir, item);

  return result;
}

module.exports = exports.default;