udefine 'chione/base', ['mixer', 'eventmap'], (mixer, EventMap) ->
  class Base
    @idIndex = 0
    
    constructor: (@parent, descriptor) ->
      mixer [@, Base::], new EventMap()
      
      @idIndex++
      @id = "#{@constructor.name.toLowerCase()}#{@idIndex}"
      @name = @type = @constructor.name
      
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
      console.log.apply console, [].concat.apply("#{@name}: ", args)
