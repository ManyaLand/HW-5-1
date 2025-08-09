import style from "./Todo.module.css";
import { Button } from "../button/Button";
import { useState } from "react";
import { Form } from "../form/Form";
import { useTodos } from "../../context/TodoProvider";

export const Todo = ({ completed, text, id }) => {
	const [editClick, setEditClick] = useState(false);
	const { updateTodo, deleteTodo, toggleTodo } = useTodos();

	const onToggleEdit = () => {
		setEditClick((prev) => !prev);
	};

	const submitForm = (data) => {
		updateTodo(id, data);
		setEditClick(false);
	};

	return (
		<>
			<article
				className={`${style.todo} ${completed ? style.todoCompleted : ""}`}
			>
				<section className={style.textContainer}>
					<div
						className={style.checkContainer}
						onClick={() => {
							toggleTodo(id, !completed);
						}}
					>
						{completed && <i className="fas fa-check"></i>}
					</div>
					<p className={style.text}>{text}</p>
				</section>
				<section className={style.buttonSection}>
					<Button className="buttonEdit" onClick={onToggleEdit}>
						<i className="fas fa-pen"></i>
					</Button>
					<Button
						className="buttonDelete"
						onClick={() => deleteTodo(id)}
					>
						<i className="fas fa-trash"></i>
					</Button>
				</section>
			</article>
			{editClick && (
				<Form
					initialText={text}
					onSubmit={submitForm}
					onCancel={onToggleEdit}
				/>
			)}
		</>
	);
};
