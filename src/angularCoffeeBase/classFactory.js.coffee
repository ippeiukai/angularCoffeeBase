'use strict'

angular = @angular
angularCoffeeBase = @angularCoffeeBase


angularCoffeeBase.classFactory = (options, classDefinition) ->
  app = options['registerTo']
  app = angular.module(app) if (typeof app) == 'string'
  throw "registerTo required." unless app?

  className = options['name']
  throw "class name required." unless className?

  [$inject, injectedNames] = angularCoffeeBase.extractOptionallyMappedNames(options['inject'] ? [])

  if options['extends']?
    superClass = options['extends']
    if (typeof superClass) == 'string'
      superClassIsInjected = true
      if superClass not in injectedNames
        $inject.push superClass
        injectedNames.push superClass
  else
    superClass = angularCoffeeBase.classFactory.DefaultSuperClass

  factory = (injected...) ->
    injectedByName = {}
    injectedNames.forEach (name, i) ->
      injectedByName[name] = injected[i]
      return#x
    if superClassIsInjected
      superClass = injectedByName[superClass]
    class superClassWithInjected extends superClass
      do =>
        for name, injectedValue of injectedByName
          Object.defineProperty(@::, name, value: injectedValue, enumerable: false, writable: false)
        return#x
    classDefinition(superClassWithInjected, injectedByName)
  factory.$inject = $inject

  app.factory className, factory


class angularCoffeeBase.classFactory.DefaultSuperClass

  @delegates: (args...) ->
    angularCoffeeBase.delegates(@) args...

  @privates: (args...) ->
    angularCoffeeBase.privates(@) args...

  @defineProperty: (args...) ->
    angularCoffeeBase.defineProperty(@) args...

  @getterProperty: (args...) ->
    angularCoffeeBase.getterProperty(@) args...
