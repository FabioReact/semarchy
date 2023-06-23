import React from 'react'
import { useAuth } from '../hooks/useAuth'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
	const { token } = useAuth()

	if (!token) {
		return <Navigate to="/login" />
	}

	return children
}

export default PrivateRoute