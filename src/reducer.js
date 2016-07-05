import immutable from 'immutable';
import {CHANGE, BLUR,
	SET_VALUE, SET_TOUCHED, SET_ERRORS, START_ASYNC_VALIDATE, SET_ASYNC_RESULT,
	LOAD, LOAD_SUCCESS, LOAD_FAIL,
	DEFAULTS, DEFAULTS_SUCCESS, DEFAULTS_FAIL,
	SAVE, SAVE_SUCCESS, SAVE_FAIL,
	REMOVE, REMOVE_SUCCESS, REMOVE_FAIL,
	ARCHIVE, ARCHIVE_SUCCESS, ARCHIVE_FAIL,
	ACTIVE, ACTIVE_SUCCESS, ACTIVE_FAIL} from './actions';

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

	  case START_ASYNC_VALIDATE:
		  return state
			  .setIn([action.id, 'async', action.key, 'pending'], true);

	  case SET_ASYNC_RESULT:
		  return state
			  .setIn([action.id, 'async', action.key, 'pending'], false)
			  .setIn([action.id, 'async', action.key, 'error'], [action.error]);

	  case LOAD:
		  return state
			  	.setIn([action.id, 'pending'], true)
			  	.setIn([action.id, 'loading'], true);

	  case SAVE:
		  return state
			  	.setIn([action.id, 'pending'], true)
			  	.setIn([action.id, 'saving'], true);

	  case DEFAULTS:
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

	  case DEFAULTS_SUCCESS:
		  state = state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'saving'], false);
		  Object.keys(action.result).forEach((key) => {
			 state = state.setIn([action.id, 'values', key], immutable.fromJS(action.result[key]));
		  });
		  return state;

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

	  case DEFAULTS_FAIL:
		  return state
			  .setIn([action.id, 'pending'], false)
			  .setIn([action.id, 'loading'], false);

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