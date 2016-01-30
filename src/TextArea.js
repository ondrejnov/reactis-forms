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
		return (
			<div>
				<textarea
					{...this.props}
					value={this.props.value ? this.props.value : ''}
					onChange={(e) => this.handleChange(e)}
					onBlur={(e) => this.handleBlur(e)}
				/>
			</div>
		)
	}
}