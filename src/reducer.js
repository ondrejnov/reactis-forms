import immutable from 'immutable';

const CHANGE = 'forms/CHANGE';
const BLUR = 'forms/BLUR';
const SET_VALUE = 'forms/SET_VALUE';
const SET_TOUCHED = 'forms/SET_TOUCHED';
const SET_ERRORS = 'forms/SET_ERRORS';

const LOAD = 'forms/LOAD';
const LOAD_SUCCESS = 'forms/LOAD_SUCCESS';
const LOAD_FAIL = 'forms/LOAD_FAIL';

const SAVE = 'forms/SAVE';
const SAVE_SUCCESS = 'forms/SAVE_SUCCESS';
const SAVE_FAIL = 'forms/SAVE_FAIL';

const REMOVE = 'forms/REMOVE';
const REMOVE_SUCCESS = 'forms/REMOVE_SUCCESS';
const REMOVE_FAIL = 'forms/REMOVE_FAIL';

const ARCHIVE = 'forms/ARCHIVE';
const ARCHIVE_SUCCESS = 'forms/ARCHIVE_SUCCESS';
const ARCHIVE_FAIL = 'forms/ARCHIVE_FAIL';

const ACTIVE = 'forms/ACTIVE';
const ACTIVE_SUCCESS = 'forms/ACTIVE_SUCCESS';
const ACTIVE_FAIL = 'forms/ACTIVE_FAIL';

const initialState = immutable.Map();

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {

	  case CHANGE:
		  return state
			  		.setIn([action.id, 'values', action.key], action.value);

	  case BLUR:
		  return state
			  		.setIn([action.id, 'touched', action.key], action.value);

	  case SET_VALUE:
		  return state
			  .setIn([action.id, 'values'], action.values);

	  case SET_TOUCHED:
		  return state
			  .setIn([action.id, 'touched'], action.values);

	  case SET_ERRORS:
		  return state
			  .setIn([action.id, 'errors'], action.errors);

	  case LOAD:
		  return state
			  	.setIn([action.id, 'pending'], true)
			  	.setIn([action.id, 'loading'], true);

	  case SAVE:
		  return state
			  	.setIn([action.id, 'pending'], true)
			  	.setIn([action.id, 'saving'], true);

	  case LOAD_SUCCESS:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'loading'], false)
			  .setIn([action.id, 'loaded'], true)
			  .setIn([action.id, 'values'], immutable.fromJS(action.result));

	  case SAVE_SUCCESS:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'saving'], false)
			  .setIn([action.id, 'values'], immutable.fromJS(action.result));



	  case SAVE_FAIL:
		  var state = state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'saving'], false);
		  if (action.error && action.error.code == 1001) {
			  state = state.setIn([action.id, 'errors'], JSON.parse(action.error.message));
		  }
		  return state;

	  case LOAD_FAIL:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'loading'], false);

	  case ARCHIVE:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'removing'], false);

	  case ARCHIVE:
	  case ACTIVE:
	  case REMOVE:
		  return state
			  .setIn([action.id, 'pending'], true)
			  .setIn([action.id, 'removing'], true);

	  case ARCHIVE_SUCCESS:
	  case REMOVE_SUCCESS:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'removing'], false);

	  case ARCHIVE_FAIL:
	  case ACTIVE_FAIL:
	  case REMOVE_FAIL:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'removing'], false);

	  case ACTIVE_SUCCESS:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'saving'], false)
			  .setIn([action.id, 'values'], immutable.fromJS(action.result));

	  default:
      	return state;
  }
}


export function change(id, key, value) {
	return {
		type: CHANGE,
		id,
		key,
		value
	};
}

export function blur(id, key, value) {
	return {
		type: BLUR,
		id,
		key,
		value
	};
}

export function setValue(id, values) {
	return {
		type: SET_VALUE,
		id,
		values
	};
}

export function setTouched(id, values) {
	return {
		type: SET_TOUCHED,
		id,
		values
	};
}

export function setErrors(id, errors) {
	return {
		type: SET_ERRORS,
		id,
		errors
	};
}

export function load(id, api, query) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		id,
		promise: (client) => client.call(api, query)
	};
}

export function save(id, api, data) {
	return {
		types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
		id,
		promise: (client) => client.call(api, {data}, {progress:true})
	};
}

export function remove(id, api, query) {
	return {
		types: [REMOVE, REMOVE_SUCCESS, REMOVE_FAIL],
		id,
		promise: (client) => client.call(api, query)
	};
}

export function archive(id, api, query) {
	return {
		types: [ARCHIVE, ARCHIVE_SUCCESS, ARCHIVE_FAIL],
		id,
		promise: (client) => client.call(api, query)
	};
}

export function active(id, api, query) {
	return {
		types: [ACTIVE, ACTIVE_SUCCESS, ACTIVE_FAIL],
		id,
		promise: (client) => client.call(api, query)
	};
}