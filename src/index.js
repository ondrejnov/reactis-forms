export Form from './Form';
export RxForm from './ReduxForm';
export reducer from './reducer';
export FormManager from './FormManager';
export FormField from './FormField';
export FormRow from './FormRow';
export Multiform from './Multiform';
export TextInput from './TextInput';
export TextArea from './TextArea';
export Select from './Select';
export Checkbox from './Checkbox';

module.exports.actions = {
	load: require('./reducer').load,
	save: require('./reducer').save,
	remove: require('./reducer').remove,
	archive: require('./reducer').archive,
	active: require('./reducer').active
};