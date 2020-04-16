"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = database;
exports.write = write;

var _pluralize = require("pluralize");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(n); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var fs = require('fs');

var path = require('path');

var marked = require('marked');

var matter = require('gray-matter');

var pluralize = require('pluralize');

function isFile(item) {
  if (/\..+$/.test(item)) {
    return item.split('.')[0];
  } else {
    return false;
  }
}

function isFolder(item) {
  if (!/\..+$/.test(item)) {
    return item;
  } else {
    return false;
  }
}

function createArray(dir, item) {
  if (isFolder(item)) {
    var array = [];
    dir = path.join(dir, item);
    fs.readdirSync(dir).map(function (item, index) {
      if (!/\index..+$/.test(item)) {
        var object = createObject(dir, item, index);

        if (object !== undefined) {
          array.push(object);
        }
      }
    });
    return array;
  }
}

function getFileExt(item) {
  return item.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
}

function parseJson(dir, item) {
  if (getFileExt(item) === "json") {
    var content = fs.readFileSync(path.join(dir, item), 'utf8');
    return JSON.parse(content);
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

function parseContent(dir, item) {
  var result = parseJson(dir, item) || parseMarkdown(dir, item);
  return result;
}

function createObject(dir, item, index) {
  var object = {};
  object = {
    _id: index,
    _file: item
  };

  if (isFile(item)) {
    Object.assign(object, parseContent(dir, item));
  } else {
    var containsChildren = false;
    var hasIndex = false;
    var subDir = path.join(dir, item);
    fs.readdirSync(subDir).map(function (item) {
      if (!/\index..+$/.test(item)) {
        containsChildren = true;
      } else {
        hasIndex = true;
        Object.assign(object, parseContent(subDir, item));
      }
    });

    if (pluralize.isSingular(item) && !hasIndex) {
      var childObject = {};
      fs.readdirSync(subDir).map(function (item, index) {
        var name = item.split('.')[0];
        childObject[name] = parseContent(subDir, item);
      });
      Object.assign(object, childObject);
    } else {
      if (containsChildren) {
        object.children = createArray(dir, item, index);
      } // if (hasIndex) {
      //     object.content = hasIndex
      // }


      if (!hasIndex) {
        object = undefined;
      }
    }
  }

  return object;
}

function database(dir) {
  // For each item in array
  var database = fs.readdirSync(dir).map(function (item, index) {
    // Create an collection
    var folder = isFolder(item);
    var file = isFile(item);
    var plural = pluralize.isPlural(item);
    var singular = pluralize.isSingular(item);

    if (folder && plural) {
      return _defineProperty({}, folder, createArray(dir, item));
    } else if (folder && singular) {
      return _defineProperty({}, folder, createObject(dir, folder, index));
    } else {
      return _defineProperty({}, file, createObject(dir, item, index));
    }
  });
  return Object.assign.apply(Object, [{}].concat(_toConsumableArray(database)));
}

function write(dir) {
  var db = JSON.stringify(database(dir), null, '\t');
  fs.writeFile('db.json', db, function (err) {
    if (err) throw err; // console.log('The file has been saved!');
    // console.log(db)
  });
}