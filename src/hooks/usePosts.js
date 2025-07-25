import { useEffect, useState } from "react";

export const usePosts = () => {
	const [posts, setPosts] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		setError(null);

		fetch("https://jsonplaceholder.typicode.com/posts")
			.then((res) => {
				if (!res.ok) {
					throw new Error("Ошибка загрузки данных");
				}
				return res.json();
			})
			.then((data) => setPosts(data))
			.catch((err) => setError(err.message))
			.finally(() => setIsLoading(false));
	}, []);

	return { posts, isLoading, error };
};
