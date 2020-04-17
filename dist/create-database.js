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

var _processContent = _interopRequireDefault(require("./process-content"));

var fs = require('fs');

var path = require('path');

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

function createObject(dir, item, index) {
  var level = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1;

  if (/^_/.test(item)) {
    return undefined;
  }

  var object = {};
  var newObject = {};
  var resourceContent = {};
  var resourceMeta = {
    _id: index,
    _name: item,
    _type: "item"
  };
  Object.assign(newObject, resourceMeta);

  if (isFile(item)) {
    Object.assign(object, (0, _processContent["default"])(dir, item));
  } else {
    var containsChildren = false;
    var hasIndex = false;
    var subDir = path.join(dir, item);
    fs.readdirSync(subDir).map(function (item) {
      if (!/\index..+$/.test(item)) {
        containsChildren = true;
      } else {
        hasIndex = true;
        resourceContent = (0, _processContent["default"])(subDir, item);
        Object.assign(object, resourceContent);
      }
    });

    if (pluralize.isSingular(item) && !hasIndex) {
      var childObject = {};
      object._type = "collection";
      fs.readdirSync(subDir).map(function (item, index) {
        var name = item.split('.')[0];
        resourceContent = (0, _processContent["default"])(subDir, item);
        childObject[name] = resourceContent;
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

  if (level > 0) {
    newObject[item.split('.')[0]] = object;
    object = newObject;
  }

  level++;
  return object;
}

function createDatabase(dir) {
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
      return (0, _defineProperty2["default"])({}, folder, createObject(dir, folder, index, 0));
    } else {
      return (0, _defineProperty2["default"])({}, file, createObject(dir, item, index, 0));
    }
  });
  return Object.assign.apply(Object, [{}].concat((0, _toConsumableArray2["default"])(database)));
}

function database(dir) {
  return createDatabase(dir);
}

function write(dir) {
  var db = JSON.stringify(createDatabase(dir), null, '\t');
  fs.writeFile('db.json', db, function (err) {
    if (err) throw err; // console.log('The file has been saved!');
  });
}