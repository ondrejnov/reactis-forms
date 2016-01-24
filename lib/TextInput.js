'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _extends = require('babel-runtime/helpers/extends')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _components = {
	_$Input: {
		displayName: 'Input'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Input = (function (_Component) {
	_inherits(Input, _Component);

	function Input() {
		_classCallCheck(this, _Input);

		_Component.apply(this, arguments);
	}

	Input.prototype.handleChange = function handleChange(e) {
		if (this.props.onChange) {
			this.props.onChange(this.getValue(e));
		}
	};

	Input.prototype.handleBlur = function handleBlur(e) {
		if (this.props.onBlur) {
			this.props.onBlur(this.getValue(e));
		}
	};

	Input.prototype.getValue = function getValue(e) {
		var value = e.target.value;
		if (value === '') {
			return;
		} else {
			return value;
		}
	};

	Input.prototype.render = function render() {
		var _this = this;

		return _react2['default'].createElement('input', _extends({ type: 'text'
		}, this.props, {
			value: typeof this.props.value != 'undefined' && this.props.value != null ? this.props.value.toString() : '',
			onChange: function (e) {
				return _this.handleChange(e);
			},
			onBlur: function (e) {
				return _this.handleBlur(e);
			}
		}));
	};

	_createClass(Input, null, [{
		key: 'filterDelay',
		value: true,
		enumerable: true
	}]);

	var _Input = Input;
	Input = _wrapComponent('_$Input')(Input) || Input;
	return Input;
})(_Component2['default']);

exports['default'] = Input;
module.exports = exports['default'];