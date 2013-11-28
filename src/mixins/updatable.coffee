udefine ->
  (context) ->
    context.on 'update', ->
      if context.children?
        for key, value of context.children
          value.trigger? 'update', arguments
        null
