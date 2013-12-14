udefine ['mixedice', 'eventmap'], (mixedice, EventMap) ->
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
