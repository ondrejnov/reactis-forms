'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = {
	_$Checkbox: {
		displayName: 'Checkbox'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Checkbox = (function (_Component) {
	_inherits(Checkbox, _Component);

	function Checkbox() {
		_classCallCheck(this, _Checkbox);

		_Component.apply(this, arguments);
	}

	Checkbox.prototype.handleChange = function handleChange(e) {
		if (this.props.onChange) {
			this.props.onChange(e.target.checked);
		}
		if (this.props.onBlur) {
			this.props.onBlur(e.target.checked);
		}
	};

	Checkbox.prototype.render = function render() {
		var _this = this;

		return _react2['default'].createElement('input', _extends({ type: 'checkbox' }, this.props, { checked: this.props.value, onChange: function (e) {
				return _this.handleChange(e);
			} }));
	};

	var _Checkbox = Checkbox;
	Checkbox = _wrapComponent('_$Checkbox')(Checkbox) || Checkbox;
	return Checkbox;
})(_Component2['default']);

exports['default'] = Checkbox;
module.exports = exports['default'];