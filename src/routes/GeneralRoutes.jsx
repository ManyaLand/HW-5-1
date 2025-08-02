import { Route, Routes, Navigate } from "react-router-dom";
import { App } from "../App";
import { TodoEditor } from "../components/todoEditor/TodoEditor";
import { NotFound } from "../components/errorPage/NotFound";

export const GeneralRoutes = () => {
	return (
		<Routes>
			<Route path="/" element={<App />}></Route>
			<Route path="/task/:id?" element={<TodoEditor />} />
			<Route path="/404" element={<NotFound />} />
			<Route
				path="*"
				element={
					<Navigate
						to="/404"
						replace={true}
						state={{ from: location.pathname }}
					/>
				}
			></Route>
		</Routes>
	);
};
