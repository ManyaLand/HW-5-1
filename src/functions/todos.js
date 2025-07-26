const filterTodos = (todos, searchTerm) => {
	return todos.filter((todo) =>
		todo.text.toLowerCase().includes(searchTerm.toLowerCase()),
	);
};

const sortTodos = (todos, sortAlphabetically) => {
	if (!sortAlphabetically) return todos;
	return [...todos].sort((a, b) => a.text.localeCompare(b.text));
};

const getProcessedTodos = (todos, searchTerm, sortAlphabetically) => {
	const filtered = filterTodos(todos, searchTerm);
	return sortTodos(filtered, sortAlphabetically);
};

export default {
	filterTodos,
	sortTodos,
	getProcessedTodos,
};
