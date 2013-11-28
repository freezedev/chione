udefine ->
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
