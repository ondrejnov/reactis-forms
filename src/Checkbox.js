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
		const props = {
			autoFocus: this.props.autoFocus,
			className: this.props.className,
			disabled: this.props.disabled,
			name: this.props.name,
			placeholder: this.props.placeholder,
			readOnly: this.props.readOnly,
			required: this.props.required,
			style: this.props.style,
			tabIndex: this.props.tabIndex,
			title: this.props.title
		};

		return (
			<input type="checkbox" {...props}
				   checked={!!this.props.value}
				   onBlur={(e) => this.handleBlur(e)}
				   onChange={(e) => this.handleChange(e)}
			/>
		)
	}
}