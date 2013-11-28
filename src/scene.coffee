udefine ['chione/component', 'chione/mixins/bind'], (Component, bind) ->
  class Scene extends Component
    constructor: ->
      super
      
    entity: (factory) -> bind @, factory, Component