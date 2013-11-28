udefine ['chione/component', 'chione/mixins/bind'], (Component, bind) ->
  class Entity extends Component
    constructor: ->
      super
      
      @on 'draw', =>
    
    component: (factory) -> bind @, factory, Component
      