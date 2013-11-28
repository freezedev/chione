udefine ['chione/entity', 'chione/mixins/bind', 'chione/scene'], (Entity, bind, Scene) ->
  class Game extends Entity
    constructor: (descriptor) ->
      super null, descriptor
   
    scene: (factory) ->
      bind @, factory, Scene
      
    @run: (sceneName) ->
      
