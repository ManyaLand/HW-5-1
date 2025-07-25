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
				posts.map(({ id, title, body }) => (
					<article key={id} className={style.post}>
						<h1 className={style.title}>{title}</h1>
						<p className={style.text}>{body}</p>
					</article>
				))}
		</section>
	);
};
