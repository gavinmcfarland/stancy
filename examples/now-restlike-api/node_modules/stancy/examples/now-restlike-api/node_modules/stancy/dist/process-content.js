"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = parseContent;

var fs = require('fs');

var path = require('path');

var marked = require('marked');

var matter = require('gray-matter');

var smarkt = require('smarkt');

var YAML = require('yaml');

var JSON5 = require('json5'); // const csson = require('@csson/csson')


function getFileExt(item) {
  if (item.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)) return item.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
}

function parseJson(dir, item) {
  if (getFileExt(item) === "json") {
    var content = fs.readFileSync(path.join(dir, item), 'utf8');
    return JSON.parse(content);
  }
}

function parseJson5(dir, item) {
  if (getFileExt(item) === "json5") {
    var content = fs.readFileSync(path.join(dir, item), 'utf8');
    return JSON5.parse(content);
  }
}

function parseMarkdown(dir, item) {
  if (getFileExt(item) === "md") {
    var object = {
      content: marked(fs.readFileSync(path.join(dir, item), 'utf8'))
    };
    return object;
  }
}

function parseText(dir, item) {
  if (getFileExt(item) === "txt") {
    var object = smarkt.parse(fs.readFileSync(path.join(dir, item), 'utf8'));
    return object;
  }
}

function parseYaml(dir, item) {
  if (getFileExt(item) === "yml" || getFileExt(item) === "yaml") {
    var object = YAML.parse(fs.readFileSync(path.join(dir, item), 'utf8'));
    return object;
  }
}

function parseCsson(dir, item) {
  if (getFileExt(item) === "csson") {
    var object = csson(fs.readFileSync(path.join(dir, item), 'utf8'));
    return object;
  }
}

function parseContent(dir, item) {
  var result = parseJson(dir, item) || parseMarkdown(dir, item) || parseText(dir, item) || parseYaml(dir, item) || parseJson5(dir, item) || parseCsson(dir, item);
  return result;
}

module.exports = exports.default;