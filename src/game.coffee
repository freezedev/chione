udefine ['chione/base', 'chione/scene'], (Base, Scene) ->
  class Game extends Base
    constructor: (descriptor) ->
      @scenes = []
   
      super null, descriptor
   
    scene: (obj) ->
      scene = if typeof obj is 'object' and obj instanceof Scene
        obj.parent = @
        obj
      else
        new Scene @, obj
   
      @scenes.push scene
      
    @run: (sceneName) ->
