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

udefine 'chione/component', ['chione/base', 'chione/mixins/updatable'], (Base, updatable) ->
  class Component extends Base
    constructor: ->
      super
      
      updatable @
udefine 'chione/entity', ['chione/component', 'chione/mixins/bind', 'chione/mixins/drawable'], (Component, bind, drawable) ->
  class Entity extends Component
    constructor: ->
      super
      
      drawable @
    
    component: (factory) -> bind @, factory, Component
      
udefine 'chione/factory/game', ['chione/game'], (Game) -> (factory) -> new Game factory
udefine 'chione/game', ['chione/entity', 'chione/mixins/bind', 'chione/scene'], (Entity, bind, Scene) ->
  class Game extends Entity
    constructor: (descriptor) ->
      super null, descriptor
   
    scene: (factory) ->
      bind @, factory, Scene
      
    @run: (sceneName) ->
      

udefine 'chione/mixins/bind', ->
  (container, factory, Type) ->
    container.children or= {}
    
    element = null
    
    if typeof factory is 'function' or typeof factory is 'object'
      if factory instanceof Type
        element = factory
        element.parent = container    
      else
        element = new Type container, factory 
    
    container.children[element.name] = element

udefine 'chione/mixins/drawable', ->
  (context) ->
    context.on 'draw', ->
      

udefine 'chione/mixins/updatable', ->
  (context) ->
    context.on 'update', ->
      if context.children?
        for key, value of context.children
          value.trigger? 'update', arguments
        null

udefine 'chione/scene', ['chione/entity', 'chione/mixins/bind'], (Entity, bind) ->
  class Scene extends Entity
    constructor: ->
      super
      
    entity: (factory) -> bind @, factory, Component