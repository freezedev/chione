udefine ['chione/entity', 'chione/mixins/bind'], (Entity, bind) ->
  class Scene extends Entity
    constructor: ->
      super
      
    entity: (factory) -> bind @, factory, Component