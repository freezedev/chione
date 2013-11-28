udefine ->
  (context) ->
    context.on 'update', ->
      for key, value of context.children
        value.trigger? 'update', arguments
