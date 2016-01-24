import React from 'react';
import Component from './Component';
import ReactSelect from 'react-select';

export default class Select extends Component {

	handleChange(val) {
		if (val === '') {
			val = undefined;
		}
		if (this.props.onChange) {
			this.props.onChange(val)
		}
		if (this.props.onBlur) {
			this.props.onBlur(val)
		}
	}


	render() {
		let options = this.props.options;
		/*if (this.props.placeholder) {
			options = [{id: '', title: this.props.placeholder}];
			this.props.options.forEach(item => options.push(item));
		}
		options = options.map(function(op) {
			return <option key={op.id} value={op.id}>{op.title}</option>;
		});*/

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