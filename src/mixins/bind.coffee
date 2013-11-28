udefine ->
  (container, factory, type) ->
    container.children or= {}
    
    element = null
    
    if typeof factory is 'function' or typeof factory is 'object'
      if factory instanceof type
        element = factory      
      else
        element = new Function::bind.apply type, [factory]
    
    element.parent = container    
    container.children[element.name] = element
