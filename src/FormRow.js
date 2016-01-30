import React from 'react';

export default class FormRow extends React.Component {

	static contextTypes = {
		form: React.PropTypes.object
	};

	static defaultProps = {
		visible: true,
		required: false,
		label: false,
		labelWidth: false
	};

	getControl() {
		return this.context.form.getControl(this.props.name);
	}


	shouldComponentUpdate(nextProps, nextState) {

		const control = this.getControl();

		/*const shouldUpdate =
			this.props.visible != nextProps.visible ||
			control.props.value != nextProps.input.props.value ||
			control.props.error != nextProps.input.props.error;*/

		const shouldUpdate = true;
		return shouldUpdate;
	}

	render() {
		const control = this.getControl();
		const display = this.props.visible &&
					  (this.props.visible === true || this.props.visible(this.context.form.getValues().toJS()))
						? '' : 'none';

		const required = this.props.required || control && control.props.rules && control.props.rules.presence;
		const label = this.props.label ? this.props.label : control && control.props.label;
		const content = control ? control : this.props.children;
		const requiredSymbol = <span style={{color: '#A00'}}>*</span>;

 		return (
			<tr style={{display: display}} className={this.props.className}>
					<th style={{width: this.props.labelWidth ? this.props.labelWidth : 'auto'}}>
						{required && requiredSymbol} {label}
					</th>
					<td style={this.props.style}>
						<div className="form-group">
							{label &&
								<label className="horizontal-label">{label}: {required && requiredSymbol}</label>
							}
							{content}
						</div>
					</td>
			</tr>
		);
	}
}