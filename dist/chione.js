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

  udefine('chione/component', ['chione/base', 'chione/mixins/updatable'], function(Base, updatable) {
    var Component;
    return Component = (function(_super) {
      __extends(Component, _super);

      function Component() {
        Component.__super__.constructor.apply(this, arguments);
        updatable(this);
      }

      return Component;

    })(Base);
  });

  udefine('chione/entity', ['chione/component', 'chione/mixins/bind', 'chione/mixins/drawable'], function(Component, bind, drawable) {
    var Entity;
    return Entity = (function(_super) {
      __extends(Entity, _super);

      function Entity() {
        Entity.__super__.constructor.apply(this, arguments);
        drawable(this);
      }

      Entity.prototype.component = function(factory) {
        return bind(this, factory, Component);
      };

      return Entity;

    })(Component);
  });

  udefine('chione/factory/game', ['chione/game'], function(Game) {
    return function(factory) {
      return new Game(factory);
    };
  });

  udefine('chione/game', ['chione/entity', 'chione/mixins/bind', 'chione/scene'], function(Entity, bind, Scene) {
    var Game;
    return Game = (function(_super) {
      __extends(Game, _super);

      function Game(descriptor) {
        Game.__super__.constructor.call(this, null, descriptor);
      }

      Game.prototype.scene = function(factory) {
        return bind(this, factory, Scene);
      };

      Game.run = function(sceneName) {};

      return Game;

    })(Entity);
  });

  udefine('chione/mixins/bind', function() {
    return function(container, factory, Type) {
      var element;
      container.children || (container.children = {});
      element = null;
      if (typeof factory === 'function' || typeof factory === 'object') {
        if (factory instanceof Type) {
          element = factory;
          element.parent = container;
        } else {
          element = new Type(container, factory);
        }
      }
      return container.children[element.name] = element;
    };
  });

  udefine('chione/mixins/drawable', function() {
    return function(context) {
      return context.on('draw', function() {});
    };
  });

  udefine('chione/mixins/updatable', function() {
    return function(context) {
      return context.on('update', function() {
        var key, value, _ref;
        if (context.children != null) {
          _ref = context.children;
          for (key in _ref) {
            value = _ref[key];
            if (typeof value.trigger === "function") {
              value.trigger('update', arguments);
            }
          }
          return null;
        }
      });
    };
  });

  udefine('chione/scene', ['chione/entity', 'chione/mixins/bind'], function(Entity, bind) {
    var Scene;
    return Scene = (function(_super) {
      __extends(Scene, _super);

      function Scene() {
        Scene.__super__.constructor.apply(this, arguments);
      }

      Scene.prototype.entity = function(factory) {
        return bind(this, factory, Component);
      };

      return Scene;

    })(Entity);
  });

}).call(this);
