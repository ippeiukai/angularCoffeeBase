'use strict'

angularCoffeeBase = @angularCoffeeBase


# angularCoffeeBase.delegates(@) 'property', 'method()', to: 'field'
# angularCoffeeBase.delegates(@) 'property', 'method()', to: -> @obj
angularCoffeeBase.delegates = (klass) ->
  (propertiesAndMethods..., opts) ->
    getDelegatee = do (delegatee = opts['to']) =>
      switch typeof delegatee
        when 'function'
          delegatee
        when 'string'
          ->
            obj = @
            for prop in delegatee.split('.')
              obj = obj[prop]
            obj
        when 'undefined'
          throw 'delegatee not specified'
        else
          throw 'delegatee invalid type'
    propertiesAndMethods.forEach (delegated) ->
      if delegated.substr(-2) == '()'
        do (methodName = delegated.substring(0, delegated.length - 2)) =>
          klass::[methodName] = (args...) -> getDelegatee.call(@)[methodName](args)
          return#x
      else
        do (propertyName = delegated) =>
          angularCoffeeBase.defineProperty(klass) propertyName,
            enumerable: opts['enumerable'] ? true
            get: ->
              getDelegatee.call(@)[propertyName]
            set: (value) ->
              getDelegatee.call(@)[propertyName] = value
          return#x
      return#x
    return#x
