
'use strict'

angularCoffeeBase = @angularCoffeeBase

angularCoffeeBase.privates = (klass) ->
  (propertyName) ->
    propertyName ?= '_private_'
    angularCoffeeBase.getterProperty(klass) propertyName, enumerable: false, ->
      if !@.hasOwnProperty(propertyName)
        Object.defineProperty(@, propertyName, value: {}, enumerable: false, writable: false)
      @[propertyName]
