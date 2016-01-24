'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _components = {
	_$FormRow: {
		displayName: 'FormRow'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var FormRow = (function (_React$Component) {
	_inherits(FormRow, _React$Component);

	function FormRow() {
		_classCallCheck(this, _FormRow);

		_React$Component.apply(this, arguments);
	}

	FormRow.prototype.getControl = function getControl() {
		return this.context.form.getControl(this.props.name);
	};

	FormRow.prototype.shouldComponentUpdate = function shouldComponentUpdate(nextProps, nextState) {

		var control = this.getControl();

		/*const shouldUpdate =
  	this.props.visible != nextProps.visible ||
  	control.props.value != nextProps.input.props.value ||
  	control.props.error != nextProps.input.props.error;*/

		var shouldUpdate = true;
		return shouldUpdate;
	};

	FormRow.prototype.render = function render() {
		var control = this.getControl();
		var display = this.props.visible && (this.props.visible === true || this.props.visible(this.context.form.getValues().toJS())) ? '' : 'none';

		var required = this.props.required || control && control.props.rules && control.props.rules.presence;
		var label = this.props.label ? this.props.label : control && control.props.label;
		var content = control ? control : this.props.children;
		var requiredSymbol = _react2['default'].createElement(
			'span',
			{ style: { color: '#A00' } },
			'*'
		);

		return _react2['default'].createElement(
			'tr',
			{ style: { display: display }, className: this.props.className },
			_react2['default'].createElement(
				'th',
				{ style: { width: this.props.labelWidth ? this.props.labelWidth : 'auto' } },
				required && requiredSymbol,
				' ',
				label
			),
			_react2['default'].createElement(
				'td',
				{ style: this.props.style },
				_react2['default'].createElement(
					'div',
					{ className: 'form-group' },
					label && _react2['default'].createElement(
						'label',
						{ className: 'horizontal-label' },
						label,
						': ',
						required && requiredSymbol
					),
					content
				)
			)
		);
	};

	_createClass(FormRow, null, [{
		key: 'contextTypes',
		value: {
			form: _react2['default'].PropTypes.object
		},
		enumerable: true
	}, {
		key: 'defaultProps',
		value: {
			visible: true,
			required: false,
			label: false,
			labelWidth: false
		},
		enumerable: true
	}]);

	var _FormRow = FormRow;
	FormRow = _wrapComponent('_$FormRow')(FormRow) || FormRow;
	return FormRow;
})(_react2['default'].Component);

exports['default'] = FormRow;
module.exports = exports['default'];