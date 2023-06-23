import { createSlice, PayloadAction  } from '@reduxjs/toolkit'
// import { userAPI } from './userAPI'
// import type { RootState } from '../store'
import { Post } from '../../types/post'
import { RootState } from '../store'

const initialState: Post[] = [
	{
		id: 1,
		title: "json-server",
		author: "typicode"
	}
]

const postSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
		addPost: (state, action: PayloadAction<Post>) => {
			state.push(action.payload)
		},
		deletePost: (state, action: PayloadAction<number>) => {
			// state = state.filter(post => post.id !== action.payload)
			state.splice(state.findIndex(post => post.id === action.payload), 1)
			// return state
		},
	},
})

export const { addPost, deletePost } = postSlice.actions
export const getPosts = (state: RootState) => state.posts

export default postSlice.reducer