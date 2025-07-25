import { usePosts } from "./hooks/usePosts";
import style from "./App.module.css";
import { Loaded } from "./components/loader/Loader";

export const App = () => {
	const { posts, isLoading, error } = usePosts();

	return (
		<section className={style.posts}>
			{isLoading && <Loaded />}
			{error && <div className={style.error}>{error}</div>}
			{!isLoading &&
				!error &&
				posts.map(({ id, title, completed }) => (
					<article
						key={id}
						className={`${style.post} ${completed ? style.postCompleted : ""}`}
					>
						<span className={style.text}>{title}</span>
					</article>
				))}
		</section>
	);
};
