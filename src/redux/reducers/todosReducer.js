import {
	FETCH_TODOS_SUCCESS,
	ADD_TODO_SUCCESS,
	UPDATE_TODO_SUCCESS,
	DELETE_TODO_SUCCESS,
	TOGGLE_TODO_SUCCESS,
} from "../actions";

export const todosReducer = (state = [], { type, payload }) => {
	switch (type) {
		case FETCH_TODOS_SUCCESS:
			return payload;

		case ADD_TODO_SUCCESS:
			return [...state, payload];

		case UPDATE_TODO_SUCCESS:
		case TOGGLE_TODO_SUCCESS:
			return state.map((todo) =>
				todo.id === payload.id ? payload : todo,
			);

		case DELETE_TODO_SUCCESS:
			return state.filter((t) => t.id !== payload);

		default:
			return state;
	}
};
