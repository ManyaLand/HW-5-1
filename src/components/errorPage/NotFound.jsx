import { useLocation } from "react-router-dom";
import style from "./NotFound.module.css";

export const NotFound = () => {
	const location = useLocation();
	const originalPath = location.state?.from || location.pathname;
	return (
		<div className={style.notFoundPage}>
			Адреса "{originalPath}" не существует
		</div>
	);
};
