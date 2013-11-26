(function() {
  (function(namespace) {
    return (function(modules) {
      return udefine.configure(function(root) {
        var m, moduleName, _i, _len;
        for (_i = 0, _len = modules.length; _i < _len; _i++) {
          m = modules[_i];
          moduleName = "" + namespace + "/" + (m.toLowerCase());
          root[namespace] || (root[namespace] = {});
          udefine.inject.add(moduleName, {
            root: root[namespace],
            name: m
          });
        }
        return null;
      });
    })(['Base', 'Entity', 'Game', 'Scene']);
  })('chione');

}).call(this);

(function() {
  var __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  udefine('chione/base', ['mixer', 'eventmap'], function(mixer, EventMap) {
    var Base;
    return Base = (function() {
      function Base(parent, descriptor) {
        var evKey, evValue, key, value;
        this.parent = parent;
        mixer([this, Base.prototype], new EventMap());
        if (typeof descriptor === 'function') {
          descriptor.call(this);
        } else {
          for (key in descriptor) {
            value = descriptor[key];
            if (key === 'events') {
              for (evKey in key) {
                evValue = key[evKey];
                this.on(evKey, evValue);
              }
            } else {
              this[key] = value;
            }
          }
        }
      }

      Base.prototype.log = function() {
        var args, nameArg;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        nameArg = (this.name || this.constructor.name) + ': ';
        return console.log.apply(console, [].concat.apply(nameArg, args));
      };

      return Base;

    })();
  });

  define('chione/bind', function() {
    return function(container, element, type) {};
  });

  udefine('chione/component', ['chione/base'], function(Base) {
    var Component, _ref;
    return Component = (function(_super) {
      __extends(Component, _super);

      function Component() {
        _ref = Component.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Component;

    })(Base);
  });

  udefine('chione/entity', ['chione/base'], function(Base) {
    var Entity;
    return Entity = (function(_super) {
      __extends(Entity, _super);

      function Entity() {
        var components;
        components = {};
        Entity.__super__.constructor.apply(this, arguments);
      }

      Entity.prototype.component = function() {};

      return Entity;

    })(Base);
  });

  udefine('chione/game', ['chione/base', 'chione/scene'], function(Base, Scene) {
    var Game;
    return Game = (function(_super) {
      __extends(Game, _super);

      function Game(descriptor) {
        this.scenes = [];
        Game.__super__.constructor.call(this, null, descriptor);
      }

      Game.prototype.scene = function(obj) {
        var scene;
        scene = typeof obj === 'object' && obj instanceof Scene ? (obj.parent = this, obj) : new Scene(this, obj);
        return this.scenes.push(scene);
      };

      Game.run = function(sceneName) {};

      return Game;

    })(Base);
  });

  udefine('chione/scene', ['chione/base'], function(Base) {
    var Scene, _ref;
    return Scene = (function(_super) {
      __extends(Scene, _super);

      function Scene() {
        _ref = Scene.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Scene;

    })(Base);
  });

}).call(this);
