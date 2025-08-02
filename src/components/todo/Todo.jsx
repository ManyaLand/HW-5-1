import style from "./Todo.module.css";
import { Button } from "../button/Button";
import { useState } from "react";
import { Form } from "../form/Form";
import { Link } from "react-router-dom";

export const Todo = ({ completed, text, onToggle, onEdit, onDelete, id }) => {
	const [editClick, setEditClick] = useState(false);
	const toggleEdit = () => {
		setEditClick((prev) => !prev);
	};
	const submitForm = (data) => {
		onEdit(data);
		toggleEdit();
	};

	return (
		<div className={style.card}>
			<div className={style.checkContainer} onClick={onToggle}>
				{completed && <i className="fas fa-check"></i>}
			</div>
			<Link to={`/task/${id}`} className={style.link}>
				<article
					className={`${style.todo} ${completed ? style.todoCompleted : ""}`}
				>
					<section className={style.textContainer}>
						<p className={style.text}>{text}</p>
					</section>
					{/* <section className={style.buttonSection}> */}
					{/* <Button className="buttonEdit" onClick={toggleEdit}>
						<i className="fas fa-pen"></i>
					</Button> */}
					{/* <Button className="buttonDelete" onClick={onDelete}>
						<i className="fas fa-trash"></i>
					</Button> */}
					{/* </section> */}
				</article>
				{editClick && (
					<Form
						initialText={text}
						onSubmit={submitForm}
						onCancel={toggleEdit}
					/>
				)}
			</Link>
		</div>
	);
};
