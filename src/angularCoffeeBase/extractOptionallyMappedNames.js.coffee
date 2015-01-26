'use strict'

angularCoffeeBase = @angularCoffeeBase

# Syntax sugar for CoffeeScript. Interprets mixture of strings and objects:
#   [names, mappedNames] = extractOptionallyMappedNames [
#     'name1'
#     'name2':'mappedName2'
#   ]
#   console.debug(names, mappedNames)  # ["name1", "name2"]  ["name1", "mappedName2"]
angularCoffeeBase.extractOptionallyMappedNames = (args) ->
  names = []
  mappedNames = []
  args.forEach (arg) ->
    switch typeof arg
      when 'string'
        names.push arg
        mappedNames.push arg
      when 'object'
        for name, mappedName of arg
          names.push name
          mappedNames.push mappedName
    return#x
  [names, mappedNames]

