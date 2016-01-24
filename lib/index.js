'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;

var _Form2 = require('./Form');

var _Form3 = _interopRequireDefault(_Form2);

exports.Form = _Form3['default'];

var _ReduxForm = require('./ReduxForm');

var _ReduxForm2 = _interopRequireDefault(_ReduxForm);

exports.RxForm = _ReduxForm2['default'];

var _reducer2 = require('./reducer');

var _reducer3 = _interopRequireDefault(_reducer2);

exports.reducer = _reducer3['default'];

var _FormManager2 = require('./FormManager');

var _FormManager3 = _interopRequireDefault(_FormManager2);

exports.FormManager = _FormManager3['default'];

var _FormField2 = require('./FormField');

var _FormField3 = _interopRequireDefault(_FormField2);

exports.FormField = _FormField3['default'];

var _FormRow2 = require('./FormRow');

var _FormRow3 = _interopRequireDefault(_FormRow2);

exports.FormRow = _FormRow3['default'];

var _Multiform2 = require('./Multiform');

var _Multiform3 = _interopRequireDefault(_Multiform2);

exports.Multiform = _Multiform3['default'];

var _TextInput2 = require('./TextInput');

var _TextInput3 = _interopRequireDefault(_TextInput2);

exports.TextInput = _TextInput3['default'];

var _TextArea2 = require('./TextArea');

var _TextArea3 = _interopRequireDefault(_TextArea2);

exports.TextArea = _TextArea3['default'];

var _Select2 = require('./Select');

var _Select3 = _interopRequireDefault(_Select2);

exports.Select = _Select3['default'];

var _Checkbox2 = require('./Checkbox');

var _Checkbox3 = _interopRequireDefault(_Checkbox2);

exports.Checkbox = _Checkbox3['default'];

module.exports.actions = {
	load: require('./reducer').load,
	save: require('./reducer').save,
	remove: require('./reducer').remove,
	archive: require('./reducer').archive,
	active: require('./reducer').active
};