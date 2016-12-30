import Component from './Component';
import React from 'react';
import immutable from 'immutable';
import Subform from './Subform';

export default class Multiform extends React.Component {

	static defaultProps = {
		showHeader: true,
		addLabel: 'přidat',
		className: 'multiform'
	};

	handleAddSubform(e) {
		e.preventDefault();
		this.addSubform();
	}

	/**
	 * Novy subform
	 */
	addSubform() {
		let item = {
			id: -Math.round(Math.random() * 10000000)
		};
		Object.keys(this.props.schema).forEach(key => {
			item[key] = typeof this.props.schema[key].value != 'undefined' ? this.props.schema[key].value : null;
		});
		item = immutable.Map(item);
		const value = this.props.value ? this.props.value.push(item) : immutable.List([item]);
		if (this.props.onChange) {
			this.props.onChange(value, item);
		}
		if (this.props.onBlur) {
			this.props.onBlur(value, this.props.touched);
		}
	}

	handleRemove(item, e) {
		e.preventDefault();
		const value = this.props.value.filter(it => {
			return it.get('id') != item.get('id');
		});
		if (this.props.onChange) {
			this.props.onChange(value, item);
		}
		if (this.props.onBlur) {
			this.props.onBlur(value, this.props.touched);
		}
	}

	handleChange(item, key, value, values) {
		const newValue = this.props.value.map(it => {
			if (it.get('id') == item.get('id')) {
				return values.set('id', item.get('id'));
			}
			else {
				return it;
			}
		});
		const changedItem = newValue.filter(it => {
			return it.get('id') == item.get('id');
		});
		if (this.props.onChange) {
			this.props.onChange(newValue, changedItem.get(0));
		}
		if (this.props.onBlur) {
			let touched = this.props.touched;
			if (this.props.touched !== true) {
				if (!touched) {
					touched = immutable.Map();
				}
				touched = touched.set(item.get('id'), true);
			}
			this.props.onBlur(newValue, touched);
		}
	}

	render() {

		const header = this.props.showHeader &&
			this.props.value &&
			this.props.value.count() > 0 &&
			Object.keys(this.props.schema).map(
					key => <td key={key}>{this.props.schema[key].label}</td>
			);

		const subforms = this.props.value && this.props.value.map(value => {

				const errors = this.props.error && this.props.error.childs;
				let suberrors = null;
				if (errors) {
					suberrors = errors.filter(item => {
						return item.id == value.get('id');
					});
				}
				if (suberrors && suberrors.length > 0) {
					suberrors = suberrors[0].errors;
				}
				else {
					suberrors = {};
				}

				let touched = {};
				if (suberrors) {
					Object.keys(this.props.schema).forEach(key => {
						touched[key] = true;
					});
					touched = immutable.Map(touched);
				}
				else {
					touched = this.props.touched.get(value.get('id'));
				}
				if (!touched) {
					touched = immutable.Map();
				}

				const subformState = immutable.Map({
						values: value,
						errors: suberrors,
						touched: immutable.Map(touched)
					});

				return <Subform key={value.get('id')}
								schema={this.props.schema}
								class={this.props.subform}
								parentProps={this.props}
								state={subformState}
								beforeChange={this.props.beforeChange}
								onChange={this.handleChange.bind(this, value)}
								onRemove={this.handleRemove.bind(this, value)}
					/>;
			});

		return (
			<div>
				<table className={this.props.className}>
					{header && <thead><tr>{header}<td></td></tr></thead>}
					<tbody>
						{subforms}
					</tbody>
				</table>
				{this.props.addLabel &&
					<div className="addmultiform">
						<a onClick={(e) => this.handleAddSubform(e)} className="btn btn-xs" href="#">
							<i className="fa fa-plus"></i>&nbsp;
							{this.props.addLabel}
						</a>
					</div>
				}
			</div>
		)
	}
}