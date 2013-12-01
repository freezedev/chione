udefine ['chione/base', 'chione/mixins/updatable'], (Base, updatable) ->
  toArray = (value, splitter = /[\s,]/) ->
    arr = splitter.split splitter
    
    arr
      .map (item) ->
        item.trim()
      .filter (item) -> !!item
        
    if arr.length then arr else null

  class Component extends Base
    constructor: ->
      super
      
      tags = []
      
      Object.defineProperty @, 'tags',
        get: -> tags
        set: (val) ->
          return tags = val unless tags?
          
          if Array.isArray val
            tags = val
          else
            if typeof val is 'string'
              tags = val.split(' ')
      
      updatable @
      
    find: (selector) ->
      element = ''
      searchFor = ''
      
      #if selector.indexOf('#') is 0
        