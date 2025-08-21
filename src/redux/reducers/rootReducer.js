import { combineReducers } from "redux";
import { todosReducer } from "./todosReducer";
import { loadingReducer } from "./loadingReducer";
import { errorReducer } from "./errorReducer";

export const rootReducer = combineReducers({
	todos: todosReducer,
	isLoading: loadingReducer,
	error: errorReducer,
});
