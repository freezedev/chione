udefine ['chione/component', 'chione/mixins/bind', 'chione/scene'], (Component, bind, Scene) ->
  class Game extends Component
    constructor: (descriptor) -> 
      super null, descriptor
   
    scene: (factory) -> 
      bind @, factory, Scene
      
    @run: (sceneName) ->
      
