import React from 'react';
import Form from './Form';

export default class Subform extends Form {

	render() {
		const factory = React.createFactory(this.props.class);
		return new factory({onRemove: this.props.onRemove, state: this.props.state});
	}
}