udefine ['chione/component', 'chione/bind', 'chione/mixins/drawable'], (Component, bind, drawable) ->
      
  class Entity extends Component
    constructor: ->
      @width = @height = 100
      
      super
      
      drawable @
    
    component: (factory) -> bind @, factory, Component
    entity: (factory) -> bind @, factory, Entity
      