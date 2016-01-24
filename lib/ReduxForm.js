'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

var _interopRequireWildcard = require('babel-runtime/helpers/interop-require-wildcard')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Form = require('./Form');

var _Form2 = _interopRequireDefault(_Form);

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _reactRedux = require('react-redux');

var _reducer = require('./reducer');

var actions = _interopRequireWildcard(_reducer);

var _redux = require('redux');

var _components = {
	_$ReduxForm: {
		displayName: 'ReduxForm'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var ReduxForm = (function (_Component) {
	_inherits(ReduxForm, _Component);

	function ReduxForm() {
		_classCallCheck(this, _ReduxForm);

		_Component.apply(this, arguments);
	}

	ReduxForm.prototype.handleSubmit = function handleSubmit(form) {

		var errors = this.validate();

		if (!errors && this.props.onSubmit) {
			this.props.onSubmit(form);
		}
		if (errors && this.props.onInvalidSubmit) {
			this.props.onInvalidSubmit(errors);
		}
	};

	ReduxForm.prototype.handleChange = function handleChange(key, value, values, form) {
		this.props.actions.setValue(this.props.id, values);

		var errors = form.getErrors();
		this.props.actions.setErrors(this.props.id, errors);

		if (this.props.onChange) {
			this.props.onChange(key, value, values);
		}
	};

	ReduxForm.prototype.handleBlur = function handleBlur(key, value, values, form) {
		this.props.actions.setTouched(this.props.id, values);

		var errors = form.getErrors();
		this.props.actions.setErrors(this.props.id, errors);

		if (this.props.onBlur) {
			this.props.onBlur(key, value, values);
		}
	};

	ReduxForm.prototype.validate = function validate() {
		var _this = this;

		var errors = this.refs.form.form.getErrors();
		if (errors) {
			(function () {
				var touched = {};
				_Object$keys(errors).forEach(function (key) {
					touched[key] = true;
				});
				_this.props.actions.setTouched(_this.props.id, _immutable2['default'].Map(touched));
				_this.props.actions.setErrors(_this.props.id, errors);
			})();
		}
		return errors;
	};

	ReduxForm.prototype.render = function render() {
		var _this2 = this;

		return _react2['default'].createElement(
			_Form2['default'],
			{ state: this.props.state,
				onSubmit: function (form) {
					return _this2.handleSubmit(form);
				},
				onChange: function (key, value, values, form) {
					return _this2.handleChange(key, value, values, form);
				},
				onBlur: function (key, value, values, form) {
					return _this2.handleBlur(key, value, values, form);
				},
				schema: this.props.schema,
				form: this.props.form,
				className: this.props.className,
				ref: 'form' },
			this.props.children
		);
	};

	var _ReduxForm = ReduxForm;
	ReduxForm = _wrapComponent('_$ReduxForm')(ReduxForm) || ReduxForm;
	ReduxForm = _reactRedux.connect(function (state, ownProps) {
		return {
			state: state.forms.get(ownProps.id)
		};
	}, function (dispatch) {
		return { actions: _redux.bindActionCreators(actions, dispatch) };
	}, null, { withRef: true })(ReduxForm) || ReduxForm;
	return ReduxForm;
})(_Component2['default']);

exports['default'] = ReduxForm;
module.exports = exports['default'];