'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _components = {
	_$Textarea: {
		displayName: 'Textarea'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Textarea = (function (_Component) {
	_inherits(Textarea, _Component);

	function Textarea() {
		_classCallCheck(this, _Textarea);

		_Component.apply(this, arguments);
	}

	Textarea.prototype.handleChange = function handleChange(e) {
		if (this.props.onChange) {
			this.props.onChange(e.target.value);
		}
	};

	Textarea.prototype.handleBlur = function handleBlur(e) {
		if (this.props.onBlur) {
			this.props.onBlur(e.target.value);
		}
	};

	Textarea.prototype.render = function render() {
		var _this = this;

		return _react2['default'].createElement(
			'div',
			null,
			_react2['default'].createElement('textarea', _extends({}, this.props, {
				value: this.props.value ? this.props.value : '',
				onChange: function (e) {
					return _this.handleChange(e);
				},
				onBlur: function (e) {
					return _this.handleBlur(e);
				}
			}))
		);
	};

	var _Textarea = Textarea;
	Textarea = _wrapComponent('_$Textarea')(Textarea) || Textarea;
	return Textarea;
})(_Component2['default']);

exports['default'] = Textarea;
module.exports = exports['default'];