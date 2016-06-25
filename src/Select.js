import React from 'react';
import Component from './Component';
import ReactSelect from 'react-select';

export default class Select extends Component {

	handleChange(val) {
		if (val === '') {
			val = undefined;
		}
		if (this.props.onChange) {
			this.props.onChange(val ? val.id : val)
		}
		if (this.props.onBlur) {
			this.props.onBlur(val ? val.id : val)
		}
	}


	render() {
		let options = this.props.options;

		return (
			<ReactSelect {...this.props}
					searchable={false}
					options={options}
					labelKey="title"
					valueKey="id"
				   value={typeof this.props.value != 'undefined' && this.props.value != null ? this.props.value : ''}
				   onChange={(val) => this.handleChange(val)}
			/>
		)
	}
}