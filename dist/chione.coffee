udefine 'chione/base', ['mixedice', 'eventmap'], (mixedice, EventMap) ->
  class Base
    constructor: (@parent, descriptor) ->
      mixedice [@, Base::], new EventMap()
      
      @type = @constructor.name
      
      id = "#{@constructor.name.toLowerCase()}#{++@idIndex}"
      
      Object.defineProperty @, 'id',
        get: -> id
        set: (val) -> id = val
      
      Object.defineProperty @, 'type',
        get: -> @constructor.name
      
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
    
    idIndex: 0
    
    log: (args...) ->
      console.log.apply console, [].concat.apply("[#{@type}] #{@id}: ", args)

udefine 'chione/bind/all', ->
  
udefine 'chione/bind', ->
  (container, factory, Type) ->
    container.children or= {}
    
    element = null
    
    if typeof factory is 'function' or typeof factory is 'object'
      if factory instanceof Type
        element = factory
        element.parent = container    
      else
        element = new Type container, factory 
    
    container.children[element.id] = element

udefine 'chione/component', ['chione/base', 'chione/mixins/updatable'], (Base, updatable) ->
  toArray = (value, splitter = /[\s,]/) ->
    arr = splitter.split splitter
    
    arr
      .map (item) ->
        item.trim()
      .filter (item) -> !!item
        
    if arr.length then arr else null

  class Component extends Base
    constructor: ->
      super
      
      tags = []
      
      Object.defineProperty @, 'tags',
        get: -> tags
        set: (val) ->
          return tags = val unless tags?
          
          if Array.isArray val
            tags = val
          else
            if typeof val is 'string'
              tags = val.split(' ')
      
      updatable @
      
    find: (selector) ->
      element = ''
      searchFor = ''
      
      #if selector.indexOf('#') is 0
        
udefine 'chione/components/animatable', ['chione/component'], (Component) ->
  class Animatable extends Component

udefine 'chione/components/audio', ['chione/component'], (Component) ->
  class Audio extends Component

udefine 'chione/entity', ['chione/component', 'chione/bind', 'chione/mixins/drawable'], (Component, bind, drawable) ->
      
  class Entity extends Component
    constructor: ->
      super
      
      drawable @
    
    component: (factory) -> bind @, factory, Component
    entity: (factory) -> bind @, factory, Entity
      
udefine 'chione/factory/game', ['chione/game'], (Game) -> (factory) -> new Game factory
udefine 'chione/game', ['chione/entity', 'chione/bind', 'chione/scene'], (Entity, bind, Scene) ->
  class Game extends Entity
    constructor: (descriptor) ->
      super null, descriptor
   
    scene: (factory) ->
      bind @, factory, Scene
      
    @run: (sceneName) ->
      

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

udefine 'chione/preloader', ['chione/base'], (Base) ->
  class Preloader extends Base
    constructor: ->
      
    add: (asset) ->
      
    run: ->
udefine 'chione/scene', ['chione/entity', 'chione/bind'], (Entity, bind) ->
  class Scene extends Entity
    constructor: ->
      super
      
    entity: (factory) -> bind @, factory, Component
udefine 'chione/sprite', ['chione/components/animatable', 'chione/entity'], (Animatable, Entity) ->
  class Sprite extends Entity
    constructor: ->
      super
      
      @component new Animatable()
