class Base
  constructor: (@parent, descriptor) ->
    if typeof descriptor is 'function'
      descriptor.call @
    else
      # TODO: Don't overwrite prototype methods
      @[key] = value for key, value of descriptor
 
   log: ->
 
class Scene extends Base

class Entity extends Base
 
class Game extends Base
  constructor: (descriptor) ->
    @scenes = []
 
    super null, descriptor
 
  scene: (obj) ->
    scene = if obj instanceof Scene
      obj.parent = @
      obj
    else
      new Scene @, obj
 
    @scenes.push scene