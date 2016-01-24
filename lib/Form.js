'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FormManager = require('./FormManager');

var _FormManager2 = _interopRequireDefault(_FormManager);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _components = {
	_$Form: {
		displayName: 'Form'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Form = (function (_Component) {
	_inherits(Form, _Component);

	function Form(props) {
		_classCallCheck(this, _Form);

		_Component.call(this, props);
		if (this.props.schema) {
			this.form = new _FormManager2['default'](props.schema);
		} else {
			this.form = props.form;
		}
		this.form.on('change', this.handleChange, this);
		this.form.on('blur', this.handleBlur, this);
		if (props.state) {
			this.syncForm(props.state);
		}
	}

	Form.prototype.getChildContext = function getChildContext() {
		return {
			form: this.form
		};
	};

	Form.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
		if (nextProps.state) {
			this.syncForm(nextProps.state);
		}
	};

	Form.prototype.componentWillUnmount = function componentWillUnmount() {
		this.form.removeListener('change', this.handleChange, this);
		this.form.removeListener('blur', this.handleBlur, this);
	};

	Form.prototype.syncForm = function syncForm(state) {
		if (state.get('values')) {
			this.form.setValues(state.get('values'));
		}
		if (state.get('touched')) {
			this.form.setTouched(state.get('touched'));
		}
		if (state.get('errors')) {
			this.form.setErrors(state.get('errors'));
		} else {
			this.form.setErrors(_immutable2['default'].Map());
		}
	};

	Form.prototype.handleSubmit = function handleSubmit(e) {
		e.preventDefault();
		if (this.props.onSubmit) {
			this.props.onSubmit(this.form);
		}
	};

	Form.prototype.handleChange = function handleChange(key, value, values) {
		if (this.props.onChange) {
			this.props.onChange(key, value, values, this.form);
		}
	};

	Form.prototype.handleBlur = function handleBlur(key, value, values) {
		if (this.props.onBlur) {
			this.props.onBlur(key, value, values, this.form);
		}
	};

	Form.prototype.render = function render() {
		var _this = this;

		return _react2['default'].createElement(
			'form',
			{ className: this.props.className, onSubmit: function (e) {
					return _this.handleSubmit(e);
				} },
			this.props.children
		);
	};

	_createClass(Form, null, [{
		key: 'childContextTypes',
		value: {
			form: _react2['default'].PropTypes.object
		},
		enumerable: true
	}]);

	var _Form = Form;
	Form = _wrapComponent('_$Form')(Form) || Form;
	return Form;
})(_Component2['default']);

exports['default'] = Form;
module.exports = exports['default'];