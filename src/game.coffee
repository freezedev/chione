udefine ['requestanimationframe', 'chione/entity', 'chione/bind', 'chione/scene', 'gameboard/loop'], (requestAnimationFrame, Entity, bind, Scene, Loop) ->
  class Game extends Entity
    constructor: (descriptor) ->
      unless @ instanceof Game
        return new Game descriptor
      else
        super null, descriptor
      
      stage = new PIXI.Stage 0xFFFFFF, true
    
      renderer = new PIXI.autoDetectRenderer @width, @height
      
      renderer.view.style.display = 'block'
      
      document.body.appendChild renderer.view

      @on 'draw', =>
        renderer.render stage
   
    scene: (factory) ->
      bind @, factory, Scene
      
    run: (sceneName) =>
      unless sceneName?
        sceneNames = Object.keys(@children)
        sceneName = sceneNames[sceneNames.length - 1]
      
      @trigger 'run', sceneName
      
      Loop.on 'game:draw', @draw
      Loop.run()
