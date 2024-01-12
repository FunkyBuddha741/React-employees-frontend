import { useState, useEffect } from 'react';
import React from 'react';
import { logOut, isUserLoggedIn, useAuth } from '../services/AuthService';

const HeaderComponent = () => {
	const auth = useAuth();

	console.log(auth.user);

	const handleLogout = () => {
		auth.logout();
	};

	return (
		<div>
			<header>
				<nav className="navbar navbar-expand-md navbar-dark bg-dark justify-content-between mb-4">
					<div className="navbar-brand">Employee Management App</div>
					{auth.user && (
						<button className="btn btn-danger" onClick={() => handleLogout()}>
							Log out
						</button>
					)}
				</nav>
			</header>
		</div>
	);
};

export default HeaderComponent;
