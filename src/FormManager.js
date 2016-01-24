import React from 'react';
import immutable from 'immutable';
import EventEmitter from 'eventemitter3';
import validate from './validate';
import shallowEqual from 'react-pure-render/shallowEqual';

export default class FormManager {

	constructor(schema) {
		this.normalizeSchema(schema);
		this.schema = schema;
		this.values = immutable.Map();
		this.errors = immutable.Map();
		this.touched = immutable.Map();
		this.eventEmitter = new EventEmitter();
		this.initValues = this.createDefaultValues();
		this._props = {};
	}

	normalizeSchema(schema) {
		Object.keys(schema).forEach(key => {
			schema[key].key = key;
			if (schema[key].schema) {
				this.normalizeSchema(schema[key].schema);
			}
		});
	}

	getSchema() {
		return this.schema;
	}

	reset() {
		this.eventEmitter.emit('blur', null, null, immutable.Map());
		this.eventEmitter.emit('change', null, null, this.initValues);
	}

	storeCheckpoint() {
		this.initValues = this.values;
	}

	isChanged() {
		let initValues = this.initValues.toObject();
		let values = this.values.toObject();
		const keys = Object.keys(this.schema);

		initValues = Object.keys(initValues).reduce((prev, key) => {
			if (typeof initValues[key] != 'undefined' && initValues[key] !== null && keys.indexOf(key) != -1) {
				prev[key] = initValues[key];
			}
			return prev;
		}, {});

		values = Object.keys(values).reduce((prev, key) => {
			if (typeof values[key] != 'undefined' && values[key] !== null && keys.indexOf(key) != -1) {
				prev[key] = values[key];
			}
			return prev;
		}, {});

		return !shallowEqual(initValues, values);
	}

	createDefaultValues() {
		this.values = immutable.fromJS(this.getDefaultValues());
		return this.values;
	}

	getDefaultValues() {
		let values = {};
		Object.keys(this.schema).forEach(key => {
			values[key] = this.schema[key].value;
		});
		return values;
	}


	setValues(values) {
		this.values = values;
	}

	setTouched(values) {
		this.touched = values;
	}

	setErrors(errors) {
		this.errors = errors;
	}

	getValues() {
		return this.values;
	}

	setValue(values, reset = false) {
		if (!this.values) {
			this.values = immutable.Map();
		}
		if (reset) {
			this.createDefaultValues();
		}
		Object.keys(values).forEach((key) => {
			const value = immutable.fromJS(values[key]);
			this.values = this.values.set(key, value);
			this.eventEmitter.emit('change', key, value, this.values);
		});
	}

	handleChange(key, value) {
		if (!this.values) {
			this.values = immutable.Map();
		}
		this.values = this.values.set(key, value);
		this.eventEmitter.emit('change', key, value, this.values);
	}

	handleBlur(key, value, touched = true) {
		if (typeof value !== 'undefined') {
			this.touched = this.touched.set(key, touched);
			this.eventEmitter.emit('blur', key, value, this.touched);
		}
	}

	createProps(def) {
		const key = def.key;
		if (!this._props[key]) {
			let props = {};
			const keywords = ['key', 'class', 'value'];
			Object.keys(def).forEach(function (p) {
				if (keywords.indexOf(p) == -1) {
					props[p] = def[p];
				}
			});
			props.key = key;
			props.fm = this;
			props.onChange = this.handleChange.bind(this, key);
			props.onBlur = this.handleBlur.bind(this, key);
			this._props[key] = props;
		}
		return this._props[key];
	}

	getControlProps(def) {
		let props = this.createProps(def);
		props.value = this.values ? this.values.get(def.key) : null;
		if (1) { // is not null

		}
		const error = this.errors ? this.errors[def.key] : null;
		if (this.touched.get(def.key)) {
			props.error = error;
		}
		props.touched = this.touched.get(def.key) ? this.touched.get(def.key) : immutable.Map();
		return props;
	}

	existsControl(name) {
		return !!this.schema[name];
	}

	createControl(def) {
		var props = this.getControlProps(def);
		if (!def.class) {
			console.error(def.key);
		}
		const factory = React.createFactory(def.class);
		const input = new factory(props);
		return input;
	}

	getControls() {
		let inputs = {};
		Object.keys(this.schema).forEach(key => {
			inputs[key] = this.createControl(this.schema[key]);
		});
		return inputs;
	}

	getControl(key) {
		if (this.schema[key]) {
			return this.createControl(this.schema[key]);
		}
	}

	isValid() {
		return !Object.keys(this.getErrors()).length;
	}

	getRules(schema) {
		let rules = {};
		Object.keys(schema).forEach(key => {
			if (schema[key].rules) {
				rules[schema[key].key] = schema[key].rules;
			}
			if (schema[key].class.rules) {
				Object.keys(schema[key].class.rules).forEach((rulekey) => {
					if (!rules[schema[key].key]) {
						rules[schema[key].key] = {};
					}
					if (!rules[schema[key].key][rulekey]) {
						rules[schema[key].key][rulekey] = schema[key].class.rules[rulekey];
					}
				});
			}
		});
		return rules;
	}

	getErrors(state) {
		if (!state) {
			state = this.values;
		}
		const errors =  this._getErrors(state.toJS(), this.schema);
		if (Object.keys(errors).length) {
			return errors;
		}
	}

	_getErrors(state, schema) {
		const constraints = this.getRules(schema);
		let errors = validate(state, constraints, {fullMessages: false});

		if (!errors) {
			errors = {};
		}

		Object.keys(schema).forEach(key => {
			const item = schema[key];
			if (item.schema) {
				if (state[item.key]) {
					const itemErrors = state[item.key].map(rowvalue => {
						const err = this._getErrors(rowvalue, schema[item.key].schema);
						if (!Object.keys(err).length) {
							return null;
						}
						return {
							id: rowvalue.id,
							errors: err
						}
					}).filter(item => item != null);

					if (errors[item.key]) {
						errors[item.key] = {
							master: errors[item.key],
							childs: itemErrors
						}
					}
					else if (itemErrors.length) {
						errors[item.key] = {
							childs: itemErrors
						}
					}
				}
			}
		});
		return errors;
	}

	on(event, callback, context) {
		this.eventEmitter.on(event, callback, context);
	}

	removeListener(event, func, context) {
		this.eventEmitter.removeListener(event, func, context);
	}
}