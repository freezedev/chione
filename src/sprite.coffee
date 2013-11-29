udefine ['chione/components/animatable', 'chione/entity'], (Animatable, Entity) ->
  class Sprite extends Entity
    constructor: ->
      super
      
      @component new Animatable()
