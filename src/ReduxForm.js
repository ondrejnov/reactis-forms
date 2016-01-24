import React from 'react';
import Form from './Form';
import Component from './Component';
import immutable from 'immutable';

import {connect} from 'react-redux';
import * as actions from './reducer';
import {bindActionCreators} from 'redux';

@connect(
	(state, ownProps) => {
		return {
			state: state.forms.get(ownProps.id)
		};
	},
	(dispatch) => {
		return {actions: bindActionCreators(actions, dispatch)};
	},null, { withRef: true })
export default class ReduxForm extends Component {

	handleSubmit(form) {

		const errors = this.validate();

		if (!errors && this.props.onSubmit) {
			this.props.onSubmit(form);
		}
		if (errors && this.props.onInvalidSubmit) {
			this.props.onInvalidSubmit(errors);
		}
	}

	handleChange(key, value, values, form) {
		this.props.actions.setValue(this.props.id, values);

		const errors = form.getErrors();
		this.props.actions.setErrors(this.props.id, errors);

		if (this.props.onChange) {
			this.props.onChange(key, value, values)
		}
	}

	handleBlur(key, value, values, form) {
		this.props.actions.setTouched(this.props.id, values);

		const errors = form.getErrors();
		this.props.actions.setErrors(this.props.id, errors);

		if (this.props.onBlur) {
			this.props.onBlur(key, value, values)
		}
	}

	validate() {
		const errors = this.refs.form.form.getErrors();
		if (errors) {
			const touched = {};
			Object.keys(errors).forEach(key => {
				touched[key] = true;
			});
			this.props.actions.setTouched(this.props.id, immutable.Map(touched));
			this.props.actions.setErrors(this.props.id, errors);
		}
		return errors;
	}

	render() {
		return (
			<Form state={this.props.state}
				  onSubmit={(form) => this.handleSubmit(form)}
				  onChange={(key, value, values, form) => this.handleChange(key, value, values, form)}
				  onBlur={(key, value, values, form) => this.handleBlur(key, value, values, form)}
				  schema={this.props.schema}
				  form={this.props.form}
				  className={this.props.className}
				  ref="form">

				{this.props.children}
			</Form>
		)
	}
}