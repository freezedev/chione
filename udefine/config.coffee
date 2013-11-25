# TODO: Automate getting module names
do (namespace = 'chione') ->
  do (modules = ['Base', 'Entity', 'Game', 'Scene']) ->
    udefine.configure (root) ->
      for m in modules
        moduleName = "#{namespace}/#{m.toLowerCase()}"
        
        root[namespace] or= {}
        
        udefine.inject.add moduleName,
          root: root[namespace]
          name: m
        
      null