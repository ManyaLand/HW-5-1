import style from "./Button.module.css";

export const Button = ({ children, className = "", onClick }) => {
	const combinedClass = `${style.button} ${style[className] || ""}`;
	return (
		<button onClick={onClick} className={combinedClass}>
			{children}
		</button>
	);
};
