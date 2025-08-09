import style from "./App.module.css";
import { Button } from "./components/button/Button";
import { Todo } from "./components/todo/Todo";
import { useTodos } from "./context/TodoProvider";
import { Form } from "./components/form/Form";
import { useState } from "react";
import todosFunctions from "./functions/todos";

export const App = () => {
	const { todos, createTodo } = useTodos();
	const [buttonCreate, setButtonCreate] = useState(false);
	const toggleCreate = () => {
		setButtonCreate((prev) => !prev);
	};
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
			<section className={style.todos}>
				{processedTodos.map((todo) => (
					<Todo key={todo.id} {...todo} />
				))}
			</section>
		</div>
	);
};
