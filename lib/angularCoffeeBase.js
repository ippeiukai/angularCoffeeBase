
/*
 code that should be in ../angularCoffeeBase.js.coffee
 */

(function() {
  'use strict';
  this.angularCoffeeBase = {};

}).call(this);

(function() {
  'use strict';
  var angular, angularCoffeeBase,
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular = this.angular;

  angularCoffeeBase = this.angularCoffeeBase;

  angularCoffeeBase.ConstructorInjected = (function() {
    var _define_injected;

    ConstructorInjected.registerAs = function(as) {
      return (function(_this) {
        return function(app, options) {
          var name, _ref;
          if (options == null) {
            options = {};
          }
          if ((typeof app) === 'string') {
            app = angular.module(app);
          }
          name = (_ref = options['name']) != null ? _ref : _this.name;
          if (options['inject'] != null) {
            _this.inject.apply(_this, options['inject']);
          }
          return app[as](name, _this);
        };
      })(this);
    };

    ConstructorInjected.inject = function() {
      var args, _ref;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _ref = angularCoffeeBase.extractOptionallyMappedNames(args), this.$inject = _ref[0], this.injectedNames = _ref[1];
      return this.$inject;
    };

    ConstructorInjected.delegates = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.delegates(this).apply(null, args);
    };

    ConstructorInjected.privates = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.privates(this).apply(null, args);
    };

    ConstructorInjected.defineProperty = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.defineProperty(this).apply(null, args);
    };

    ConstructorInjected.getterProperty = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.getterProperty(this).apply(null, args);
    };

    function ConstructorInjected() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      _define_injected.call(this, args);
    }

    _define_injected = function(injected) {
      this.constructor.injectedNames.forEach((function(_this) {
        return function(name, i) {
          Object.defineProperty(_this, name, {
            value: injected[i],
            enumerable: false,
            writable: false
          });
        };
      })(this));
    };

    return ConstructorInjected;

  })();

  angularCoffeeBase.Service = (function(_super) {
    __extends(Service, _super);

    function Service() {
      return Service.__super__.constructor.apply(this, arguments);
    }

    Service.registerTo = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.registerAs('service').apply(null, args);
    };

    return Service;

  })(angularCoffeeBase.ConstructorInjected);

  angularCoffeeBase.Controller = (function(_super) {
    __extends(Controller, _super);

    function Controller() {
      return Controller.__super__.constructor.apply(this, arguments);
    }

    Controller.registerTo = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return this.registerAs('controller').apply(null, args);
    };

    return Controller;

  })(angularCoffeeBase.ConstructorInjected);

}).call(this);

(function() {
  'use strict';
  var angular, angularCoffeeBase,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; },
    __slice = [].slice,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  angular = this.angular;

  angularCoffeeBase = this.angularCoffeeBase;

  angularCoffeeBase.classFactory = function(options, classDefinition) {
    var $inject, app, className, factory, injectedNames, superClass, superClassIsInjected, _ref, _ref1;
    app = options['registerTo'];
    if ((typeof app) === 'string') {
      app = angular.module(app);
    }
    if (app == null) {
      throw "registerTo required.";
    }
    className = options['name'];
    if (className == null) {
      throw "class name required.";
    }
    _ref1 = angularCoffeeBase.extractOptionallyMappedNames((_ref = options['inject']) != null ? _ref : []), $inject = _ref1[0], injectedNames = _ref1[1];
    if (options['extends'] != null) {
      superClass = options['extends'];
      if ((typeof superClass) === 'string') {
        superClassIsInjected = true;
        if (__indexOf.call(injectedNames, superClass) < 0) {
          $inject.push(superClass);
          injectedNames.push(superClass);
        }
      }
    } else {
      superClass = angularCoffeeBase.classFactory.DefaultSuperClass;
    }
    factory = function() {
      var injected, injectedByName, superClassWithInjected;
      injected = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      injectedByName = {};
      injectedNames.forEach(function(name, i) {
        injectedByName[name] = injected[i];
      });
      if (superClassIsInjected) {
        superClass = injectedByName[superClass];
      }
      superClassWithInjected = (function(_super) {
        __extends(superClassWithInjected, _super);

        function superClassWithInjected() {
          return superClassWithInjected.__super__.constructor.apply(this, arguments);
        }

        (function() {
          var injectedValue, name;
          for (name in injectedByName) {
            injectedValue = injectedByName[name];
            Object.defineProperty(superClassWithInjected.prototype, name, {
              value: injectedValue,
              enumerable: false,
              writable: false
            });
          }
        })();

        return superClassWithInjected;

      })(superClass);
      return classDefinition(superClassWithInjected, injectedByName);
    };
    factory.$inject = $inject;
    return app.factory(className, factory);
  };

  angularCoffeeBase.classFactory.DefaultSuperClass = (function() {
    function DefaultSuperClass() {}

    DefaultSuperClass.delegates = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.delegates(this).apply(null, args);
    };

    DefaultSuperClass.privates = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.privates(this).apply(null, args);
    };

    DefaultSuperClass.defineProperty = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.defineProperty(this).apply(null, args);
    };

    DefaultSuperClass.getterProperty = function() {
      var args;
      args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
      return angularCoffeeBase.getterProperty(this).apply(null, args);
    };

    return DefaultSuperClass;

  })();

}).call(this);

(function() {
  'use strict';
  var angularCoffeeBase,
    __slice = [].slice;

  angularCoffeeBase = this.angularCoffeeBase;

  angularCoffeeBase.defineProperty = function(klass) {
    return function() {
      var args, name;
      name = arguments[0], args = 2 <= arguments.length ? __slice.call(arguments, 1) : [];
      Object.defineProperty.apply(Object, [klass.prototype, name].concat(__slice.call(args)));
      return name;
    };
  };

  angularCoffeeBase.getterProperty = function(klass) {
    return function() {
      var getter, name, options, _i, _ref, _ref1, _ref2, _ref3;
      name = arguments[0], options = 3 <= arguments.length ? __slice.call(arguments, 1, _i = arguments.length - 1) : (_i = 1, []), getter = arguments[_i++];
      if ((0 <= (_ref = options.length) && _ref <= 1)) {
        options = (_ref1 = options[0]) != null ? _ref1 : {};
      } else {
        throw 'argument error';
      }
      return angularCoffeeBase.defineProperty(klass)(name, {
        get: getter,
        enumerable: (_ref2 = options['enumerable']) != null ? _ref2 : true,
        configurable: (_ref3 = options['configurable']) != null ? _ref3 : true
      });
    };
  };

}).call(this);

(function() {
  'use strict';
  var angularCoffeeBase,
    __slice = [].slice;

  angularCoffeeBase = this.angularCoffeeBase;

  angularCoffeeBase.delegates = function(klass) {
    return function() {
      var getDelegatee, opts, propertiesAndMethods, _i;
      propertiesAndMethods = 2 <= arguments.length ? __slice.call(arguments, 0, _i = arguments.length - 1) : (_i = 0, []), opts = arguments[_i++];
      getDelegatee = (function(_this) {
        return function(delegatee) {
          switch (typeof delegatee) {
            case 'function':
              return delegatee;
            case 'object':
              return function() {
                return delegatee;
              };
            case 'string':
              return function() {
                var obj, prop, _j, _len, _ref;
                obj = this;
                _ref = delegatee.split('.');
                for (_j = 0, _len = _ref.length; _j < _len; _j++) {
                  prop = _ref[_j];
                  obj = obj[prop];
                }
                return obj;
              };
            case 'undefined':
              throw 'delegatee not specified';
              break;
            default:
              throw 'delegatee invalid type';
          }
        };
      })(this)(opts['to']);
      propertiesAndMethods.forEach(function(delegated) {
        if (delegated.substr(-2) === '()') {
          (function(_this) {
            return (function(methodName) {
              klass.prototype[methodName] = function() {
                var args, _ref;
                args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
                return (_ref = getDelegatee.call(this))[methodName].apply(_ref, args);
              };
            });
          })(this)(delegated.substring(0, delegated.length - 2));
        } else {
          (function(_this) {
            return (function(propertyName) {
              var _ref;
              angularCoffeeBase.defineProperty(klass)(propertyName, {
                enumerable: (_ref = opts['enumerable']) != null ? _ref : true,
                get: function() {
                  return getDelegatee.call(this)[propertyName];
                },
                set: function(value) {
                  return getDelegatee.call(this)[propertyName] = value;
                }
              });
            });
          })(this)(delegated);
        }
      });
    };
  };

}).call(this);

(function() {
  'use strict';
  var angularCoffeeBase;

  angularCoffeeBase = this.angularCoffeeBase;

  angularCoffeeBase.extractOptionallyMappedNames = function(args) {
    var mappedNames, names;
    names = [];
    mappedNames = [];
    args.forEach(function(arg) {
      var mappedName, name;
      switch (typeof arg) {
        case 'string':
          names.push(arg);
          mappedNames.push(arg);
          break;
        case 'object':
          for (name in arg) {
            mappedName = arg[name];
            names.push(name);
            mappedNames.push(mappedName);
          }
      }
    });
    return [names, mappedNames];
  };

}).call(this);

(function() {
  'use strict';
  var angularCoffeeBase;

  angularCoffeeBase = this.angularCoffeeBase;

  angularCoffeeBase.privates = function(klass) {
    return function(propertyName) {
      if (propertyName == null) {
        propertyName = '_private_';
      }
      return angularCoffeeBase.getterProperty(klass)(propertyName, {
        enumerable: false
      }, function() {
        if (!this.hasOwnProperty(propertyName)) {
          Object.defineProperty(this, propertyName, {
            value: {},
            enumerable: false,
            writable: false
          });
        }
        return this[propertyName];
      });
    };
  };

}).call(this);


/*
 code here is temporary moved to ./angularCoffeeBase/0_self.coffee
 due to https://github.com/pthrasher/snockets/issues/18
 */

(function() {


}).call(this);
