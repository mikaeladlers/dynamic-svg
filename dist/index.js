(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(['module', 'react', 'react-dom', 'svg-injector'], factory);
  } else if (typeof exports !== "undefined") {
    factory(module, require('react'), require('react-dom'), require('svg-injector'));
  } else {
    var mod = {
      exports: {}
    };
    factory(mod, global.react, global.reactDom, global.svgInjector);
    global.index = mod.exports;
  }
})(this, function (module, _react, _reactDom, _svgInjector) {
  'use strict';

  var _react2 = _interopRequireDefault(_react);

  var _reactDom2 = _interopRequireDefault(_reactDom);

  var _svgInjector2 = _interopRequireDefault(_svgInjector);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  function _possibleConstructorReturn(self, call) {
    if (!self) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return call && (typeof call === "object" || typeof call === "function") ? call : self;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
    if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
  }

  var DynamicSVG = function (_React$Component) {
    _inherits(DynamicSVG, _React$Component);

    function DynamicSVG() {
      _classCallCheck(this, DynamicSVG);

      return _possibleConstructorReturn(this, (DynamicSVG.__proto__ || Object.getPrototypeOf(DynamicSVG)).apply(this, arguments));
    }

    _createClass(DynamicSVG, [{
      key: 'getDefaultProps',
      value: function getDefaultProps() {
        return {
          values: {},
          precision: 2,
          width: '1000px'
        };
      }
    }, {
      key: 'getInitialState',
      value: function getInitialState() {
        return {
          textmap: {}
        };
      }
    }, {
      key: 'componentDidMount',
      value: function componentDidMount() {
        var _this2 = this;

        var injectorOptions = {
          evalScripts: 'once',
          pngFallback: 'assets/png',
          each: function each(svg) {
            var textelements = svg.querySelectorAll('text');
            textelements.forEach(function (item) {
              var text = item.innerHTML;
              if (text.length > 0 && text[0] === '@') {
                var name = text.slice(1);
                _this2.state.textmap[name] = item;
                if (_this2.props.values[name] != undefined) {
                  text = _this2.props.values[name];
                } else {
                  text = '';
                }
              }
            }, _this2);
          }
        };
        (0, _svgInjector2.default)(_reactDom2.default.findDOMNode(this.svgimage), injectorOptions);
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate() {
        var key;
        for (key in this.props.values) {
          if (this.state.textmap[key] != undefined) {
            if (typeof this.props.values[key] === 'string') {
              this.state.textmap[key].innerHTML = this.props.values[key];
            } else {
              this.state.textmap[key].innerHTML = this.props.values[key].toPrecision(this.props.precision);
            }
          }
        }
      }
    }, {
      key: 'render',
      value: function render() {
        var _this3 = this;

        var divStyle = {
          width: this.props.width
        };
        return _react2.default.createElement(
          'div',
          { style: divStyle },
          _react2.default.createElement('img', { src: this.props.url, id: 'svg', ref: function ref(_ref) {
              _this3.svgimage = _ref;
            } })
        );
      }
    }]);

    return DynamicSVG;
  }(_react2.default.Component);

  module.exports = DynamicSVG;
});