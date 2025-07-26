import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/todos";

export const useTodos = () => {
	const [todos, setTodos] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	const fetchTodos = async () => {
		try {
			setIsLoading(true);
			setError(null);
			const res = await fetch(API_URL);
			if (!res.ok) throw new Error("Ошибка загрузки");
			const data = await res.json();
			setTodos(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchTodos();
	}, []);

	const createTodo = async (newTodo) => {
		try {
			const res = await fetch(API_URL, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(newTodo),
			});
			if (!res.ok) throw new Error("Ошибка создания");
			const created = await res.json();
			setTodos((prev) => [...prev, created]);
		} catch (err) {
			console.error(err.message);
		}
	};

	const updateTodo = async (id, updatedFields) => {
		console.log(updatedFields);
		try {
			const res = await fetch(`${API_URL}/${id}`, {
				method: "PATCH",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(updatedFields),
			});
			if (!res.ok) throw new Error("Ошибка обновления");
			const updated = await res.json();
			setTodos((prev) =>
				prev.map((post) => (post.id === id ? updated : post)),
			);
		} catch (err) {
			console.error(err.message);
		}
	};

	const deleteTodo = async (id) => {
		try {
			const res = await fetch(`${API_URL}/${id}`, {
				method: "DELETE",
			});
			if (!res.ok) throw new Error("Ошибка удаления");
			setTodos((prev) => prev.filter((post) => post.id !== id));
		} catch (err) {
			console.error(err.message);
		}
	};

	return {
		todos,
		isLoading,
		error,
		createTodo,
		updateTodo,
		deleteTodo,
	};
};
