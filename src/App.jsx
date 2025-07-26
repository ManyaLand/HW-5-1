import style from "./App.module.css";
import { Loaded } from "./components/loader/Loader";
import { Button } from "./components/button/Button";
import { Todo } from "./components/todo/Todo";
import { useTodos } from "./hooks/useTodos";
import { Form } from "./components/form/Form";
import { useState } from "react";
import todosFunctions from "./functions/todos";

export const App = () => {
	const { todos, isLoading, error, createTodo, updateTodo, deleteTodo } =
		useTodos();
	const [buttonCreate, setButtonCreate] = useState(false);
	const toggleCreate = () => {
		setButtonCreate((prev) => !prev);
	};
	const toggleTodo = (todo) =>
		updateTodo(todo.id, { completed: !todo.completed });
	const [searchTerm, setSearchTerm] = useState("");
	const [sortAlphabetically, setSortAlphabetically] = useState(false);

	const processedTodos = todosFunctions.getProcessedTodos(
		todos,
		searchTerm,
		sortAlphabetically,
	);
	return (
		<div className={style.content}>
			<div className={style.controls}>
				<input
					type="text"
					placeholder="Поиск задач..."
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
					className={style.searchInput}
				/>
				{!sortAlphabetically && (
					<Button
						onClick={() =>
							setSortAlphabetically(!sortAlphabetically)
						}
					>
						Сортировать по алфавиту
					</Button>
				)}
				{!buttonCreate && (
					<Button onClick={toggleCreate}>Создать задачу</Button>
				)}
			</div>
			{buttonCreate && (
				<Form onSubmit={createTodo} onCancel={toggleCreate} />
			)}
			{isLoading ? (
				<Loaded />
			) : (
				<section className={style.todos}>
					{!error &&
						processedTodos.map((todo) => (
							<Todo
								key={todo.id}
								{...todo}
								onToggle={() => toggleTodo(todo)}
								onEdit={(content) =>
									updateTodo(todo.id, content)
								}
								onDelete={() => deleteTodo(todo.id)}
							/>
						))}
				</section>
			)}
		</div>
	);
};
