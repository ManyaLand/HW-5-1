export const FETCH_TODOS_REQUEST = "FETCH_TODOS_REQUEST";
export const FETCH_TODOS_SUCCESS = "FETCH_TODOS_SUCCESS";
export const FETCH_TODOS_FAILURE = "FETCH_TODOS_FAILURE";

export const ADD_TODO_SUCCESS = "ADD_TODO_SUCCESS";
export const UPDATE_TODO_SUCCESS = "UPDATE_TODO_SUCCESS";
export const DELETE_TODO_SUCCESS = "DELETE_TODO_SUCCESS";
export const TOGGLE_TODO_SUCCESS = "TOGGLE_TODO_SUCCESS";

export const API_URL = "http://localhost:3000/todos";

export const fetchTodos = () => async (dispatch) => {
	dispatch({ type: FETCH_TODOS_REQUEST });
	try {
		const res = await fetch(API_URL);
		if (!res.ok) throw new Error("Ошибка загрузки");
		const data = await res.json();
		dispatch({ type: FETCH_TODOS_SUCCESS, payload: data });
	} catch (err) {
		dispatch({ type: FETCH_TODOS_FAILURE, payload: err.message });
	}
};

export const createTodo = (newTodo) => async (dispatch) => {
	try {
		const res = await fetch(API_URL, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(newTodo),
		});
		if (!res.ok) throw new Error("Ошибка создания");
		const created = await res.json();
		dispatch({ type: ADD_TODO_SUCCESS, payload: created });
	} catch (err) {
		console.error(err.message);
	}
};

export const updateTodo = (id, updatedFields) => async (dispatch) => {
	try {
		const res = await fetch(`${API_URL}/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(updatedFields),
		});
		if (!res.ok) throw new Error("Ошибка обновления");
		const updated = await res.json();
		dispatch({ type: UPDATE_TODO_SUCCESS, payload: updated });
	} catch (err) {
		console.error(err.message);
	}
};

export const toggleTodo = (id, isCompleted) => async (dispatch) => {
	try {
		const res = await fetch(`${API_URL}/${id}`, {
			method: "PATCH",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ completed: isCompleted }),
		});
		if (!res.ok) throw new Error("Ошибка обновления");
		const updated = await res.json();
		dispatch({ type: TOGGLE_TODO_SUCCESS, payload: updated });
	} catch (err) {
		console.error(err.message);
	}
};

export const deleteTodo = (id) => async (dispatch) => {
	try {
		const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
		if (!res.ok) throw new Error("Ошибка удаления");
		dispatch({ type: DELETE_TODO_SUCCESS, payload: id });
	} catch (err) {
		console.error(err.message);
	}
};
