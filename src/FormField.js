import React from 'react';

export default class FormField extends React.Component {

	static contextTypes = {
		form: React.PropTypes.object
	};

	getElement() {
		return this.refs.control;
	}

	render() {
		return React.cloneElement(this.context.form.getControl(this.props.name), {ref: 'control'});
	}
}