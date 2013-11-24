(function() {
  var Base, Entity, Game, Scene, _ref, _ref1,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Base = (function() {
    function Base(parent, descriptor) {
      var key, value;
      this.parent = parent;
      if (typeof descriptor === 'function') {
        descriptor.call(this);
      } else {
        for (key in descriptor) {
          value = descriptor[key];
          this[key] = value;
        }
      }
    }

    Base.prototype.log = function() {};

    return Base;

  })();

  Scene = (function(_super) {
    __extends(Scene, _super);

    function Scene() {
      _ref = Scene.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    return Scene;

  })(Base);

  Entity = (function(_super) {
    __extends(Entity, _super);

    function Entity() {
      _ref1 = Entity.__super__.constructor.apply(this, arguments);
      return _ref1;
    }

    return Entity;

  })(Base);

  Game = (function(_super) {
    __extends(Game, _super);

    function Game(descriptor) {
      this.scenes = [];
      Game.__super__.constructor.call(this, null, descriptor);
    }

    Game.prototype.scene = function(obj) {
      var scene;
      scene = obj instanceof Scene ? (obj.parent = this, obj) : new Scene(this, obj);
      return this.scenes.push(scene);
    };

    return Game;

  })(Base);

}).call(this);
