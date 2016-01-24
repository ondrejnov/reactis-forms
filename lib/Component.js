'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactPureRenderShallowEqual = require('react-pure-render/shallowEqual');

var _reactPureRenderShallowEqual2 = _interopRequireDefault(_reactPureRenderShallowEqual);

/**
 * Purified React.Component. Goodness.
 * http://facebook.github.io/react/docs/advanced-performance.html
 */

var Component = (function (_React$Component) {
  _inherits(Component, _React$Component);

  function Component() {
    _classCallCheck(this, Component);

    _React$Component.apply(this, arguments);
  }

  Component.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {

    var shouldUpdate = !_reactPureRenderShallowEqual2['default'](this.props, nextProps) || !_reactPureRenderShallowEqual2['default'](this.state, nextState);

    return shouldUpdate;
  };

  return Component;
})(_react2['default'].Component);

exports['default'] = Component;
module.exports = exports['default'];