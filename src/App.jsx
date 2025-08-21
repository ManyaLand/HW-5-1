import style from "./App.module.css";
import { Button } from "./components/button/Button";
import { Todo } from "./components/todo/Todo";
import { Form } from "./components/form/Form";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, createTodo } from "./redux/actions";
import todosFunctions from "./functions/todos";
import { Loaded } from "./components/loader/Loader";

export const App = () => {
	const todos = useSelector((state) => state.todos);
	const isLoading = useSelector((state) => state.isLoading);
	const error = useSelector((state) => state.error);
	const dispatch = useDispatch();

	const [buttonCreate, setButtonCreate] = useState(false);
	const [searchTerm, setSearchTerm] = useState("");
	const [sortAlphabetically, setSortAlphabetically] = useState(false);

	useEffect(() => {
		dispatch(fetchTodos());
	}, [dispatch]);

	const toggleCreate = () => {
		setButtonCreate((prev) => !prev);
	};

	const processedTodos = todosFunctions.getProcessedTodos(
		todos,
		searchTerm,
		sortAlphabetically,
	);

	if (isLoading) return <Loaded />;
	if (error) return <h2>Ошибка: {error}</h2>;

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
				<Form
					onSubmit={(data) => dispatch(createTodo(data))}
					onCancel={toggleCreate}
				/>
			)}
			<section className={style.todos}>
				{processedTodos.map((todo) => (
					<Todo key={todo.id} {...todo} />
				))}
			</section>
		</div>
	);
};
