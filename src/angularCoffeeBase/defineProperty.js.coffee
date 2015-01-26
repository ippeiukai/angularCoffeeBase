
'use strict'

angularCoffeeBase = @angularCoffeeBase

angularCoffeeBase.defineProperty = (klass) ->
  (name, args...) ->
    Object.defineProperty(klass::, name, args...)
    name

angularCoffeeBase.getterProperty = (klass) ->
  (name, options..., getter) ->
    if 0 <= options.length <= 1 then options = options[0] ? {} else throw 'argument error'
    angularCoffeeBase.defineProperty(klass) name,
      get: getter
      enumerable: options['enumerable'] ? true
      configurable: options['configurable'] ? true
