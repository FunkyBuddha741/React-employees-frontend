import React from 'react';
import { useAuth } from '../services/AuthService';
import { Navigate } from 'react-router-dom';

const AuthenticatedRoute = ({ children }) => {
	const auth = useAuth();

	if (!auth?.user) {
		return <Navigate to="/" />;
	}

	return children;
};

export default AuthenticatedRoute;
