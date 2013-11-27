udefine 'chione/base', ['mixer', 'eventmap'], (mixer, EventMap) ->
  class Base
    constructor: (@parent, descriptor) ->
      mixer [@, Base::], new EventMap()
      
      if typeof descriptor is 'function'
        descriptor.call @
      else
        for key, value of descriptor
          if key is 'events'
            for evKey, evValue of key
              @on evKey, evValue
          else
            # TODO: Don't overwrite prototype methods
            @[key] = value
   
    log: (args...) ->
      nameArg = (@name || @constructor.name) + ': '
      
      console.log.apply console, [].concat.apply(nameArg, args)

udefine 'chione/bind', ->
  (container, element) ->
    container[element.name] = element

udefine 'chione/component', ['chione/base'], (Base) ->
  class Component extends Base
udefine 'chione/entity', ['chione/base'], (Base) ->
  class Entity extends Base
    constructor: ->
      components = {}
      
      super
    
    component: ->

udefine 'chione/game', ['chione/base', 'chione/scene'], (Base, Scene) ->
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

udefine 'chione/scene', ['chione/base'], (Base) ->
  class Scene extends Base