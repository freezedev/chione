udefine ->
  (container, factory, Type) ->
    container.children or= {}
    
    element = null
    
    if typeof factory is 'function' or typeof factory is 'object'
      if factory instanceof Type
        element = factory      
      else
        element = new (Function::bind.apply Type, [container, factory])
    
    element.parent = container    
    container.children[element.name] = element
