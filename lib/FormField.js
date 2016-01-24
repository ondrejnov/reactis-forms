'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = {
	_$FormField: {
		displayName: 'FormField'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var FormField = (function (_React$Component) {
	_inherits(FormField, _React$Component);

	function FormField() {
		_classCallCheck(this, _FormField);

		_React$Component.apply(this, arguments);
	}

	FormField.prototype.render = function render() {
		return this.context.form.getControl(this.props.name);
	};

	_createClass(FormField, null, [{
		key: 'contextTypes',
		value: {
			form: _react2['default'].PropTypes.object
		},
		enumerable: true
	}]);

	var _FormField = FormField;
	FormField = _wrapComponent('_$FormField')(FormField) || FormField;
	return FormField;
})(_react2['default'].Component);

exports['default'] = FormField;
module.exports = exports['default'];