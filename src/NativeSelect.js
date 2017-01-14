import React from 'react';
import Component from './Component';

export default class Select extends Component {

	handleChange(e) {
		let val = e.target.value;
		if (val === '') {
			val = undefined;
		}
		if (this.props.onChange) {
			this.props.onChange(val)
		}
		this.handleBlur(e)
	}

	handleBlur(e) {
		let val = e.target.value;
		if (val === '') {
			val = undefined;
		}
		if (this.props.onBlur) {
			this.props.onBlur(val)
		}
	}


	render() {
		let options = this.props.options;
		if (options.asArray) {
			options = options.asArray();
		}


		options = options.map((item) => {
			return <option value={item.id} key={item.id}>{item.title}</option>
		});


		return (
			<select {...this.props}
				   value={typeof this.props.value != 'undefined' && this.props.value != null ? this.props.value : ''}
					onBlur={(e) => this.handleBlur(e)}
				   	onChange={(e) => this.handleChange(e)}
			>
				{options}
			</select>
		)
	}
}