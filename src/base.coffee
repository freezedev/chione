udefine ->
  class Base
    constructor: (@parent, descriptor) ->
      if typeof descriptor is 'function'
        descriptor.call @
      else
        # TODO: Don't overwrite prototype methods
        @[key] = value for key, value of descriptor
   
     log: ->