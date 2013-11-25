udefine ['mixer', 'eventmap'], (mixer, EventMap) ->
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
