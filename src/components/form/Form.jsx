import { useForm } from "../../hooks/useForm";
import { Button } from "../button/Button";
import style from "./Form.module.css";

export const Form = ({ initialText = "", onSubmit, onCancel }) => {
	const { text, handleChange, handleSubmit } = useForm({
		initialText,
		onSubmit,
	});

	return (
		<form onSubmit={handleSubmit} className={style.form}>
			<textarea
				rows={3}
				type="text"
				value={text}
				className={style.textarea}
				onChange={handleChange}
				placeholder="Введите текст задачи"
			/>
			<Button type="submit">Сохранить</Button>
			{onCancel && (
				<Button
					type="button"
					className="buttonCancel"
					onClick={onCancel}
				>
					Отмена
				</Button>
			)}
		</form>
	);
};
