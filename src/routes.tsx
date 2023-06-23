import {
	Route,
} from "react-router-dom";
import { registerValidation } from './utils/form-validation'
import Layout from './layouts/Layout'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Register from './pages/Register'
import PrivateRoute from './hoc/PrivateRoute'
// import Optimisations from './pages/Optimisations'
import { lazy } from 'react'
import Posts from './pages/Posts'

const Optimisations = lazy(() => import('./pages/Optimisations'))

export const AppRoutes = () => (
	<Route path="/" element={<Layout />}>
		<Route path="/login" element={<Login />} />
		<Route path="/optimisations" element={<Optimisations />} />
		<Route path="/profile" element={
			<PrivateRoute>
				<Profile />
			</PrivateRoute>
		} />
		<Route path="/posts" element={<Posts />} />
		<Route path="/register" element={<Register validateForm={registerValidation} />} />
	</Route>
);
