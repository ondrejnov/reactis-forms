import React from 'react';

export default class FormField extends React.Component {

	static contextTypes = {
		form: React.PropTypes.object
	};

	render() {
		return this.context.form.getControl(this.props.name);
	}
}