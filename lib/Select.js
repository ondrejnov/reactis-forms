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

var _reactSelect = require('react-select');

var _reactSelect2 = _interopRequireDefault(_reactSelect);

var _components = {
	_$Select: {
		displayName: 'Select'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Select = (function (_Component) {
	_inherits(Select, _Component);

	function Select() {
		_classCallCheck(this, _Select);

		_Component.apply(this, arguments);
	}

	Select.prototype.handleChange = function handleChange(val) {
		if (val === '') {
			val = undefined;
		}
		if (this.props.onChange) {
			this.props.onChange(val);
		}
		if (this.props.onBlur) {
			this.props.onBlur(val);
		}
	};

	Select.prototype.render = function render() {
		var _this = this;

		var options = this.props.options;
		/*if (this.props.placeholder) {
  	options = [{id: '', title: this.props.placeholder}];
  	this.props.options.forEach(item => options.push(item));
  }
  options = options.map(function(op) {
  	return <option key={op.id} value={op.id}>{op.title}</option>;
  });*/

		return _react2['default'].createElement(_reactSelect2['default'], _extends({}, this.props, {
			searchable: false,
			options: options,
			labelKey: 'title',
			valueKey: 'id',
			value: typeof this.props.value != 'undefined' && this.props.value != null ? this.props.value : '',
			onChange: function (val) {
				return _this.handleChange(val);
			}
		}));
	};

	var _Select = Select;
	Select = _wrapComponent('_$Select')(Select) || Select;
	return Select;
})(_Component2['default']);

exports['default'] = Select;
module.exports = exports['default'];