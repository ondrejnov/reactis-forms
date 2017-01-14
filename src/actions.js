export const CHANGE = 'forms/CHANGE';
export const BLUR = 'forms/BLUR';
export const SET_VALUE = 'forms/SET_VALUE';
export const SET_TOUCHED = 'forms/SET_TOUCHED';
export const SET_ERRORS = 'forms/SET_ERRORS';

export const START_ASYNC_VALIDATE = 'forms/START_ASYNC_VALIDATE';
export const SET_ASYNC_RESULT = 'forms/SET_ASYNC_RESULT';

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

export function startAsyncValidate(id, key) {
	return {
		type: START_ASYNC_VALIDATE,
		id,
		key
	};
}

export function setAsyncResult(id, key, error) {
	return {
		type: SET_ASYNC_RESULT,
		id,
		key,
		error
	};
}

/// Form DB actions ///

export const LOAD = 'forms/LOAD';
export const LOAD_SUCCESS = 'forms/LOAD_SUCCESS';
export const LOAD_FAIL = 'forms/LOAD_FAIL';

export const FETCH = 'forms/FETCH';
export const FETCH_SUCCESS = 'forms/FETCH_SUCCESS';
export const FETCH_FAIL = 'forms/FETCH_FAIL';

export const SAVE = 'forms/SAVE';
export const SAVE_SUCCESS = 'forms/SAVE_SUCCESS';
export const SAVE_FAIL = 'forms/SAVE_FAIL';

export const REMOVE = 'forms/REMOVE';
export const REMOVE_SUCCESS = 'forms/REMOVE_SUCCESS';
export const REMOVE_FAIL = 'forms/REMOVE_FAIL';

export const DEFAULTS = 'forms/DEFAULTS';
export const DEFAULTS_SUCCESS = 'forms/DEFAULTS_SUCCESS';
export const DEFAULTS_FAIL = 'forms/DEFAULTS_FAIL';

export const ARCHIVE = 'forms/ARCHIVE';
export const ARCHIVE_SUCCESS = 'forms/ARCHIVE_SUCCESS';
export const ARCHIVE_FAIL = 'forms/ARCHIVE_FAIL';

export const ACTIVE = 'forms/ACTIVE';
export const ACTIVE_SUCCESS = 'forms/ACTIVE_SUCCESS';
export const ACTIVE_FAIL = 'forms/ACTIVE_FAIL';

export function fetch(id, api, query) {
	return {
		types: [FETCH, FETCH_SUCCESS, FETCH_FAIL],
		id,
		promise: (client) => client.call(api, query)
	};
}

export function load(id, api, query) {
	return {
		types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
		id,
		promise: (client) => client.call(api, query)
	};
}

export function getDefaults(id, api, query) {
	return {
		types: [DEFAULTS, DEFAULTS_SUCCESS, DEFAULTS_FAIL],
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