udefine ['chione/component', 'chione/mixins/bind', 'chione/mixins/drawable'], (Component, bind, drawable) ->
      
  class Entity extends Component
    constructor: ->
      super
      
      drawable @
    
    component: (factory) -> bind @, factory, Component
      