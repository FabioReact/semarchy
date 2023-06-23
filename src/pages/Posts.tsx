import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { addPost, deletePost, getPosts } from '../redux/slices/postSlice'

const Posts = () => {
	const posts = useAppSelector(getPosts)
	const dispatch = useAppDispatch()
	const addNewPost = () => {
		dispatch(addPost({
			id: 2,
			author: 'testAuthor',
			title: 'testTitle',
		}))
	}

	const deleteCurrentPost = (id: number) => {
		dispatch(deletePost(id))
	}

	return (
		<section>
			<h1>Posts</h1>
			<ul>
				{posts.map(post => <li key={post.id}>{post.title} - {post.author} - {post.id} <button onClick={() => deleteCurrentPost(post.id)}>Delete</button> </li> )}
			</ul>
			<button onClick={addNewPost}>Add Post</button>
		</section>
	)
}

export default Posts