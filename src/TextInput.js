import React from 'react';
import Component from './Component';

export default class Input extends Component {

	static filterDelay  = true;

	handleChange(e) {
		if (this.props.onChange) {
			this.props.onChange(this.getValue(e))
		}
	}

	handleBlur(e) {
		if (this.props.onBlur) {
			this.props.onBlur(this.getValue(e))
		}
	}

	getValue(e) {
		const value = e.target.value;
		if (value === '') {
			return;
		}
		else {
			return value
		}
	}

	render() {
		return (
			<input type="text"
				   {...this.props}
				   value={typeof this.props.value != 'undefined' && this.props.value != null ? this.props.value.toString() : ''}
				   onChange={(e) => this.handleChange(e)}
				   onBlur={(e) => this.handleBlur(e)}
			/>
		)
	}
}