import { useState, useEffect } from "react";

export const useForm = ({ initialText = "", onSubmit }) => {
	const [text, setText] = useState(initialText);

	useEffect(() => {
		setText(initialText);
	}, [initialText]);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const handleReset = () => {
		setText("");
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (text) {
			onSubmit({ text });
			handleReset();
		}
	};

	return {
		text,
		handleChange,
		handleSubmit,
		handleReset,
		setText,
	};
};
