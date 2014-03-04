Chione
======

[![Build Status](https://travis-ci.org/freezedev/chione.png?branch=master)](https://travis-ci.org/freezedev/chione)
[![Dependency Status](https://david-dm.org/freezedev/chione.png)](https://david-dm.org/freezedev/chione)
[![devDependency Status](https://david-dm.org/freezedev/chione/dev-status.png)](https://david-dm.org/freezedev/chione#info=devDependencies)

Rapid prototyping game framework for CoffeeScript

Features:
* Small (< 5kb, minified and gzipped)
* Taggable components and entities
* Based on Pixi.js

Getting started
---------------

Chione is available on Bower using `bower install chione`.


What does it look like?
-----------------------

```coffeescript

Game ->
  @scene ->
    @entity ->
      @assetFromFile 'test.png'
      @x = 5
      @y = 10
      
  @run()
```

[![Bitdeli Badge](https://d2weczhvl823v0.cloudfront.net/freezedev/chione/trend.png)](https://bitdeli.com/free "Bitdeli Badge")

