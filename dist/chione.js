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

  udefine('chione/base', ['mixedice', 'eventmap'], function(mixedice, EventMap) {
    var Base;
    return Base = (function() {
      function Base(parent, descriptor) {
        var evKey, evValue, id, key, value;
        this.parent = parent;
        mixedice([this, Base.prototype], new EventMap());
        this.type = this.constructor.name;
        id = "" + (this.constructor.name.toLowerCase()) + (++this.idIndex);
        Object.defineProperty(this, 'id', {
          get: function() {
            return id;
          },
          set: function(val) {
            return id = val;
          }
        });
        Object.defineProperty(this, 'type', {
          get: function() {
            return this.constructor.name;
          }
        });
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
        return console.log.apply(console, [].concat.apply("[" + this.type + "] " + this.id + ": ", args));
      };

      return Base;

    })();
  });

  udefine('chione/bind/all', function() {});

  udefine('chione/bind', function() {
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

      Component.prototype.find = function(selector) {
        var element, searchFor;
        element = '';
        return searchFor = '';
      };

      return Component;

    })(Base);
  });

  udefine('chione/components/animatable', ['chione/component'], function(Component) {
    var Animatable, _ref;
    return Animatable = (function(_super) {
      __extends(Animatable, _super);

      function Animatable() {
        _ref = Animatable.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Animatable;

    })(Component);
  });

  udefine('chione/components/audio', ['chione/component'], function(Component) {
    var Audio, _ref;
    return Audio = (function(_super) {
      __extends(Audio, _super);

      function Audio() {
        _ref = Audio.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Audio;

    })(Component);
  });

  udefine('chione/components/collidable', ['chione/component'], function(Component) {
    var Collidable, _ref;
    return Collidable = (function(_super) {
      __extends(Collidable, _super);

      function Collidable() {
        _ref = Collidable.__super__.constructor.apply(this, arguments);
        return _ref;
      }

      return Collidable;

    })(Component);
  });

  udefine('chione/entity', ['chione/component', 'chione/bind', 'chione/mixins/drawable'], function(Component, bind, drawable) {
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

      Entity.prototype.entity = function(factory) {
        return bind(this, factory, Entity);
      };

      return Entity;

    })(Component);
  });

  udefine('chione/factory/game', ['chione/game'], function(Game) {
    return function(factory) {
      return new Game(factory);
    };
  });

  udefine('chione/game', ['chione/entity', 'chione/bind', 'chione/scene'], function(Entity, bind, Scene) {
    var Game;
    return Game = (function(_super) {
      __extends(Game, _super);

      function Game(descriptor) {
        if (!(this instanceof Game)) {
          return new Game(descriptor);
        } else {
          Game.__super__.constructor.call(this, null, descriptor);
        }
      }

      Game.prototype.scene = function(factory) {
        return bind(this, factory, Scene);
      };

      Game.run = function(sceneName) {
        return Game.trigger('run', sceneName);
      };

      return Game;

    }).call(this, Entity);
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

  udefine('chione/preloader', ['chione/base'], function(Base) {
    var Preloader;
    return Preloader = (function(_super) {
      __extends(Preloader, _super);

      function Preloader() {}

      Preloader.prototype.add = function(asset) {};

      Preloader.prototype.run = function() {};

      return Preloader;

    })(Base);
  });

  udefine('chione/scene', ['chione/entity', 'chione/bind'], function(Entity, bind) {
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

  udefine('chione/sprite', ['chione/components/animatable', 'chione/entity'], function(Animatable, Entity) {
    var Sprite;
    return Sprite = (function(_super) {
      __extends(Sprite, _super);

      function Sprite() {
        Sprite.__super__.constructor.apply(this, arguments);
        this.component(new Animatable());
      }

      return Sprite;

    })(Entity);
  });

}).call(this);
