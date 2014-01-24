udefine ['requestanimationframe', 'chione/entity', 'chione/bind', 'chione/scene'], (requestAnimationFrame, Entity, bind, Scene) ->
  class Game extends Entity
    constructor: (descriptor) ->
      unless @ instanceof Game
        return new Game descriptor
      
      #canvasElement = document.createElement 'canvas'
      #canvasElement.id = 'canvas'
      #document.body.appendChild canvasElement
      
      @canvas = new fabric.Canvas 'canvas'
      @canvas.setWidth @width
      @canvas.setHeight @height
      
      super null, descriptor

      @on 'draw', =>
        @canvas.renderAll()
   
    scene: (factory) ->
      bind @, factory, Scene
      
    run: (sceneName) =>
      unless sceneName?
        sceneNames = Object.keys(@children)
        sceneName = sceneNames[sceneNames.length - 1]
      
      @trigger 'run', sceneName
      
      requestAnimationFrame @draw
