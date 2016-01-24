'use strict';

var _interopRequireDefault = require('babel-runtime/helpers/interop-require-default')['default'];

exports.__esModule = true;
exports['default'] = reducer;
exports.change = change;
exports.blur = blur;
exports.setValue = setValue;
exports.setTouched = setTouched;
exports.setErrors = setErrors;
exports.load = load;
exports.save = save;
exports.remove = remove;
exports.archive = archive;
exports.active = active;

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var CHANGE = 'forms/CHANGE';
var BLUR = 'forms/BLUR';
var SET_VALUE = 'forms/SET_VALUE';
var SET_TOUCHED = 'forms/SET_TOUCHED';
var SET_ERRORS = 'forms/SET_ERRORS';

var LOAD = 'forms/LOAD';
var LOAD_SUCCESS = 'forms/LOAD_SUCCESS';
var LOAD_FAIL = 'forms/LOAD_FAIL';

var SAVE = 'forms/SAVE';
var SAVE_SUCCESS = 'forms/SAVE_SUCCESS';
var SAVE_FAIL = 'forms/SAVE_FAIL';

var REMOVE = 'forms/REMOVE';
var REMOVE_SUCCESS = 'forms/REMOVE_SUCCESS';
var REMOVE_FAIL = 'forms/REMOVE_FAIL';

var ARCHIVE = 'forms/ARCHIVE';
var ARCHIVE_SUCCESS = 'forms/ARCHIVE_SUCCESS';
var ARCHIVE_FAIL = 'forms/ARCHIVE_FAIL';

var ACTIVE = 'forms/ACTIVE';
var ACTIVE_SUCCESS = 'forms/ACTIVE_SUCCESS';
var ACTIVE_FAIL = 'forms/ACTIVE_FAIL';

var initialState = _immutable2['default'].Map();

function reducer() {
	var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	var action = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

	switch (action.type) {

		case CHANGE:
			return state.setIn([action.id, 'values', action.key], action.value);

		case BLUR:
			return state.setIn([action.id, 'touched', action.key], action.value);

		case SET_VALUE:
			return state.setIn([action.id, 'values'], action.values);

		case SET_TOUCHED:
			return state.setIn([action.id, 'touched'], action.values);

		case SET_ERRORS:
			return state.setIn([action.id, 'errors'], action.errors);

		case LOAD:
			return state.setIn([action.id, 'pending'], true).setIn([action.id, 'loading'], true);

		case SAVE:
			return state.setIn([action.id, 'pending'], true).setIn([action.id, 'saving'], true);

		case LOAD_SUCCESS:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'loading'], false).setIn([action.id, 'loaded'], true).setIn([action.id, 'values'], _immutable2['default'].fromJS(action.result));

		case SAVE_SUCCESS:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'saving'], false).setIn([action.id, 'values'], _immutable2['default'].fromJS(action.result));

		case SAVE_FAIL:
			var state = state.setIn([action.id, 'pending'], false).setIn([action.id, 'saving'], false);
			if (action.error && action.error.code == 1001) {
				state = state.setIn([action.id, 'errors'], JSON.parse(action.error.message));
			}
			return state;

		case LOAD_FAIL:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'loading'], false);

		case ARCHIVE:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'removing'], false);

		case ARCHIVE:
		case ACTIVE:
		case REMOVE:
			return state.setIn([action.id, 'pending'], true).setIn([action.id, 'removing'], true);

		case ARCHIVE_SUCCESS:
		case REMOVE_SUCCESS:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'removing'], false);

		case ARCHIVE_FAIL:
		case ACTIVE_FAIL:
		case REMOVE_FAIL:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'removing'], false);

		case ACTIVE_SUCCESS:
			return state.setIn([action.id, 'pending'], false).setIn([action.id, 'saving'], false).setIn([action.id, 'values'], _immutable2['default'].fromJS(action.result));

		default:
			return state;
	}
}

function change(id, key, value) {
	return {
		type: CHANGE,
		id: id,
		key: key,
		value: value
	};
}

function blur(id, key, value) {
	return {
		type: BLUR,
		id: id,
		key: key,
		value: value
	};
}

function setValue(id, values) {
	return {
		type: SET_VALUE,
		id: id,
		values: values
	};
}

function setTouched(id, values) {
	return {
		type: SET_TOUCHED,
		id: id,
		values: values
	};
}

function setErrors(id, errors) {
	return {
		type: SET_ERRORS,
		id: id,
		errors: errors
	};
}

function load(id, api, query) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		id: id,
		promise: function promise(client) {
			return client.call(api, query);
		}
	};
}

function save(id, api, data) {
	return {
		types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
		id: id,
		promise: function promise(client) {
			return client.call(api, { data: data }, { progress: true });
		}
	};
}

function remove(id, api, query) {
	return {
		types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
		id: id,
		promise: function promise(client) {
			return client.call(api, query);
		}
	};
}

function archive(id, api, query) {
	return {
		types: [ARCHIVE, ARCHIVE_SUCCESS, ARCHIVE_FAIL],
		id: id,
		promise: function promise(client) {
			return client.call(api, query);
		}
	};
}

function active(id, api, query) {
	return {
		types: [ACTIVE, ACTIVE_SUCCESS, ACTIVE_FAIL],
		id: id,
		promise: function promise(client) {
			return client.call(api, query);
		}
	};
}