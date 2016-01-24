'use strict';

var _inherits = require('babel-runtime/helpers/inherits')['default'];

var _createClass = require('babel-runtime/helpers/create-class')['default'];

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Component = require('./Component');

var _Component2 = _interopRequireDefault(_Component);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _Subform = require('./Subform');

var _Subform2 = _interopRequireDefault(_Subform);

var _components = {
	_$Multiform: {
		displayName: 'Multiform'
	}
};

function _wrapComponent(uniqueId) {
	return function (ReactClass) {
		return ReactClass;
	};
}

var Multiform = (function (_React$Component) {
	_inherits(Multiform, _React$Component);

	function Multiform() {
		_classCallCheck(this, _Multiform);

		_React$Component.apply(this, arguments);
	}

	Multiform.prototype.handleAddSubform = function handleAddSubform(e) {
		e.preventDefault();
		this.addSubform();
	};

	/**
  * Novy subform
  */

	Multiform.prototype.addSubform = function addSubform() {
		var _this = this;

		var item = {
			id: -Math.round(Math.random() * 10000000)
		};
		_Object$keys(this.props.schema).forEach(function (key) {
			item[key] = typeof _this.props.schema[key].value != 'undefined' ? _this.props.schema[key].value : null;
		});
		item = _immutable2['default'].Map(item);
		var value = this.props.value ? this.props.value.push(item) : _immutable2['default'].List([item]);
		if (this.props.onChange) {
			this.props.onChange(value);
		}
		if (this.props.onBlur) {
			this.props.onBlur(value, this.props.touched);
		}
	};

	Multiform.prototype.handleRemove = function handleRemove(item, e) {
		e.preventDefault();
		var value = this.props.value.filter(function (it) {
			return it.get('id') != item.get('id');
		});
		if (this.props.onChange) {
			this.props.onChange(value);
		}
		if (this.props.onBlur) {
			this.props.onBlur(value, this.props.touched);
		}
	};

	Multiform.prototype.handleChange = function handleChange(item, key, value, values) {
		var newValue = this.props.value.map(function (it) {
			if (it.get('id') == item.get('id')) {
				return values.set('id', item.get('id'));
			} else {
				return it;
			}
		});
		if (this.props.onChange) {
			this.props.onChange(newValue);
		}
		if (this.props.onBlur) {
			var touched = this.props.touched;
			if (this.props.touched !== true) {
				if (!touched) {
					touched = _immutable2['default'].Map();
				}
				touched = touched.set(item.get('id'), true);
			}
			this.props.onBlur(newValue, touched);
		}
	};

	Multiform.prototype.render = function render() {
		var _this2 = this;

		var header = this.props.showHeader && this.props.value && this.props.value.count() > 0 && _Object$keys(this.props.schema).map(function (key) {
			return _react2['default'].createElement(
				'td',
				{ key: key },
				_this2.props.schema[key].label
			);
		});

		var subforms = this.props.value && this.props.value.map(function (value) {

			var errors = _this2.props.error && _this2.props.error.childs;
			var suberrors = null;
			if (errors) {
				suberrors = errors.filter(function (item) {
					return item.id == value.get('id');
				});
			}
			if (suberrors && suberrors.length > 0) {
				suberrors = suberrors[0].errors;
			} else {
				suberrors = {};
			}

			var touched = {};
			if (suberrors) {
				_Object$keys(_this2.props.schema).forEach(function (key) {
					touched[key] = true;
				});
				touched = _immutable2['default'].Map(touched);
			} else {
				touched = _this2.props.touched.get(value.get('id'));
			}
			if (!touched) {
				touched = _immutable2['default'].Map();
			}

			var subformState = _immutable2['default'].Map({
				values: value,
				errors: suberrors,
				touched: _immutable2['default'].Map(touched)
			});

			return _react2['default'].createElement(_Subform2['default'], { key: value.get('id'),
				schema: _this2.props.schema,
				'class': _this2.props.subform,
				state: subformState,
				onChange: _this2.handleChange.bind(_this2, value),
				onRemove: _this2.handleRemove.bind(_this2, value)
			});
		});

		return _react2['default'].createElement(
			'div',
			null,
			_react2['default'].createElement(
				'table',
				{ className: 'multiform' },
				header && _react2['default'].createElement(
					'thead',
					null,
					_react2['default'].createElement(
						'tr',
						null,
						header
					)
				),
				_react2['default'].createElement(
					'tbody',
					null,
					subforms
				)
			),
			this.props.addLabel && _react2['default'].createElement(
				'div',
				{ className: 'addmultiform' },
				_react2['default'].createElement(
					'a',
					{ onClick: function (e) {
							return _this2.handleAddSubform(e);
						}, className: 'btn btn-xs', href: '#' },
					_react2['default'].createElement('i', { className: 'fa fa-plus' }),
					' ',
					this.props.addLabel
				)
			)
		);
	};

	_createClass(Multiform, null, [{
		key: 'defaultProps',
		value: {
			showHeader: true,
			addLabel: 'přidat'
		},
		enumerable: true
	}]);

	var _Multiform = Multiform;
	Multiform = _wrapComponent('_$Multiform')(Multiform) || Multiform;
	return Multiform;
})(_react2['default'].Component);

exports['default'] = Multiform;
module.exports = exports['default'];