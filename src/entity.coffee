udefine ['chione/component', 'chione/mixins/bind'], (Component, bind) ->
  class Entity extends Component
    constructor: ->
      super
    
    component: (factory) -> bind @, factory, Component
      