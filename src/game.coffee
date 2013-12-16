udefine ['chione/entity', 'chione/bind', 'chione/scene'], (Entity, bind, Scene) ->
  class Game extends Entity
    constructor: (descriptor) ->
      unless @ instanceof Game
        return new Game descriptor
      else
        super null, descriptor
   
    scene: (factory) ->
      bind @, factory, Scene
      
    @run: (sceneName) ->
      
