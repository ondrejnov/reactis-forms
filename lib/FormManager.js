'use strict';

var _classCallCheck = require('babel-runtime/helpers/class-call-check')['default'];

var _Object$keys = require('babel-runtime/core-js/object/keys')['default'];

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _eventemitter3 = require('eventemitter3');

var _eventemitter32 = _interopRequireDefault(_eventemitter3);

var _validate = require('./validate');

var _validate2 = _interopRequireDefault(_validate);

var _reactPureRenderShallowEqual = require('react-pure-render/shallowEqual');

var _reactPureRenderShallowEqual2 = _interopRequireDefault(_reactPureRenderShallowEqual);

var FormManager = (function () {
	function FormManager(schema) {
		_classCallCheck(this, FormManager);

		this.normalizeSchema(schema);
		this.schema = schema;
		this.values = _immutable2['default'].Map();
		this.errors = _immutable2['default'].Map();
		this.touched = _immutable2['default'].Map();
		this.eventEmitter = new _eventemitter32['default']();
		this.initValues = this.createDefaultValues();
		this._props = {};
	}

	FormManager.prototype.normalizeSchema = function normalizeSchema(schema) {
		var _this = this;

		_Object$keys(schema).forEach(function (key) {
			schema[key].key = key;
			if (schema[key].schema) {
				_this.normalizeSchema(schema[key].schema);
			}
		});
	};

	FormManager.prototype.getSchema = function getSchema() {
		return this.schema;
	};

	FormManager.prototype.reset = function reset() {
		this.eventEmitter.emit('blur', null, null, _immutable2['default'].Map());
		this.eventEmitter.emit('change', null, null, this.initValues);
	};

	FormManager.prototype.storeCheckpoint = function storeCheckpoint() {
		this.initValues = this.values;
	};

	FormManager.prototype.isChanged = function isChanged() {
		var initValues = this.initValues.toObject();
		var values = this.values.toObject();
		var keys = _Object$keys(this.schema);

		initValues = _Object$keys(initValues).reduce(function (prev, key) {
			if (typeof initValues[key] != 'undefined' && initValues[key] !== null && keys.indexOf(key) != -1) {
				prev[key] = initValues[key];
			}
			return prev;
		}, {});

		values = _Object$keys(values).reduce(function (prev, key) {
			if (typeof values[key] != 'undefined' && values[key] !== null && keys.indexOf(key) != -1) {
				prev[key] = values[key];
			}
			return prev;
		}, {});

		return !_reactPureRenderShallowEqual2['default'](initValues, values);
	};

	FormManager.prototype.createDefaultValues = function createDefaultValues() {
		this.values = _immutable2['default'].fromJS(this.getDefaultValues());
		return this.values;
	};

	FormManager.prototype.getDefaultValues = function getDefaultValues() {
		var _this2 = this;

		var values = {};
		_Object$keys(this.schema).forEach(function (key) {
			values[key] = _this2.schema[key].value;
		});
		return values;
	};

	FormManager.prototype.setValues = function setValues(values) {
		this.values = values;
	};

	FormManager.prototype.setTouched = function setTouched(values) {
		this.touched = values;
	};

	FormManager.prototype.setErrors = function setErrors(errors) {
		this.errors = errors;
	};

	FormManager.prototype.getValues = function getValues() {
		return this.values;
	};

	FormManager.prototype.setValue = function setValue(values) {
		var _this3 = this;

		var reset = arguments.length <= 1 || arguments[1] === undefined ? false : arguments[1];

		if (!this.values) {
			this.values = _immutable2['default'].Map();
		}
		if (reset) {
			this.createDefaultValues();
		}
		_Object$keys(values).forEach(function (key) {
			var value = _immutable2['default'].fromJS(values[key]);
			_this3.values = _this3.values.set(key, value);
			_this3.eventEmitter.emit('change', key, value, _this3.values);
		});
	};

	FormManager.prototype.handleChange = function handleChange(key, value) {
		if (!this.values) {
			this.values = _immutable2['default'].Map();
		}
		this.values = this.values.set(key, value);
		this.eventEmitter.emit('change', key, value, this.values);
	};

	FormManager.prototype.handleBlur = function handleBlur(key, value) {
		var touched = arguments.length <= 2 || arguments[2] === undefined ? true : arguments[2];

		if (typeof value !== 'undefined') {
			this.touched = this.touched.set(key, touched);
			this.eventEmitter.emit('blur', key, value, this.touched);
		}
	};

	FormManager.prototype.createProps = function createProps(def) {
		var _this4 = this;

		var key = def.key;
		if (!this._props[key]) {
			(function () {
				var props = {};
				var keywords = ['key', 'class', 'value'];
				_Object$keys(def).forEach(function (p) {
					if (keywords.indexOf(p) == -1) {
						props[p] = def[p];
					}
				});
				props.key = key;
				props.fm = _this4;
				props.onChange = _this4.handleChange.bind(_this4, key);
				props.onBlur = _this4.handleBlur.bind(_this4, key);
				_this4._props[key] = props;
			})();
		}
		return this._props[key];
	};

	FormManager.prototype.getControlProps = function getControlProps(def) {
		var props = this.createProps(def);
		props.value = this.values ? this.values.get(def.key) : null;
		if (1) {// is not null

		}
		var error = this.errors ? this.errors[def.key] : null;
		if (this.touched.get(def.key)) {
			props.error = error;
		}
		props.touched = this.touched.get(def.key) ? this.touched.get(def.key) : _immutable2['default'].Map();
		return props;
	};

	FormManager.prototype.existsControl = function existsControl(name) {
		return !!this.schema[name];
	};

	FormManager.prototype.createControl = function createControl(def) {
		var props = this.getControlProps(def);
		if (!def['class']) {
			console.error(def.key);
		}
		var factory = _react2['default'].createFactory(def['class']);
		var input = new factory(props);
		return input;
	};

	FormManager.prototype.getControls = function getControls() {
		var _this5 = this;

		var inputs = {};
		_Object$keys(this.schema).forEach(function (key) {
			inputs[key] = _this5.createControl(_this5.schema[key]);
		});
		return inputs;
	};

	FormManager.prototype.getControl = function getControl(key) {
		if (this.schema[key]) {
			return this.createControl(this.schema[key]);
		}
	};

	FormManager.prototype.isValid = function isValid() {
		return !_Object$keys(this.getErrors()).length;
	};

	FormManager.prototype.getRules = function getRules(schema) {
		var rules = {};
		_Object$keys(schema).forEach(function (key) {
			if (schema[key].rules) {
				rules[schema[key].key] = schema[key].rules;
			}
			if (schema[key]['class'].rules) {
				_Object$keys(schema[key]['class'].rules).forEach(function (rulekey) {
					if (!rules[schema[key].key]) {
						rules[schema[key].key] = {};
					}
					if (!rules[schema[key].key][rulekey]) {
						rules[schema[key].key][rulekey] = schema[key]['class'].rules[rulekey];
					}
				});
			}
		});
		return rules;
	};

	FormManager.prototype.getErrors = function getErrors(state) {
		if (!state) {
			state = this.values;
		}
		var errors = this._getErrors(state.toJS(), this.schema);
		if (_Object$keys(errors).length) {
			return errors;
		}
	};

	FormManager.prototype._getErrors = function _getErrors(state, schema) {
		var _this6 = this;

		var constraints = this.getRules(schema);
		var errors = _validate2['default'](state, constraints, { fullMessages: false });

		if (!errors) {
			errors = {};
		}

		_Object$keys(schema).forEach(function (key) {
			var item = schema[key];
			if (item.schema) {
				if (state[item.key]) {
					var itemErrors = state[item.key].map(function (rowvalue) {
						var err = _this6._getErrors(rowvalue, schema[item.key].schema);
						if (!_Object$keys(err).length) {
							return null;
						}
						return {
							id: rowvalue.id,
							errors: err
						};
					}).filter(function (item) {
						return item != null;
					});

					if (errors[item.key]) {
						errors[item.key] = {
							master: errors[item.key],
							childs: itemErrors
						};
					} else if (itemErrors.length) {
						errors[item.key] = {
							childs: itemErrors
						};
					}
				}
			}
		});
		return errors;
	};

	FormManager.prototype.on = function on(event, callback, context) {
		this.eventEmitter.on(event, callback, context);
	};

	FormManager.prototype.removeListener = function removeListener(event, func, context) {
		this.eventEmitter.removeListener(event, func, context);
	};

	return FormManager;
})();

exports['default'] = FormManager;
module.exports = exports['default'];