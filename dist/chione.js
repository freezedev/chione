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
        this.id = "" + (this.constructor.name.toLowerCase()) + (++this.idIndex);
        this.name = this.type = this.constructor.name;
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

      Base.prototype.idIndex = 0;

      Base.prototype.log = function() {
        var args;
        args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
        return console.log.apply(console, [].concat.apply("" + this.name + ": ", args));
      };

      return Base;

    })();
  });

  udefine('chione/component', ['chione/base', 'chione/mixins/updatable'], function(Base, updatable) {
    var Component, toArray;
    toArray = function(value, splitter) {
      var arr;
      if (splitter == null) {
        splitter = /[\s,]/;
      }
      arr = splitter.split(splitter);
      arr.map(function(item) {
        return item.trim();
      }).filter(function(item) {
        return !!item;
      });
      if (arr.length) {
        return arr;
      } else {
        return null;
      }
    };
    return Component = (function(_super) {
      __extends(Component, _super);

      function Component() {
        var tags;
        Component.__super__.constructor.apply(this, arguments);
        tags = [];
        Object.defineProperty(this, 'tags', {
          get: function() {
            return tags;
          },
          set: function(val) {
            if (tags == null) {
              return tags = val;
            }
            if (Array.isArray(val)) {
              return tags = val;
            } else {
              if (typeof val === 'string') {
                return tags = val.split(' ');
              }
            }
          }
        });
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
      return container.children[element.id] = element;
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
