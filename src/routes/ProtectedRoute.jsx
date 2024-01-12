import React from 'react';
import { useAuth, getUserRoles } from '../services/AuthService';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
	const roles = getUserRoles();

	if (roles.includes('ROLE_USER')) {
		<Navigate to="/Forbidden" />;
	} else {
		return children;
	}
};

export default ProtectedRoute;
