import {
	FETCH_TODOS_FAILURE,
	FETCH_TODOS_REQUEST,
	FETCH_TODOS_SUCCESS,
} from "../actions";

export const errorReducer = (state = null, { type, payload }) => {
	switch (type) {
		case FETCH_TODOS_FAILURE:
			return payload;
		case FETCH_TODOS_REQUEST:
		case FETCH_TODOS_SUCCESS:
			return null;
		default:
			return state;
	}
};
