import { useEffect, useState } from "react";
import style from "./TodoEditor.module.css";
import { useParams, useNavigate } from "react-router-dom";
import { useTodos } from "../../hooks/useTodos";
import { Form } from "../form/Form";
import globalStyle from "../../globalStyle/globalStyle.module.css";
import { Loader } from "../loader/Loader";
import { Button } from "../button/Button";

export const TodoEditor = () => {
	const { id } = useParams();
	const { fetchTodo, isLoading, error, createTodo, deleteTodo, updateTodo } =
		useTodos();
	const [todo, setTodo] = useState(null);
	const [editClick, setEditClick] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const loadTodo = async () => {
			if (id) {
				const data = await fetchTodo(id);
				if (!(data instanceof Error)) {
					setTodo(data);
				}
			}
		};
		loadTodo();
	}, [id]);

	const toggleEditClick = () => {
		setEditClick((prev) => {
			return !prev;
		});
	};
	const submitEditForm = async (text) => {
		updateTodo(id, text).then((updated) => {
			setTodo(updated);
			toggleEditClick();
		});
	};

	const onClickCreate = (text) => {
		createTodo(text).then(() => {
			navigate("/");
		});
	};
	const onClickDelete = () => {
		deleteTodo(id).then(() => {
			navigate("/");
		});
	};
	const redirectBack = () => {
		navigate(-1);
	};

	return (
		<section className={style.editor}>
			{isLoading ? (
				<Loader />
			) : error ? (
				<div>Что-то пошло не так</div>
			) : id ? (
				todo ? (
					<>
						<h2 className={globalStyle.title}>
							Редактирование задачи
							<Button onClick={redirectBack}>Назад</Button>
						</h2>
						<div className={style.container}>
							<div>
								<span className={style.name}>Текст: </span>
								{todo.text}
							</div>
							<div>
								<span className={style.name}>Статус: </span>
								{todo.completed ? "Выполнено" : "Не выполнено"}
							</div>
							<div className={style.buttonContainer}>
								<Button onClick={toggleEditClick}>
									Редактировать
								</Button>
								<Button
									className="buttonDelete"
									onClick={onClickDelete}
								>
									Удалить
								</Button>
							</div>
							{editClick && (
								<Form
									initialText={todo.text}
									onSubmit={submitEditForm}
									onCancel={toggleEditClick}
								/>
							)}
						</div>
					</>
				) : (
					<h2 className={globalStyle.title}>
						Задача не найдена{" "}
						<Button onClick={redirectBack}>Назад</Button>
					</h2>
				)
			) : (
				<>
					<h2 className={globalStyle.title}>
						Создание новой задачи{" "}
						<Button onClick={redirectBack}>Назад</Button>
					</h2>
					<Form onSubmit={(text) => onClickCreate(text)}></Form>
				</>
			)}
		</section>
	);
};
