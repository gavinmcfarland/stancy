"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.database = database;
exports.write = write;

var _pluralize = require("pluralize");

var _processContent = _interopRequireDefault(require("./process-content"));

var fs = require('fs');

var path = require('path');

var pluralize = require('pluralize');

var type = {
  is: {
    file: function file(item) {
      if (/\..+$/.test(item)) {
        return item.split('.')[0];
      } else {
        return false;
      }
    },
    folder: function folder(item) {
      if (!/\..+$/.test(item)) {
        return item;
      } else {
        return false;
      }
    },
    singular: function singular(item) {
      return pluralize.isSingular(item);
    },
    plural: function plural(item) {
      return pluralize.isPlural(item);
    },
    index: function index(value) {
      return /^index..+$/.test(value);
    },
    collection: function collection(source, value) {
      var isCollection = false;

      if (type.is.folder(value)) {
        isCollection = true;
      } // console.log(value)


      return isCollection;
    },
    item: function item(source, value) {
      var isItem = false;

      if (type.is.file(value) || type.has.index(source, value)) {
        isItem = true;
      }

      return isItem;
    },
    hidden: function hidden(value) {
      return /^_/.test(value);
    }
  },
  has: {
    index: function index(source, value) {
      var hasIndex = false;

      if (type.is.folder(value)) {
        fs.readdirSync(path.join(source + value)).map(function (value, index) {
          if (type.is.index(value)) {
            hasIndex = true;
          }
        });
      }

      return hasIndex;
    },
    children: function children(source, value) {
      var hasChildren = false;

      if (type.is.folder(value)) {
        fs.readdirSync(path.join(source + value)).map(function (value, index) {
          hasChildren = true;
        });
      }

      return hasChildren;
    }
  }
};

function createResrouce(dir, value, index, parent, root) {
  // If thing is hidden don't return resource
  if (type.is.hidden(value)) {
    return;
  }

  var resource = {
    _index: index,
    // _file: value,
    _name: value.split('.')[0]
  }; // Add slug

  var slug = value.split('.')[0];

  if (value === "home") {
    slug = "";
  } // Add url


  var newDir = dir.replace(root.replace(path.sep, ""), "");
  resource.url = path.join(newDir + slug); // Add source

  resource._source = path.join(dir + slug);

  if (type.is.singular(value)) {// resource._type = "item"
  }

  if (type.is.folder(value) && !type.has.index(dir, value)) {} // resource._type = "collection"
  // Add name of resource whether it be an item or a collection.


  if (type.is.item(dir, value)) {
    resource._collection = parent;
    resource._type = parent || value.split('.')[0];
  }

  if (type.is.folder(value)) {
    var subDir = path.join(dir + value + '/');
    var _parent = value;
    fs.readdirSync(subDir).map(function (value, index) {
      createResrouce(subDir, value, index, _parent, root);
    });
  } // Get content
  // Apply content from file


  if (type.is.file(value)) {
    Object.assign(resource, (0, _processContent["default"])(dir, value));
  } // Apply content from index file


  if (type.is.folder(value) && !type.is.item(dir, value)) {
    var _subDir = path.join(dir + value + '/');

    var indexContent = "";
    fs.readdirSync(dir).map(function (value, index) {
      if (/\index..+$/.test(value)) {
        indexContent = (0, _processContent["default"])(dir, value);
      }
    });
    Object.assign(resource, indexContent);
  } // Add children of folder to resource


  if (type.is.folder(value)) {
    var _subDir2 = path.join(dir + value + '/');

    resource._children = [];
    fs.readdirSync(path.join(dir + value)).map(function (value, index) {
      if (!type.is.index(value)) {
        resource._children.push(value.split('.')[0]);
      }
    });
  }

  if (!type.is.index(value)) db.push(resource);
  return resource;
}

var db = [];

function createDatabase(dir) {
  var root = dir;
  var database = fs.readdirSync(dir).map(function (value, index) {
    createResrouce(dir, value, index, null, root);
  });
  return db;
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