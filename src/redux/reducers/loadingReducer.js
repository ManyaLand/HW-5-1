import {
	FETCH_TODOS_REQUEST,
	FETCH_TODOS_SUCCESS,
	FETCH_TODOS_FAILURE,
} from "../actions";

export const loadingReducer = (state = false, { type }) => {
	switch (type) {
		case FETCH_TODOS_REQUEST:
			return true;
		case FETCH_TODOS_SUCCESS:
		case FETCH_TODOS_FAILURE:
			return false;
		default:
			return state;
	}
};
