import React from 'react';
import FormManager from './FormManager';
import Component from './Component';
import immutable from 'immutable';

export default class Form extends Component {

	static contextTypes = {
		form: React.PropTypes.object
	};

	constructor(props) {
		super(props);
		if (props.schema) {
			this.form = new FormManager(props.schema, this.props.parentProps);
			this.form.beforeChange = props.beforeChange;
		}
		else {
			this.form = props.form;
		}
		this.form.on('change', this.handleChange, this);
		this.form.on('blur', this.handleBlur, this);
		if (props.state) {
			this.syncForm(props.state);
		}
	}

	static childContextTypes = {
		form: React.PropTypes.object
	};

	getChildContext() {
		return {
			form: this.form
		};
	}

	componentDidMount() {
		const values = this.form.getValues(true);
		if (this.props.onInit) {
			this.props.onInit(values, this.form)
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.parentProps && nextProps.parentProps != this.props.parentProps) {
			this.form.parentProps = nextProps.parentProps;
		}
		if (nextProps.state) {
			this.syncForm(nextProps.state);
		}
	}

	componentWillUnmount() {
		this.form.removeListener('change', this.handleChange, this);
		this.form.removeListener('blur', this.handleBlur, this);
	}

	syncForm(state) {
		if (state.get('values')) {
			this.form.setValues(state.get('values'));
		}
		if (state.get('touched')) {
			this.form.setTouched(state.get('touched'));
		}
		if (state.get('errors')) {
			this.form.setErrors(state.get('errors'));
		}
		else {
			this.form.setErrors(immutable.Map());
		}
		if (state.get('async')) {
			this.form.setAsync(state.get('async'));
		}
		else {
			this.form.setAsync(immutable.Map());
		}
	}

	handleSubmit(e) {
		e.preventDefault();
		if (this.props.onSubmit) {
			this.props.onSubmit(this.form)
		}
	}

	handleChange(key, value, values) {
		if (this.props.onChange) {
			this.props.onChange(key, value, values, this.form)
		}
	}

	handleBlur(key, value, values) {
		if (this.props.onBlur) {
			this.props.onBlur(key, value, values, this.form)
		}
	}

	handleKeyDown(e) {
		if (e.keyCode == 13 && e.target.tagName == 'INPUT' && this.props.onSubmit) {
			e.preventDefault();
			this.props.onSubmit(this.form)
		}
	}

	render() {
		if (this.context.form) {
			return (
				<div className={this.props.className} onKeyDown={(e) => this.handleKeyDown(e)}>
					{this.props.children}
				</div>
			)
		}
		else {
			return (
				<form className={this.props.className} onSubmit={(e) => this.handleSubmit(e)}>
					{this.props.children}
				</form>
			)
		}

	}
}