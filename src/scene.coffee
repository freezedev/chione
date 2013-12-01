udefine ['chione/entity', 'chione/bind'], (Entity, bind) ->
  class Scene extends Entity
    constructor: ->
      super
      
    entity: (factory) -> bind @, factory, Component