"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = database;
exports.write = write;

var _toConsumableArray2 = _interopRequireDefault(require("@babel/runtime/helpers/toConsumableArray"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _pluralize = require("pluralize");

var fs = require('fs');

var path = require('path');

var marked = require('marked');

var matter = require('gray-matter');

var smarkt = require('smarkt');

var pluralize = require('pluralize');

var YAML = require('yaml');

var JSON5 = require('json5'); // const csson = require('@csson/csson')


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

function createObject(dir, item, index) {
  if (/^_/.test(item)) {
    return undefined;
  }

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
      return (0, _defineProperty2["default"])({}, folder, createArray(dir, item));
    } else if (folder && singular) {
      return (0, _defineProperty2["default"])({}, folder, createObject(dir, folder, index));
    } else {
      return (0, _defineProperty2["default"])({}, file, createObject(dir, item, index));
    }
  });
  return Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2["default"])(database)));
}

function write(dir) {
  var db = JSON.stringify(database(dir), null, '\t');
  fs.writeFile('db.json', db, function (err) {
    if (err) throw err; // console.log('The file has been saved!');
  });
}