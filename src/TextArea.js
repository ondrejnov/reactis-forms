import React from 'react';
import Component from './Component';

export default class Textarea extends Component {

	handleChange(e) {
		if (this.props.onChange) {
			this.props.onChange(e.target.value)
		}
	}

	handleBlur(e) {
		if (this.props.onBlur) {
			this.props.onBlur(e.target.value)
		}
	}

	render() {
		const props = {
			autoFocus: this.props.autoFocus,
			className: this.props.className,
			disabled: this.props.disabled,
			maxLength: this.props.maxLength,
			minLength: this.props.minLength,
			name: this.props.name,
			placeholder: this.props.placeholder,
			readOnly: this.props.readOnly,
			required: this.props.required,
			size: this.props.size,
			start: this.props.start,
			step: this.props.step,
			style: this.props.style,
			tabIndex: this.props.tabIndex,
			title: this.props.title,
			type: this.props.type
		};

		return (
			<div>
				<textarea
					{...props}
					value={this.props.value ? this.props.value : ''}
					onChange={(e) => this.handleChange(e)}
					onBlur={(e) => this.handleBlur(e)}
				/>
			</div>
		)
	}
}