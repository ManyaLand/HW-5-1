import style from "./App.module.css";
import { Loader } from "./components/loader/Loader";
import { Button } from "./components/button/Button";
import { Todo } from "./components/todo/Todo";
import { useTodos } from "./hooks/useTodos";
import { useState } from "react";
import todosFunctions from "./functions/todos";
import { Link } from "react-router-dom";
import globalStyle from "./globalStyle/globalStyle.module.css";

export const App = () => {
	const { todos, isLoading, error, updateTodo, deleteTodo } = useTodos();
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
			<h2 className={globalStyle.title}>Список задач</h2>
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
				<Link to="/task">
					<Button>Создать задачу</Button>
				</Link>
			</div>
			{isLoading ? (
				<Loader />
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
