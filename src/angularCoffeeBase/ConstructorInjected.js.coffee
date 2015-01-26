'use strict'

angular = @angular
angularCoffeeBase = @angularCoffeeBase

# partial credit to http://www.devign.me/angular-dot-js-coffeescript-controller-base-class
class angularCoffeeBase.ConstructorInjected

  @registerAs: (as) -> (app, options = {}) =>
    app = angular.module(app) if (typeof app) == 'string'
    name = options['name'] ? @name
    if options['inject']? then @inject(options['inject']...)
    app[as] name, @

  @inject: (args...) ->
    [@$inject, @injectedNames] = angularCoffeeBase.extractOptionallyMappedNames(args)
    @$inject

  @delegates: (args...) ->
    angularCoffeeBase.delegates(@) args...

  @privates: (args...) ->
    angularCoffeeBase.privates(@) args...

  @defineProperty: (args...) ->
    angularCoffeeBase.defineProperty(@) args...

  @getterProperty: (args...) ->
    angularCoffeeBase.getterProperty(@) args...


  constructor: (args...) ->
    _define_injected.call(@, args)


  _define_injected = (injected)->
    @constructor.injectedNames.forEach (name, i) =>
      Object.defineProperty(@, name, value: injected[i], enumerable: false, writable: false)
      return#x
    return#x


class angularCoffeeBase.Service extends angularCoffeeBase.ConstructorInjected

  @registerTo: (args...) ->
    @registerAs('service')(args...)


class angularCoffeeBase.Controller extends angularCoffeeBase.ConstructorInjected

  @registerTo: (args...) ->
    @registerAs('controller')(args...)
