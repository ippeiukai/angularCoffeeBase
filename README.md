# angularCoffeeBase

by Ippei UKAI

Provides convenient base classes and utility methods for making writing angular app in CoffeeScript easier.

## base classes

### Controller

    'use strict'
    
    class MyController extends angularCoffeeBase.Controller
      
      @registerTo angular.module('myModule'),
        name: 'MyController'
        inject: [ '$log' ]
      
      constructor: ->
        super
        @$log.debug 'MyController constructor'

`super` defines injected as non-enumerable instance properties.

### Service

    'use strict'
    
    class MyService extends angularCoffeeBase.Service
      
      @registerTo angular.module('myModule'),
        name: 'myService'
        inject: [ '$log':'console' ]
      
      constructor: ->
        super
        @console.debug 'MyService constructor'

`super` defines injected as non-enumerable instance properties.

#### inject as
Here, I'm also demonstrating the "inject as" notation; you can mix key-value pairs in `inject` to change
under what name the injected objects should be available. This works with `Controller` and `classFactory` as well.

### classFactory (for providing class as a service)

    'use strict'
    
    angularCoffeeBase.classFactory
      
      registerTo: angular.module('myModule')
      name: 'MyModel'
      extends: 'SuperModel'
      inject: [ '$log' ]
      
      (superClass, injected) ->
        
        injected['$log'].debug 'MyModel class'
        
        class MyModel extends superClass
          
          constructor: (@myArgument) ->
            super
            @$log.debug 'MyModel constructor'

Note: `superClass` defines injected as non-enumerable instance properties in prototype.

#### extends
`extends` is optional, and, if specified, utility methods are not automatically available.
You can specify a class directly, but if you specify a string, it will be included in $inject automatically.

If you are writing your superclass yourself, it is recommended that you define the superclass with `classFactory` as well.
That way, `angular` can load your classes with injection, and you get the utility methods inherited.

## utility methods

Following class methods are available to inherited classes:

### delegates

Defines a property or method to a field or object.

    class MyController extends angularCoffeeBase.Controller
      @registerTo angular.module('myModule'),
        name: 'MyController'
      
      constructor: ->
        super
        @myModel = new MyModel()
      
      # names ending with () are methods, otherwise properties
      @delegates 'method1()', 'property1', to: 'myModel'
      
      # you can specify nested delegatee
      @delegates 'method2()', to: 'myModel.property1'
      
      # you can specify delegatee as a function, which will be evaluated with the instance as this.
      @delegates 'method3()', to: (-> @method3Delegate ? @myModel)
      
      # you can specify 'enumerable' option. (currently only applies to properties)
      @delegates 'property2, to: 'myModel', enumerable: false


### defineProperty

Basically, this is [Object.defineProperty()](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty)
with the prototype of the class as first argument.

    angularCoffeeBase.classFactory
      registerTo: angular.module('myModule')
      name: 'MyModel'
      (superClass, injected) ->
      
        class MyModel extends superClass
          
          constructor: ->
            super
          
          @defineProperty 'unchangeable',
            enumerable: true
            configurable: false
            writable: false
            value: 'meeee'


Note: the property is defined on the prototype. You get an unexpected result if you did the following:

    angularCoffeeBase.classFactory
      registerTo: angular.module('myModule')
      name: 'MyModel'
      (superClass, injected) ->
        class MyModel extends superClass
          
          constructor: ->
            super
          
          # DON'T DO THIS. Instances will share the same object.
          @defineProperty '_private_',
            enumerable: false
            writable: false
            value: {}

### getterProperty

Defines a readonly property.

    angularCoffeeBase.classFactory
      registerTo: angular.module('myModule')
      name: 'MyModel'
      (superClass, injected) ->
        
        class MyModel extends superClass
          
          constructor: ->
            super
            @_count = 0
          
          @getterProperty 'count', -> @_count
          
          incrementCount: ->
            @_count += 1

Default is enumerable and configurable, but you can specify an optional second argument
(an Object with keys `enumerable` and/or `configurable` with boolean value) to change them.

### privates

Defines an non-enumerable property of specified name (or `_private_` if unspecified) to the instances. It can be used as
a bucket for the instance's (conceptually) private variables.

    angularCoffeeBase.classFactory
      registerTo: angular.module('myModule')
      name: 'MyModel'
      (superClass, injected) ->
        
        class MyModel extends superClass
          
          @privates '_private_'
          
          constructor: ->
            super
            @_private_.count = 0
          
          @getterProperty 'count', -> @_private_.count
          
          incrementCount: ->
            @_private_.count += 1

## Install

### Bower

- `bower install angular-coffee-base`

Please note the hyphens
(due to Bower package names can "only contain lower case a through z, 0 through 9, dots, dashes, and underscores").

## Compatibility

- AngularJS 1.3.x
- CoffeeScript 1.8 and above

Essentially, no IE8 support.

## TODO (any contribution appreciated)

- unit testing
- better documentation
