import React from 'react';
import shallowEqual from 'react-pure-render/shallowEqual';

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

		let shouldUpdate =
			 this.props.visible != nextProps.visible ||
			 this.props.required != nextProps.required ||
			 this.props.label != nextProps.label ||
			 this.props.labelWidth != nextProps.labelWidth;

		if (this.props.visible instanceof Function) {
			return true;
		}
		if (!shouldUpdate && this.lastControl) {
			shouldUpdate = !shallowEqual(control.props, this.lastControl.props);
		}

		this.lastControl = control;
		//const shouldUpdate = true;
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