import Component from './Component';
import React from 'react';

export default class Checkbox extends Component {

	handleChange(e) {
		if (this.props.onChange) {
			this.props.onChange(e.target.checked)
		}
		this.handleBlur(e)
	}

	handleBlur(e) {
		if (this.props.onBlur) {
			this.props.onBlur(e.target.checked)
		}
	}

	render() {
		return (
			<input type="checkbox" {...this.props}
				   checked={this.props.value}
				   onBlur={(e) => this.handleBlur(e)}
				   onChange={(e) => this.handleChange(e)}
			/>
		)
	}
}