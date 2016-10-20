import React from 'react';
import ReactDOM from 'react-dom';
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

	focus() {
		ReactDOM.findDOMNode(this).focus();
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
			type: this.props.type,
			onKeyPress: this.props.onKeyPress,
			onKeyUp: this.props.onKeyUp,
			onKeyDown: this.props.onKeyDown,
			onFocus: this.props.onFocus
		};

		return (
			<input type="text"
				   {...props}
				   value={typeof this.props.value != 'undefined' && this.props.value != null ? this.props.value.toString() : ''}
				   onChange={(e) => this.handleChange(e)}
				   onBlur={(e) => this.handleBlur(e)}
			/>
		)
	}
}