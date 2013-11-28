udefine ['chione/base', 'chione/mixins/updatable'], (Base, updatable) ->
  class Component extends Base
    constructor: ->
      super
      
      updatable @